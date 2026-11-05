import { createFrameGovernor } from "../frame-governor";
import { compileProgram } from "../webgl-program";
import { FRAGMENT_SHADER, QUAD_VERTICES, VERTEX_SHADER, hexToRgba, type MetallicSwirlParams } from "./shaders";

const MAX_DPR = 1.5;
// The backdrop drifts slowly, so 30fps is indistinguishable from 60 here and
// halves the shading cost (more on 120Hz displays).
const FPS = 30;
/** The canvas spans the viewport plus this fraction of its height above and below. */
const WINDOW_MARGIN = 0.3;
/** Re-centre once the viewport edge comes within this fraction of the canvas edge. */
const WINDOW_GUARD = 0.08;

export interface MetallicSwirlRenderer {
  setParams(next: MetallicSwirlParams): void;
  dispose(): void;
}

export interface CreateMetallicSwirlRendererOptions {
  params: MetallicSwirlParams;
  animated: boolean;
  onReady: () => void;
  onError: () => void;
}

/**
 * `host` is the box the swirl visually fills (a whole multi-section band);
 * `canvas` is a child of it that only covers the stretch near the viewport
 * and is moved (translateY) as the page scrolls — see `place()`.
 */
export async function createMetallicSwirlRenderer(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  { params, animated, onReady, onError }: CreateMetallicSwirlRendererOptions,
): Promise<MetallicSwirlRenderer> {
  // No MSAA: the only geometry is a full-screen quad, so multisampling buys
  // nothing but a resolve pass and 4x the framebuffer memory every frame.
  const gl = canvas.getContext("webgl2", {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    depth: false,
    stencil: false,
  });
  if (!gl) throw new Error("webgl2 unavailable");

  // Compiles off the main thread where supported (see webgl-program.ts).
  const program = await compileProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);
  const positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const loc = (name: string) => gl.getUniformLocation(program, name);
  const u = {
    uvScale: loc("uUvScale"), uvOffset: loc("uUvOffset"),
    time: loc("uTime"), res: loc("uRes"), zoom: loc("uZoom"), iter: loc("uIter"), eps: loc("uEps"),
    tangent: loc("uTangent"), grad: loc("uGrad"), bright: loc("uBright"), contrast: loc("uContrast"), bg: loc("uBg"),
    alpha: loc("uAlpha"), radial: loc("uRadial"), beams: loc("uBeams"), stretch: loc("uStretch"), flow: loc("uFlow"),
    spinPhase: loc("uSpinPhase"), beamWidth: loc("uBeamWidth"), twist: loc("uTwist"), vortex: loc("uVortex"),
    hole: loc("uHole"), center: loc("uCenter"), vignette: loc("uVignette"), colorMode: loc("uColorMode"),
    colorA: loc("uColorA"), colorB: loc("uColorB"), colorC: loc("uColorC"), tint: loc("uTint"),
    repetition: loc("uRepetition"), softness: loc("uSoftness"), bandWidth: loc("uBandWidth"), shiftRed: loc("uShiftRed"),
    shiftBlue: loc("uShiftBlue"), stripePhase: loc("uStripePhase"), stripeRadial: loc("uStripeRadial"),
    spread: loc("uSpread"), threshold: loc("uThreshold"), detailFade: loc("uDetailFade"), fadeLeft: loc("uFadeLeft"),
    fadeRight: loc("uFadeRight"), fadeTop: loc("uFadeTop"), fadeBottom: loc("uFadeBottom"),
  };

  let p = params;
  // Each uniform write targets this renderer's program explicitly: React's
  // dev double-mount can briefly put two renderers on one canvas context.
  const writeParams = () => {
    gl.useProgram(program);
    const [bgR, bgG, bgB, bgA] = hexToRgba(p.backgroundColor);
    const [aR, aG, aB, aA] = hexToRgba(p.colorA);
    const [bR, bG, bB, bA] = hexToRgba(p.colorB);
    const [cR, cG, cB, cA] = hexToRgba(p.colorC);
    const [tR, tG, tB, tA] = hexToRgba(p.tintColor);
    gl.uniform1f(u.zoom, p.zoom);
    gl.uniform1f(u.iter, p.iterations);
    gl.uniform1f(u.eps, Math.max(p.sampleGap, 1e-4));
    gl.uniform1f(u.tangent, p.tangentForce);
    gl.uniform1f(u.grad, p.gradientForce);
    gl.uniform1f(u.bright, p.brightness);
    gl.uniform1f(u.contrast, p.contrast);
    gl.uniform4f(u.bg, bgR, bgG, bgB, bgA);
    gl.uniform1f(u.alpha, p.opacity);
    gl.uniform1f(u.radial, p.radialMix);
    gl.uniform1f(u.beams, Math.round(p.beams));
    gl.uniform1f(u.stretch, p.radialStretch);
    gl.uniform1f(u.flow, p.radialFlow);
    gl.uniform1f(u.beamWidth, p.beamWidth);
    gl.uniform1f(u.twist, p.twist);
    gl.uniform1f(u.vortex, p.vortex);
    gl.uniform1f(u.hole, p.hole);
    gl.uniform2f(u.center, p.centerX, p.centerY);
    gl.uniform1f(u.vignette, p.vignette);
    gl.uniform1i(u.colorMode, p.colorMode === "stripes" ? 1 : 0);
    gl.uniform4f(u.colorA, aR, aG, aB, aA);
    gl.uniform4f(u.colorB, bR, bG, bB, bA);
    gl.uniform4f(u.colorC, cR, cG, cB, cA);
    gl.uniform4f(u.tint, tR, tG, tB, tA);
    gl.uniform1f(u.repetition, p.repetition);
    gl.uniform1f(u.softness, p.softness);
    gl.uniform1f(u.bandWidth, p.bandWidth);
    gl.uniform1f(u.shiftRed, p.shiftRed);
    gl.uniform1f(u.shiftBlue, p.shiftBlue);
    gl.uniform1f(u.spread, p.spread);
    gl.uniform1f(u.stripeRadial, p.stripeRadial);
    gl.uniform1f(u.threshold, p.threshold);
    gl.uniform1f(u.detailFade, p.detailFade);
    gl.uniform1f(u.fadeLeft, p.fadeLeft);
    gl.uniform1f(u.fadeRight, p.fadeRight);
    gl.uniform1f(u.fadeTop, p.fadeTop);
    gl.uniform1f(u.fadeBottom, p.fadeBottom);
  };
  writeParams();

  // Elapsed intrinsic time (speed-scaled). Stripe/spin phases integrate
  // their *rate* each frame rather than recomputing `time * flow`, so a
  // mid-scroll change to stripeFlow/radialSpin (the scroll keyframes vary
  // them continuously) never snaps the pattern.
  let elapsed = 0;
  const time = () => p.initialTime + elapsed;
  let lastTime = time();
  let stripePhase = lastTime * p.stripeFlow;
  let spinPhase = lastTime * p.radialSpin;

  const governor = createFrameGovernor({ fps: FPS });
  let hostH = 1;
  let winH = 1;
  let offset = -1;
  let dpr = 1;
  let viewportH = window.innerHeight;
  let viewportW = window.innerWidth;

  // uRes is the *whole host's* size in device pixels, so aspect, pixel-size
  // and fwidth() maths in the fragment shader match a full-size canvas.
  const writeWindow = () => {
    gl.useProgram(program);
    gl.uniform2f(u.uvScale, 1, winH / hostH);
    gl.uniform2f(u.uvOffset, 0, (hostH - offset - winH) / hostH);
    gl.uniform2f(u.res, canvas.width, (canvas.height * hostH) / winH);
  };

  /** Moves the canvas so it covers the viewport; true if it moved. */
  const place = (force = false): boolean => {
    const maxOffset = Math.max(0, hostH - winH);
    const top = -host.getBoundingClientRect().top;
    const visibleTop = Math.max(0, top);
    const visibleBottom = Math.min(hostH, top + viewportH);
    if (!force && visibleBottom <= visibleTop) return false;
    const guard = viewportH * WINDOW_GUARD;
    const lo = offset <= 0 ? 0 : offset + guard;
    const hi = offset >= maxOffset ? hostH : offset + winH - guard;
    if (!force && offset >= 0 && visibleTop >= lo && visibleBottom <= hi) return false;
    const centred = Math.min(Math.max(top - (winH - viewportH) / 2, 0), maxOffset);
    // Land on whole device pixels so the canvas isn't resampled.
    const next = Math.round(centred * dpr) / dpr;
    if (next === offset && !force) return false;
    offset = next;
    canvas.style.transform = `translate3d(0,${offset}px,0)`;
    writeWindow();
    return true;
  };

  const resize = () => {
    hostH = Math.max(1, host.clientHeight);
    winH = Math.min(hostH, Math.ceil(viewportH * (1 + 2 * WINDOW_MARGIN)));
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * governor.scale;
    const width = Math.max(1, Math.round(host.clientWidth * dpr));
    const height = Math.max(1, Math.round(winH * dpr));
    canvas.style.height = `${winH}px`;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    place(true);
    if (!running) draw(performance.now());
  };

  const onWindowResize = () => {
    // Mobile URL bars resize the viewport height while scrolling; only grow
    // the window for those (never reallocate mid-scroll to shrink it), and
    // start over when the width changes (rotation, desktop resize).
    const widthChanged = window.innerWidth !== viewportW;
    const nextH = widthChanged ? window.innerHeight : Math.max(viewportH, window.innerHeight);
    viewportW = window.innerWidth;
    if (nextH === viewportH && !widthChanged) return;
    viewportH = nextH;
    resize();
  };

  let scrollQueued = false;
  const onScrollFrame = (now: number) => {
    scrollQueued = false;
    if (!disposed && visible && place()) draw(now);
  };
  const onScroll = () => {
    if (scrollQueued || disposed || !visible) return;
    scrollQueued = true;
    requestAnimationFrame(onScrollFrame);
  };

  // rAF timestamp of the last draw: a scroll-driven re-centre and the
  // animation tick can land in the same frame, and only one needs to draw.
  let drawnAt = -1;
  const draw = (frameTime: number) => {
    if (frameTime === drawnAt) return;
    drawnAt = frameTime;
    gl.useProgram(program);
    const now = time();
    const dt = now - lastTime;
    lastTime = now;
    stripePhase += dt * p.stripeFlow;
    spinPhase += dt * p.radialSpin;
    gl.uniform1f(u.time, now);
    gl.uniform1f(u.stripePhase, stripePhase);
    gl.uniform1f(u.spinPhase, spinPhase);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!firedReady) {
      firedReady = true;
      onReady();
    }
  };

  let firedReady = false;
  let disposed = false;
  let running = false;
  let rafId = 0;
  let lastFrameTime = 0;
  let visible = true;

  const shouldRun = () => !disposed && visible && document.visibilityState === "visible" && animated && p.speed !== 0;

  const tick = (now: number) => {
    if (!shouldRun()) {
      running = false;
      return;
    }
    rafId = requestAnimationFrame(tick);
    if (!governor.shouldDraw(now)) return;
    // rAF timestamps can precede the performance.now() taken when resuming.
    const dt = Math.min(Math.max((now - lastFrameTime) / 1000, 0), 0.1);
    lastFrameTime = now;
    elapsed += dt * p.speed;
    place();
    draw(now);
    if (governor.record(now)) resize();
  };

  const setRunning = (next: boolean) => {
    if (running === next) return;
    running = next;
    if (next) {
      governor.reset();
      lastFrameTime = performance.now();
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
    }
  };

  const evaluate = () => setRunning(shouldRun());

  resize();
  evaluate();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("scroll", onScroll, { passive: true });

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible && place()) draw(performance.now());
    evaluate();
  });
  intersectionObserver.observe(host);

  const onVisibilityChange = () => evaluate();
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
      p = next;
      writeParams();
      if (!running) draw(performance.now());
      evaluate();
    },
    dispose() {
      disposed = true;
      setRunning(false);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      // See hero-liquid/renderer.ts: no explicit loseContext() so React's
      // dev-mode double effect invocation can safely reuse this canvas.
    },
  };
}
