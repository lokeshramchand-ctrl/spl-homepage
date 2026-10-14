import { InView, Reveal, RevealWords } from "./reveal";

const STEPS = [
  {
    n: "01",
    title: "Think",
    description: "We identify opportunities, directions and missions before a line of code is written.",
  },
  {
    n: "02",
    title: "Create",
    description: "We design the identities and systems that support your growth.",
  },
  {
    n: "03",
    title: "Build",
    description: "We engineer scalable, secure digital products ready for production.",
  },
  {
    n: "04",
    title: "Grow",
    description: "We support ongoing evolution and adaptation as your business changes.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="relative flex min-h-svh flex-col justify-center px-5 py-20 text-white md:px-10 md:py-28"
    >
      {/* z-0: the shared SwirlBackdrop canvas (a band-level sibling, see
          page.tsx) paints above this but below the content below, so the
          swirl reads as bright shapes over this section's own dark ground. */}
      <div className="absolute inset-0 z-0 bg-[#181818]" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-20">
        <div className="w-full border-t border-[#ffffff33] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-white">
          Approach
        </div>

        <InView>
          <h2 className="max-w-[20ch] text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
            <RevealWords text="From first idea to a product that keeps growing." />
          </h2>
        </InView>

        <InView className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} as="div" stagger={i} className="cc-row cc-row-dark border-t border-[#ffffff4d] pt-4">
              <span className="text-xs font-medium tracking-[-0.03em] text-[#ffffff99]">{step.n}</span>
              <h3 className="mt-6 text-[1.75rem] font-medium tracking-[-0.02em] text-white">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-[1.5] tracking-[-0.01em] text-[#ffffff99]">
                {step.description}
              </p>
            </Reveal>
          ))}
        </InView>
      </div>
    </section>
  );
}
