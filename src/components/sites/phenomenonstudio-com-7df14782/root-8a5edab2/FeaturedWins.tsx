"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { cn } from "@/lib/utils";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const CLIENTS = [
  { logo: "logo1.svg", name: "Airportr", desc: "Recognized as one of the top 5 most innovative UK transport tech firms by TransportTech 2023.", stat: "", tag: "Logistics", flag: "UK.svg", country: "UK" },
  { logo: "nomupay.svg", name: "Nomupay", desc: "Nomupay raises €35.9 million to expand unified payments access in Asia market.", stat: "€35.9M", tag: "Fintech", flag: "Ireland.svg", country: "Ireland" },
  { logo: "logo3.svg", name: "One Text", desc: "Y Combinator-backed SaaS startup enabling frictionless payments via SMS.", stat: "", tag: "Saas", flag: "USA.svg", country: "USA" },
  { logo: "logo4.svg", name: "Shaga", desc: "An emerging leader in cloud gaming, successfully raised $1M in a Pre-Seed funding round.", stat: "$1M", tag: "Web3", flag: "USA.svg", country: "USA" },
  { logo: "DoStuffMedia-1.svg", name: "DoStuffMedia", desc: "A prominent entertainment platform with 2.5 million monthly website visits and 23 million monthly social impressions.", stat: "", tag: "Entertainment", flag: "USA.svg", country: "USA" },
  { logo: "logo6.svg", name: "Isora", desc: "A collaborative GRC risk assessment platform trusted by Berkeley, Yale, and other leading institutions. TechStars graduate.", stat: "", tag: "Saas", flag: "USA.svg", country: "USA" },
  { logo: "Wisdom.svg", name: "Wisdom", desc: "After redesign, Wisdom raised $1.3M and partnered with Samsung Health & Galaxy Watch for AI gait and fall-prevention insights.", stat: "$1.3M", tag: "HealthTech", flag: "USA.svg", country: "USA" },
  { logo: "logo8.svg", name: "Qurtuba Online", desc: "Recognized as South Africa's top-performing EdTech institution in 2023.", stat: "", tag: "EdTech", flag: "South-Africa.svg", country: "South Africa" },
];

export function FeaturedWins() {
  const [hovered, setHovered] = useState<number | null>(null);
  // Touch devices don't fire mouseenter/mouseleave reliably, so cards need to be
  // tappable there instead of hover-only.
  const [canHover, setCanHover] = useState(
    () => typeof window === "undefined" || window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (canHover || hovered === null) return;
    const close = () => setHovered(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [canHover, hovered]);

  return (
    <section className="pt-24 pb-8 sm:pt-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Award-Winning Product Design and Development Agency"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/60"
        />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Our featured client wins" />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px rounded-xl border border-[#080d10]/8 bg-[#080d10]/8 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((c, i) => {
            const isHovered = hovered === i;
            return (
              <FadeUp
                key={c.name}
                className={cn(
                  "relative flex h-40 cursor-pointer items-center justify-center bg-white p-6",
                  isHovered && "z-30"
                )}
                onMouseEnter={canHover ? () => setHovered(i) : undefined}
                onMouseLeave={canHover ? () => setHovered(null) : undefined}
                onClick={
                  canHover
                    ? undefined
                    : (e) => {
                        e.stopPropagation();
                        setHovered((prev) => (prev === i ? null : i));
                      }
                }
              >
                {/* Resting state: logo only */}
                <Image
                  src={`${ASSET}/icons/${c.logo}`}
                  alt={c.name}
                  width={110}
                  height={28}
                  className={cn(
                    "h-6 w-auto object-contain transition-opacity duration-150",
                    isHovered && "opacity-0"
                  )}
                />

                {/* Expanded state: full card, pops out on hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 z-20 flex origin-top scale-95 flex-col rounded-lg bg-[#080d10] p-8 opacity-0 shadow-2xl transition-all duration-300 ease-out",
                    isHovered && "pointer-events-auto scale-100 opacity-100"
                  )}
                >
                  <Image
                    src={`${ASSET}/icons/${c.logo}`}
                    alt={c.name}
                    width={100}
                    height={28}
                    className="h-6 w-auto object-contain object-left invert"
                  />
                  <div className="mt-6 text-base font-medium text-white">{c.name}</div>
                  <p className="font-body mt-1.5 text-sm text-white/60">{c.desc}</p>
                  {c.stat && <div className="mt-6 text-2xl font-medium text-white">{c.stat}</div>}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="font-body rounded-full bg-white/10 px-3 py-1 text-xs text-white">{c.tag}</span>
                    <span className="font-body flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                      <Image src={`${ASSET}/icons/${c.flag}`} alt={c.country} width={14} height={14} />
                      {c.country}
                    </span>
                  </div>

                  {/* Speech-bubble tail pointing out of the card's right edge (only makes
                      sense once there's a neighboring column to point past, i.e. sm+) */}
                  <div className="absolute top-1/2 right-0 hidden h-8 w-4 -translate-y-1/2 translate-x-full overflow-hidden sm:block">
                    <div className="absolute top-1/2 -left-4 h-8 w-8 -translate-y-1/2 rotate-45 rounded-md bg-[#080d10]" />
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
