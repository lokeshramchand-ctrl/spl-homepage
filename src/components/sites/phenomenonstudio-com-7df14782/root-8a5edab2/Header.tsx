"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogoMark, LogoWordmark, ChevronDownIcon, ArrowRightIcon } from "../shared/icons";
import { Button } from "../shared/button";

type SimpleLink = { label: string; href: string };
type ServiceGroup = { label: string; links: SimpleLink[] };

const SERVICES_COLUMNS: ServiceGroup[][] = [
  [
    {
      label: "Design",
      links: [
        { label: "Web design", href: "#services" },
        { label: "Mobile design", href: "#services" },
        { label: "Website design", href: "#services" },
        { label: "Website redesign", href: "#services" },
        { label: "Branding & identity", href: "#services" },
        { label: "Design prototype", href: "#services" },
      ],
    },
    {
      label: "Development",
      links: [
        { label: "Web development", href: "#services" },
        { label: "Mobile development", href: "#services" },
        { label: "Website development", href: "#services" },
        { label: "AI development", href: "#services" },
        { label: "Custom software development", href: "#services" },
      ],
    },
    {
      label: "Research",
      links: [
        { label: "Product discovery", href: "#services" },
        { label: "UX audit", href: "#services" },
        { label: "Technical workshop", href: "#services" },
      ],
    },
  ],
  [
    {
      label: "Launch",
      links: [
        { label: "Design prototype", href: "#services" },
        { label: "Product discovery", href: "#services" },
        { label: "Rapid MVP development", href: "#services" },
        { label: "Custom MVP development", href: "#services" },
        { label: "AI development", href: "#services" },
      ],
    },
    {
      label: "Evolve",
      links: [
        { label: "UX audit", href: "#services" },
        { label: "Product redesign", href: "#services" },
        { label: "Web app design", href: "#services" },
        { label: "Web app development", href: "#services" },
        { label: "Mobile app design", href: "#services" },
        { label: "Mobile app development", href: "#services" },
      ],
    },
    {
      label: "Rebrand",
      links: [
        { label: "Branding & identity", href: "#services" },
        { label: "Website redesign", href: "#services" },
        { label: "Website development", href: "#services" },
      ],
    },
    {
      label: "Extend",
      links: [
        { label: "Team extension", href: "#services" },
        { label: "Dedicated team", href: "#services" },
      ],
    },
  ],
];

const INDUSTRIES_LINKS: SimpleLink[] = [
  { label: "Saas", href: "#industries" },
  { label: "Healthcare", href: "#industries" },
  { label: "Fintech", href: "#industries" },
  { label: "Edtech", href: "#industries" },
];

const COMPANY_LINKS: SimpleLink[] = [
  { label: "About us", href: "#company" },
  { label: "Careers", href: "#company" },
  { label: "Insights", href: "#company" },
];

const NAV_ITEMS = [
  { key: "services", label: "Services", href: "#services", mega: "services" as const },
  { key: "industries", label: "Industries", href: "#industries", mega: "simple" as const },
  { key: "cases", label: "Cases", href: "#cases", mega: null },
  { key: "smart-search", label: "Smart search", href: "#smart-search", mega: null, sparkle: true },
  { key: "company", label: "Company", href: "#company", mega: "simple" as const },
];

function MegaPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 top-full z-40 w-[min(720px,90vw)] -translate-x-1/2 pt-4">
      <div className="rounded-2xl bg-white p-3 text-[#080d10] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.35)]">
        {children}
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <div className="m-3 flex h-full min-h-[200px] flex-col rounded-xl bg-[#f4f5f4] p-6">
      <div className="text-base font-semibold">Ready to bring your idea to life?</div>
      <div className="mt-auto pt-6">
        <Button href="#contact" variant="orange" className="w-fit">
          Let&rsquo;s talk
        </Button>
      </div>
    </div>
  );
}

function ServicesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <MegaPanel>
      <div className="flex gap-6 p-3">
        <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:gap-6">
          {SERVICES_COLUMNS.map((column, i) => (
            <ul key={i} className="flex flex-1 flex-col gap-6">
              {column.map((group) => (
                <li key={group.label}>
                  <Link
                    href={group.links[0]?.href ?? "#services"}
                    onClick={onNavigate}
                    className="mb-2 flex items-center justify-between text-sm font-bold"
                  >
                    {group.label}
                  </Link>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="text-xs text-[#080d10]/70 transition-colors hover:text-[#080d10]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="relative hidden w-40 shrink-0 overflow-hidden rounded-xl lg:block">
          <Image
            src="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/images/Screenshot-2025-03-03-at-22.27.30.webp"
            alt="Design system"
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      </div>
    </MegaPanel>
  );
}

function SimpleMegaMenu({
  links,
  image,
  alt,
  onNavigate,
}: {
  links: SimpleLink[];
  image: string;
  alt: string;
  onNavigate: () => void;
}) {
  return (
    <MegaPanel>
      <div className="flex gap-3">
        <div className="w-52 shrink-0">
          <CtaCard />
        </div>
        <ul className="flex flex-1 flex-col gap-3 self-center">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="text-sm font-bold text-[#080d10]/80 transition-colors hover:text-[#080d10]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative hidden w-32 shrink-0 overflow-hidden rounded-xl lg:block">
          <Image src={image} alt={alt} fill sizes="128px" className="object-cover" />
        </div>
      </div>
    </MegaPanel>
  );
}

export function Header() {
  const [compact, setCompact] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openWithDelay = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileAccordion(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="mx-auto max-w-[1440px] px-4 pt-3 transition-[opacity,transform] duration-300"
        style={{
          opacity: compact && !mobileOpen ? 0 : 1,
          transform: compact && !mobileOpen ? "translateY(-12px)" : "translateY(0)",
          pointerEvents: compact && !mobileOpen ? "none" : "auto",
        }}
      >
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            aria-label="Phenomenon Studio"
            className="flex items-center gap-2 text-white"
            onClick={closeMobile}
          >
            <LogoMark className="h-[22px] w-auto" />
            <LogoWordmark className="h-[18px] w-auto" />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.mega && openWithDelay(item.key)}
                  onMouseLeave={() => item.mega && closeWithDelay()}
                >
                  <Link
                    href={item.href}
                    aria-expanded={item.mega ? openMenu === item.key : undefined}
                    onClick={() => setOpenMenu(null)}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-white/90 hover:text-white"
                  >
                    <span>{item.label}</span>
                    {item.sparkle && <span className="text-[#ff7a00]">✦</span>}
                    {item.mega && (
                      <ChevronDownIcon
                        className="size-3.5 transition-transform"
                        style={{ transform: openMenu === item.key ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    )}
                  </Link>

                  {item.mega === "services" && openMenu === item.key && (
                    <ServicesMegaMenu onNavigate={() => setOpenMenu(null)} />
                  )}
                  {item.mega === "simple" && openMenu === item.key && item.key === "industries" && (
                    <SimpleMegaMenu
                      links={INDUSTRIES_LINKS}
                      image="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/images/5bcd980e3b646718b62720550f308de8-2.webp"
                      alt="Industries"
                      onNavigate={() => setOpenMenu(null)}
                    />
                  )}
                  {item.mega === "simple" && openMenu === item.key && item.key === "company" && (
                    <SimpleMegaMenu
                      links={COMPANY_LINKS}
                      image="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/images/odyssey-cover.webp"
                      alt="Company"
                      onNavigate={() => setOpenMenu(null)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden items-center gap-2 rounded-lg bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#080d10] transition-colors hover:bg-white/80 lg:inline-flex"
            >
              Get in touch
              <ArrowRightIcon className="size-3.5" />
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="relative flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white lg:hidden"
            >
              <span className="relative flex h-3 w-5 flex-col justify-between">
                <span
                  className="h-[1.5px] w-full origin-center bg-white transition-transform duration-300"
                  style={{ transform: mobileOpen ? "translateY(5.25px) rotate(45deg)" : "none" }}
                />
                <span
                  className="h-[1.5px] w-full bg-white transition-opacity duration-200"
                  style={{ opacity: mobileOpen ? 0 : 1 }}
                />
                <span
                  className="h-[1.5px] w-full origin-center bg-white transition-transform duration-300"
                  style={{ transform: mobileOpen ? "translateY(-5.25px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute right-4 top-3 transition-opacity duration-300"
        style={{
          opacity: compact && !mobileOpen ? 1 : 0,
          pointerEvents: compact && !mobileOpen ? "auto" : "none",
        }}
      >
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#080d10] transition-colors hover:bg-white/80"
        >
          Get in touch
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 bg-[#080d10] transition-opacity duration-300 lg:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 pb-8 pt-24">
          <div className="flex flex-col divide-y divide-white/10">
            {NAV_ITEMS.map((item) => {
              const hasAccordion = item.mega !== null;
              const isOpen = mobileAccordion === item.key;
              return (
                <div key={item.key} className="py-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-2 text-base font-bold text-white"
                    >
                      {item.label}
                      {item.sparkle && <span className="text-[#ff7a00]">✦</span>}
                    </Link>
                    {hasAccordion && (
                      <button
                        type="button"
                        aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        onClick={() => setMobileAccordion(isOpen ? null : item.key)}
                        className="flex size-8 items-center justify-center text-white"
                      >
                        <ChevronDownIcon
                          className="size-4 transition-transform"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </button>
                    )}
                  </div>

                  {hasAccordion && (
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-300"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        {item.key === "services" ? (
                          <div className="grid grid-cols-1 gap-6 pt-5 sm:grid-cols-2">
                            {SERVICES_COLUMNS.flat().map((group) => (
                              <div key={group.label}>
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                                  {group.label}
                                </div>
                                <ul className="mt-3 flex flex-col gap-3">
                                  {group.links.map((link) => (
                                    <li key={link.label}>
                                      <Link
                                        href={link.href}
                                        onClick={closeMobile}
                                        className="text-sm text-white/80"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="flex flex-col gap-3 pt-5">
                            {(item.key === "industries" ? INDUSTRIES_LINKS : COMPANY_LINKS).map((link) => (
                              <li key={link.label}>
                                <Link href={link.href} onClick={closeMobile} className="text-sm text-white/80">
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <Link
              href="#contact"
              onClick={closeMobile}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#080d10]"
            >
              Get in touch
              <ArrowRightIcon className="size-3.5" />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                href="https://wa.me/48574758959"
                className="flex items-center justify-center rounded-lg bg-white/10 py-3"
              >
                <Image
                  src="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/icons/whatsapp.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on Telegram"
                href="https://t.me/phenomenonstudio"
                className="flex items-center justify-center rounded-lg bg-white/10 py-3"
              >
                <Image
                  src="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/icons/telegram.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
