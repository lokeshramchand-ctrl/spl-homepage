import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { ArrowUpRightIcon } from "@/components/sites/splsystems/icons";
import { MetallicSwirl } from "@/components/sites/splsystems/metallic-swirl/MetallicSwirl";
import { METALLIC_SWIRL_DEFAULTS, type MetallicSwirlParams } from "@/components/sites/splsystems/metallic-swirl/shaders";
import { ProjectArt } from "@/components/sites/splsystems/project-art";
import { SheenText } from "@/components/sites/splsystems/contact/sheen-text";
import { InView, Reveal, RevealWords, SectionLabel } from "@/components/sites/splsystems/reveal";

export const metadata: Metadata = {
  title: "Projects & Expertise",
  alternates: { canonical: "/projects" },
  description: "Over 10 years of building high-performance digital infrastructure for ambitious enterprises.",
};

// Live props of the source hero's <MetallicSwirl>, read from its React fiber.
const HERO_SWIRL: MetallicSwirlParams = {
  ...METALLIC_SWIRL_DEFAULTS,
  speed: 0.13, zoom: 2.53, iterations: 5, sampleGap: 0.141, tangentForce: 1.7, gradientForce: 0.51,
  centerX: 0.05, centerY: 0.88, radialMix: 1, beams: 2, beamWidth: 0.62, radialStretch: -0.16, radialFlow: 1.61,
  radialSpin: -0.24, twist: 0.47, vortex: -0.07, hole: 1, colorA: "#ffffffff", colorB: "#00000000",
  colorC: "#dfeaff00", softness: 0.34, shiftRed: -0.7, shiftBlue: -0.59, repetition: 1.14, stripeFlow: 0.99,
  spread: 0.02, bandWidth: 0.1, threshold: 0.72, detailFade: 1, backgroundColor: "#000000", fadeTop: 0.17, fadeBottom: 0,
};

// Each tile gets its own line-art (see ProjectArt), indexed by position.
const PROJECTS: {
  n: string;
  title: string;
  body: string;
  span: string;
  href?: string;
}[] = [
  {
    n: "01",
    title: "SheetSense",
    body: "Reads and recognizes numbers and characters on paper sheets and barcode IDs.",
    span: "md:col-span-4 md:row-span-2",
    href: "/projects/sheetsense",
  },
  {
    n: "02",
    title: "ZoningLens",
    body: "A lightweight React + GeoJSON mapping interface for San Diego zoning, built on OpenLayers.",
    span: "md:col-span-2",
    href: "/projects/zoninglens",
  },
];

const EXPERTISE = [
  {
    title: "Services.\nCustom Software & Automation",
    body: "Web applications, enterprise systems, AI-powered platforms, mobile and cross-platform apps, automation tools and workflow systems, scalable, secure and designed for tomorrow.",
  },
  {
    title: "Industries.\nFinance, Real Estate, Government & Education",
    body: "Over 10 years at the forefront of digital transformation, building high-performance digital infrastructure for ambitious enterprises.",
  },
];

