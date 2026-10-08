"use client";

import { useEffect, useRef, useState } from "react";

// Port of the source's per-word title shader. One shared WebGL2 canvas paints
// every visible word; each word's glyph mask is composited from it (source-in).
// Shader, params and compositing are the source's; entry-overlay sequencing and
// async program compile are dropped.

const VERT = `#version 300 es
precision highp float;
void main() {
  vec2 pos = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(pos * 2. - 1., 0., 1.);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_origin;
uniform float u_dpr;
uniform float u_unit;
uniform float u_time;
uniform float u_repetition;
uniform float u_warp;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_softness;
uniform float u_seed;
uniform vec3 u_text;
uniform vec3 u_lit;
uniform float u_chroma;

out vec4 fragColor;

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float v = 0.;
  float a = .55;
  for (int i = 0; i < 3; i++) {
    v += a * snoise(p);
    p = p * 2.1 + vec3(3.7, 1.9, 5.3);
    a *= .45;
  }
  return v;
}

float glow(float s, float blur) {
  float rise = smoothstep(0., .1 + blur, s);
  float fall = 1. - smoothstep(.1, .55 + .3 * u_softness, s);
  return pow(rise * fall, 1.6);
}

float glint(float s, float blur) {
  return 1. - smoothstep(.015, .03 + blur, abs(s - .05));
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y) / u_dpr + u_origin;
  vec2 p = px / u_unit + vec2(13.7, 7.3) * u_seed;
  float t = u_time + 100. * u_seed;

  vec2 drift = vec2(-.1 * t, 0.);
  vec2 q = vec2(
    fbm(vec3(p * .7 + .5 * drift, .12 * t)),
    fbm(vec3(p * .7 + vec2(4.1, 2.3) + .9 * drift, .12 * t + 7.))
  );
  float f = fbm(vec3(p * .9 + 1.4 * q + drift, .09 * t));
  float phase = u_repetition * (p.x + .3 * p.y) + u_warp * f - .14 * t;

  float blur = .5 * fwidth(phase) + .02 * u_softness;
  vec3 s = fract(vec3(phase - u_shiftRed, phase - .35 * u_shiftRed, phase + u_shiftBlue));

  vec3 body = vec3(glow(s.r, blur), glow(s.g, blur), glow(s.b, blur));
  vec3 line = vec3(glint(s.r, blur), glint(s.g, blur), glint(s.b, blur));

  float amp = smoothstep(-.15, .55, fbm(vec3(p * .5 + 2. * q + .4 * drift, .07 * t)));
  vec3 sheen = min(body * .95 + line * .5, 1.) * amp;
  float w = max(sheen.r, max(sheen.g, sheen.b));
  vec3 hue = sheen / max(w, 1e-4);
  vec3 lit = u_lit * mix(vec3(1.), hue, u_chroma);

  float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - .5;
  vec3 color = clamp(mix(u_text, lit, w) + dither / 255., 0., 1.);
  fragColor = vec4(color, 1.);
}
`;

const P = {
  unit: 5, speed: 0.75, repetition: 1, warp: 0.1, shiftRed: 0.045, shiftBlue: 0.04, softness: 1, seed: 204,
  onLight: { lit: [0.93, 0.96, 1], chroma: 1 },
  onDark: { lit: [0.82, 0.86, 0.95], chroma: 0.5 },
};
const UNIFORMS = ["resolution", "origin", "dpr", "unit", "time", "repetition", "warp", "shiftRed", "shiftBlue", "softness", "seed", "text", "lit", "chroma"] as const;

interface Word {
  root: HTMLElement;
  probe: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  glyphs: HTMLCanvasElement;
  text: string;
  w: number;
  h: number;
  dpr: number;
  origin: [number, number];
  unit: number;
  pad: number;
  visible: boolean;
  live: boolean;
  onLive: () => void;
}

interface Gl {
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  u: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
}

const words = new Set<Word>();
let shared: Gl | null | undefined;
let raf = 0;
let t0 = 0;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader compile failed");
  return s;
}

function getGl(): Gl | null {
  if (shared !== undefined) return shared;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) throw new Error("webgl2 unavailable");
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link failed");
    gl.useProgram(prog);
    const u = Object.fromEntries(UNIFORMS.map((n) => [n, gl.getUniformLocation(prog, `u_${n}`)])) as Gl["u"];
    for (const n of ["repetition", "warp", "shiftRed", "shiftBlue", "softness", "seed"] as const) gl.uniform1f(u[n], P[n]);
    shared = { gl, canvas, u };
    window.addEventListener("resize", relayoutAll);
    document.fonts.ready.then(relayoutAll);
  } catch {
    shared = null;
  }
  return shared;
}

