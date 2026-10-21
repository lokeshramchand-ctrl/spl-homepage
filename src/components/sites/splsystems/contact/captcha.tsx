"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { CaptchaChallenge, CaptchaSolution } from "@/lib/contact/captcha-types";
import { sha256Hex } from "@/lib/contact/sha256";

type State = "idle" | "solving" | "verified" | "error";

export interface CaptchaHandle {
  /** Clears a used or stale solution so the visitor verifies again. */
  reset(): void;
}

/** Brute-forces the challenge in ~8ms slices so the page never stutters. */
async function solve(
  { salt, challenge, maxNumber }: CaptchaChallenge,
  onProgress: (fraction: number) => void,
  signal: AbortSignal,
): Promise<number | null> {
  let n = 0;
  while (n <= maxNumber) {
    if (signal.aborted) return null;
    const sliceEnd = performance.now() + 8;
    while (n <= maxNumber && performance.now() < sliceEnd) {
      // Check the clock every 256 hashes, not every one.
      for (const stop = Math.min(n + 256, maxNumber + 1); n < stop; n++) {
        if (sha256Hex(`${salt}${n}`) === challenge) return n;
      }
    }
    onProgress(n / maxNumber);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return null;
}

export const Captcha = forwardRef<CaptchaHandle, { onChange: (solution: CaptchaSolution | null) => void; invalid?: boolean }>(
  function Captcha({ onChange, invalid = false }, ref) {
    const [state, setState] = useState<State>("idle");
    const [progress, setProgress] = useState(0);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => () => abortRef.current?.abort(), []);

    const reset = useCallback(() => {
      abortRef.current?.abort();
      setState("idle");
      setProgress(0);
      onChange(null);
    }, [onChange]);

    useImperativeHandle(ref, () => ({ reset }), [reset]);

    const start = async () => {
      if (state === "solving" || state === "verified") return;
      const controller = new AbortController();
      abortRef.current = controller;
      setState("solving");
      setProgress(0);
      try {
        const res = await fetch("/api/contact/challenge", { cache: "no-store", signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        const challenge = (await res.json()) as CaptchaChallenge;
        const number = await solve(challenge, setProgress, controller.signal);
        if (controller.signal.aborted) return;
        if (number === null) throw new Error("unsolved");
        setProgress(1);
        setState("verified");
        onChange({ salt: challenge.salt, challenge: challenge.challenge, signature: challenge.signature, number });
      } catch {
        if (controller.signal.aborted) return;
        setState("error");
        onChange(null);
      }
    };

    const label =
      state === "solving" ? "Verifying…" : state === "verified" ? "Verified — you're human" : state === "error" ? "Couldn't verify. Try again" : "I'm not a robot";

    return (
      <div className="flex flex-col gap-1">
        <button
          type="button"
          role="checkbox"
          aria-checked={state === "verified"}
          aria-busy={state === "solving"}
          aria-invalid={invalid || undefined}
          aria-describedby="captcha-note"
          onClick={start}
          disabled={state === "solving"}
          className={`group relative flex w-full items-center gap-3 overflow-hidden border-b py-3 text-left text-[1rem] tracking-[-0.03em] text-[#181818] transition-colors ${
            invalid && state !== "verified" ? "border-[#db4550]" : "border-[#181818]/30 hover:border-[#181818]"
          } ${state === "verified" ? "cursor-default" : "cursor-pointer"}`}
        >
          <span
            aria-hidden="true"
            className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-300 ${
              state === "verified" ? "border-[#179e76] bg-[#179e76] text-white" : "border-[#181818]/40 group-hover:border-[#181818]"
            }`}
          >
            {state === "solving" ? (
              <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-[#181818]/25 border-t-[#181818]" />
            ) : state === "verified" ? (
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 6.5 4.8 9 10 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
          <span aria-live="polite" className={state === "error" ? "text-[#db4550]" : undefined}>
            {label}
          </span>
          <span className="ml-auto text-xs font-medium text-[#181818]/40">Spam check</span>
          {/* Thin progress rule along the field's own underline. */}
          <span
            aria-hidden="true"
            className="absolute bottom-[-1px] left-0 h-px bg-[#181818] transition-[width,opacity] duration-200"
            style={{ width: `${progress * 100}%`, opacity: state === "solving" ? 1 : 0 }}
          />
        </button>
        <p id="captcha-note" className="text-xs text-[#181818]/40">
          A quick privacy-friendly check that runs in your browser. No cookies, no tracking.
        </p>
      </div>
    );
  },
);
