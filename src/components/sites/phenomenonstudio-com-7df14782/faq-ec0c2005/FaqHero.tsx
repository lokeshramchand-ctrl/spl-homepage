import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

export function FaqHero() {
  return (
    <section className="rounded-b-[32px] bg-[#080d10] pt-28 pb-16 text-white sm:rounded-b-[64px] sm:pt-40 sm:pb-24 lg:rounded-b-[80px] lg:pt-[204px] lg:pb-[150px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Questions and answers"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-white/70"
        />
        <h1 className="mt-6 max-w-[1040px] text-[40px] leading-[1.15] font-medium tracking-tight sm:text-[52px] lg:text-[68px]">
          <RevealWords text="Answers to the most common questions about our process, team, and development approach" />
        </h1>
        <FadeUp>
          <p className="mt-8 max-w-[706px] text-lg leading-snug text-white/70 sm:text-xl lg:text-[23px]">
            A quick overview of how we work, communicate, build products, and support growing companies at every
            stage.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
