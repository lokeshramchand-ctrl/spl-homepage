/**
 * Geometry for the hero's 4 liquid "pipe" branches, read from the source
 * site's bundle (splsystems.com). Same bezier control points as the
 * static ribbon SVG, reused here to build the mask the WebGL shader flows
 * through.
 */
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
  {
    start: [-222.724, 504.473],
    curves: [
      [-222.724, 504.473, 304.862, 504.473, 749.059, 504.473],
      [1193.25, 504.473, 1176.74, 692.755, 1668, 692.755],
    ],
    gray: 32 / 255,
  },
  {
    start: [-222.724, 504.473],
    curves: [
      [-222.724, 504.473, 60.4716, 504.473, 504.668, 504.473],
      [948.864, 504.473, 1176.74, -52.4742, 1668, -52.4742],
    ],
    gray: 132 / 255,
  },
  {
    start: [-222.724, 504.473],
    curves: [
      [-222.724, 504.473, 304.862, 504.473, 749.059, 504.473],
      [1193.25, 504.473, 1176.74, 259.574, 1668, 259.574],
    ],
    gray: 56 / 255,
  },
  {
    start: [-223.057, 504.476],
    curves: [
      [-223.057, 504.476, -299.029, 504.476, 145.246, 504.476],
      [912.887, 504.476, 657.455, 924.491, 1668, 924.491],
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
