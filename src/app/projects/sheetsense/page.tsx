import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import firstPage from "@/assets/AI-OCR/firstpage.png";
import darkMode from "@/assets/AI-OCR/mainpage_darkmode.png";
import lightMode from "@/assets/AI-OCR/mainpage_lightmode.png";
import secondPage from "@/assets/AI-OCR/secondpage.png";
import thirdPage from "@/assets/AI-OCR/thirdpage.png";
import { CtaBand } from "@/components/sites/splsystems/cta-band";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { ArrowUpRightIcon } from "@/components/sites/splsystems/icons";
import { InView, Reveal, RevealWords, SectionLabel } from "@/components/sites/splsystems/reveal";

export const metadata: Metadata = {
  title: "SheetSense",
  alternates: { canonical: "/projects/sheetsense" },
  description:
    "SheetSense is a self-hosted, Ollama-powered document text extraction service with a web UI, deployed on a Proxmox LXC container with GPU acceleration.",
};

const LIVE_URL = "https://ai.splsystems.in";

const META: { label: string; lines: string[] }[] = [
  { label: "Role", lines: ["Server Admin, Scale Engineer"] },
  { label: "Frontend stack", lines: ["OpenWebUI", "Open source self-hosted UI"] },
  { label: "Data & APIs", lines: ["Ollama API", "Encoded image data"] },
  { label: "Deployment", lines: ["LXC Containers", "Bash scripts"] },
];

const SHOWCASE: { n: string; caption: string; alt: string; image: StaticImageData }[] = [
  {
    n: "01",
    caption: "Drag-and-drop image upload with real-time preview and validation capabilities.",
    alt: "Image upload interface and preview",
    image: firstPage,
  },
  {
    n: "02",
    caption: "Seamless API integration with self-hosted Ollama for intelligent text extraction.",
    alt: "API request processing and OCR pipeline",
    image: secondPage,
  },
  {
    n: "03",
    caption: "Extracted text display, editing, and export workflows with batch processing support.",
    alt: "Text extraction results and export options",
    image: thirdPage,
  },
  { n: "04", caption: "Light mode.", alt: "SheetSense light mode preview", image: lightMode },
  { n: "05", caption: "Dark mode.", alt: "SheetSense dark mode preview", image: darkMode },
];

export default function SheetSensePage() {
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
                <RevealWords text="SheetSense" />
              </h1>
              <Reveal as="p" stagger={1} className="max-w-[640px] text-xs font-medium uppercase tracking-[-0.03em] text-[#181818]">
                Self-hosted Ollama-powered document text extraction with web UI
              </Reveal>
              <Reveal as="p" stagger={2} className="max-w-[760px] text-base font-medium leading-[1.3] tracking-[-0.03em] text-[#181818]/50">
                This solution provides a self-hosted OCR service using Ollama&apos;s open-source models, deployed on a
                Proxmox LXC container with GPU acceleration for fast processing. A scalable reverse proxy setup allows
                multiple clients to access the API-based OCR functionality securely, enabling instant results via HTTP
                requests. The system includes an intuitive OpenWebUI frontend, which can be hosted on your company
                website to let users interact with the OCR service directly. The architecture supports multi-user access
                and leverages Proxmox&apos;s flexibility for easy scaling.
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
                      alt={s.alt}
                      fill
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
