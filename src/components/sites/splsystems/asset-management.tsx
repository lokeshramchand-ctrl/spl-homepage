import { InView, Reveal } from "./reveal";

const ITEMS = [
  {
    title: "Digital Multi-Strategy Fund",
    description: "Multi-strategy exposure across liquid digital markets.",
  },
  {
    title: "AI Data Centre Fund",
    badge: "Coming soon",
    description: "Institutional access to European AI and data-centre infrastructure.",
  },
  {
    title: "Separately Managed Accounts",
    description: "Bespoke mandates with direct ownership and transparency.",
  },
];

export function AssetManagement() {
  return (
    <section id="capabilities" className="relative flex min-h-svh flex-col justify-center px-5 py-20 md:px-10 md:py-28">
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-24">
        <div className="border-t border-[#18181833] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-[#18181899]">
          Capabilities
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
          <InView className="flex flex-col gap-6">
            <Reveal as="div" stagger={0}>
              <h2 className="text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-[#181818] md:text-[3rem]">
                Asset Management
              </h2>
            </Reveal>
            <Reveal as="p" stagger={1} className="max-w-[42ch] text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#18181899]">
              Institutional investment strategies across digital markets and
              emerging infrastructure, built on proprietary experience and
              disciplined risk management.
            </Reveal>
          </InView>

          <InView className="flex flex-col">
            {ITEMS.map((item, i) => (
              <Reveal
                key={item.title}
                as="div"
                stagger={i}
                className="cc-row cc-row-light border-t border-[#18181833] py-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-[1.75rem] font-medium tracking-[-0.02em] text-[#181818] md:text-[2rem]">
                    {item.title}
                  </h3>
                  {item.badge ? (
                    <span className="rounded-none bg-[#181818] px-2 py-1 text-xs tracking-[-0.02em] text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-[1.4] tracking-[-0.01em] text-[#18181899]">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </InView>
        </div>
      </div>
    </section>
  );
}
