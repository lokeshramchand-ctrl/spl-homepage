"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Full-screen intro logo that docks down into the header logo, matching
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
  // The entry gate only flags a hard load of "/". On a client-side return to
  // Home (or after the intro already played) the attribute is absent, so skip
  // the splash instead of replaying it over a page that is already visible.
  // The server and a gated hard load both render "init", so hydration matches.
  const [phase, setPhase] = useState<Phase>(() =>
    typeof document !== "undefined" &&
    !document.documentElement.hasAttribute("data-entry")
      ? "done"
      : "init",
  );

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-entry")) return;
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
    const scale = Math.min(1, to.width / from.width);
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
        className="w-[min(56vw,14rem)]"
        style={{
          transitionProperty: "transform",
          transitionDuration: docking ? `${DOCK_MS}ms` : "0ms",
          transitionTimingFunction: "cubic-bezier(0.5,0,0,1)",
        }}
      >
        <Image
          src="/sites/splsystems/images/logo/spl-systems.svg"
          alt=""
          width={3000}
          height={350}
          unoptimized
          priority
          className="h-auto w-full"
          style={{
            transitionProperty: "opacity, translate, clip-path",
            transitionDuration: `${REVEAL_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0,0,0,1)",
            opacity: live ? 1 : 0,
            translate: live ? "0 0" : "0 1.5rem",
            clipPath: live ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          }}
        />
      </div>
    </div>
  );
}
