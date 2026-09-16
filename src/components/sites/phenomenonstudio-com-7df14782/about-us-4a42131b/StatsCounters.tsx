"use client";

import { useEffect, useRef, useState } from "react";
import { RevealWords, ScrambleText } from "../shared/reveal";

const STATS = [
  { value: 78, label: "team members on board" },
  { value: 601, label: "projects successfully delivered" },
  { value: 298, label: "satisfied clients" },
  { value: 46, label: "industry awards won" },
];

function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);
  return value;
}

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display = useCountUp(value, inView);

  return (
    <div ref={ref} className="border-t border-[#080d10]/8 pt-6 text-center sm:text-left">
      <div className="text-4xl font-medium tracking-tight text-[#080d10] sm:text-6xl">{display}</div>
      <p className="font-body mt-2 text-sm text-[#080d10]/60">{label}</p>
    </div>
  );
}

export function StatsCounters() {
  return (
    <section className="bg-white pt-16 pb-24 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Our product design agency in numbers" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="What we've gained together since 2019" />
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <Counter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#080d10]/8 pt-10 lg:grid-cols-2 lg:gap-16">
          <p className="max-w-xl text-lg text-[#080d10]/70">
            We started working with our first few startups on products they needed to bring to market quickly. Many
            of those early clients are still with us today, as we&apos;ve grown side by side and watched each other
            evolve.
          </p>
          <p className="max-w-xl text-lg text-[#080d10]/70">
            Step by step, these first projects turned into long-term collaborations, and today our portfolio spans
            hundreds of products for companies around the world.
          </p>
        </div>
      </div>
    </section>
  );
}
