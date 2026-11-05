/**
 * Shader compile/link that doesn't stall the main thread.
 *
 * Checking COMPILE_STATUS / LINK_STATUS right after `linkProgram` blocks
 * until the driver finishes, which for these shaders can be hundreds of
 * milliseconds (notably ANGLE on Windows) and lands right in page load.
 * With KHR_parallel_shader_compile the driver compiles off-thread and we
 * poll the non-blocking COMPLETION_STATUS_KHR once per frame instead; where
 * the extension is missing this degrades to the old synchronous check.
 */
function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader allocation failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function compileProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): Promise<WebGLProgram> {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) return Promise.reject(new Error("program allocation failed"));
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  const parallel = gl.getExtension("KHR_parallel_shader_compile") as { COMPLETION_STATUS_KHR: number } | null;

  return new Promise((resolve, reject) => {
    const finish = () => {
      if (gl.isContextLost()) {
        reject(new Error("webgl context lost"));
        return;
      }
      const ok = gl.getProgramParameter(program, gl.LINK_STATUS);
      const log = ok
        ? ""
        : [gl.getShaderInfoLog(vertex), gl.getShaderInfoLog(fragment), gl.getProgramInfoLog(program)].filter(Boolean).join(" | ");
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (ok) {
        resolve(program);
      } else {
        gl.deleteProgram(program);
        reject(new Error(`program link failed: ${log || "unknown"}`));
      }
    };
    if (!parallel) {
      finish();
      return;
    }
    const poll = () => {
      if (gl.isContextLost() || gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) finish();
      else requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  });
}

/** Resolves on the next animation frame; used to spread GPU uploads out. */
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
