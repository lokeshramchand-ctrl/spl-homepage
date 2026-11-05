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
 *
 * Tuned for speed over ceremony: the whole intro is ~1.6s (it was ~2.5s),
 * any click, tap, key or wheel skips straight to the dock, and it only
 * plays on the first visit to "/" per session (see the entry gate).
 */
const REVEAL_MS = 600;
const HOLD_MS = 350;
const DOCK_MS = 650;
const BG_FADE_MS = 350;
/** sessionStorage key the entry gate script in RootLayout checks. */
const INTRO_SEEN_KEY = "spl-intro";
const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

type Phase = "init" | "live" | "docking" | "done";

export function Splash() {
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  // Always start at "init" so hydration matches the server HTML, which
  // includes the overlay. When no intro is due (a repeat visit this session,
  // or a client-side return to Home) the entry gate never set `data-intro`,
  // so CSS hides that overlay from the very first paint (`.cc-splash` in
  // globals.css) and the effect below just finishes it off.
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-entry")) {
      const id = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(id);
    }
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage blocked (private mode, policy): the intro just replays.
    }
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
    const dockMs = reduced ? 0 : DOCK_MS;

    const timers: number[] = [];
    let docked = false;
    const removeSkipListeners = () =>
      SKIP_EVENTS.forEach((type) => window.removeEventListener(type, dock));
    function dock() {
      if (docked) return;
      docked = true;
      removeSkipListeners();
      timers.forEach(window.clearTimeout);
      root.removeAttribute("data-entry");
      root.removeAttribute("data-entry-skip");
      setPhase("docking");
      timers.push(
        window.setTimeout(() => {
          root.removeAttribute("data-intro");
          setPhase("done");
        }, dockMs),
      );
    }

    // Don't hold anyone hostage: the first interaction docks immediately,
    // including one made before hydration (recorded by the entry gate).
    const skippedEarly = root.hasAttribute("data-entry-skip");
    timers.push(
      window.setTimeout(() => setPhase("live"), start),
      window.setTimeout(dock, skippedEarly ? start : start + reveal + hold),
    );
    SKIP_EVENTS.forEach((type) =>
      window.addEventListener(type, dock, { passive: true }),
    );
    return () => {
      removeSkipListeners();
      timers.forEach(window.clearTimeout);
    };
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
      className="cc-splash pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#fbfbfb]"
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
          loading="eager"
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
