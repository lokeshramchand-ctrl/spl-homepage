"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "./icons";

const PRIMARY_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Approach", href: "/#approach" },
  { label: "Contact", href: "/contact" },
];

const SECONDARY_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Expertise", href: "/#expertise" },
  { label: "Support & Info", href: "/#faq" },
  { label: "Projects & Expertise", href: "/projects" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/splsystems/",
    external: true,
  },
];

const CONTACT_LINKS: { label: string; href: string; note: string }[] = [
  { label: "pri@splsystems.in", href: "mailto:pri@splsystems.in", note: "For general inquiries" },
  { label: "+1 (650) 993-9799", href: "tel:+16509939799", note: "Call us, available 24/7" },
];

function Rule() {
  return <div className="h-px w-full shrink-0 bg-[#181818]/20" />;
}

export function Header({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const ink = tone === "light" && !open ? "text-white" : "text-[#181818]";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="relative flex items-center justify-between px-4 py-6 md:justify-center md:px-8">
        <Link
          href="/"
          data-header-logo
          className={`cc-header-logo flex items-center gap-3 ${ink} md:absolute md:left-8`}
        >
          <Image
            src="/sites/splsystems/images/logo/spl-systems.svg"
            alt="SPL Systems"
            width={3000}
            height={350}
            unoptimized
            priority
            className="h-auto w-[8.5rem] md:w-[10.5rem]"
          />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`text-[16px] font-medium tracking-[-0.03em] ${ink}`}
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
        inert={!open}
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
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
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
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex items-center justify-between gap-4 py-2 text-[#181818]"
                      >
                        <span className="flex flex-col gap-0.5">
                          <span className="text-[16px] font-medium leading-[20.8px] tracking-[-0.03em]">
                            {item.label}
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
