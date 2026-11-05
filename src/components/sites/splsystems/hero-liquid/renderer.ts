import { createFrameGovernor } from "../frame-governor";
import { compileProgram, nextFrame } from "../webgl-program";
import { CROP_ANCHOR_X, CROP_ASPECT, MAX_BRANCHES, OVERFLOW_SCALE, REGION, VIEWBOX_HEIGHT, VIEWBOX_WIDTH, BRANCHES } from "./constants";
import type { LiquidMask } from "./mask";
import { FRAGMENT_SHADER, HERO_LIQUID_EFFECT, HERO_LIQUID_INTRO, VERTEX_SHADER, type IntroTiming, type LiquidEffectParams } from "./shaders";

// Soft liquid ribbons hold up well below native density: 1.5x and a ~4MP
// ceiling cost roughly half the fragments of 2x on a retina laptop, and the
// frame governor steps lower still on devices that can't keep up.
const MAX_DPR = 1.5;
const PIXEL_BUDGET = 4e6;
const FPS = 60;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export interface LiquidRenderer {
  setParams(params: LiquidEffectParams): void;
  setIntroTiming(timing: IntroTiming): void;
  dispose(): void;
}

export interface CreateLiquidRendererOptions {
  intro: boolean;
  onActive: () => void;
  onError: () => void;
  params?: LiquidEffectParams;
  introTiming?: IntroTiming;
}

/**
 * Async so nothing here blocks the main thread for long: the shader compiles
 * in parallel with the mask build (pass the mask's promise straight in), and
 * the three mask textures upload on separate frames instead of one ~25MB burst.
 */
