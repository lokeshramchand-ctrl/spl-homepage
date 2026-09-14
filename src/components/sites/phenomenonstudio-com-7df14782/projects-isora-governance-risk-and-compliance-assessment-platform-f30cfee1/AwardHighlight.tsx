import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/images";

export function AwardHighlight() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Awards" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <FadeUp className="mt-12 overflow-hidden rounded-2xl bg-[#f4f5f4] sm:mt-16">
          <h3 className="px-6 pt-6 text-2xl font-medium tracking-tight text-[#080d10] sm:px-8 sm:pt-8 sm:text-4xl">
            <RevealWords text="UX Design Awards - Nomination 2024" />
          </h3>
          <Image
            src={`${ASSET}/award-nomination.png.webp`}
            alt="UX Design Awards nomination 2024"
            width={702}
            height={702}
            className="mt-6 w-full object-cover sm:mt-8"
          />
        </FadeUp>
      </div>
    </section>
  );
}
