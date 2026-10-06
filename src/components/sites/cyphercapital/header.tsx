"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, LogoMark } from "./icons";

const SITE_ORIGIN = "https://www.cyphercapital.com";

const PRIMARY_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Cypher", href: "/" },
  { label: "Philosophy", href: `${SITE_ORIGIN}/philosophy`, external: true },
  { label: "Capabilities", href: `${SITE_ORIGIN}/capabilities`, external: true },
  { label: "AI Infrastructure", href: `${SITE_ORIGIN}/ai-infrastructure`, external: true },
  { label: "Access Formats", href: `${SITE_ORIGIN}/access-formats`, external: true },
];

const SECONDARY_LINKS: { label: string; href: string }[] = [
  { label: "Digital Multi-Strategy Fund", href: `${SITE_ORIGIN}/digital-multi-strategy-fund` },
  { label: "Leadership", href: `${SITE_ORIGIN}/leadership` },
  { label: "Risk Management", href: `${SITE_ORIGIN}/risk-management` },
  { label: "Insights", href: `${SITE_ORIGIN}/insights` },
  { label: "Global presence", href: `${SITE_ORIGIN}/global-presence` },
];

const CONTACT_LINKS: { email: string; note: string }[] = [
  { email: "info@cyphercapital.com", note: "For general questions" },
  { email: "ir@cyphercapital.com", note: "For investor relations" },
];

function Rule() {
  return <div className="h-px w-full shrink-0 bg-[#181818]/20" />;
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="relative flex items-center justify-between px-4 py-8 md:justify-center md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-[#181818] md:absolute md:left-8"
        >
          <LogoMark className="h-6 w-10" />
          <span className="text-[16px] font-medium tracking-[-0.03em]">
            Cypher Capital
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="text-[16px] font-medium tracking-[-0.03em] text-[#181818]"
        >
          Menu
        </button>
      </div>

      {/* Overlay: flush to the top edge (same row as the header), capped
          to 502px and centered on md+, with a 16px side/bottom inset there.
          The panel drops down from the top while its content counter-slides
          up from below — a vertical reveal, not a horizontal slide-in. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-20 flex items-start justify-center md:px-4 md:pb-4 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex max-h-full w-full flex-col overflow-hidden md:max-w-[502px]">
          <div
            className={`flex min-h-0 flex-col overflow-hidden bg-[#fafafa] transition-transform duration-500 ease-[cubic-bezier(0.3,0,0,1)] ${
              open ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div
              className={`min-h-0 overflow-y-auto px-4 py-4 transition-transform duration-500 ease-[cubic-bezier(0.3,0,0,1)] ${
                open ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full py-4 text-center text-[16px] font-medium tracking-[-0.03em] text-[#181818]"
              >
                Close
              </button>

              <nav aria-label="Site menu" className="flex flex-col gap-[42px]">
                <ul className="flex flex-col">
                  {PRIMARY_LINKS.map((item) => (
                    <li key={item.label}>
                      <Rule />
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="block py-3 text-[32px] font-medium leading-[32px] tracking-[-0.016em] text-[#181818]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <Rule />
                </ul>

                <ul className="flex flex-col gap-3">
                  {SECONDARY_LINKS.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] font-medium leading-[20.8px] tracking-[-0.03em] text-[#181818]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-col">
                  <Rule />
                  {CONTACT_LINKS.map((item) => (
                    <li key={item.email}>
                      <a
                        href={`mailto:${item.email}`}
                        className="flex items-center justify-between gap-4 py-2 text-[#181818]"
                      >
                        <span className="flex flex-col gap-0.5">
                          <span className="text-[16px] font-medium leading-[20.8px] tracking-[-0.03em]">
                            {item.email}
                          </span>
                          <span className="text-xs font-medium text-[#181818]/50">
                            {item.note}
                          </span>
                        </span>
                        <ArrowUpRightIcon />
                      </a>
                      <Rule />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
