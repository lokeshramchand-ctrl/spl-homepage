"use client";

import { useEffect, useRef, useState } from "react";
import { RevealWords, ScrambleText } from "../shared/reveal";

const REACTIONS = ["😍", "✳️", "🔥", "🙌", "👍"] as const;

const TRAITS: { name: string; counts: number[]; big?: boolean }[] = [
  { name: "Supportive", counts: [37, 23, 18, 17, 15], big: true },
  { name: "Creative", counts: [34, 29, 22, 22, 14], big: true },
  { name: "Curious", counts: [20, 14, 13, 12, 8], big: true },
  { name: "Ambitious", counts: [17, 9, 8, 6, 6] },
  { name: "Skilled", counts: [23, 15, 18, 8, 10] },
  { name: "Talented", counts: [22, 14, 15, 9, 8] },
  { name: "Professional", counts: [13, 18, 7, 7, 9] },
  { name: "Calm", counts: [14, 12, 8, 9, 5] },
  { name: "Open", counts: [9, 11, 8, 6, 4] },
  { name: "Focused", counts: [7, 5, 14, 12, 13] },
  { name: "Thoughtful", counts: [11, 14, 7, 7, 4] },
  { name: "Reliable", counts: [14, 9, 7, 4, 7] },
  { name: "Versatile", counts: [12, 11, 8, 3, 3] },
  { name: "Accountable", counts: [8, 9, 11, 7, 4] },
  { name: "Inspiring", counts: [12, 16, 8, 6, 5] },
  { name: "Fast", counts: [13, 15, 13, 10, 9] },
  { name: "Responsible", counts: [17, 23, 11, 10, 17] },
  { name: "Confident", counts: [15, 12, 9, 6, 8] },
];

function useInView<T extends HTMLElement>() {
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function TraitCard({ trait }: { trait: (typeof TRAITS)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`border-t border-l border-[#080d10]/8 p-6 ${trait.big ? "sm:p-8" : ""}`}>
      <h3 className={`font-medium text-[#080d10] ${trait.big ? "text-3xl" : "text-2xl"}`}>{trait.name}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {REACTIONS.map((emoji, i) => (
          <span key={emoji} className="font-body flex items-center gap-1 rounded-full bg-[#080d10]/[0.04] px-3 py-1.5 text-sm text-[#080d10]/70">
            <span>{emoji}</span>
            <span>{inView ? trait.counts[i] : 0}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TraitsGrid() {
  return (
    <section className="bg-white pb-24 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="The traits we work by" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="What our team said, in three words each, when asked to describe Phenomenon" />
        </h2>

        <div className="mt-12 grid grid-cols-1 border-r border-b border-[#080d10]/8 sm:grid-cols-3">
          {TRAITS.map((trait) => (
            <TraitCard key={trait.name} trait={trait} />
          ))}
        </div>
      </div>
    </section>
  );
}
