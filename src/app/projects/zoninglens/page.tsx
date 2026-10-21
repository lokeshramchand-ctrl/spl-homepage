import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import darkMode from "@/assets/AI-RealEstate/darkmode.png";
import lightMode from "@/assets/AI-RealEstate/lightmode.png";
import { CtaBand } from "@/components/sites/splsystems/cta-band";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { ArrowUpRightIcon } from "@/components/sites/splsystems/icons";
import { InView, Reveal, RevealWords, SectionLabel } from "@/components/sites/splsystems/reveal";

export const metadata: Metadata = {
  title: "ZoningLens",
  alternates: { canonical: "/projects/zoninglens" },
  description:
    "ZoningLens is a lightweight React + GeoJSON mapping interface for San Diego, built with OpenLayers to make geospatial exploration accessible without specialized GIS tooling.",
};

const LIVE_URL = "https://real-estate-tool.deploy.priyatham.in/";

const META: { label: string; lines: string[] }[] = [
  { label: "Role", lines: ["Frontend & Mapping Interface Engineering"] },
  { label: "Frontend stack", lines: ["React (TypeScript)", "Vite + OpenLayers"] },
  { label: "Data & APIs", lines: ["GeoJSON Layers", "LegiScan-ready API integration"] },
  { label: "Deployment", lines: ["Docker + Compose", "Jenkins CI/CD"] },
];

// Animated GIFs live in public/ and are served as-is: importing ~37 MB of GIFs
// would make Turbopack hash and copy them on every cold compile, and the image
// optimizer passes animated files through untouched anyway.
const GIF_DIR = "/sites/splsystems/images/projects/zoninglens";

const SHOWCASE: { n: string; caption: string; image: StaticImageData | string }[] = [
  { n: "01", caption: "Load and visualize GeoJSON datasets directly in the browser using OpenLayers.", image: `${GIF_DIR}/first-animation.gif` },
  { n: "02", caption: "Main workspace with zoning layers, base tiles, and clean controls.", image: `${GIF_DIR}/mainpage.gif` },
  { n: "03", caption: "Switch between vector layers and custom overlays from the left sidebar.", image: `${GIF_DIR}/leftsidebar.gif` },
  { n: "04", caption: "Search, marker interaction, and parcel details in the right sidebar.", image: `${GIF_DIR}/rightsidebar.gif` },
  { n: "05", caption: "Prompting chat interface with the zones pretrained.", image: `${GIF_DIR}/spatial-chat.gif` },
  { n: "06", caption: "Light mode.", image: lightMode },
  { n: "07", caption: "Dark mode.", image: darkMode },
];

export default function ZoningLensPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="px-5 pb-16 pt-[117px] md:px-8 md:pb-24">
          <div className="mx-auto max-w-[1800px]">
            <InView className="flex flex-col gap-6 pb-12 md:pb-20">
              <Link
                href="/projects"
                className="group inline-flex w-fit items-center gap-2 text-xs font-medium tracking-[-0.03em] text-[#181818]/50 transition-colors hover:text-[#181818]"
              >
                <ArrowUpRightIcon className="h-3 w-3 -rotate-[135deg]" />
                Projects
              </Link>
              <h1 className="text-[2.5rem] font-medium leading-none tracking-[-0.016em] text-[#181818] md:text-[4rem]">
                <RevealWords text="ZoningLens" />
              </h1>
              <Reveal as="p" stagger={1} className="max-w-[640px] text-xs font-medium uppercase tracking-[-0.03em] text-[#181818]">
                Lightweight React + GeoJSON mapping interface based on San Diego
              </Reveal>
              <Reveal as="p" stagger={2} className="max-w-[760px] text-base font-medium leading-[1.3] tracking-[-0.03em] text-[#181818]/50">
                ZoningLens is a lightweight React + GeoJSON based mapping interface built to make geospatial exploration
                accessible without specialized GIS tooling. The platform renders GeoJSON layers in-browser with
                OpenLayers, supports dynamic layer toggling, marker overlays, search workflows, and API-ready
                integrations for external data such as legislation or statistics. The architecture is modular and
                production-friendly, with Vite + TypeScript on the frontend and containerized deployment workflows using
                Docker, Docker Compose, and Jenkins for reliable CI/CD.
              </Reveal>
            </InView>

            <InView className="grid grid-cols-1 gap-x-4 gap-y-8 border-t border-[#181818]/30 pt-8 sm:grid-cols-2 md:grid-cols-4">
              {META.map((m, i) => (
                <Reveal key={m.label} as="div" stagger={i} className="flex flex-col gap-2">
                  <h2 className="text-xs font-medium uppercase tracking-[-0.03em] text-[#181818]/50">{m.label}</h2>
                  {m.lines.map((line) => (
                    <p key={line} className="text-base font-medium leading-[1.3] tracking-[-0.03em] text-[#181818]">
                      {line}
                    </p>
                  ))}
                </Reveal>
              ))}
            </InView>

            <InView className="pt-12">
              <Reveal as="div" stagger={0}>
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border-b border-[#181818] pb-2 text-[0.95rem] font-medium tracking-[-0.03em] text-[#181818]"
                >
                  Main site
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            </InView>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-8 md:pb-40">
          <div className="mx-auto max-w-[1800px]">
            <SectionLabel>Showcase</SectionLabel>
            <div className="flex flex-col gap-16 pt-16 md:gap-24 md:pt-24">
              {SHOWCASE.map((s) => (
                <InView key={s.n} className="group flex flex-col gap-4">
                  <Reveal
                    as="div"
                    stagger={0}
                    className="relative aspect-[16/9] overflow-hidden rounded-[4px] border border-[#181818]/10 bg-white bg-[linear-gradient(to_right,rgb(24_24_24/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(24_24_24/0.07)_1px,transparent_1px)] bg-[size:48px_48px]"
                  >
                    <Image
                      src={s.image}
                      alt={s.caption}
                      fill
                      unoptimized={typeof s.image === "string"}
                      sizes="(min-width: 1800px) 1736px, 100vw"
                      className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="absolute left-4 top-4 text-xs font-medium tracking-[-0.03em] text-[#181818]">{s.n}</span>
                  </Reveal>
                  <Reveal as="p" stagger={1} className="max-w-[640px] text-xs font-medium uppercase tracking-[-0.03em] text-[#181818]">
                    {s.caption}
                  </Reveal>
                </InView>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
