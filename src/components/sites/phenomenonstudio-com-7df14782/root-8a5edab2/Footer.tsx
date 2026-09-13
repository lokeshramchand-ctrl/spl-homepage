"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, ChevronDownIcon, CopyIcon } from "../shared/icons";

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
    <footer id="company" className="scroll-mt-24 rounded-t-[40px] bg-[#080d10] text-white sm:rounded-t-[64px]">
      <div className="border-b border-white/10 py-24 sm:py-40">
        <div className="mx-auto max-w-[1440px] px-4">
          <Link href="/#contact" className="flex items-center justify-between">
            <span className="text-4xl font-medium sm:text-6xl">Let&apos;s collaborate</span>
            <ArrowRightIcon className="size-10 shrink-0" />
          </Link>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 sm:grid-cols-2 sm:gap-x-16 lg:gap-x-24">
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <ul className="grid grid-cols-1 gap-3">
              {EXPLORE_LINKS.map((l) => (
                <li key={l}>
                  <Link
                    href="/"
                    className={`text-2xl font-medium text-white/90 hover:text-white sm:text-[28px] ${
                      l === "FAQ" ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-4 gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="/"
                  className="flex size-16 items-center justify-center rounded-2xl bg-white/10 transition-colors hover:bg-white/15 sm:size-[70px]"
                >
                  <Image src={`${ASSET}/icons/${s}`} alt="" width={20} height={20} className="invert" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OFFICES.map((o, i) => (
              <a
                key={o.label}
                href="/about-us"
                className={`group flex flex-col justify-between rounded-2xl border border-white/10 p-6 hover:bg-white/5 ${
                  i === OFFICES.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <Image src={`${ASSET}/images/${o.flag}`} alt={o.label} width={32} height={22} />
                <div className="font-body mt-8 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold tracking-wide uppercase">{o.label}</span>
                  <ArrowRightIcon className="size-4 shrink-0 text-white/60 group-hover:text-white" />
                </div>
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
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText("hello@phenomenon-studio.com")}
            className="font-body flex items-center gap-2 text-xs uppercase text-white/60 hover:text-white"
          >
            hello@phenomenon-studio.com
            <CopyIcon className="size-4" />
          </button>
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
