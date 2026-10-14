import { GlobeIcon, PawnIcon, ShieldIcon } from "./icons";
import { InView, Reveal, RevealWords } from "./reveal";

const VALUES = [
  {
    icon: PawnIcon,
    title: "Built around your workflow",
    description:
      "Custom web applications, enterprise systems, mobile and cross-platform apps, and automation tools shaped to the way your team actually works.",
  },
  {
    icon: ShieldIcon,
    title: "Secure and confidential",
    description:
      "Quality and confidentiality come first, from examination management to government-scale digitization.",
  },
  {
    icon: GlobeIcon,
    title: "Scalable by design",
    description:
      "AI-powered platforms and workflow systems engineered to grow with your organization and designed for tomorrow.",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative flex min-h-svh flex-col justify-center px-5 py-20 text-white md:px-10 md:py-28">
      <div className="absolute inset-0 z-0 bg-[#181818]" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-20">
        <div className="border-t border-[#ffffff33] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-white">
          Expertise
        </div>

        <InView>
          <h2 className="max-w-[22ch] text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
            <RevealWords text="Custom software and automation, designed for tomorrow." />
          </h2>
        </InView>

        <InView className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {VALUES.map(({ icon: Icon, title, description }, i) => (
            <Reveal
              key={title}
              as="div"
              stagger={i}
              className="group flex flex-col gap-6"
            >
              <Icon className="h-14 w-auto text-white transition-transform duration-300 ease-[cubic-bezier(0.3,0,0,1)] group-hover:-translate-y-1" />
              <div className="cc-row cc-row-dark border-t border-[#ffffff4d] pt-4">
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
