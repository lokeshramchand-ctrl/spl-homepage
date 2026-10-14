import { InView, Reveal, RevealWords } from "./reveal";

const FAQS = [
  {
    q: "What services do you provide?",
    a: "Custom web applications, enterprise systems, AI-powered platforms, mobile apps, automation tools and workflow systems, all built to be scalable and secure.",
  },
  {
    q: "What industries do you work with?",
    a: "Finance, Real Estate, Government and Education. Our experience in examination management and large-scale digitization carries across regulated, data-heavy environments.",
  },
  {
    q: "Do you develop AI-powered solutions?",
    a: "Yes. We build AI-powered platforms such as SheetSense, which recognizes characters and barcodes on paper sheets, and ZoningLens, a multimodal search experience for real estate.",
  },
  {
    q: "Can you build software for our unique workflow?",
    a: "Yes. Every engagement starts by understanding how your team works, then we design and build software around that process instead of forcing you into a template.",
  },
  {
    q: "Do you support mobile and cross-platform apps?",
    a: "Yes. We build mobile and cross-platform applications that share one backend with your web and enterprise systems.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative flex min-h-svh flex-col justify-center px-5 py-20 text-white md:px-10 md:py-28">
      <div className="absolute inset-0 z-0 bg-[#181818]" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-20">
        <div className="border-t border-[#ffffff33] pt-4 text-center text-[0.95rem] tracking-[-0.02em] text-white">
          Support &amp; Info
        </div>

        <InView>
          <h2 className="max-w-[22ch] text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
            <RevealWords text="Frequently asked questions." />
          </h2>
        </InView>

        <InView className="flex flex-col">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} as="div" stagger={i} className="border-t border-[#ffffff4d] last:border-b">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.25rem] font-medium tracking-[-0.02em] marker:hidden [&::-webkit-details-marker]:hidden md:text-[1.5rem]">
                  {item.q}
                  <span aria-hidden="true" className="text-[1.5rem] leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#ffffff99]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </InView>
      </div>
    </section>
  );
}
