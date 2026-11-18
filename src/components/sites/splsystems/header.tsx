"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowSwap } from "./icons";

const PRIMARY_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
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

function Rule() {
  return <div className="h-px w-full shrink-0 bg-[#181818]/20" />;
}

/** Label whose text rolls up to an identical copy on hover (see `.cc-roll`). */
function RollLabel({ children }: { children: string }) {
  return (
    <span className="cc-roll" data-label={children}>
      <span>{children}</span>
    </span>
  );
}

/** Stagger index for `.cc-menu-item`'s entrance delay. */
const stagger = (i: number) => ({ "--cc-i": i }) as CSSProperties;

export function Header({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const ink = tone === "light" && !open ? "text-white" : "text-[#181818]";

  useEffect(() => {
    if (!open) return;
    // Move focus into the dialog, and hand it back to the trigger on close.
    const menuButton = menuButtonRef.current;
    closeButtonRef.current?.focus({ preventScroll: true });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Desktop shows the inline nav instead, so close the overlay if the
    // viewport grows past the breakpoint while it is open.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      menuButton?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* z-50: the header is a stacking context, so the menu overlay inside it
          can only sit as high as the header itself. Sections lift their content
          to z-10/z-20, which would otherwise paint over the open menu. Stays
          under the splash (z-[100]). */}
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
            preload
            className="h-auto w-[8.5rem] md:w-[10.5rem]"
          />
        </Link>
        {/* Desktop: every primary link inline in the bar. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {PRIMARY_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`group cc-press text-[16px] font-medium tracking-[-0.03em] ${ink}`}
                >
                  <RollLabel>{item.label}</RollLabel>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`group cc-press text-[16px] font-medium tracking-[-0.03em] lg:hidden ${ink}`}
        >
          <RollLabel>Menu</RollLabel>
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
        data-open={open || undefined}
        className={`fixed inset-0 z-20 flex items-start justify-center md:px-4 md:pb-4 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Dimmed backdrop; clicking outside the panel closes the menu. */}
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#181818]/25 transition-opacity duration-500 ease-[cubic-bezier(0.3,0,0,1)] ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative flex max-h-full w-full flex-col overflow-hidden md:max-w-[502px]">
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
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="group cc-press w-full py-4 text-center text-[16px] font-medium tracking-[-0.03em] text-[#181818]"
              >
                <RollLabel>Close</RollLabel>
              </button>

              <nav aria-label="Site menu" className="flex flex-col gap-[42px]">
                <ul className="flex flex-col">
                  {PRIMARY_LINKS.map((item, i) => (
                    <li key={item.label} className="cc-menu-item" style={stagger(i)}>
                      <Rule />
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between py-3 text-[32px] font-medium leading-[32px] tracking-[-0.016em] text-[#181818]"
                      >
                        <span className="transition-[translate] duration-500 ease-[cubic-bezier(0.3,0,0,1)] group-hover:translate-x-2">
                          {item.label}
                        </span>
                        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <ArrowSwap className="h-5 w-5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                  <Rule />
                </ul>

                <ul className="flex flex-col gap-3">
                  {SECONDARY_LINKS.map((item, i) => (
                    <li key={item.label} className="cc-menu-item" style={stagger(PRIMARY_LINKS.length + i)}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-[16px] font-medium leading-[20.8px] tracking-[-0.03em] text-[#181818] transition-opacity duration-300 hover:opacity-55"
                      >
                        {item.label}
                      </Link>
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
