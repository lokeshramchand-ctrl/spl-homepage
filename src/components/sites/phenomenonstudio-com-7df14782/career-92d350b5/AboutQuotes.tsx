import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/career-92d350b5";

const QUOTES = [
  {
    quote:
      "We have a very close-knit team. There's no judgment here - you can always ask for help, and that's something I truly value.",
    name: "Valeria Varlamova",
    role: "Project Manager",
    avatar: "av-5.png.webp",
  },
  {
    quote:
      "You can feel inspiration and support from everyone on the team. My biggest source of motivation comes from the team as a whole - like one living, breathing organism.",
    name: "Serhii Feshchyk",
    role: "UI/UX Designer",
    avatar: "av-1-1.png.webp",
  },
  {
    quote:
      "Almost everyone I work closely with inspires me in their own way. Everyone values their work, and what unites us is openness. Each person adds something unique that helps our processes grow and the team stay supported.",
    name: "Olga Apanasenko",
    role: "Sales Operations",
    avatar: "av-2-1.png.webp",
  },
];

export function AboutQuotes() {
  return (
    <section className="bg-white pt-24 sm:pt-32 lg:pt-[200px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="A bit more about us"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50"
        />
        <h2 className="mt-4 max-w-[1040px] text-[40px] leading-[1.15] font-medium tracking-tight text-[#080d10] sm:text-[52px] lg:text-[68px]">
          <RevealWords text="Started by designers who sweat every pixel" />
        </h2>
        <FadeUp>
          <div className="mt-8 max-w-[674px] space-y-4 text-lg leading-snug text-[#080d10]/70 sm:text-xl lg:mt-12 lg:text-[23px]">
            <p>
              Phenomenon Studio was founded in 2019 as a small group of designers obsessed with grounding exquisite
              design in clear logic while infusing high-end aesthetics into every pixel.
            </p>
            <p>
              Today, we&apos;re an award-winning product design and development agency of 70+ incredibly talented
              people collaborating with global startups and SMEs that demand excellence in work, quality in
              execution, and maturity in operations – the same qualities we look for when we hire.
            </p>
          </div>
        </FadeUp>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-4 lg:mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {QUOTES.map((q, i) => (
            <FadeUp
              key={q.name}
              delayMs={i * 100}
              className={`flex flex-col border-t border-[#080d10]/10 pt-8 sm:border-t-0 sm:pt-0 ${
                i > 0 ? "sm:border-l sm:border-[#080d10]/10 sm:pl-8" : ""
              }`}
            >
              <p className="flex-1 text-lg leading-snug text-[#080d10] sm:text-xl lg:text-[23px]">{q.quote}</p>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={`${ASSET}/images/${q.avatar}`}
                  alt={q.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm text-[#080d10]">{q.name}</div>
                  <div className="text-sm text-[#080d10]/70">{q.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
