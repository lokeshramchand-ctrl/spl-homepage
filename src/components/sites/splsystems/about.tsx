import { InView, Reveal } from "./reveal";

const INDUSTRIES = [
  {
    title: "Finance",
    description: "Secure, auditable platforms for data-heavy and regulated workflows.",
  },
  {
    title: "Real Estate",
    description: "Search and discovery experiences built on modern AI.",
  },
  {
    title: "Government",
    description: "Large-scale digitization delivered with strict confidentiality.",
  },
  {
    title: "Education",
    description: "Examination management and records systems that scale with institutions.",
  },
];

export function About() {
  return (
    <section id="about" className="relative flex min-h-svh flex-col justify-center px-5 py-20 md:px-10 md:py-28">
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-24">
        <div className="border-t border-[#18181833] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-[#18181899]">
          About
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
          <InView className="flex flex-col gap-6">
            <Reveal as="div" stagger={0}>
              <h2 className="text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-[#181818] md:text-[3rem]">
                Over 10 years of
                digital transformation
              </h2>
            </Reveal>
            <Reveal as="p" stagger={1} className="max-w-[42ch] text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#18181899]">
              SPL Systems has been at the forefront of digital transformation for over 10 years, delivering software that drives business growth and operational efficiency.
            </Reveal>
            <Reveal as="p" stagger={2} className="max-w-[42ch] text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#18181899]">
              Our expertise spans comprehensive examination management systems to complex digitization projects, with quality and confidentiality built into every engagement.
            </Reveal>
          </InView>

          <InView className="flex flex-col">
            {INDUSTRIES.map((item, i) => (
              <Reveal
                key={item.title}
                as="div"
                stagger={i}
                className="cc-row cc-row-light border-t border-[#18181833] py-8"
              >
                <h3 className="text-[1.75rem] font-medium tracking-[-0.02em] text-[#181818] md:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-[1.4] tracking-[-0.01em] text-[#18181899]">
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
