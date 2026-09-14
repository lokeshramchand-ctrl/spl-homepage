import { RevealWords, ScrambleText } from "../shared/reveal";
import { StickyFadeRow } from "./StickyFadeRow";

const VALUES = [
  {
    num: "01",
    label: "Thoughtful and open-minded",
    heading: "We listen deeply and challenge our own assumptions",
    body: "This is about avoiding superficial, knee-jerk conclusions. We listen, question our own assumptions, and stand up for the objective outcome, not for ourselves or being “personally right.",
  },
  {
    num: "02",
    label: "Genuinely friendly",
    heading: "Built on honesty and mutual respect",
    body: "Honesty and unforced mutual respect in the team. We strive to create a space where everyone feels seen and respected – a place to grow as a professional and as a person while staying true to oneself.",
  },
  {
    num: "03",
    label: "Responsible and accountable",
    heading: "From both the team and the company",
    body: "It's not only what we expect from employees; it's the company's readiness to model the same values toward employees, clients, and partners.",
  },
  {
    num: "04",
    label: "Growth-oriented",
    heading: "Your development is part of the plan",
    body: "We recognize people as our most important asset, support their development, and constantly improve both the team and the studio's processes.",
  },
  {
    num: "05",
    label: "Proactive and adaptable",
    heading: "You don't need permission to make things better",
    body: "We spot opportunities and propose solutions, even for small, local fixes. Tactical improvements open the door to strategic change.",
  },
  {
    num: "06",
    label: "Client-focused",
    heading: "We solve problems that matter",
    body: "Helping create tangible value for a client's business is our primary way of driving the company's growth and each person's opportunities",
  },
  {
    num: "07",
    label: "Knowledgeable and collaborative",
    heading: "Deep expertise shared across the team",
    body: "We're oriented toward end results, and active knowledge-sharing matters to us because we aim for every specialist to develop deep expertise in their field.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-[200px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="What guides us"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50"
        />
        <h2 className="mt-4 max-w-[1040px] text-[40px] leading-[1.15] font-medium tracking-tight text-[#080d10] sm:text-[52px] lg:text-[68px]">
          <RevealWords text="Values we stand for" />
        </h2>
      </div>

      <div className="mt-10 space-y-0 lg:mt-16">
        {VALUES.map((v) => (
          <StickyFadeRow key={v.num} className="border-t border-[#080d10]/10 bg-white">
            <div className="mx-auto max-w-[1440px] px-4 py-10 lg:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between">
                <div className="flex flex-col lg:w-[344px] lg:shrink-0">
                  <p className="mb-6 text-xl leading-snug text-[#080d10] sm:text-2xl">{v.label}</p>
                  <div className="mt-auto hidden text-2xl text-[#080d10]/40 sm:block">{v.num}</div>
                </div>
                <div className="flex flex-col lg:max-w-[671px]">
                  <h3 className="text-2xl leading-tight font-medium text-[#080d10] sm:text-3xl lg:text-[40px]">
                    {v.heading}
                  </h3>
                  <p className="mt-4 text-lg leading-snug text-[#080d10] sm:text-xl">{v.body}</p>
                </div>
              </div>
            </div>
          </StickyFadeRow>
        ))}
      </div>
    </section>
  );
}
