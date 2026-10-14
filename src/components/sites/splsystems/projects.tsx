import Link from "next/link";
import { ArrowUpRightIcon } from "./icons";
import { InView, Reveal } from "./reveal";

const CARDS = [
  {
    title: "SheetSense",
    description:
      "Reads and recognizes numbers, characters and barcode IDs on paper sheets, turning scanned documents into structured data.",
  },
  {
    title: "ZoningLens",
    description:
      "A multimodal search experience for real estate listings, combining text and imagery to surface the right property faster.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative flex min-h-svh flex-col justify-center px-5 py-20 md:px-10 md:py-28">
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-24">
        <div className="border-t border-[#18181833] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-[#18181899]">
          Projects
        </div>

        <InView className="flex flex-col gap-6">
          <Reveal as="div" stagger={0}>
            <h2 className="text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-[#181818] md:text-[3rem]">
              Products we have built
            </h2>
          </Reveal>
          <Reveal as="p" stagger={1} className="max-w-[46ch] text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#18181899]">
            Practical, production-ready software for real operational problems. More projects will be added soon.
          </Reveal>
        </InView>

        <InView className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              as="div"
              stagger={i}
              className="cc-row cc-row-light border-t border-[#18181833] pt-8"
            >
              <h3 className="text-[1.75rem] font-medium tracking-[-0.02em] text-[#181818] md:text-[2rem]">
                {card.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-[1.4] tracking-[-0.01em] text-[#18181899]">
                {card.description}
              </p>
            </Reveal>
          ))}
        </InView>

        <InView>
          <Reveal as="div" stagger={0}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium tracking-[-0.02em] text-[#181818] underline decoration-[#181818]/40 underline-offset-4 transition-[text-decoration-color] duration-300 hover:decoration-[#181818]"
            >
              View projects &amp; expertise
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </InView>
      </div>
    </section>
  );
}
