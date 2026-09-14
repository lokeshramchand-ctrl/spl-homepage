import { ScrambleText, RevealWords } from "../shared/reveal";
import { ArrowRightIcon } from "../shared/icons";
import { FAQ_ITEMS } from "./faq-data";

export function FaqList() {
  return (
    <section className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-[200px] lg:pb-[100px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Everything you want to know"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/70"
        />
        <h2 className="mt-6 max-w-[1040px] text-[34px] leading-[1.2] font-medium tracking-tight text-[#080d10] sm:text-[48px] lg:text-[68px]">
          <RevealWords text="Before we start working together" />
        </h2>

        <div className="mt-8 sm:mt-10">
          {FAQ_ITEMS.map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="group relative flex flex-wrap items-start justify-between gap-y-2 border-t border-[#080d10]/[0.04] py-6 transition-colors duration-300 hover:bg-[#f8f8f8] sm:py-7 lg:py-8"
            >
              <div className="w-auto shrink-0 pt-0.5 text-sm font-semibold tracking-[0.15em] text-[#080d10]/70 sm:w-[26.5%]">
                {item.num}
              </div>
              <div className="order-3 w-full text-xl leading-snug font-normal tracking-tight text-[#080d10] sm:order-none sm:w-1/2 sm:text-2xl lg:text-[23px]">
                {item.question}
              </div>
              <div className="flex shrink-0 items-center gap-2 text-right text-sm font-semibold tracking-[0.15em] text-[#080d10] uppercase sm:w-[23.5%] sm:justify-end">
                <span className="border-b border-transparent transition-colors duration-300 group-hover:border-[#080d10]">
                  More
                </span>
                <ArrowRightIcon className="size-3.5 transition-all duration-300 sm:-translate-x-1 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
