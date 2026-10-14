import type { ReactNode } from "react";

const RED = "#e5383b";
const BLUE = "#2563eb";
const GREEN = "#16a34a";

const S = 800;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const f = (n: number) => n.toFixed(1);

type Piece = { d: string; color: string; width?: number; dash?: string };

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function closed(pts: number[][]) {
  return pts.map(([x, y], i) => `${i ? "L" : "M"}${f(x)} ${f(y)}`).join("") + "Z";
}

// 01 — topographic contours: wobbling closed loops, red core to green edge.
function contours(): Piece[] {
  const palette = [RED, RED, BLUE, BLUE, GREEN, GREEN];
  return range(14).map((i) => {
    const base = 30 + i * 30;
    const pts = range(121).map((k) => {
      const t = (k / 120) * 360;
      const wob =
        1 +
        0.16 * Math.sin((t * Math.PI) / 180 * 3 + i * 0.35) +
        0.08 * Math.sin((t * Math.PI) / 180 * 5 - i * 0.5);
      return polar(330 + i * 6, 430 - i * 4, base * wob, t);
    });
    return { d: closed(pts), color: palette[Math.floor((i / 14) * palette.length)] };
  });
}

// 02 — circuit board: orthogonal traces with 45° bends and ring nodes.
function circuit(): Piece[] {
  const colors = [RED, BLUE, GREEN];
  const traces = range(9).map((i) => {
    const y = 90 + i * 80;
    const bend = 160 + ((i * 137) % 380);
    const drop = i % 2 === 0 ? 70 : -70;
    return {
      d: `M0 ${y}H${bend}l${Math.abs(drop)} ${drop}H${S}`,
      color: colors[i % 3],
      width: 3,
    };
  });
  const nodes = range(9).flatMap((i) => {
    const y = 90 + i * 80;
    const bend = 160 + ((i * 137) % 380);
    const drop = i % 2 === 0 ? 70 : -70;
    const x = bend + Math.abs(drop);
    const yy = y + drop;
    const c = colors[(i + 1) % 3];
    return [
      { d: `M${x - 10} ${yy}a10 10 0 1 0 20 0a10 10 0 1 0 -20 0`, color: c, width: 3 },
      { d: `M${bend - 7} ${y}a7 7 0 1 0 14 0a7 7 0 1 0 -14 0`, color: colors[(i + 2) % 3], width: 3 },
    ];
  });
  return [...traces, ...nodes];
}

// 03 — honeycomb: hexagons whose outlines cycle through the three colours.
function honeycomb(): Piece[] {
  const r = 62;
  const w = Math.sqrt(3) * r;
  const colors = [BLUE, GREEN, RED];
  const out: Piece[] = [];
  for (let row = -1; row < 11; row++) {
    for (let col = -1; col < 10; col++) {
      const cx = col * w + (row % 2 ? w / 2 : 0);
      const cy = row * r * 1.5;
      const pts = range(6).map((k) => polar(cx, cy, r - 5, 60 * k + 30));
      const idx = (col + 2 * row + 30) % 3;
      // Thin out the lattice so it reads as a pattern, not a wall.
      if ((col * 3 + row * 5 + 40) % 4 === 0) continue;
      out.push({ d: closed(pts), color: colors[idx], width: 3 });
    }
  }
  return out;
}

// 04 — spirograph: layered hypotrochoids, one colour per layer.
function spiro(): Piece[] {
  const layers = [
    { R: 300, r: 90, d: 160, color: RED },
    { R: 300, r: 140, d: 110, color: BLUE },
    { R: 300, r: 60, d: 200, color: GREEN },
  ];
  return layers.map(({ R, r, d, color }) => {
    const turns = r / gcd(R, r);
    const steps = 900;
    const pts = range(steps + 1).map((k) => {
      const t = (k / steps) * Math.PI * 2 * turns;
      return [
        400 + (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t),
        400 + (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t),
      ];
    });
    return { d: pts.map(([x, y], i) => `${i ? "L" : "M"}${f(x)} ${f(y)}`).join(""), color, width: 2.5 };
  });
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// 05 — interference: two sets of ripples from opposite corners overlap.
function ripples(): Piece[] {
  const a = range(16).map((i) => ({
    d: `M${f(S * 0.12 + 0)} ${f(S * 0.15)}m${-(30 + i * 42)} 0a${30 + i * 42} ${30 + i * 42} 0 1 0 ${2 * (30 + i * 42)} 0a${30 + i * 42} ${30 + i * 42} 0 1 0 ${-2 * (30 + i * 42)} 0`,
    color: BLUE,
    width: 2.5,
  }));
  const b = range(16).map((i) => ({
    d: `M${f(S * 0.88)} ${f(S * 0.85)}m${-(30 + i * 42)} 0a${30 + i * 42} ${30 + i * 42} 0 1 0 ${2 * (30 + i * 42)} 0a${30 + i * 42} ${30 + i * 42} 0 1 0 ${-2 * (30 + i * 42)} 0`,
    color: i % 3 === 0 ? RED : GREEN,
    width: 2.5,
  }));
  return [...a, ...b];
}

const BUILDERS = [contours, circuit, honeycomb, spiro, ripples];

export function ProjectArt({ variant, className }: { variant: number; className?: string }): ReactNode {
  const pieces = BUILDERS[variant % BUILDERS.length]();

  return (
    <svg
      viewBox={`0 0 ${S} ${S}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {pieces.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={p.color}
          strokeWidth={p.width ?? 2.5}
          strokeDasharray={p.dash}
          strokeOpacity={0.85}
        />
      ))}
    </svg>
  );
}
