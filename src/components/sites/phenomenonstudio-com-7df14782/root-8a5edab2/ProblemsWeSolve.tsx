import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const ROWS = [
  {
    question: "Need to meet tight deadlines but don't have enough hands on deck?",
    answer:
      "Hiring in-house takes months of job posts, resumes, and onboarding. We embed a dedicated senior designer or developer into your workflow without that wait, so your deadlines stop depending on recruiting.",
    cta: "Extend my team",
    href: "/service/team-extension",
    video: "Polina_1_sub.mp4",
    poster: "polina-team-cover.webp",
  },
  {
    question: "Your product needs to scale, but your user experience is holding you back?",
    answer:
      "As a digital product design agency, we know scaling starts with consistency. We build design systems and optimize your core flows, so rapid growth never compromises the experience.",
    cta: "Redesign my product",
    href: "/service/product-redesign",
    video: "Adam_2sub.mp4",
    poster: "adam-cover.webp",
  },
  {
    question: "Have big ideas but need to launch an MVP quickly?",
    answer:
      "Discovery sharpens your scope to what matters most, and pre-built development frameworks cut MVP timelines by up to 50%. You launch faster without sacrificing quality.",
    cta: "Launch my MVP",
    href: "/service/rapid-mvp-development",
    video: "Polina_3_sub.mp4",
    poster: "polina-mvp-cover.webp",
  },
];

export function ProblemsWeSolve() {
  return (
    <section className="bg-white py-24 sm:py-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Your Dedicated Product Design and Development Agency"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50"
        />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Building products is hard. Finding the right partner shouldn't be." />
        </h2>
      </div>

      <div className="mt-16 space-y-6">
        {ROWS.map((row, i) => (
          <div key={row.cta} className="sticky bg-white" style={{ top: `${80 + i * 16}px` }}>
            <div className="mx-auto max-w-[1440px] border-t border-[#080d10]/8 px-4 py-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
                <div className="lg:w-[28%]">
                  <p className="text-xl text-[#080d10] sm:text-2xl">{row.question}</p>
                </div>
                <div className="flex flex-col lg:w-[32%]">
                  <p className="font-body text-base text-[#080d10]/70">{row.answer}</p>
                  <div className="mt-auto pt-8">
                    <Button href={row.href} variant="orange">
                      {row.cta}
                    </Button>
                  </div>
                </div>
                <FadeUp className="lg:w-[32%]">
                  <video
                    className="w-full rounded-xl"
                    src={`${ASSET}/videos/${row.video}`}
                    poster={`${ASSET}/images/${row.poster}`}
                    autoPlay
                    playsInline
                    muted
                    loop
                  />
                </FadeUp>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
