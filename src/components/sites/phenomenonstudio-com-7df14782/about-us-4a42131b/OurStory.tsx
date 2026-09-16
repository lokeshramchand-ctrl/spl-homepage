"use client";

import { RevealWords, ScrambleText } from "../shared/reveal";

export function OurStory() {
  return (
    <section className="bg-white pt-24 pb-16 sm:pt-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="What grounded us then, and still does" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="It wasn't one client or one breakthrough: just consistent work, good people, and a clear sense of what matters" />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#080d10]/8 pt-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">In the founders&apos; words</p>
          <div className="max-w-2xl text-lg text-[#080d10]/70">
            <p>
              Our company was founded in 2019 by Valerii Filimonov, with a background in product design.
            </p>
            <p className="mt-4">
              Valerii came from e-commerce and early-stage startups, driven by systems thinking and user flows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
