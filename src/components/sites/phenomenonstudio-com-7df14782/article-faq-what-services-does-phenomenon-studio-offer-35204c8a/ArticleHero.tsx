import Link from "next/link";
import Image from "next/image";
import { RevealWords, FadeUp } from "../shared/reveal";
import { ChatGptIcon, PerplexityIcon } from "../shared/icons";

const ASSET =
  "/sites/phenomenonstudio-com-7df14782/article-faq-what-services-does-phenomenon-studio-offer-35204c8a/images";

export function ArticleHero() {
  return (
    <section className="rounded-b-[32px] bg-[#080d10] pt-28 pb-16 text-white sm:rounded-b-[64px] sm:pt-40 sm:pb-24 lg:rounded-b-[80px] lg:pt-[204px] lg:pb-[150px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/70">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link href="https://phenomenonstudio.com/blog/" target="_blank" className="transition-colors hover:text-white">
            Blog
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">What services does Phenomenon Studio offer?</span>
        </nav>

        <h1 className="mt-6 max-w-[1040px] text-[40px] leading-[1.1] font-medium tracking-tight sm:text-[56px] lg:text-[80px] lg:leading-[1.1]">
          <RevealWords text="What services does Phenomenon Studio offer?" />
        </h1>

        <FadeUp className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <a
            href="https://chat.openai.com/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-white/[0.08] px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-white hover:text-[#080d10] sm:w-auto"
          >
            <ChatGptIcon className="size-4" />
            Summarize with ChatGPT
          </a>
          <a
            href="https://www.perplexity.ai/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-white/[0.08] px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-white hover:text-[#080d10] sm:w-auto"
          >
            <PerplexityIcon className="size-3" />
            Summarize with perplexity
          </a>
        </FadeUp>

        <div className="mt-12 flex items-center gap-3 sm:mt-16">
          <Image
            src={`${ASSET}/author-oleksandr.png.webp`}
            alt="Oleksandr Kostiuchenko"
            width={23}
            height={23}
            className="size-6 shrink-0 rounded-full object-cover"
          />
          <span className="text-sm font-semibold tracking-[0.1em] uppercase">Oleksandr Kostiuchenko</span>
          <span className="flex items-center gap-3 pl-2 text-sm font-semibold tracking-[0.1em] text-white/70 uppercase">
            <span>Jun 9, 2026</span>
            <span>1 min read</span>
          </span>
        </div>
      </div>
    </section>
  );
}
