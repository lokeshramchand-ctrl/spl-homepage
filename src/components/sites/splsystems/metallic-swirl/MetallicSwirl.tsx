"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createMetallicSwirlRenderer, type MetallicSwirlRenderer } from "./renderer";
import { METALLIC_SWIRL_DEFAULTS, type MetallicSwirlParams } from "./shaders";

export interface MetallicSwirlHandle {
  setParams(next: MetallicSwirlParams): void;
}

export interface MetallicSwirlProps {
  params?: MetallicSwirlParams;
  className?: string;
}

/** Canvas wrapper for the shared "metallic swirl" scroll backdrop shader. */
export const MetallicSwirl = forwardRef<MetallicSwirlHandle, MetallicSwirlProps>(function MetallicSwirl(
  { params = METALLIC_SWIRL_DEFAULTS, className = "" },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<MetallicSwirlRenderer | null>(null);
  const initialParams = useRef(params);

  useImperativeHandle(ref, () => ({
    setParams(next) {
      rendererRef.current?.setParams(next);
    },
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let renderer: MetallicSwirlRenderer | null = null;
    try {
      renderer = createMetallicSwirlRenderer(canvas, {
        params: initialParams.current,
        animated: true,
        onReady: () => {},
        onError: () => {},
      });
      rendererRef.current = renderer;
    } catch {
      // Left blank: no WebGL2 support. The section's own background stands in.
    }
    return () => {
      cancelled = true;
      void cancelled;
      rendererRef.current = null;
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
});
