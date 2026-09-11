"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark, LogoWordmark, ChevronDownIcon, ArrowRightIcon } from "../shared/icons";

const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Cases", href: "/cases" },
  { label: "Smart search", href: "/smart-search", sparkle: true },
  { label: "Company", href: "/company" },
];

export function Header() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="mx-auto max-w-[1440px] px-4 pt-3 transition-[opacity,transform] duration-300"
        style={{
          opacity: compact ? 0 : 1,
          transform: compact ? "translateY(-12px)" : "translateY(0)",
          pointerEvents: compact ? "none" : "auto",
        }}
      >
        <div className="flex items-center justify-between py-3">
          <Link href="/" aria-label="Phenomenon Studio" className="flex items-center gap-2 text-white">
            <LogoMark className="h-[22px] w-auto" />
            <LogoWordmark className="h-[18px] w-auto" />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-white/90 hover:text-white"
                  >
                    <span>{item.label}</span>
                    {item.sparkle && <span className="text-[#ff7a00]">✦</span>}
                    {item.label !== "Cases" && item.label !== "Smart search" && (
                      <ChevronDownIcon className="size-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#080d10] transition-colors hover:bg-white/80"
          >
            Get in touch
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>

      <div
        className="absolute right-4 top-3 transition-opacity duration-300"
        style={{ opacity: compact ? 1 : 0, pointerEvents: compact ? "auto" : "none" }}
      >
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#080d10] transition-colors hover:bg-white/80"
        >
          Get in touch
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </header>
  );
}
