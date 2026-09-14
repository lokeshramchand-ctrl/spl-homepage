"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Sticky row that cross-fades its content based on scroll progress through its own
 * track height, matching the career page's continuous scroll-driven opacity fade
 * (not an IntersectionObserver toggle — recalculated on every scroll tick). */
export function StickyFadeRow({ children, className }: { children: ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height;
      const viewportH = window.innerHeight;
      const enterDistance = viewportH * 0.5;
      const progressIn = Math.min(1, Math.max(0, (enterDistance - rect.top) / enterDistance));
      const exitStart = trackHeight - viewportH;
      const progressOut = trackHeight > viewportH ? Math.min(1, Math.max(0, (-rect.top - exitStart) / viewportH)) : 0;
      setOpacity(Math.max(0, progressIn - progressOut));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={trackRef} className="sticky top-0">
      <div className={className} style={{ opacity }}>
        {children}
      </div>
    </div>
  );
}
