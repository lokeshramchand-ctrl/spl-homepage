/**
 * Frame pacing and adaptive resolution for the decorative WebGL effects.
 *
 * - Caps the draw rate (`fps`): slow-moving backdrops look identical at 30fps
 *   and a 120Hz display would otherwise shade every pixel 120 times a second.
 * - Watches the real draw-to-draw gap once warmed up; if a device sustains
 *   well under the target rate (a weak GPU, a huge high-DPI screen), it steps
 *   the resolution `scale` down so the page stays responsive. It only ever
 *   steps down: flapping between sizes would cost more than it saves.
 */
export interface FrameGovernor {
  /** True when enough time has passed since the last drawn frame. */
  shouldDraw(now: number): boolean;
  /** Records a drawn frame; returns true when `scale` was just lowered. */
  record(now: number): boolean;
  /** Multiplier (0 < scale <= 1) for the renderer's device-pixel ratio. */
  readonly scale: number;
  /** Call when drawing resumes after a pause so the gap isn't counted as slow. */
  reset(): void;
}

const WINDOW = 30;
const WARMUP_MS = 1500;
const SLOW_FACTOR = 1.6;
const STEP = 0.8;

export function createFrameGovernor({ fps, minScale = 0.6 }: { fps: number; minScale?: number }): FrameGovernor {
  const interval = 1000 / fps;
  // rAF timestamps jitter by a few ms; without slack a 30fps cap on a 60Hz
  // display would sometimes skip two vsyncs instead of one.
  const slack = Math.min(4, interval * 0.25);
  let scale = 1;
  let lastDraw = 0;
  let warmUntil = 0;
  let sum = 0;
  let count = 0;

  return {
    get scale() {
      return scale;
    },
    shouldDraw(now) {
      return !lastDraw || now - lastDraw >= interval - slack;
    },
    record(now) {
      const gap = lastDraw ? now - lastDraw : 0;
      lastDraw = now;
      if (!warmUntil) warmUntil = now + WARMUP_MS;
      if (!gap || now < warmUntil || scale <= minScale) return false;
      sum += gap;
      count += 1;
      if (count < WINDOW) return false;
      const slow = sum / count > interval * SLOW_FACTOR;
      sum = 0;
      count = 0;
      if (!slow) return false;
      scale = Math.max(minScale, scale * STEP);
      return true;
    },
    reset() {
      lastDraw = 0;
      sum = 0;
      count = 0;
    },
  };
}