function pageOffset(el: HTMLElement | null): [number, number] {
  let x = 0;
  let y = 0;
  for (let n = el; n; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return [x, y];
}

function layout(w: Word) {
  const cs = getComputedStyle(w.root);
  const fs = parseFloat(cs.fontSize);
  const pad = Math.ceil(0.3 * fs);
  if (pad !== w.pad) {
    w.pad = pad;
    w.root.style.setProperty("--sheen-pad", `${pad}px`);
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w.w = Math.round(w.canvas.offsetWidth * dpr);
  w.h = Math.round(w.canvas.offsetHeight * dpr);
  w.dpr = dpr;
  const heading = w.root.closest("h1, h2, h3") as HTMLElement | null;
  const [cx, cy] = pageOffset(w.canvas);
  const [hx, hy] = heading ? pageOffset(heading) : [0, 0];
  w.origin = [cx - hx, cy - hy];
  w.unit = fs * P.unit;
  w.canvas.width = w.w;
  w.canvas.height = w.h;
  w.glyphs.width = w.w;
  w.glyphs.height = w.h;
  const g = w.glyphs.getContext("2d");
  if (!g || !w.w || !w.h) return;
  g.scale(dpr, dpr);
  g.font = `${cs.fontStyle} ${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
  g.fontKerning = cs.fontKerning as CanvasFontKerning;
  g.textBaseline = "alphabetic";
  g.fillStyle = "#fff";
  const ls = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing);
  if (ls) g.letterSpacing = `${ls}px`;
  g.fillText(w.text, pad, pad + w.probe.offsetTop);
}

function relayoutAll() {
  for (const w of words) layout(w);
  schedule();
}

function frame(now: number) {
  raf = 0;
  const s = getGl();
  if (!s || document.hidden) return;
  const { gl, canvas, u } = s;
  let mw = 0;
  let mh = 0;
  for (const w of words) if (w.visible) [mw, mh] = [Math.max(mw, w.w), Math.max(mh, w.h)];
  if (!mw || !mh) return;
  if (canvas.width < mw || canvas.height < mh) {
    canvas.width = Math.max(canvas.width, mw);
    canvas.height = Math.max(canvas.height, mh);
  }
  if (!t0) t0 = now;
  gl.uniform1f(u.time, ((now - t0) / 1000) * P.speed);
  for (const w of words) {
    if (!w.visible || !w.w || !w.h) continue;
    gl.viewport(0, 0, w.w, w.h);
    gl.uniform2f(u.resolution, w.w, w.h);
    gl.uniform2f(u.origin, w.origin[0], w.origin[1]);
    gl.uniform1f(u.dpr, w.dpr);
    gl.uniform1f(u.unit, w.unit);
    const [r, g, b] = (getComputedStyle(w.root).color.match(/[\d.]+/g) ?? ["0", "0", "0"]).map((n) => Number(n) / 255);
    const mode = r + g + b > 1.5 ? P.onDark : P.onLight;
    gl.uniform3f(u.text, r, g, b);
    gl.uniform3f(u.lit, mode.lit[0], mode.lit[1], mode.lit[2]);
    gl.uniform1f(u.chroma, mode.chroma);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const c = w.ctx;
    c.globalCompositeOperation = "source-over";
    c.clearRect(0, 0, w.w, w.h);
    c.drawImage(w.glyphs, 0, 0);
    c.globalCompositeOperation = "source-in";
    c.drawImage(canvas, 0, canvas.height - w.h, w.w, w.h, 0, 0, w.w, w.h);
    if (!w.live) {
      w.live = true;
      w.onLive();
    }
  }
  schedule();
}

function schedule() {
  if (!raf && !document.hidden && [...words].some((w) => w.visible)) raf = requestAnimationFrame(frame);
}

function Word({ word }: { word: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const r = root.current;
    const p = probe.current;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!r || !p || !c || !ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !getGl()) return;
    const w: Word = {
      root: r, probe: p, canvas: c, ctx, glyphs: document.createElement("canvas"), text: word,
      w: 0, h: 0, dpr: 1, origin: [0, 0], unit: 1, pad: -1, visible: false, live: false, onLive: () => setLive(true),
    };
    words.add(w);
    const ro = new ResizeObserver(relayoutAll);
    ro.observe(r);
    const io = new IntersectionObserver((e) => {
      w.visible = e[e.length - 1]?.isIntersecting ?? false;
      schedule();
    });
    io.observe(c);
    layout(w);
    return () => {
      words.delete(w);
      ro.disconnect();
      io.disconnect();
    };
  }, [word]);

  return (
    <span ref={root} className="cc-sheen-canvas-word" data-live={live || undefined}>
      <span ref={probe} aria-hidden="true" className="inline-block h-0 w-0" />
      <canvas ref={canvas} aria-hidden="true" />
    </span>
  );
}

/** Canvas layer for one title word; sits over the (transparent) text span. */
export function SheenCanvas({ word }: { word: string }) {
  return <Word word={word} />;
}
