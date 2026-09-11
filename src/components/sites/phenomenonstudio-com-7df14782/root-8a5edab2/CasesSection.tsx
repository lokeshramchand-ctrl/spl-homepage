import Image from "next/image";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const CASES = [
  {
    title: "Isora – optimizing governance, risk & compliance for top institutions",
    href: "/projects/isora-governance-risk-and-compliance-assessment-platform",
    image: "Case-Preview-5.png.webp",
    tags: ["#UX Audit", "#Product redesign", "#Web development", "#Team extension"],
    client: "SaltyCloud",
    flag: "fi_4628635.svg",
    country: "Texas, USA",
    techStack: "React, Python, AWS",
    timeline: "12 months, ongoing",
    results: ["2x faster user workflows", "50% shorter time-to-market", "Nominated for UX Design Award 2024"],
  },
  {
    title: "Wisdom — a digital platform for safer, more connected aging",
    href: "/projects/wisdom-a-digital-platform-for-safer-more-connected-aging",
    image: "Case-preview-3.png.webp",
    tags: ["#Product redesign", "#Mobile app development"],
    client: "Wisdom",
    flag: "fi_4628635.svg",
    country: "USA",
    techStack: "Flutter, Java, Spring Boot, Python, WebSocket, Computer Vision, AWS, PostgreSQL, Redis, Docker, Swagger, Liquibase",
    timeline: "5 months",
    results: ["$1.3M raised in pre-seed funding", "Strategic partnership with Samsung", "Recognized with Red Dot and a UX Design Award nomination"],
  },
  {
    title: "KlickEx – frictionless cross-border payments for the Pacific Island communities",
    href: "/projects/klickex-how-a-fintech-redesign-boosted-conversion-by-35-and-grew-users-by-3k-monthly",
    image: "Case-preview-2-2.png.webp",
    tags: ["#UX audit", "#Product redesign", "#web development"],
    client: "Nomupay",
    flag: "Clip-path-group.svg",
    country: "New Zealand",
    techStack: "Next.js, TypeScript, React Redux",
    timeline: "6 months",
    results: ["+35% \"Add Money\" conversion rate", "+30% \"Money Transfer\" completion rate", "Raised $1M in additional funding within 6 months"],
    quote: {
      name: "Izek Lal",
      role: "Country manager",
      avatar: "Case-preview-.webp",
      text: "We have seen a significant improvement in terms of mobile friendliness and the general flow of the system. I believe this has contributed significantly to the growth of our business. Many thanks, Phenomenon.",
    },
  },
];

export function CasesSection() {
  return (
    <section id="cases" className="scroll-mt-24 bg-white py-24 sm:py-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Featured cases" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Discover how we're driving change through innovative projects, strong partnerships, and measurable outcomes" />
        </h2>

        <div className="mt-16 flex flex-col gap-24">
          {CASES.map((c) => (
            <div key={c.title} className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              <FadeUp className="lg:sticky lg:top-24 lg:self-start">
                <a href={c.href} className="block overflow-hidden rounded-xl">
                  <Image
                    src={`${ASSET}/images/${c.image}`}
                    alt={c.title}
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                </a>
              </FadeUp>
              <div className="flex flex-col justify-center">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">
                  {c.tags.join("  ")}
                </p>
                <h3 className="mt-3 text-2xl font-medium text-[#080d10] sm:text-3xl">{c.title}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="font-body rounded-full bg-[#f4f5f4] px-3 py-1 text-xs text-[#080d10]">{c.client}</span>
                  <span className="font-body flex items-center gap-1.5 rounded-full bg-[#f4f5f4] px-3 py-1 text-xs text-[#080d10]">
                    <Image src={`${ASSET}/icons/${c.flag}`} alt={c.country} width={14} height={14} />
                    {c.country}
                  </span>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#080d10]/8 pt-3">
                  <div>
                    <div className="font-body text-xs uppercase text-[#080d10]/50">Tech Stack</div>
                    <p className="font-body mt-3 text-sm text-[#080d10]">{c.techStack}</p>
                  </div>
                  <div className="border-l border-[#080d10]/8 pl-6">
                    <div className="font-body text-xs uppercase text-[#080d10]/50">Timeline</div>
                    <p className="font-body mt-3 text-sm text-[#080d10]">{c.timeline}</p>
                  </div>
                </div>

                <div className="mt-16 border-t border-[#080d10]/8 pt-3">
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

                {c.quote && (
                  <div className="mt-8 rounded-2xl bg-[#f4f5f4] p-6">
                    <div className="flex items-center gap-4">
                      <Image src={`${ASSET}/images/${c.quote.avatar}`} alt={c.quote.name} width={48} height={48} className="rounded-full object-cover" />
                      <div>
                        <p className="font-body text-sm text-[#080d10]">{c.quote.name}</p>
                        <span className="font-body text-xs text-[#080d10]/50">{c.quote.role}</span>
                      </div>
                    </div>
                    <p className="mt-6 text-lg text-[#080d10]">{c.quote.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Button href="/projects" variant="simple-dark">
            Explore all cases
          </Button>
        </div>
      </div>
    </section>
  );
}
