"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "./icons";

const NAV_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Cypher", href: "https://www.cyphercapital.com/", external: true },
  { label: "Philosophy", href: "https://www.cyphercapital.com/philosophy", external: true },
  { label: "Capabilities", href: "https://www.cyphercapital.com/capabilities", external: true },
  {
    label: "AI Infrastructure",
    href: "https://www.cyphercapital.com/ai-infrastructure",
    external: true,
  },
  {
    label: "Access Formats",
    href: "https://www.cyphercapital.com/access-formats",
    external: true,
  },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fbfbfb]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-5 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-2 text-[#181818]">
          <LogoMark className="h-[1.1em] w-auto" />
          <span className="text-[0.95rem] font-medium tracking-[-0.02em]">
            Cypher Capital
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[0.95rem] tracking-[-0.02em] text-[#181818]"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="absolute inset-x-0 top-full border-t border-[#18181833] bg-[#fbfbfb]">
          <nav className="mx-auto flex max-w-[1800px] flex-col px-5 py-6 md:px-10">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="border-b border-[#18181833] py-4 text-2xl tracking-[-0.02em] text-[#181818] last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
