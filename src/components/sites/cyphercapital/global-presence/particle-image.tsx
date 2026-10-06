"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a photo as a black-on-white stipple (dot density follows local
 * darkness), matching the source site's grainy halftone treatment of its
 * location photos. Static once drawn — the source doesn't animate it either,
 * only redraws it when the element is resized.
 */
export function ParticleImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let frame = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(width * dpr);
      const h = Math.round(height * dpr);
      canvas.width = w;
      canvas.height = h;

      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        const off = document.createElement("canvas");
        off.width = w;
        off.height = h;
        const offCtx = off.getContext("2d");
        const ctx = canvas.getContext("2d");
        if (!offCtx || !ctx) return;

        const scale = Math.max(w / img.width, h / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        offCtx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        const { data } = offCtx.getImageData(0, 0, w, h);

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#181818";

        const step = Math.max(2, Math.round(dpr * 2));
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            const i = (y * w + x) * 4;
            const luminance = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
            const darkness = 1 - luminance;
            const probability = Math.min(1, darkness * 1.4 + 0.035);
            if (Math.random() < probability) {
              const size = step * (0.35 + darkness * 0.55) * (0.6 + Math.random() * 0.6);
              ctx.globalAlpha = 0.55 + darkness * 0.45;
              ctx.fillRect(x - size / 2, y - size / 2, size, size);
            }
          }
        }
        ctx.globalAlpha = 1;
      };
      img.src = src;
    };

    draw();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    ro.observe(canvas);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={`block h-full w-full ${className}`}
    />
  );
}
