import Image from "next/image";
import { Button } from "../shared/button";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images";

const CASES = [
  {
    title: "Milk & Honey — turning a scattered multi-page site into one story a visitor can follow start to finish",
    href: "/projects/milk-honey-turning-a-scattered-multi-page-site-into-one-story-a-visitor-can-follow-start-to-finish",
    image: "case-milk-honey.png.webp",
    tags: ["#Website design", "#Website development"],
    client: "Lucas Keller",
    country: "USA",
    results: [
      "The site finally reads like the company it represents",
      "Visitors keep scanning dense content instead of dropping off",
      "Independent updates without a developer",
    ],
  },
  {
    title: "Veridian — brand identity for the infrastructure behind enterprise finance",
    href: "/projects/veridian-brand-identity-for-the-infrastructure-behind-enterprise-finance",
    image: "case-veridian.png.webp",
    tags: ["#branding"],
    client: "Veridian",
    country: "USA",
    results: ["Infrastructure, not a fintech app", "System-first design approach", "Clarity in complex systems"],
  },
  {
    title: "MedAxis Group – connecting every layer of healthcare infrastructure",
    href: "/projects/medaxis-group-connecting-every-layer-of-healthcare-infrastructure",
    image: "case-medaxis.png.webp",
    tags: ["#branding"],
    client: "Medaxis",
    country: "USA",
    results: ["Supports future growth", "Builds trust faster", "Reduces buying complexity"],
  },
];

export function MoreCases() {
  return (
    <section className="mt-24 pb-24 sm:mt-32 sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Our cases" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="More cases" />
        </h2>

        <div className="mt-12 flex flex-col gap-16 sm:mt-16">
          {CASES.map((c) => (
            <div key={c.title} className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
              <FadeUp className="overflow-hidden rounded-2xl">
                <a href={c.href} className="block">
                  <Image src={`${ASSET}/${c.image}`} alt={c.title} width={800} height={600} className="w-full object-cover" />
                </a>
              </FadeUp>
              <div className="flex flex-col justify-center">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">{c.tags.join("  ")}</p>
                <h3 className="mt-3 text-2xl font-medium text-[#080d10] sm:text-3xl">{c.title}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="font-body rounded-full bg-[#f4f5f4] px-3 py-1 text-xs text-[#080d10]">{c.client}</span>
                  <span className="font-body flex items-center gap-1.5 rounded-full bg-[#f4f5f4] px-3 py-1 text-xs text-[#080d10]">
                    <Image src={`${ASSET}/case-flag.svg`} alt={c.country} width={14} height={14} />
                    {c.country}
                  </span>
                </div>
                <div className="mt-8 border-t border-[#080d10]/8 pt-3">
                  <div className="font-body text-xs uppercase text-[#080d10]/50">Results</div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {c.results.map((r) => (
                      <p key={r} className="font-body text-sm text-[#080d10]">
                        {r}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <Button href={c.href} variant="orange">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
