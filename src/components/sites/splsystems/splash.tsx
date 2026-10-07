"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./icons";

/**
 * Full-screen intro wordmark that docks down into the header logo, matching
 * the source homepage's entry sequence (observed via its own CSS custom
 * properties: --wordmark-reveal 0.8s, --dock-duration 800ms,
 * --bg-duration 400ms). RootLayout's beforeInteractive script sets
 * `data-entry` on <html> on first paint so the header logo and hero reveal
 * stay hidden/paused (see globals.css) until this component clears it.
 *
 * The dock motion is a measured FLIP: at the moment docking starts we read
 * the wordmark's and the header logo's real screen rects and animate a
 * translate+scale between them, rather than hard-coding a position.
 */
const REVEAL_MS = 800;
const HOLD_MS = 900;
const DOCK_MS = 800;
const BG_FADE_MS = 400;

type Phase = "init" | "live" | "docking" | "done";

export function Splash() {
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    // Reduced-motion users still get the handoff (header logo + hero reveal
    // released together) but collapsed to near-zero so nothing animates;
    // every step stays inside a timeout so this effect never calls setState
    // synchronously on mount.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const start = reduced ? 0 : 20;
    const reveal = reduced ? 0 : REVEAL_MS;
    const hold = reduced ? 0 : HOLD_MS;
    const dock = reduced ? 0 : DOCK_MS;

    const timers = [
      window.setTimeout(() => setPhase("live"), start),
      window.setTimeout(() => {
        document.documentElement.removeAttribute("data-entry");
        setPhase("docking");
      }, start + reveal + hold),
      window.setTimeout(() => setPhase("done"), start + reveal + hold + dock),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "docking") return;
    const wordmark = wordmarkRef.current;
    const target = document.querySelector<HTMLElement>("[data-header-logo]");
    if (!wordmark || !target) return;

    const from = wordmark.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const scale = Math.min(1, to.height / from.height);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    wordmark.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  }, [phase]);

  if (phase === "done") return null;

  const live = phase === "live" || phase === "docking";
  const docking = phase === "docking";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#fbfbfb]"
      style={{
        transitionProperty: "opacity",
        transitionDuration: `${BG_FADE_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0,0,.2,1)",
        transitionDelay: docking ? `${DOCK_MS - BG_FADE_MS}ms` : "0ms",
        opacity: docking ? 0 : 1,
      }}
    >
      <div
        ref={wordmarkRef}
        className="flex flex-col items-center gap-3 md:flex-row md:gap-8"
        style={{
          transitionProperty: "transform",
          transitionDuration: docking ? `${DOCK_MS}ms` : "0ms",
          transitionTimingFunction: "cubic-bezier(0.5,0,0,1)",
        }}
      >
        <span
          className="text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:text-[4rem]"
          style={{
            transitionProperty: "opacity, translate",
            transitionDuration: `${REVEAL_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0,0,0,1)",
            opacity: live ? 1 : 0,
            translate: live ? "0 0" : "min(6vw, 3rem) min(2rem, 8vh)",
          }}
        >
          SPL Systems
        </span>
        <LogoMark
          className="h-9 w-14 text-[#181818] md:h-14 md:w-24"
          style={{
            transitionProperty: "opacity",
            transitionDuration: `${REVEAL_MS}ms`,
            transitionDelay: "120ms",
            transitionTimingFunction: "cubic-bezier(0,0,0,1)",
            opacity: live ? 1 : 0,
          }}
        />
        <span
          className="text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:text-[4rem]"
          style={{
            transitionProperty: "opacity, translate",
            transitionDuration: `${REVEAL_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0,0,0,1)",
            opacity: live ? 1 : 0,
            translate: live ? "0 0" : "min(-6vw, -3rem) min(-2rem, -8vh)",
          }}
        >
          Capital
        </span>
      </div>
    </div>
  );
}
