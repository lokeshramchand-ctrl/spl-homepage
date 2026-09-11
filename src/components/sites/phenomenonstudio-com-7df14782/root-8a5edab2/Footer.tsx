"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, ChevronDownIcon } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const EXPLORE_LINKS = ["Services", "Cases", "About us", "Career", "Pricing", "Blog", "FAQ"];
const SOCIALS = ["behance.svg", "dribbble.svg", "instagram.svg", "linkedin.svg", "facebook.svg", "twitter.svg"];
const OFFICES = [
  { flag: "estonia.png.webp", label: "Estonia, Tallinn" },
  { flag: "sz.png.webp", label: "Switzerland, Lugano" },
  { flag: "usa.png.webp", label: "USA, Dover" },
];
const BADGES = ["Frame-1686558328.png.webp", "f2.png.webp", "f3.png.webp", "f4.png.webp", "f5.png.webp", "f6.png.webp"];
const ALL_SERVICES = [
  "UX Design Audit", "Product Redesign", "Blockchain Development", "No-Code Development",
  "Website Redesign", "Website Development", "Product Design", "Mobile App Development",
  "Web App Design", "Website Design Services", "Rapid MVP Development", "Team Extension",
  "Design Prototype", "AI Chatbot Development", "Custom MVP Development", "Technical Workshop",
  "Dedicated Team", "Branding", "Product Discovery", "UX/UI Design", "Agriculture Design",
];

export function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="rounded-t-[40px] bg-[#080d10] text-white sm:rounded-t-[64px]">
      <div className="border-b border-white/10 py-24 sm:py-40">
        <div className="mx-auto max-w-[1440px] px-4">
          <Link href="/#contact" className="flex items-center justify-between">
            <span className="text-4xl font-medium sm:text-6xl">Let&apos;s collaborate</span>
            <ArrowRightIcon className="size-10 shrink-0" />
          </Link>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 sm:grid-cols-2">
          <div className="flex flex-col gap-10 sm:flex-row">
            <ul className="grid grid-cols-1 gap-2 font-body text-sm">
              {EXPLORE_LINKS.map((l) => (
                <li key={l}>
                  <Link href="/" className="text-white/70 hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a key={s} href="/" className="flex size-9 items-center justify-center rounded bg-white/10">
                  <Image src={`${ASSET}/icons/${s}`} alt="" width={16} height={16} className="invert" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {OFFICES.map((o) => (
              <a key={o.label} href="/about-us" className="rounded-lg p-4 hover:bg-white/5">
                <Image src={`${ASSET}/images/${o.flag}`} alt={o.label} width={32} height={22} />
                <div className="font-body mt-6 text-sm">{o.label}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-body flex flex-wrap items-center gap-3 text-xs uppercase">
            <span className="font-semibold">Phenomenon © 2026</span>
            <Link href="/terms-of-use" className="text-white/60 hover:text-white">Terms of Use</Link>
            <Link href="/privacy-policy" className="text-white/60 hover:text-white">Privacy Policy</Link>
            <Link href="/cookies-policy" className="text-white/60 hover:text-white">Cookies policy</Link>
          </div>
          <span className="font-body text-xs text-white/60">hello@phenomenon-studio.com</span>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1440px] grid-cols-3 gap-4 px-4 sm:grid-cols-6">
          {BADGES.map((b) => (
            <div key={b} className="flex items-center justify-center p-4">
              <Image src={`${ASSET}/images/${b}`} alt="" width={120} height={40} className="h-8 w-auto object-contain opacity-80" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-4 py-6">
          <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between py-2 text-sm">
            <span>
              All services <span className="text-white/40">{ALL_SERVICES.length}</span>
            </span>
            <ChevronDownIcon className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <ul className="font-body mt-6 grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-3">
              {ALL_SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-white">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
