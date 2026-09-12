"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ArrowRightIcon } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images";

export function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative aspect-[16/8] w-full cursor-ew-resize touch-none overflow-hidden rounded-2xl select-none"
        >
          <Image
            src={`${ASSET}/comparison-before.png.webp`}
            alt="Before redesign"
            fill
            sizes="100vw"
            className="object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
            <Image
              src={`${ASSET}/comparison-after.png.webp`}
              alt="After redesign"
              fill
              sizes="100vw"
              className="object-cover"
              draggable={false}
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pct}%` }}>
            <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-white shadow-lg">
              <ArrowRightIcon className="size-3 rotate-[135deg] text-[#080d10]" />
              <ArrowRightIcon className="size-3 -rotate-45 text-[#080d10]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
