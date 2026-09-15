"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogoMark, LogoWordmark, ChevronDownIcon, ArrowRightIcon, SparkleAiIcon } from "../shared/icons";

type SimpleLink = { label: string; href: string };
type ServiceGroup = { label: string; links: SimpleLink[] };

const SERVICES_TOP: ServiceGroup[] = [
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
];

const SERVICES_BOTTOM: ServiceGroup[] = [
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
];

const SERVICES_GROUPS = [...SERVICES_TOP, ...SERVICES_BOTTOM];

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
  { key: "smart-search", label: "Smart Search", href: "#smart-search", mega: null, sparkle: true },
  { key: "company", label: "Company", href: "#company", mega: "simple" as const },
];

function NavCta({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative h-[calc(60/1440*100vw)] max-[1180px]:h-[60px] items-center gap-[calc(8/1440*100vw)] overflow-hidden rounded-[calc(8/1440*100vw)] max-[1180px]:rounded-lg px-[calc(28/1440*100vw)] max-[1180px]:px-6 text-[calc(14/1440*100vw)] max-[1180px]:text-xs font-semibold uppercase tracking-[calc(2.1/1440*100vw)] max-[1180px]:tracking-wide transition-colors duration-300 ${className}`}
    >
      <span className="relative overflow-hidden">
        <b className="inline-block font-semibold transition-transform duration-300 ease-out group-hover:translate-x-[calc(23/1440*100vw)] group-hover:max-[1180px]:translate-x-2">
          {children}
        </b>
      </span>
      <span className="relative inline-flex size-[calc(15/1440*100vw)] max-[1180px]:size-3.5 shrink-0 items-center justify-center">
        <ArrowRightIcon className="absolute inset-0 size-full transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:opacity-0" />
        <ArrowRightIcon className="absolute inset-0 size-full -translate-x-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
      </span>
    </Link>
  );
}

function ServicesMegaMenu({
  activeGroup,
  setActiveGroup,
  onNavigate,
}: {
  activeGroup: string;
  setActiveGroup: (label: string) => void;
  onNavigate: () => void;
}) {
  const active = SERVICES_GROUPS.find((g) => g.label === activeGroup) ?? SERVICES_GROUPS[0];

  const renderCategoryList = (groups: ServiceGroup[]) => (
    <ul className="flex flex-col gap-[calc(24/1440*100vw)] py-[calc(32/1440*100vw)] px-[calc(32/1440*100vw)] pr-[calc(32/1440*100vw)]">
      {groups.map((group) => (
        <li key={group.label} onMouseEnter={() => setActiveGroup(group.label)}>
          <Link
            href={group.links[0]?.href ?? "#services"}
            onClick={onNavigate}
            className={`text-[calc(14/1440*100vw)] font-semibold uppercase tracking-[calc(2.1/1440*100vw)] transition-opacity duration-200 ${
              active.label === group.label ? "text-[#080d10] opacity-100" : "text-[#080d10] opacity-40 hover:opacity-70"
            }`}
          >
            {group.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="absolute left-1/2 top-[calc(100%+1px)] w-screen -translate-x-1/2 border-b border-[#080d10]/8 bg-white text-[#080d10] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.15)]">
      <div className="max-h-[calc(100vh-5.8333vw)] overflow-auto px-[calc(32/1440*100vw)]">
        <div className="flex items-stretch justify-between">
          <div className="flex w-[19.9306vw] shrink-0 flex-col divide-y divide-[#080d10]/8 border-r border-[#080d10]/8">
            {renderCategoryList(SERVICES_TOP)}
            {renderCategoryList(SERVICES_BOTTOM)}
          </div>

          <div className="flex w-[calc(35%-2.2222vw)] shrink-0 flex-col justify-between gap-[calc(32/1440*100vw)] px-[calc(32/1440*100vw)] py-[calc(32/1440*100vw)]">
            {active.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onNavigate}
                className="text-[1.6667vw] leading-[1.2] font-medium tracking-[-1.2px] text-[#080d10] transition-colors duration-300 hover:text-[#ff7a00]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="relative w-[45%] shrink-0 overflow-hidden py-[calc(32/1440*100vw)]">
            <div className="relative aspect-[1.526/1] w-full overflow-hidden rounded-xl">
              <Image
                src="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/images/Screenshot-2025-03-03-at-22.27.30.webp"
                alt="Design system"
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <div className="m-[calc(12/1440*100vw)] flex h-full w-[19.9306vw] shrink-0 flex-col rounded-[calc(12/1440*100vw)] bg-[#f4f5f4] p-[calc(24/1440*100vw)]">
      <div className="text-[2.7778vw] leading-[1.2] font-medium text-[#080d10]">Ready to bring your idea to life?</div>
      <div className="mt-auto pt-[calc(24/1440*100vw)]">
        <NavCta href="#contact" className="inline-flex bg-[#ff7a00] text-white hover:bg-[#080d10]">
          Let&rsquo;s talk
        </NavCta>
      </div>
    </div>
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
    <div className="absolute left-1/2 top-[calc(100%+1px)] w-screen -translate-x-1/2 border-b border-[#080d10]/8 bg-white text-[#080d10] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.15)]">
      <div className="flex max-h-[calc(100vh-5.8333vw)] items-stretch justify-between overflow-auto px-[calc(32/1440*100vw)]">
        <CtaCard />
        <ul className="flex w-[calc(35%-2.2222vw)] shrink-0 flex-col justify-center gap-[calc(24/1440*100vw)] px-[calc(32/1440*100vw)]">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="text-[1.6667vw] leading-[1.2] font-medium tracking-[-1.2px] text-[#080d10] transition-colors duration-300 hover:text-[#ff7a00]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative w-[45%] shrink-0 overflow-hidden py-[calc(32/1440*100vw)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image src={image} alt={alt} fill sizes="45vw" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header({ variant = "dark" }: { variant?: "dark" | "light" } = {}) {
  const alwaysActive = variant === "light";
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeServiceGroup, setActiveServiceGroup] = useState("Design");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y > 10) {
        setHideHeader(y > lastScrollY.current);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
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
    if (key === "services") setActiveServiceGroup("Design");
  };

  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileAccordion(null);
  };

  const isWhite = alwaysActive || scrolled || openMenu !== null || mobileOpen;
  const isHidden = hideHeader && openMenu === null && !mobileOpen;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 translate-y-0 border-b transition-[background-color,border-color,color,transform] duration-300 ${
        isHidden ? "min-[1181px]:-translate-y-full" : ""
      } ${isWhite ? "border-[#080d10]/8 bg-white text-[#080d10]" : "border-transparent bg-[#080d10] text-white"}`}
    >
      <div className="px-[2.2222vw] max-[1180px]:px-6 max-[992px]:px-3">
        <div className="flex items-center justify-between py-[calc(12/1440*100vw)] max-[1180px]:py-3">
          <Link
            href="/"
            aria-label="SPL Systems"
            className="flex items-center gap-0.5"
            onClick={closeMobile}
          >
            <LogoMark className="h-[1.5278vw] max-[1180px]:h-[22px] w-auto" />
            <LogoWordmark className="h-[1.5278vw] max-[1180px]:h-[22px] w-auto" />
          </Link>

          <nav className="hidden min-[1181px]:block">
            <ul className="flex items-center gap-[2.7778vw]">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.key}
                  onMouseEnter={() => item.mega && openWithDelay(item.key)}
                  onMouseLeave={() => item.mega && closeWithDelay()}
                >
                  <Link
                    href={item.href}
                    aria-expanded={item.mega ? openMenu === item.key : undefined}
                    onClick={() => setOpenMenu(null)}
                    className={`flex items-center text-[0.9722vw] font-semibold uppercase tracking-[0.1458vw] leading-[1.15] ${item.sparkle ? "pr-[1.6667vw]" : ""}`}
                  >
                    <span className="relative inline-flex items-center gap-[0.4vw]">
                      {item.label}
                      {item.sparkle && <SparkleAiIcon className="size-[1.1111vw]" />}
                    </span>
                    {item.mega && (
                      <ChevronDownIcon
                        className="ml-2 size-4 transition-transform duration-300"
                        style={{ transform: openMenu === item.key ? "rotate(-180deg)" : "rotate(0deg)" }}
                      />
                    )}
                  </Link>

                  {item.mega === "services" && openMenu === item.key && (
                    <ServicesMegaMenu
                      activeGroup={activeServiceGroup}
                      setActiveGroup={setActiveServiceGroup}
                      onNavigate={() => setOpenMenu(null)}
                    />
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
            <NavCta
              href="#contact"
              className={`hidden min-[1181px]:inline-flex ${isWhite ? "bg-[#080d10] text-white hover:bg-[#1a1f22]" : "bg-white text-[#080d10] hover:bg-[#f8f8f8]"}`}
            >
              Get in touch
            </NavCta>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={`relative hidden size-[60px] shrink-0 items-center justify-center rounded-lg max-[1180px]:flex ${
                isWhite ? "bg-[#080d10]/8" : "bg-white/[0.078]"
              }`}
            >
              <span
                className={`absolute left-[calc(50%-8px)] h-0.5 w-4 transition-all duration-300 ${isWhite ? "bg-[#080d10]" : "bg-white"}`}
                style={{ top: mobileOpen ? "calc(50% - 1px)" : "calc(50% - 4px)", transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)" }}
              />
              <span
                className={`absolute left-[calc(50%-8px)] h-0.5 w-4 transition-all duration-300 ${isWhite ? "bg-[#080d10]" : "bg-white"}`}
                style={{ top: mobileOpen ? "calc(50% - 1px)" : "calc(50% + 4px)", transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 bg-white text-[#080d10] transition-transform duration-300 max-[1180px]:block min-[1181px]:hidden"
        style={{ transform: mobileOpen ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pt-[85px] pb-5">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const hasAccordion = item.mega !== null;
              const isOpen = mobileAccordion === item.key;
              const count =
                item.key === "services"
                  ? SERVICES_GROUPS.reduce((n, g) => n + g.links.length, 0)
                  : item.key === "industries"
                    ? INDUSTRIES_LINKS.length
                    : item.key === "company"
                      ? COMPANY_LINKS.length
                      : null;
              return (
                <div key={item.key} className="border-t border-[#080d10]/8">
                  <div className="relative py-6 pr-10">
                    <Link href={item.href} onClick={closeMobile} className="flex items-center gap-2 text-2xl font-medium text-[#080d10]">
                      {item.label}
                      {item.sparkle && <SparkleAiIcon className="size-4" />}
                      {count !== null && <span className="text-base text-[#080d10]/40">{count}</span>}
                    </Link>
                    {hasAccordion && (
                      <button
                        type="button"
                        aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        onClick={() => setMobileAccordion(isOpen ? null : item.key)}
                        className="absolute right-0 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center"
                      >
                        <ChevronDownIcon
                          className="size-6 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)" }}
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
                          <div className="grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2">
                            {SERVICES_GROUPS.map((group) => (
                              <div key={group.label}>
                                <div className="text-xs font-semibold uppercase tracking-wide text-[#080d10]/70">
                                  {group.label}
                                </div>
                                <ul className="mt-4 flex flex-col gap-4">
                                  {group.links.map((link) => (
                                    <li key={link.label}>
                                      <Link href={link.href} onClick={closeMobile} className="text-sm font-semibold text-[#080d10]">
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="flex flex-col gap-4 pb-10">
                            {(item.key === "industries" ? INDUSTRIES_LINKS : COMPANY_LINKS).map((link) => (
                              <li key={link.label}>
                                <Link href={link.href} onClick={closeMobile} className="text-sm font-semibold text-[#080d10]">
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

          <div className="mt-auto flex flex-col gap-2 pt-5">
            <NavCta href="#contact" onClick={closeMobile} className="flex w-full justify-center bg-[#080d10] text-white hover:bg-[#ff7a00]">
              Get in touch
            </NavCta>
            <div className="grid grid-cols-2 gap-2">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                href="https://wa.me/48574758959"
                className="flex h-[72px] items-center justify-center rounded-lg bg-[#080d10]/5"
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
                className="flex h-[72px] items-center justify-center rounded-lg bg-[#080d10]/5"
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
    </>
  );
}
