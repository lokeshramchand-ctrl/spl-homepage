import { AskAi } from "./ask-ai";
import Image from "next/image";
import { InView, Reveal, WipeLink } from "./reveal";

const PRIMARY: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Process", href: "/#approach" },
  { label: "Support & Info", href: "/#faq" },
  { label: "Contact us", href: "/contact" },
];

const SECONDARY: { label: string; href: string; external?: boolean }[] = [
  { label: "Projects & Expertise", href: "/projects" },
  { label: "pri@splsystems.in", href: "mailto:pri@splsystems.in", external: true },
  { label: "+1 (650) 993-9799", href: "tel:+16509939799", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/splsystems/",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#fbfbfb] text-[#181818]">
      <div className="mx-auto flex w-full max-w-[2000px] flex-col gap-16 px-4 py-16 md:px-8 md:py-8">
        <nav aria-label="Footer" className="flex flex-col gap-16 md:flex-row md:items-stretch">
          <ul className="flex flex-1 flex-col gap-4 md:gap-2">
            {PRIMARY.map((item) => (
              <li
                key={item.label}
                className="text-[2rem] leading-[1.2] tracking-[-0.03em]"
              >
                <WipeLink href={item.href} className="block">
                  {item.label}
                </WipeLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 flex-col justify-between gap-16 md:gap-8">
            <ul className="flex flex-col gap-3 text-[1rem] tracking-[-0.03em] md:gap-2">
              {SECONDARY.map((item) => (
                <li key={item.label}>
                  <WipeLink
                    href={item.href}
                    external={item.external && item.href.startsWith("http")}
                    className="block"
                  >
                    {item.label}
                  </WipeLink>
                </li>
              ))}
            </ul>

            <AskAi
              label="Ask your AI about SPL Systems"
              prompt="Tell me about SPL Systems, based on https://splsystems.in"
            />
          </div>
        </nav>

        <div className="flex flex-col gap-16 text-[#1818184d] md:gap-3">
          <p className="max-w-none text-[0.75rem] leading-[1.3] tracking-[-0.03em]">
            SPL Systems builds high-performance digital infrastructure for
            ambitious enterprises across finance, real estate, government and
            education. Engineering the Intelligent Future.
          </p>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.75rem] tracking-[-0.03em] md:gap-4">
            <li>&copy; {new Date().getFullYear()} SPL Systems, Inc.</li>
            <li>All rights reserved.</li>
          </ul>
        </div>

        <InView className="flex items-end justify-between gap-3 pb-10 pt-16 md:gap-8">
          <Reveal as="span" stagger={0} className="w-full">
            <Image
              src="/sites/splsystems/images/logo/spl-systems.svg"
              alt="SPL Systems"
              width={3000}
              height={350}
              unoptimized
              className="h-auto w-full"
            />
          </Reveal>
        </InView>
      </div>
    </footer>
  );
}
