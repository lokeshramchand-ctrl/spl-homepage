import { InView, Reveal } from "./reveal";

const CARDS = [
  {
    title: "Venture Portfolio",
    description:
      "High-conviction investments across foundational digital asset projects and emerging technology.",
  },
  {
    title: "Selected Investments",
    description:
      "Built through proprietary sourcing, first-hand market expertise and long-term founder relationships.",
  },
];

export function ProprietaryInvestments() {
  return (
    <section id="proprietary-investments" className="relative px-5 py-16 md:px-10 md:py-24">
      <div className="relative z-20 mx-auto flex max-w-[1800px] flex-col gap-16 md:gap-24">
        <div className="border-t border-[#18181833] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-[#18181899]">
          Proprietary Investments
        </div>

        <InView className="flex flex-col gap-6">
          <Reveal as="div" stagger={0}>
            <h2 className="text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-[#181818] md:text-[3rem]">
              Proprietary Investments
            </h2>
          </Reveal>
          <Reveal as="p" stagger={1} className="max-w-[46ch] text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#18181899]">
            Principal capital deployed across high-conviction opportunities in
            digital markets, private companies and emerging infrastructure.
          </Reveal>
        </InView>

        <InView className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              as="div"
              stagger={i}
              className="border-t border-[#18181833] pt-8"
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
      </div>
    </section>
  );
}
