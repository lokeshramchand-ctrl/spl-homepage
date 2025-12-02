"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const counterRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current || !preloaderRef.current) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: 100,
      duration: 2.5,
      ease: "power3.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.floor(obj.value)}%`;
        }
      },
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          pointerEvents: "none",
          onComplete: () => preloaderRef.current?.remove(),
        });
      },
    });
  }, []);

  return (
    <div
      ref={preloaderRef}
      id="preloader"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        ref={counterRef}
        className="preloader-number"
        style={{
          fontSize: "clamp(2rem, 10vw, 6rem)",
          fontFamily: "Instrument Serif, serif",
          color: "white",
        }}
      >
        0%
      </div>
    </div>
  );
}
