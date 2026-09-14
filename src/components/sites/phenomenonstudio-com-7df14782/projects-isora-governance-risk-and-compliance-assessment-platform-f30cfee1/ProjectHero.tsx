import Image from "next/image";
import Link from "next/link";
import { Button } from "../shared/button";
import { RevealWords, FadeUp } from "../shared/reveal";
import { StatCardGrid } from "./StatCard";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/images";

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
          <span className="text-[#080d10]">Isora – optimizing governance, risk &amp; compliance for top institutions</span>
        </nav>

        <div className="mt-8 flex flex-wrap gap-2">
          {["SaaS", "Web app"].map((t) => (
            <span
              key={t}
              className="font-body rounded bg-[#080d10]/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#080d10]"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-6 text-[44px] font-medium leading-[1.1] tracking-tight text-[#080d10] sm:text-[64px] lg:text-[85px]">
          <RevealWords text="Isora – optimizing governance, risk & compliance for top institutions" />
        </h1>

        <div className="mt-8">
          <Button href="https://www.saltycloud.com" variant="orange" target="_blank">
            View live
          </Button>
        </div>

        <FadeUp className="mt-12 overflow-hidden rounded-2xl sm:mt-16">
          <Image
            src={`${ASSET}/hero-main.png.webp`}
            alt="Isora GRC platform overview"
            width={2752}
            height={1400}
            className="w-full object-cover"
            priority
          />
        </FadeUp>

        <div className="mt-8 sm:mt-12">
          <StatCardGrid variant="light" />
        </div>
      </div>
    </section>
  );
}
