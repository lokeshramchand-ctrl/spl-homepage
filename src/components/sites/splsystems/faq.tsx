import { InView, Reveal, RevealWords } from "./reveal";

const FAQS = [
  {
    q: "What services do you offer?",
    a: "Custom web and enterprise applications, AI-powered platforms, mobile apps, and automation or workflow tooling, each engineered to stay secure and scale as your business grows.",
  },
  {
    q: "Which industries do you work with?",
    a: "Finance, real estate, government and education. Our experience with examination management and large-scale digitization translates well to any regulated, data-heavy environment.",
  },
  {
    q: "Do you build AI-powered solutions?",
    a: "Yes. Recent platforms include SheetSense, which reads characters and barcodes from paper sheets, and ZoningLens, a multimodal search experience for real estate.",
  },
  {
    q: "Can you build around our existing workflow?",
    a: "Yes. Every engagement starts with understanding how your team actually works, so the software fits that process instead of forcing you into a template.",
  },
  {
    q: "Do you build mobile and cross-platform apps?",
    a: "Yes. Our mobile and cross-platform apps share a single backend with your web and enterprise systems, so data stays consistent everywhere.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope, from a few weeks for a focused tool to several months for a full platform. We size up the timeline with you during an initial scoping conversation, before any commitment.",
  },
  {
    q: "Do you support the product after launch?",
    a: "Yes. We stay engaged after launch, handling fixes, monitoring and new features as your needs evolve, so you have a long-term technical partner rather than a one-off vendor.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative flex min-h-svh flex-col justify-center px-5 py-20 text-white md:px-10 md:py-28">
      <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
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
