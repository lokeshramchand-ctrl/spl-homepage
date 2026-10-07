"use client";

import { useEffect, useRef } from "react";
import { MetallicSwirl, type MetallicSwirlHandle } from "./MetallicSwirl";
import { SWIRL_BACKDROP_KEYFRAMES, hexToRgba, type MetallicSwirlParams } from "./shaders";

/**
 * Anchor section ids the keyframes below are positioned against: keyframe 0
 * sits at the `[data-swirl-band]` wrapper's top, keyframes 1-3 at each
 * anchor's vertical midpoint, keyframe 4 at the wrapper's bottom.
 */
const ANCHOR_IDS = ["capabilities", "proprietary-investments", "infrastructure"];
const SMOOTHING = 3;
const GEOMETRIC_KEYS = new Set<keyof MetallicSwirlParams>(["zoom", "repetition"]);

function isHexColor(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("#");
}

interface SplineTrack {
  values: number[];
  tangents: number[];
}

/** Fritsch-Carlson monotone cubic Hermite tangents (no overshoot between keyframes). */
function buildTangents(values: number[]): number[] {
  const n = values.length;
  const deltas = values.slice(0, -1).map((v, i) => values[i + 1] - v);
  const tangents = new Array(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    tangents[i] = deltas[i - 1] * deltas[i] <= 0 ? 0 : (deltas[i - 1] + deltas[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (deltas[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / deltas[i];
    const b = tangents[i + 1] / deltas[i];
    const mag = a * a + b * b;
    if (mag > 9) {
      const scale = 3 / Math.sqrt(mag);
      tangents[i] = scale * a * deltas[i];
      tangents[i + 1] = scale * b * deltas[i];
    }
  }
  return tangents;
}

function makeTrack(values: number[]): SplineTrack {
  return { values, tangents: buildTangents(values) };
}

function evalTrack({ values, tangents }: SplineTrack, pos: number): number {
  const last = values.length - 1;
  const clamped = Math.min(Math.max(pos, 0), last);
  const i = Math.min(Math.floor(clamped), last - 1);
  const t = clamped - i;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * values[i] +
    (t3 - 2 * t2 + t) * tangents[i] +
    (-2 * t3 + 3 * t2) * values[i + 1] +
    (t3 - t2) * tangents[i + 1]
  );
}

function toHex2(v: number): string {
  return Math.round(255 * Math.min(Math.max(v, 0), 1))
    .toString(16)
    .padStart(2, "0");
}

/** Builds a continuous-position interpolator across a set of preset keyframes. */
function buildKeyframeInterpolator(frames: MetallicSwirlParams[]): (pos: number) => MetallicSwirlParams {
  const numberTracks = new Map<keyof MetallicSwirlParams, { track: SplineTrack; geometric: boolean }>();
  const colorTracks = new Map<keyof MetallicSwirlParams, SplineTrack[]>();
  const stepKeys: (keyof MetallicSwirlParams)[] = [];

  for (const key of Object.keys(frames[0]) as (keyof MetallicSwirlParams)[]) {
    const values = frames.map((f) => f[key]);
    if (values.every((v) => typeof v === "number")) {
      const nums = values as number[];
      const geometric = GEOMETRIC_KEYS.has(key) && nums.every((v) => v > 0);
      numberTracks.set(key, { track: makeTrack(geometric ? nums.map(Math.log) : nums), geometric });
    } else if (values.every(isHexColor)) {
      const channels = (values as string[]).map(hexToRgba);
      colorTracks.set(
        key,
        [0, 1, 2, 3].map((c) => makeTrack(channels.map((rgba) => rgba[c]))),
      );
    } else {
      stepKeys.push(key);
    }
  }

  return (pos: number) => {
    const out = { ...frames[0] };
    for (const [key, { track, geometric }] of numberTracks) {
      const v = evalTrack(track, pos);
      (out as Record<string, unknown>)[key] = geometric ? Math.exp(v) : v;
    }
    for (const [key, channels] of colorTracks) {
      (out as Record<string, unknown>)[key] = `#${channels.map((c) => toHex2(evalTrack(c, pos))).join("")}`;
    }
    const nearest = frames[Math.min(Math.max(Math.round(pos), 0), frames.length - 1)];
    for (const key of stepKeys) (out as Record<string, unknown>)[key] = nearest[key];
    return out;
  };
}

/**
 * Single scroll-driven WebGL backdrop shared by Asset Management,
 * Proprietary Investments and Infrastructure. Mount once inside a
 * `position: relative` wrapper tagged `data-swirl-band` that contains those
 * three sections (see page.tsx) — the canvas fills that wrapper and the
 * params smoothly interpolate across the keyframes above as the wrapper
 * scrolls past the viewport center.
 */
export function SwirlBackdrop({ className = "" }: { className?: string }) {
  const handleRef = useRef<MetallicSwirlHandle | null>(null);

  useEffect(() => {
    const band = document.querySelector<HTMLElement>("[data-swirl-band]");
    const anchors = ANCHOR_IDS.map((id) => document.getElementById(id));
    if (!band || anchors.some((el) => !el)) return;

    const interpolate = buildKeyframeInterpolator(SWIRL_BACKDROP_KEYFRAMES);
    let positions: number[] = [0, 1, 2, 3, 4];
    let target = 0;
    let current = 0;
    let lastFrame = 0;
    let rafId = 0;

    const recomputePositions = () => {
      const scrollY = window.scrollY;
      const bandTop = band!.getBoundingClientRect().top + scrollY;
      positions = [
        bandTop,
        ...anchors.map((el) => {
          const rect = el!.getBoundingClientRect();
          return rect.top + scrollY + rect.height / 2;
        }),
        bandTop + band!.offsetHeight,
      ];
    };

    const indexFor = (y: number) => {
      const last = positions.length - 1;
      if (y <= positions[0]) return 0;
      if (y >= positions[last]) return last;
      let i = 0;
      while (i < last - 1 && y >= positions[i + 1]) i++;
      return i + (y - positions[i]) / (positions[i + 1] - positions[i]);
    };

    const step = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.1);
      lastFrame = now;
      const delta = target - current;
      current = Math.abs(delta) < 1e-4 ? target : current + delta * (1 - Math.exp(-dt * SMOOTHING));
      handleRef.current?.setParams(interpolate(current));
      rafId = current !== target ? requestAnimationFrame(step) : 0;
    };

    const ensureRunning = () => {
      if (!rafId && current !== target) {
        lastFrame = performance.now();
        rafId = requestAnimationFrame(step);
      }
    };

    const onScroll = () => {
      target = indexFor(window.scrollY + window.innerHeight / 2);
      ensureRunning();
    };

    const onLayoutChange = () => {
      recomputePositions();
      onScroll();
    };

    recomputePositions();
    target = indexFor(window.scrollY + window.innerHeight / 2);
    current = target;
    handleRef.current?.setParams(interpolate(current));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onLayoutChange);
    const resizeObserver = new ResizeObserver(onLayoutChange);
    resizeObserver.observe(band);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onLayoutChange);
      resizeObserver.disconnect();
    };
  }, []);

  return <MetallicSwirl ref={handleRef} params={SWIRL_BACKDROP_KEYFRAMES[0]} className={className} />;
}
