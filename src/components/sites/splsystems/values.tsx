import { GlobeIcon, PawnIcon, ShieldIcon } from "./icons";
import { InView, Reveal, RevealWords } from "./reveal";

const VALUES = [
  {
    icon: PawnIcon,
    title: "Skin in the Game",
    description:
      "Principal capital comes first. Allocators participate in strategies already backed by SPL Systems's own balance sheet.",
  },
  {
    icon: ShieldIcon,
    title: "Risk-First Doctrine",
    description:
      "Liquidity, position sizing and downside protection are set before return targets. Every strategy runs under one institutional risk framework.",
  },
  {
    icon: GlobeIcon,
    title: "Global Presence",
    description:
      "Headquartered in Zurich, with a presence in Dubai. Institutional relationships in Europe and operations in the Gulf run as one continuous platform.",
  },
];

export function Values() {
  return (
    <section className="relative bg-[#181818] px-5 pb-24 pt-16 text-white md:px-10 md:pb-32 md:pt-20">
      <div className="relative mx-auto flex max-w-[1800px] flex-col gap-16 md:gap-20">
        <div className="border-t border-[#ffffff33] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-white">
          Values
        </div>

        <InView>
          <h2 className="max-w-[22ch] text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
            <RevealWords text="Built on principal capital. Governed by institutional standards." />
          </h2>
        </InView>

        <InView className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {VALUES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} as="div" stagger={i} className="flex flex-col gap-6">
              <Icon className="h-14 w-auto text-white" />
              <div className="border-t border-[#ffffff4d] pt-4">
                <h3 className="text-[1.25rem] font-medium tracking-[-0.02em] text-white">
                  {title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-[1.5] tracking-[-0.01em] text-[#ffffff99]">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </InView>
      </div>
    </section>
  );
}
