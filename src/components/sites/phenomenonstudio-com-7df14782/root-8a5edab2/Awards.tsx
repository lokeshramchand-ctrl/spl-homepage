import Image from "next/image";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const AWARDS = [
  { icon: "clutch.svg", text: "Top product design company 2024", cta: "View on Clutch", href: "https://clutch.co/profile/phenomenon-studio" },
  { icon: "Dribbble-select.svg", text: "One of Dribbble's top rated design agencies", cta: "View on Dribbble", href: "https://dribbble.com/phenomenonstudio" },
  { icon: "Red-Dot.svg", text: "Red Dot Award winner in app design category", cta: "View case", href: "/projects/wisdom-a-digital-platform-for-safer-more-connected-aging" },
  { icon: "design.svg", text: "Nominations for several projects across different categories", cta: "View on UXDA", href: "https://ux-design-awards.com/winners/2024-2-isora-grc-collaborative-grc-platform" },
  { icon: "Awwwards.svg", text: "Site of the Day & honorable mentions", cta: "View on Awwwards", href: "https://www.awwwards.com/Phenomenon/" },
];

export function Awards() {
  return (
    <section className="bg-white pt-24 pb-24 sm:pt-40 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Awards" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Wins that inspire us forward" />
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
          {AWARDS.map((a) => (
            <FadeUp key={a.text} className="flex flex-col items-start">
              <Image src={`${ASSET}/icons/${a.icon}`} alt="" width={110} height={40} className="h-8 w-auto object-contain" />
              <p className="font-body mt-6 text-sm text-[#080d10]/60">{a.text}</p>
              <div className="mt-6">
                <Button href={a.href} variant="simple-dark" target={a.href.startsWith("http") ? "_blank" : undefined}>
                  {a.cta}
                </Button>
              </div>
            </FadeUp>
          ))}
          <FadeUp className="flex flex-col justify-between rounded-xl bg-[#f4f5f4] p-8">
            <div className="text-2xl font-medium text-[#080d10]">32+ others</div>
            <div className="mt-8">
              <Button href="/about-us" variant="simple-dark">
                Explore all awards
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
