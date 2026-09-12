"use client";

import { useEffect, useRef, useState, type ElementType, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

/** Splits text into words that slide up + fade in with a per-word stagger, matching the
 * site's scroll-triggered heading reveal (IntersectionObserver-driven, not click/hover). */
export function RevealWords({
  text,
  as: Tag = "span",
  className,
  staggerMs = 80,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  staggerMs?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.1em]">
          <span
            className="inline-block will-change-transform"
            style={{
              transform: inView ? "translateY(0)" : "translateY(110%)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * staggerMs}ms, opacity 0.6s ease ${
                i * staggerMs
              }ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

/** Uppercase eyebrow labels scramble from random characters into the real text on
 * scroll-into-view, matching the site's ".scramble" behavior. */
export function ScrambleText({
  text,
  as: Tag = "div",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const [display, setDisplay] = useState(text);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!inView || doneRef.current) return;
    doneRef.current = true;
    let frame = 0;
    const totalFrames = 14;
    const interval = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealCount) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, text]);

  return (
    <Tag ref={ref} className={className}>
      {display}
    </Tag>
  );
}

/** Generic fade + slide-up on scroll-into-view for non-heading elements (cards, media, rows). */
export function FadeUp({
  children,
  className,
  delayMs = 0,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        transform: inView ? "translateY(0)" : "translateY(24px)",
        opacity: inView ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, opacity 0.7s ease ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
