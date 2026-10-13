export interface Branch {
  start: [number, number];
  /** Each curve is a cubic bezier: [c1x, c1y, c2x, c2y, ex, ey]. */
  curves: [number, number, number, number, number, number][];
  gray: number;
}

export const VIEWBOX_WIDTH = 1440;
export const VIEWBOX_HEIGHT = 810;
export const STROKE_WIDTH = 15;
export const OVERFLOW_SCALE = 1.25;
export const CROP_ASPECT = 1;

/** Padded region (in viewBox units) the mask texture covers. */
export const REGION = { x: -90, y: -90, width: 1620, height: 1192.5 };

/** Shader/renderer slot count for ribbons; BRANCHES.length must not exceed it. */
export const MAX_BRANCHES = 8;

// Six slim lines flowing as one neat bundle: they share a single wave and
// fan out gently, each offset from the next so they never cross.
const LINE_COUNT = 6;

/** Base wave: [x, y, spread] per control point; spread scales the line offset. */
const WAVE: [number, number, number][] = [
  [-260, 600, 26],
  [180, 610, 30],
  [420, 250, 38],
  [720, 340, 40],
  [1040, 430, 46],
  [1260, 190, 52],
  [1740, 250, 58],
];

export const BRANCHES: Branch[] = Array.from({ length: LINE_COUNT }, (_, i) => {
  const o = i - (LINE_COUNT - 1) / 2;
  const p = WAVE.map(([x, y, k]): [number, number] => [x, y + o * k]);
  return {
    start: p[0],
    curves: [
      [...p[1], ...p[2], ...p[3]],
      [...p[4], ...p[5], ...p[6]],
    ],
    gray: 0.15 + 0.07 * i,
  };
});

const MAX_GRAY = Math.max(...BRANCHES.map((b) => b.gray));

/** Maps a branch's flat gray value to a shaded tone above `shadeFloor`. */
export function branchTone(gray: number, shadeFloor: number): number {
  return shadeFloor + (gray / MAX_GRAY) * (MAX_GRAY - shadeFloor);
}

/** Flattens a branch's beziers into a polyline with cumulative arc length. */
export function flattenBranch(branch: Branch): {
  points: Float64Array;
  cumulative: Float64Array;
  total: number;
} {
  const out: number[] = [branch.start[0], branch.start[1]];
  let [sx, sy] = branch.start;
  for (const [c1x, c1y, c2x, c2y, ex, ey] of branch.curves) {
    for (let step = 1; step <= 48; step++) {
      const t = step / 48;
      const inv = 1 - t;
      const a = inv * inv * inv;
      const b = 3 * inv * inv * t;
      const c = 3 * inv * t * t;
      const d = t * t * t;
      out.push(a * sx + b * c1x + c * c2x + d * ex, a * sy + b * c1y + c * c2y + d * ey);
    }
    sx = ex;
    sy = ey;
  }
  const points = Float64Array.from(out);
  const count = points.length / 2;
  const cumulative = new Float64Array(count);
  for (let i = 1; i < count; i++) {
    const dx = points[2 * i] - points[2 * i - 2];
    const dy = points[2 * i + 1] - points[2 * i - 1];
    cumulative[i] = cumulative[i - 1] + Math.hypot(dx, dy);
  }
  return { points, cumulative, total: cumulative[count - 1] };
}

/** Builds a Path2D for stroking a branch at canvas resolution. */
export function buildBranchPath(branch: Branch): Path2D {
  const path = new Path2D();
  path.moveTo(branch.start[0], branch.start[1]);
  for (const [c1x, c1y, c2x, c2y, ex, ey] of branch.curves) {
    path.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey);
  }
  return path;
}