export default function ProjectsExpertisePage() {
  return (
    <>
      <Header tone="light" />
      <main className="flex-1 bg-white">
        <section className="cc-sheen-on-dark relative flex min-h-svh flex-col overflow-hidden bg-black px-5 pb-20 pt-[117px] text-white md:min-h-[1371px] md:px-8">
          <MetallicSwirl params={HERO_SWIRL} className="z-0" />
          <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-1 flex-col">
            <InView className="flex flex-col gap-6">
              <SheenText
                as="h1"
                shader
                text="Projects & Expertise"
                className="max-w-[480px] text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] md:text-[4rem]"
              />
              <Reveal as="p" stagger={1} className="max-w-[389px] text-[1rem] font-medium leading-[1.3] tracking-[-0.03em] text-white/50">
                Engineering the Intelligent Future. High-performance digital infrastructure for ambitious enterprises.
              </Reveal>
            </InView>

            <div className="mt-24 flex flex-col items-center gap-10 md:mt-[160px] md:gap-12">
              <div className="w-full border-t border-white/30 pt-4 text-center text-xs font-medium tracking-[-0.03em]">
                Expertise
              </div>
              <InView className="flex flex-col items-center gap-10 text-center">
                <h2 className="max-w-[20ch] text-[2.25rem] font-medium leading-[1.05] tracking-[-0.02em] md:text-[3rem]">
                  <RevealWords text="Over 10 years at the forefront of digital transformation." />
                </h2>
                <Reveal as="p" stagger={1} className="max-w-[440px] text-[1.5rem] font-medium leading-[1.1] tracking-[-0.03em] md:text-[2rem]">
                  Scalable, secure, and designed for tomorrow.
                </Reveal>
                <Reveal as="div" stagger={2}>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 border-b border-white pb-2 text-[0.95rem] font-medium tracking-[-0.03em]"
                  >
                    Get a free consultation
                    <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Reveal>
              </InView>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-8 md:pb-40">
          <div className="mx-auto max-w-[1800px]">
            <SectionLabel>Projects</SectionLabel>
            <InView className="py-16 md:py-32">
              <h2 className="text-center text-[2.5rem] font-medium leading-none tracking-[-0.016em] text-[#181818] md:text-[4rem]">
                <RevealWords text="Our projects" />
              </h2>
            </InView>
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-y-12">
              {PROJECTS.map((p, i) => (
                <InView key={p.n} className={`group relative flex min-h-[320px] flex-col gap-4 ${p.span}`}>
                  <Reveal
                    as="div"
                    stagger={0}
                    className="relative min-h-[260px] flex-1 overflow-hidden rounded-[4px] border border-[#181818]/10 bg-white bg-[linear-gradient(to_right,rgb(24_24_24/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(24_24_24/0.07)_1px,transparent_1px)] bg-[size:48px_48px]"
                  >
                    <ProjectArt
                      variant={i}
                      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 text-xs font-medium tracking-[-0.03em] text-[#181818]">{p.n}</span>
                  </Reveal>
                  <div className="flex flex-col gap-2">
                    <Reveal as="h3" stagger={1} className="text-[1.5rem] font-medium leading-[1.2] tracking-[-0.03em] text-[#181818]">
                      {p.href ? (
                        <Link href={p.href} className="inline-flex items-center gap-2 after:absolute after:inset-0">
                          {p.title}
                          <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      ) : (
                        p.title
                      )}
                    </Reveal>
                    <Reveal as="p" stagger={2} className="max-w-[440px] text-base font-medium leading-[1.3] tracking-[-0.03em] text-[#181818]/50">
                      {p.body}
                    </Reveal>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-8 md:pb-32">
          <div className="mx-auto max-w-[1800px]">
            <SectionLabel>Expertise</SectionLabel>
            <InView className="flex flex-col items-center gap-6 py-16 text-center md:py-24">
              <h2 className="text-[2.5rem] font-medium leading-none tracking-[-0.016em] text-[#181818] md:text-[4rem]">
                <RevealWords text="What we do" />
              </h2>
              <Reveal as="p" stagger={1} className="max-w-[440px] text-base font-medium leading-[1.3] tracking-[-0.03em] text-[#181818]/50">
                Think, Create, Build, Grow.
              </Reveal>
            </InView>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
              {EXPERTISE.map((e) => (
                <InView key={e.title} className="flex flex-col items-center gap-6 border-t border-[#181818]/15 pt-16 text-center">
                  <h3 className="whitespace-pre-line text-[2rem] font-medium leading-[1.2] tracking-[-0.03em] text-[#181818]">{e.title}</h3>
                  <p className="max-w-[712px] text-base font-medium leading-[1.3] tracking-[-0.03em] text-[#181818]/50">{e.body}</p>
                  <Link
                    href="/contact"
                    className="group mt-12 flex w-full items-center justify-between border-b border-[#181818]/30 pb-2 text-xs font-medium tracking-[-0.03em] text-[#181818] transition-colors duration-300 hover:border-[#181818]"
                  >
                    Contact us for more information
                    <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </InView>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
