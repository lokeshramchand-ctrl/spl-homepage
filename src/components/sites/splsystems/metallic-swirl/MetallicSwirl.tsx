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

/**
 * Canvas wrapper for the shared "metallic swirl" scroll backdrop shader. The
 * wrapper fills the band; the canvas inside it only spans the stretch near
 * the viewport and is slid along by the renderer (see renderer.ts).
 */
export const MetallicSwirl = forwardRef<MetallicSwirlHandle, MetallicSwirlProps>(function MetallicSwirl(
  { params = METALLIC_SWIRL_DEFAULTS, className = "" },
  ref,
) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<MetallicSwirlRenderer | null>(null);
  const latestParams = useRef(params);

  useImperativeHandle(ref, () => ({
    setParams(next) {
      latestParams.current = next;
      rendererRef.current?.setParams(next);
    },
  }), []);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    const create = () => {
      createMetallicSwirlRenderer(canvas, host, {
        params: latestParams.current,
        animated: true,
        onReady: () => {},
        onError: () => {},
      }).then(
        (renderer) => {
          if (disposed) {
            renderer.dispose();
            return;
          }
          // Scroll may have moved the keyframes on while the shader compiled.
          renderer.setParams(latestParams.current);
          rendererRef.current = renderer;
        },
        () => {
          // Left blank: no WebGL2 support. The section's own background stands in.
        },
      );
    };

    // These canvases sit far below the fold: don't spend a WebGL context and
    // a shader compile on them until the reader is about to scroll to them.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        create();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(host);

    return () => {
      disposed = true;
      observer.disconnect();
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute left-0 top-0 block h-full w-full will-change-transform" />
    </div>
  );
});
