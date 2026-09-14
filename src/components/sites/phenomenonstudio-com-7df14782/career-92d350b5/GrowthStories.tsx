import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";
import { StickyFadeRow } from "./StickyFadeRow";

const ASSET = "/sites/phenomenonstudio-com-7df14782/career-92d350b5";

const STORIES = [
  {
    label: "Vadym Stebakov – from front-end engineer to lead front-end engineer",
    story:
      "Vadym joined as a front-end developer in 2021 and, in four years, became lead front-end developer, now the person teammates rely on for strong architecture decisions, clear thinking, and calm technical leadership.",
    quoteName: "Unknown Capybara",
    quotePosition: "someone from Phenomenon",
    quoteAvatar: "av-3-1.png.webp",
    quoteText:
      "Vadym always brings something valuable to the table - a new idea, an example to remember, or a way to look at a task differently. He stays ahead of the tech curve and mentored me when I joined, which gave my skills and confidence a huge boost. It's simply great to work with him on the same project.",
    image: "Frame-1686557780.png.webp",
  },
  {
    label: "Artem Izmalkov — from senior product designer to lead product",
    story:
      "Artem joined as a senior product designer in 2022 and, in two years, became a lead product designer, bringing structured thinking, strong visual judgment, and mentorship that shapes the team's design quality.",
    quoteName: "Unidentified Raccoon",
    quotePosition: "someone from Phenomenon",
    quoteAvatar: "av-4-1.png.webp",
    quoteText:
      "Artem is my team lead - someone who always sets a high bar and makes you want to match it. After every conversation with him, I want to work even better and say 'that's the level!' a bit more often. He inspires me with how he thinks, how he sees design in a broader context, always supports and gives well-reasoned, actionable feedback.",
    image: "Frame-1686557781.png.webp",
  },
  {
    label: "Alyona Ostroverkh — from UX/UI designer to lead UX/UI designer",
    story:
      "Alyona joined Phenomenon Studio in 2021 as a UX/UI Designer and, after several years shaping complex interfaces and mentoring teammates, grew into the Lead UX/UI Designer role in 2024.",
    quoteName: "Unidentified Cat",
    quotePosition: "someone from Phenomenon",
    quoteAvatar: "av-3-1.png.webp",
    quoteText:
      "Alyona is my team lead and mentor — a brilliant professional and a truly inspiring woman. Her voice is always calm, she knows how to stay focused, think strategically, and support you at the same time.",
    image: "Frame-1686557782.png.webp",
  },
];

export function GrowthStories() {
  return (
    <section className="rounded-[32px] bg-[#080d10] py-24 text-white sm:py-32 lg:rounded-[80px] lg:py-[200px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Our key strength"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-white/60"
        />
        <h2 className="mt-4 max-w-[1040px] text-[40px] leading-[1.15] font-medium tracking-tight text-white sm:text-[52px] lg:text-[68px]">
          <RevealWords text="We build leaders from within - for a reason" />
        </h2>
        <FadeUp>
          <p className="mt-8 max-w-[706px] text-lg leading-snug text-white/70 sm:text-xl lg:text-[23px]">
            Many of our Team Leads and Heads have grown within the company. That means when you join, you&apos;ll
            learn from people who understand the work, the culture, and what it takes to advance, and who are
            invested in helping you get there. You&apos;ll have mentorship from your first day and an individual
            growth plan after probation.
          </p>
        </FadeUp>
      </div>

      <div className="mt-14 lg:mt-24">
        {STORIES.map((s) => (
          <StickyFadeRow key={s.label} className="border-t border-white/10 bg-[#080d10]">
            <div className="mx-auto max-w-[1440px] px-4 py-10 lg:py-16">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:w-[337px] lg:shrink-0 lg:pr-6">
                  <p className="text-xl leading-snug text-white sm:text-2xl">{s.label}</p>
                </div>
                <div className="flex flex-col lg:max-w-[657px]">
                  <p className="text-lg leading-snug text-white sm:text-xl">{s.story}</p>
                  <div className="mt-10 rounded-2xl bg-[#272727] p-6 sm:p-7">
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${ASSET}/images/${s.quoteAvatar}`}
                        alt={s.quoteName}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm text-white">{s.quoteName}</div>
                        <div className="text-sm text-white/70">{s.quotePosition}</div>
                      </div>
                    </div>
                    <p className="mt-6 text-lg leading-snug text-white sm:text-xl">{s.quoteText}</p>
                  </div>
                </div>
                <div className="lg:w-[337px] lg:shrink-0">
                  <Image
                    src={`${ASSET}/images/${s.image}`}
                    alt={s.label}
                    width={337}
                    height={487}
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </StickyFadeRow>
        ))}
      </div>
    </section>
  );
}
