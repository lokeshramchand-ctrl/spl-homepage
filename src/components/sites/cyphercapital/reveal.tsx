"use client";

import Link from "next/link";
import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Observes its own viewport entry and flags `data-in-view` once, which
 * flips `--cc-reveal-play` from paused to running for every `.cc-reveal`
 * descendant (see globals.css). Mirrors the source site's IntersectionObserver
 * group pattern.
 */
export function InView({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.setAttribute("data-in-view", "");
          observer.unobserve(node);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cc-reveal-group ${className}`}>
      {children}
    </div>
  );
}

/** Splits text into words, each wrapped for a per-word clip/rise entrance. */
export function RevealWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="cc-reveal cc-reveal-rise cc-reveal-fine"
            style={{ "--cc-stagger": i } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

/** Centered kicker row with a full-width rule beneath it (e.g. "Places", "Contacts"). */
export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-10 w-full items-center justify-center border-b border-[#181818]/30 px-4 py-3 ${className}`}
    >
      <span className="text-xs font-medium tracking-[-0.03em] text-[#181818]">
        {children}
      </span>
    </div>
  );
}

/** Fade-up block reveal; pass `stagger` to offset within a shared InView group. */
export function Reveal({
  children,
  as: Tag = "div",
  stagger = 0,
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
  stagger?: number;
  className?: string;
}) {
  return (
    <Tag
      className={`cc-reveal cc-reveal-fade-up ${className}`}
      style={{ "--cc-stagger": stagger } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Footer/nav link whose hover sweep inverts the text via mix-blend-mode. */
export function WipeLink({
  href,
  children,
  className = "",
  external,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`cc-wipe-link ${className}`}
    >
      {children}
      <span className="cc-wipe-link__sweep" aria-hidden="true" />
    </Link>
  );
}

/** Hero-style CTA whose fill sweeps in on hover and grows horizontally. */
export function WipeButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`cc-wipe-button ${className}`}>
      <span className="cc-wipe-button__content">{children}</span>
      <span className="cc-wipe-button__sweep" aria-hidden="true" />
    </a>
  );
}
