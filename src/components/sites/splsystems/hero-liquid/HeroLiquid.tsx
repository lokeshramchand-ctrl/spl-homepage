"use client";

import { useEffect, useRef, useState } from "react";
import { BRANCHES, STROKE_WIDTH } from "./constants";
import { buildLiquidMask, createRasterizer, type LiquidMask } from "./mask";
import { createLiquidRenderer, type LiquidRenderer } from "./renderer";
import { HERO_LIQUID_EFFECT, type LiquidEffectParams } from "./shaders";

/** Flat-color fallback ribbons, generated from the same branch geometry the WebGL mask uses. */
function HeroLines({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const grays =
    tone === "light" ? ["#e8e8e8", "#b4b4b4", "#d6d6d6", "#ffffff"] : ["#202020", "#868383", "#383838", "#000000"];
  return (
    <svg
      className={className}
      viewBox="0 0 1440 810"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {BRANCHES.map((branch, i) => (
        <path
          key={i}
          d={`M${branch.start[0]} ${branch.start[1]} ${branch.curves
            .map(([c1x, c1y, c2x, c2y, ex, ey]) => `C${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`)
            .join(" ")}`}
          stroke={grays[i]}
          strokeWidth={STROKE_WIDTH}
        />
      ))}
    </svg>
  );
}

const maskCache = new Map<string, LiquidMask>();

function loadLiquidMask(width: number, shadeFloor: number): LiquidMask {
  const key = `${width}:${shadeFloor}`;
  const cached = maskCache.get(key);
  if (cached) return cached;
  const rasterize = createRasterizer((w, h) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("2d context unavailable");
    return ctx;
  });
  const mask = buildLiquidMask({ width, shadeFloor }, rasterize);
  maskCache.set(key, mask);
  return mask;
}

export interface HeroLiquidProps {
  intro?: boolean;
  shadeFloor?: number;
  /** Overrides applied on top of the hero's default shader tuning, so other sections can reuse the same proven effect with a distinct look. */
  params?: Partial<LiquidEffectParams>;
  /** Flips the ribbon composition horizontally for compositional variety between sections. */
  mirror?: boolean;
  /** Fallback stroke tone for prefers-reduced-motion / no-WebGL, matched to the section's background. */
  fallbackTone?: "dark" | "light";
  className?: string;
}

export function HeroLiquid({
  intro = true,
  shadeFloor = 0.35,
  params,
  mirror = false,
  fallbackTone = "dark",
  className = "",
}: HeroLiquidProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"loading" | "active" | "fallback">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // One-time feature detection on mount (reduced-motion / no canvas), not a
      // response to a prop/state change — the synchronous setState here is the
      // progressive-enhancement fallback, mirroring the source site's behavior.
      setStatus("fallback");
      return;
    }
    let cancelled = false;
    let renderer: LiquidRenderer | null = null;

    const width = Math.max(window.innerWidth, window.innerHeight * 1.25) >= 1024 ? 2048 : 1024;
    try {
      const mask = loadLiquidMask(width, shadeFloor);
      if (cancelled) return;
      renderer = createLiquidRenderer(canvas, mask, {
        intro,
        params: params ? { ...HERO_LIQUID_EFFECT, ...params } : undefined,
        onActive: () => !cancelled && setStatus("active"),
        onError: () => !cancelled && setStatus("fallback"),
      });
    } catch {
      if (!cancelled) setStatus("fallback");
    }

    return () => {
      cancelled = true;
      renderer?.dispose();
    };
    // `params`/`mirror`/`fallbackTone` are a fixed per-instance tuning, not reactive
    // state — each section mounts its own HeroLiquid once and never changes the tuning.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, shadeFloor]);

  const linesHidden = status !== "fallback" && (intro || status === "active");

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <HeroLines
        tone={fallbackTone}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${linesHidden ? "opacity-0" : "opacity-20"}`}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        data-active={status === "active"}
        hidden={status === "fallback"}
      />
    </div>
  );
}
