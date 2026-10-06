"use client";

import { useState } from "react";
import { InView, Reveal, RevealWords, SectionLabel } from "../reveal";
import { ParticleImage } from "./particle-image";

const LOCATIONS = [
  {
    id: "zurich",
    name: "Zurich",
    description:
      "Cypher Capital (Switzerland) GmbH is the headquarters of the Cypher Capital group, coordinating the platform's European presence and institutional relationships.",
    image: "/sites/cyphercapital/images/global-presence/zurich.webp",
  },
  {
    id: "dubai",
    name: "Dubai",
    description:
      "Home of Cypher Capital Technology L.L.C., the group's shared-services entity for technology, operations and administration.",
    image: "/sites/cyphercapital/images/global-presence/dubai.webp",
  },
];

export function Places() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-5 md:px-10">
      <div className="mx-auto max-w-[1800px]">
        <SectionLabel>Places</SectionLabel>

        <div className="flex flex-col gap-10 py-16 md:gap-16 md:py-24">
          <InView>
            <Reveal
              as="h2"
              className="max-w-[20ch] text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:text-[4rem]"
            >
              <RevealWords text="Two centres." />
              <br />
              <RevealWords text="One continuous platform." />
            </Reveal>
          </InView>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            <div className="relative aspect-[568/382] w-full overflow-hidden lg:aspect-auto lg:h-auto lg:min-h-[382px]">
              {LOCATIONS.map((loc, i) => (
                <div
                  key={loc.id}
                  aria-hidden={active !== i}
                  className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.3,0,0,1)]"
                  style={{ opacity: active === i ? 1 : 0 }}
                >
                  <ParticleImage src={loc.image} alt={`${loc.name} cityscape`} />
                </div>
              ))}
            </div>

            <ul className="flex flex-col">
              {LOCATIONS.map((loc, i) => (
                <li
                  key={loc.id}
                  className={`border-t py-6 last:border-b md:py-8 ${
                    active === i ? "border-[#181818]" : "border-[#181818]/20"
                  } transition-colors duration-500`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className="text-left text-[2rem] font-medium tracking-[-0.03em] text-[#181818]"
                  >
                    {loc.name}
                  </button>
                  <p className="mt-3 max-w-[40ch] text-[1rem] font-medium tracking-[-0.03em] text-[#181818]/50">
                    {loc.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
