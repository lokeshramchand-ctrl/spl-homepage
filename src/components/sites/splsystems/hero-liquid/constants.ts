export interface Branch {
  start: [number, number];
  /** Each curve is a cubic bezier: [c1x, c1y, c2x, c2y, ex, ey]. */
  curves: [number, number, number, number, number, number][];
  gray: number;
}

export const VIEWBOX_WIDTH = 1440;
export const VIEWBOX_HEIGHT = 810;
export const STROKE_WIDTH = 151.074;
export const OVERFLOW_SCALE = 1.25;
export const CROP_ASPECT = 1;

/** Padded region (in viewBox units) the mask texture covers. */
export const REGION = { x: -90, y: -90, width: 1620, height: 1192.5 };

export const BRANCHES: Branch[] = [
  // Branch 1: Starts top-left, curves sharply down to the center, sweeps back up
  {
    start: [-200, 50],
    curves: [
      [100, 50, 300, 750, 720, 405],
      [1140, 50, 1400, 750, 1700, 200],
    ],
    gray: 32 / 255,
  },
  // Branch 2: Starts bottom-left, curves sharply up to the center, sweeps back down
  {
    start: [-200, 760],
    curves: [
      [100, 760, 300, 50, 720, 405],
      [1140, 760, 1400, 50, 1700, 610],
    ],
    gray: 132 / 255,
  },
  // Branch 3: Starts mid-top, crosses the center in a tighter loop
  {
    start: [-200, 250],
    curves: [
      [100, 250, 400, 800, 720, 405],
      [1000, 0, 1400, 600, 1700, 100],
    ],
    gray: 56 / 255,
  },
  // Branch 4: Starts mid-bottom, mirrors Branch 3's tight loop
  {
    start: [-200, 560],
    curves: [
      [100, 560, 400, 0, 720, 405],
      [1000, 800, 1400, 200, 1700, 710],
    ],
    gray: 0,
  },
];

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