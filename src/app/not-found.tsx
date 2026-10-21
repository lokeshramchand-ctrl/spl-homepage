import type { Metadata } from "next";
import { SheenText } from "@/components/sites/splsystems/contact/sheen-text";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { HeroLiquid } from "@/components/sites/splsystems/hero-liquid/HeroLiquid";
import { InView, Reveal, WipeButton, WipeLink } from "@/components/sites/splsystems/reveal";

// Overrides the root layout's "index, follow", which would otherwise be
// emitted alongside Next's own noindex for 404s.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS: { label: string; href: string }[] = [
  { label: "Projects & Expertise", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact us", href: "/contact" },
];

/** Catches every unmatched URL (single root layout) as well as notFound() calls. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        {/* Same composition as the home hero: logo-colour bands on the right,
            copy bottom-left. */}
        <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-16 pt-[117px] md:px-10 md:pb-24">
          <HeroLiquid fallbackTone="light" />
          <InView className="relative mx-auto flex w-full max-w-[1800px] flex-col gap-8 md:gap-10">
            <Reveal as="p" className="text-xs font-medium tracking-[-0.03em] text-[#181818]/60">
              Error 404
            </Reveal>
            <SheenText
              as="h1"
              shader
              text="404"
              className="text-[7rem] font-medium leading-[0.85] tracking-[-0.04em] text-[#181818] md:text-[14rem]"
            />
            <Reveal
              as="p"
              stagger={1}
              className="max-w-[22ch] text-[1.75rem] font-medium leading-[1.1] tracking-[-0.016em] text-[#181818] md:text-[2.5rem]"
            >
              This page drifted off course.
            </Reveal>
            <Reveal
              as="p"
              stagger={2}
              className="max-w-[44ch] text-[1rem] leading-[1.3] tracking-[-0.03em] text-[#181818]/60"
            >
              The link may be broken, or the page may have moved. Head back home, or pick up from one of these.
            </Reveal>
            {/* Not wrapped in Reveal: its animated layer isolates the wipe
                button's mix-blend-mode label, which then renders white. */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <WipeButton href="/" className="w-fit text-[0.95rem] text-[#181818]">
                Back to home
              </WipeButton>
              <nav aria-label="Popular pages">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[1rem] tracking-[-0.03em] text-[#181818]">
                  {LINKS.map((link) => (
                    <li key={link.href}>
                      <WipeLink href={link.href}>{link.label}</WipeLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </InView>
        </section>
      </main>
      <Footer />
    </>
  );
}
