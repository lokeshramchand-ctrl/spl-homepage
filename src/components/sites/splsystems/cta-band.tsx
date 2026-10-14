import Link from "next/link";
import { AskAi } from "./ask-ai";
import { ArrowUpRightIcon } from "./icons";
import { InView, Reveal } from "./reveal";

/** Closing black band between the FAQ and the footer. */
export function CtaBand() {
  return (
    <section id="cta-band" className="relative flex min-h-[60svh] items-center px-4 py-20 text-white md:px-8 md:py-28">
      <div className="absolute inset-0 z-0 bg-[#181818]" aria-hidden="true" />
      <InView className="relative z-20 mx-auto flex w-full max-w-[2000px] flex-col items-center gap-8 text-center">
        <Reveal as="p" stagger={0} className="max-w-[18ch] text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
          Have a project or an idea in mind?
        </Reveal>
        <Reveal as="div" stagger={1}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border-b border-white pb-2 text-[0.95rem] font-medium tracking-[-0.03em]"
          >
            Get a free consultation
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
        <Reveal as="div" stagger={2} className="mt-8">
          <AskAi
            label="Summarize this page with AI"
            prompt="Summarize this page: https://splsystems.in"
            size="lg"
            tone="dark"
          />
        </Reveal>
      </InView>
    </section>
  );
}
