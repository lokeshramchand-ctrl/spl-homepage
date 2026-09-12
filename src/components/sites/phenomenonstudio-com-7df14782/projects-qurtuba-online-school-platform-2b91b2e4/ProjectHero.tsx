import Image from "next/image";
import Link from "next/link";
import { Button } from "../shared/button";
import { RevealWords, FadeUp } from "../shared/reveal";
import { StatCardGrid } from "./StatCard";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images";

const TECH_LOGOS = [
  "tech-typescript.png.webp",
  "tech-react.png.webp",
  "tech-vite.png.webp",
  "tech-mui.png.webp",
  "tech-redux.png.webp",
  "tech-i18next.png.webp",
  "tech-firebase.png.webp",
  "tech-auth0.png.webp",
  "tech-nestjs.png.webp",
];

export function ProjectHero() {
  return (
    <section className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <nav className="font-body flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#080d10]/70">
          <Link href="/" className="hover:text-[#080d10]">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#080d10]">
            Projects
          </Link>
          <span>/</span>
          <span className="text-[#080d10]">Qurtuba – online school platform</span>
        </nav>

        <div className="mt-8 flex flex-wrap gap-2">
          {["Education", "Web app"].map((t) => (
            <span
              key={t}
              className="font-body rounded bg-[#080d10]/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#080d10]"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-6 text-[44px] font-medium leading-[1.1] tracking-tight text-[#080d10] sm:text-[64px] lg:text-[85px]">
          <RevealWords text="Qurtuba – online school platform" />
        </h1>

        <div className="mt-8">
          <Button href="https://www.qurtubaonline.com/" variant="orange" target="_blank">
            View website
          </Button>
        </div>

        <FadeUp className="mt-12 overflow-hidden rounded-2xl sm:mt-16">
          <Image
            src={`${ASSET}/hero-main.png.webp`}
            alt="Qurtuba online school platform overview"
            width={2560}
            height={1378}
            className="w-full object-cover"
            priority
          />
        </FadeUp>

        <div className="mt-8 sm:mt-12">
          <StatCardGrid />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#080d10]/8 pt-10 sm:mt-24 sm:grid-cols-3 sm:pt-12">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">Overview</p>
            <h2 className="mt-3 max-w-md text-2xl font-medium text-[#080d10] sm:text-3xl">
              Innovative and affordable quality-driven online pre-K to 12 school
            </h2>
            <p className="font-body mt-4 max-w-md text-sm text-[#080d10]/70">
              We were entrusted with the exciting challenge of creating an innovative platform that reflects
              Qurtuba&apos;s commitment to delivering quality-driven and Islamic value-based education. Our goal
              was to design an engaging and user-friendly experience that connects educators, parents, and
              students, ensuring transparency, progress tracking, and notable results in online learning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:col-span-2 sm:grid-cols-3">
            <div>
              <div className="font-body text-xs uppercase text-[#080d10]/50">Client</div>
              <p className="font-body mt-3 text-sm text-[#080d10]">Qurtuba</p>
              <p className="font-body text-sm text-[#080d10]/70">Johannesburg, South Africa</p>
            </div>
            <div>
              <div className="font-body text-xs uppercase text-[#080d10]/50">Services</div>
              <p className="font-body mt-3 text-sm text-[#080d10]">#UX audit #Product redesign #web Development</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-body text-xs uppercase text-[#080d10]/50">Technologies</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {TECH_LOGOS.map((logo) => (
                  <div key={logo} className="flex size-8 items-center justify-center rounded bg-[#080d10]/[0.04]">
                    <Image src={`${ASSET}/${logo}`} alt="" width={20} height={20} className="h-4 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
