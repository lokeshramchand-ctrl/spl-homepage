import { InView, Reveal, RevealWords } from "./reveal";

const FAQS = [
  {
    q: "What services and technologies do you specialize in?",
    a: "We build custom web and enterprise applications, mobile apps, and AI-powered platforms. Because our cross-platform apps share a unified backend, your data stays secure and consistent everywhere. Our recent AI work includes SheetSense (character/barcode recognition) and ZoningLens (multimodal real estate search).",
  },
  {
    q: "Which industries do you typically work with?",
    a: "We primarily partner with finance, real estate, government, and education sectors. Our experience with examination management and large-scale digitization translates perfectly to any regulated, data-heavy environment.",
  },
  {
    q: "How do you handle timelines and existing workflows?",
    a: "Every engagement starts by understanding how your team actually works, ensuring the software fits your process rather than forcing a template. Projects take anywhere from a few weeks for a focused tool to several months for a full platform, which we size up together before any commitment.",
  },
  {
    q: "Do you support the product after launch?",
    a: "Yes. We stay engaged post-launch to handle fixes, monitor performance, and build new features as your needs evolve. We act as a long-term technical partner rather than a one-off vendor.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative flex min-h-svh flex-col justify-center px-5 py-20 text-white md:px-10 md:py-28">
      <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-16 md:gap-20">
        <div className="cc-rule border-t border-[#ffffff33] pt-4 [--cc-rule:#ffffff33] text-center text-[0.95rem] tracking-[-0.02em] text-white">
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
              <details className="group cc-faq">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.25rem] font-medium tracking-[-0.02em] marker:hidden [&::-webkit-details-marker]:hidden md:text-[1.5rem]">
                  <span className="cc-faq-q">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/0 text-[1.5rem] leading-none transition-[rotate,border-color,background-color] duration-500 ease-[cubic-bezier(0.3,0,0,1)] group-open:rotate-45 group-open:border-white/30 group-hover:border-white/30 group-hover:bg-white/[0.06]"
                  >
                    +
                  </span>
                </summary>
                <p className="cc-faq-a max-w-[60ch] pb-6 text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#ffffff99]">
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
