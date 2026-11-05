"use client";

import { useEffect, useRef, useState } from "react";

const RESET_MS = 1800;

/** Small "Copy" control with a copied-state confirmation (icon swap + label). */
export function CopyButton({ value, what }: { value: string; what: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard blocked (permissions, insecure context): the link beside
      // this button still works, so fail quietly.
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), RESET_MS);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${what}`}
        data-copied={copied || undefined}
        className="cc-press inline-flex w-fit items-center gap-1.5 rounded-full border border-[#181818]/15 px-2.5 py-1 text-xs font-medium tracking-[-0.02em] text-[#181818]/60 hover:border-[#181818]/40 hover:text-[#181818] data-[copied]:border-[#179e76]/40 data-[copied]:text-[#179e76]"
      >
        <span aria-hidden="true" className="relative h-3 w-3">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={`absolute inset-0 transition-[opacity,scale] duration-300 ${copied ? "scale-50 opacity-0" : "opacity-100"}`}
          >
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
            <path d="M8.5 3.5V2.7A1.2 1.2 0 0 0 7.3 1.5H2.7A1.2 1.2 0 0 0 1.5 2.7v4.6a1.2 1.2 0 0 0 1.2 1.2h.8" />
          </svg>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className={`absolute inset-0 transition-[opacity,scale] duration-300 ${copied ? "opacity-100" : "scale-50 opacity-0"}`}
          >
            <path d="M2 6.5 4.8 9 10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${what} copied` : ""}
      </span>
    </>
  );
}
