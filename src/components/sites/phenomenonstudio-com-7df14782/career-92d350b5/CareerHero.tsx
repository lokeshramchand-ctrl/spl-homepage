import { Button } from "../shared/button";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const STATS = [
  { value: "5+", label: "locations across europe & north america" },
  { value: "120+", label: "launched products" },
  { value: "$500M+", label: "raised by our clients" },
  { value: "7+", label: "years in the market" },
  { value: "70+", label: "professionals on board" },
  { value: "40+", label: "industry-recognized awards" },
];

export function CareerHero() {
  return (
    <section className="rounded-b-[32px] bg-[#080d10] pt-28 pb-16 text-white sm:rounded-b-[64px] sm:pt-40 sm:pb-24 lg:rounded-b-[80px] lg:pt-[204px] lg:pb-[150px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Careers at SPL Systems"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-white/70"
        />
        <h1 className="mt-6 max-w-[1040px] text-[40px] leading-[1.15] font-medium tracking-tight sm:text-[52px] lg:text-[68px]">
          <RevealWords text="Build phenomenal products. Join SPL Systems." />
        </h1>
        <FadeUp>
          <p className="mt-8 max-w-[706px] text-lg leading-snug text-white/70 sm:text-xl lg:text-[23px]">
            If you have a quality-first mindset and want to build products that matter, bring your expertise and
            curiosity to our team. Here, you&apos;ll have the space and ownership to turn your best ideas into
            reality!
          </p>
        </FadeUp>
        <FadeUp className="mt-6">
          <Button href="https://phenomenonstudio.hurma.work/public-vacancies" variant="orange" target="_blank">
            Explore Open Vacancies
          </Button>
        </FadeUp>

        <div className="mt-14 border-t border-white/10 pt-8 sm:mt-16 lg:mt-[60px] lg:pt-8">
          <ScrambleText
            text="SPL Systems in facts and numbers"
            as="p"
            className="font-body mb-6 text-xs font-semibold uppercase tracking-wide text-white/60"
          />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {STATS.map((s) => (
              <FadeUp key={s.label} className="flex flex-col items-center text-center">
                <div className="text-4xl font-medium sm:text-5xl">{s.value}</div>
                <p className="font-body mt-1 text-sm text-white/60 lowercase">{s.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
