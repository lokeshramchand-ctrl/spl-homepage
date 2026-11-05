"use client";

import { useEffect, useRef } from "react";

// One decode per photo, shared by every mount and every redraw.
const images = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string): Promise<HTMLImageElement> {
  let pending = images.get(src);
  if (!pending) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    pending = img.decode().then(() => img);
    pending.catch(() => images.delete(src));
    images.set(src, pending);
  }
  return pending;
}

const idle = (fn: () => void): (() => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 300);
  return () => window.clearTimeout(id);
};

/**
 * Renders a photo as a black-on-white stipple (dot density follows local
 * darkness), matching the source site's grainy halftone treatment of its
 * location photos. Static once drawn — the source doesn't animate it either,
 * only redraws it when the element is resized.
 *
 * The photo is read back at the stipple grid's resolution (one pixel per
 * dot cell) rather than the canvas's, so the readback is ~16x smaller, and
 * nothing is fetched or drawn until the canvas nears the viewport. Inactive
 * images (`eager={false}`) wait for an idle moment after that.
 */
export function ParticleImage({
  src,
  alt,
  className = "",
  eager = true,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let near = false;
    let drawnSize = "";
    let cancelIdle: (() => void) | null = null;

    const draw = async () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(width * dpr);
      const h = Math.round(height * dpr);
      const size = `${w}x${h}`;
      if (size === drawnSize) return;

      let img: HTMLImageElement;
      try {
        img = await loadImage(src);
      } catch {
        return;
      }
      if (cancelled) return;
      drawnSize = size;

      const step = Math.max(2, Math.round(dpr * 2));
      const cols = Math.ceil(w / step);
      const rows = Math.ceil(h / step);
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      const ctx = canvas.getContext("2d");
      if (!sampleCtx || !ctx) return;

      // Cover-fit the photo onto the dot grid.
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      sampleCtx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const { data } = sampleCtx.getImageData(0, 0, cols, rows);

      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#181818";
      for (let row = 0; row < rows; row++) {
        const y = row * step;
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 4;
          const luminance = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          const darkness = 1 - luminance;
          const probability = Math.min(1, darkness * 1.4 + 0.035);
          if (Math.random() < probability) {
            const x = col * step;
            const dot = step * (0.35 + darkness * 0.55) * (0.6 + Math.random() * 0.6);
            ctx.globalAlpha = 0.55 + darkness * 0.45;
            ctx.fillRect(x - dot / 2, y - dot / 2, dot, dot);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const request = () => {
      if (!near) return;
      cancelIdle?.();
      if (eager) {
        cancelIdle = null;
        void draw();
      } else {
        cancelIdle = idle(() => void draw());
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        near = true;
        io.disconnect();
        request();
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(canvas);

    // Fires once on observe too; `drawnSize` makes repeat sizes a no-op.
    const ro = new ResizeObserver(request);
    ro.observe(canvas);

    return () => {
      cancelled = true;
      cancelIdle?.();
      io.disconnect();
      ro.disconnect();
    };
  }, [src, eager]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={`block h-full w-full ${className}`}
    />
  );
}
