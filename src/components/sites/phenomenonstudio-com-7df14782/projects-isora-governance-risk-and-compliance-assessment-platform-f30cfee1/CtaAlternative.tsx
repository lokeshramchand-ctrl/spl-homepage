import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "../shared/reveal";
import { ArrowRightIcon } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/images";

export function CtaAlternative() {
  return (
    <section className="mt-12">
      <div className="mx-auto max-w-[1440px] px-4">
        <FadeUp className="relative flex h-[calc(100vh-80px)] min-h-[600px] flex-col overflow-hidden rounded-3xl bg-[#080d10]">
          <Image
            src={`${ASSET}/cta-bg.png.webp`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#080d10]/70" />
          <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-[#ff7a00]/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <div className="p-8 sm:p-12">
              <h2 className="max-w-lg text-3xl font-medium tracking-tight text-white sm:text-5xl">Build what keeps users coming back</h2>
              <p className="font-body mt-6 max-w-lg text-lg text-white/80 sm:text-xl">
                Strategy, design, and development, all working together
                <br />
                under one roof.
              </p>
            </div>

            <Link
              href="https://phenomenonstudio.com/contact-us/"
              target="_blank"
              className="group mt-auto flex items-center justify-between border-t border-white/10 p-8 sm:p-12"
            >
              <span className="relative block h-[64px] overflow-hidden min-[1180px]:h-[min(11vw,158px)]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  <span className="block text-[53px] leading-[1.2] font-medium tracking-[-0.01em] text-white min-[1180px]:text-[min(11vw,158px)] min-[1180px]:leading-none min-[1180px]:whitespace-nowrap">Let&apos;s collaborate</span>
                </span>
                <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  <span className="block text-[53px] leading-[1.2] font-medium tracking-[-0.01em] text-white min-[1180px]:text-[min(11vw,158px)] min-[1180px]:leading-none min-[1180px]:whitespace-nowrap">Get in touch</span>
                </span>
              </span>
              <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-[#080d10] sm:size-16">
                <ArrowRightIcon className="size-5" />
              </span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