export async function createLiquidRenderer(
  canvas: HTMLCanvasElement,
  maskSource: LiquidMask | Promise<LiquidMask>,
  { intro, onActive, onError, params = HERO_LIQUID_EFFECT, introTiming = HERO_LIQUID_INTRO }: CreateLiquidRendererOptions,
): Promise<LiquidRenderer> {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: "high-performance",
  });
  if (!gl) throw new Error("webgl2 unavailable");

  const [program, mask] = await Promise.all([compileProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER), maskSource]);
  gl.useProgram(program);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const imageTex = gl.createTexture();
  const metaTex = gl.createTexture();
  const edgeTex = gl.createTexture();

  const uploadRgba = (unit: number, texture: WebGLTexture, width: number, height: number, data: Uint8Array, filter: number) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };

  const uploadMask = async (m: LiquidMask) => {
    uploadRgba(0, imageTex!, m.width, m.height, m.base, gl.LINEAR);
    await nextFrame();
    uploadRgba(1, metaTex!, m.width, m.height, m.meta, gl.NEAREST);
    await nextFrame();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, edgeTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, m.fieldWidth, m.fieldHeight, 0, gl.RED, gl.FLOAT, m.field);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };
  await uploadMask(mask);

  // Re-assert this renderer's program and textures each frame: in React's
  // dev double-mount two renderers can briefly share this canvas's context.
  const bindState = () => {
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, metaTex);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, edgeTex);
  };

  const loc = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1i(loc("u_image"), 0);
  gl.uniform1i(loc("u_meta"), 1);
  gl.uniform1i(loc("u_edge"), 2);

  const uRepetition = loc("u_repetition");
  const uSoftness = loc("u_softness");
  const uShiftRed = loc("u_shiftRed");
  const uShiftBlue = loc("u_shiftBlue");
  const uShadowBlue = loc("u_shadowBlue");
  const uDistortion = loc("u_distortion");
  const uContour = loc("u_contour");
  const uAngle = loc("u_angle");
  const uFlow = loc("u_flow");
  const uUvScale = loc("u_uvScale");
  const uUvOffset = loc("u_uvOffset");
  const uTime = loc("u_time");
  const uResolution = loc("u_resolution");
  const uBranchReveal = loc("u_branchReveal");
  const uFeather = loc("u_feather");
  const uPointer = loc("u_pointer");
  const uHover = loc("u_hover");

  let effectParams = params;
  const writeEffectParams = () => {
    gl.uniform1f(uRepetition, effectParams.repetition);
    gl.uniform1f(uSoftness, effectParams.softness);
    gl.uniform1f(uShiftRed, effectParams.shiftRed);
    gl.uniform1f(uShiftBlue, effectParams.shiftBlue);
    gl.uniform1f(uShadowBlue, effectParams.shadowBlue);
    gl.uniform1f(uDistortion, effectParams.distortion);
    gl.uniform1f(uContour, effectParams.contour);
    gl.uniform1f(uAngle, effectParams.angle);
    gl.uniform1f(uFlow, effectParams.flow);
  };
  writeEffectParams();

  let timing = introTiming;
  const writeFeather = () => gl.uniform1f(uFeather, timing.feather);
  writeFeather();

  const branchDelays = () => BRANCHES.map((_, i) => timing.startDelay + (BRANCHES.length - 1 - i) * timing.stagger);
  let delays = branchDelays();

  const revealAll = () => gl.uniform1fv(uBranchReveal, new Float32Array(MAX_BRANCHES).fill(2));

  // Padded-mask -> viewBox mapping (same ratios the source computes from REGION/viewBox).
  const scaleX = VIEWBOX_WIDTH / REGION.width;
  const scaleY = (VIEWBOX_HEIGHT * OVERFLOW_SCALE) / REGION.height;
  const offsetX = -REGION.x / REGION.width;
  const offsetY = -REGION.y / REGION.height;

  const governor = createFrameGovernor({ fps: FPS });

  const resize = () => {
    gl.useProgram(program);
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;
    if (!clientWidth || !clientHeight) return;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * governor.scale;
    const totalPixels = clientWidth * clientHeight * dpr * dpr;
    if (totalPixels > PIXEL_BUDGET) dpr *= Math.sqrt(PIXEL_BUDGET / totalPixels);
    const width = Math.max(1, Math.round(clientWidth * dpr));
    const height = Math.max(1, Math.round(clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uResolution, width, height);
    const crop = Math.min(1, clientWidth / clientHeight / CROP_ASPECT);
    gl.uniform2f(uUvScale, scaleX * crop, scaleY);
    gl.uniform2f(uUvOffset, offsetX + scaleX * (1 - crop) * CROP_ANCHOR_X, offsetY);
  };

  let introDone = !intro;
  const introStart = 0;
  if (introDone) revealAll();

  // Pointer is tracked on window (the canvas itself is pointer-events: none).
  // The handler only stores coordinates; they're mapped into the canvas once
  // per drawn frame, so a 120Hz mouse never forces a layout read per event.
  const pointer = { x: 0.5, y: 0.5, hover: 0, target: 0, clientX: 0, clientY: 0, dirty: false };
  const onPointerMove = (event: PointerEvent) => {
    pointer.clientX = event.clientX;
    pointer.clientY = event.clientY;
    pointer.dirty = true;
  };
  const onPointerLeave = () => {
    pointer.dirty = false;
    pointer.target = 0;
  };
  const updatePointer = () => {
    if (!pointer.dirty) return;
    pointer.dirty = false;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = (pointer.clientX - rect.left) / rect.width;
    const py = (pointer.clientY - rect.top) / rect.height;
    const inside = px >= 0 && px <= 1 && py >= 0 && py <= 1;
    if (inside) {
      pointer.x = px;
      pointer.y = py;
    }
    pointer.target = inside ? 1 : 0;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);

  const drawFrame = (elapsed: number, dt = 0) => {
    bindState();
    updatePointer();
    pointer.hover += (pointer.target - pointer.hover) * Math.min(1, dt * 5);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform1f(uHover, pointer.hover);
    gl.uniform1f(uTime, elapsed * effectParams.speed);
    if (!introDone) {
      const e = elapsed - introStart;
      const reveal = new Float32Array(MAX_BRANCHES).fill(2);
      let allDone = true;
      for (let i = 0; i < BRANCHES.length; i++) {
        const t = Math.min(Math.max((e - delays[i]) / timing.duration, 0), 1);
        if (t < 1) allDone = false;
        reveal[i] = easeInOutCubic(t) * (1 + 2 * timing.feather + 0.02);
      }
      gl.uniform1fv(uBranchReveal, reveal);
      if (allDone) {
        introDone = true;
        revealAll();
      }
    }
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let disposed = false;
  let running = false;
  let rafId = 0;
  let lastFrameTime = 0;
  let elapsed = 0;
  let firedActive = false;
  let visible = true;

  const shouldRun = () => !disposed && visible && document.visibilityState === "visible";

  const tick = (now: number) => {
    rafId = requestAnimationFrame(tick);
    if (!governor.shouldDraw(now)) return;
    const dt = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.1) : 0;
    lastFrameTime = now;
    elapsed += dt;
    drawFrame(elapsed, dt);
    if (!firedActive) {
      firedActive = true;
      onActive();
    }
    if (governor.record(now)) resize();
    if (!shouldRun()) setRunning(false);
  };

  function setRunning(next: boolean) {
    if (running === next) return;
    running = next;
    if (next) {
      lastFrameTime = 0;
      governor.reset();
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
    }
  }

  resize();
  drawFrame(0);
  setRunning(shouldRun());

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    setRunning(shouldRun());
  });
  intersectionObserver.observe(canvas);

  const onVisibilityChange = () => setRunning(shouldRun());
  document.addEventListener("visibilitychange", onVisibilityChange);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    setRunning(false);
    onError();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  return {
    setParams(next) {
      if (disposed) return;
      gl.useProgram(program);
      effectParams = next;
      writeEffectParams();
    },
    setIntroTiming(next) {
      if (disposed) return;
      gl.useProgram(program);
      timing = next;
      delays = branchDelays();
      writeFeather();
    },
    dispose() {
      disposed = true;
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      setRunning(false);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteTexture(imageTex);
      gl.deleteTexture(metaTex);
      gl.deleteTexture(edgeTex);
      gl.deleteProgram(program);
      // Explicit loseContext() is skipped: React's dev-mode double effect
      // invocation (mount -> cleanup -> remount, synchronously) reuses this
      // same canvas element for the remount, and a lost WebGL context never
      // un-loses itself. Deleting the GPU objects above is enough cleanup;
      // the context itself is reclaimed once the canvas is actually discarded.
    },
  };
}
