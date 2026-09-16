"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FadeUp } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

type Category = "all" | "web-app" | "mobile-app" | "website" | "branding";

type ProjectCase = {
  href: string;
  image: string;
  title: string;
  tags: string[];
  client: string;
  flag: string;
  country: string;
  techStack?: string;
  timeline?: string;
  results: string[];
  quote?: { name: string; role: string; avatar: string; text: string };
  category: Exclude<Category, "all">;
};

const TABS: { label: string; value: Category }[] = [
  { label: "All projects", value: "all" },
  { label: "Web app", value: "web-app" },
  { label: "Mobile app", value: "mobile-app" },
  { label: "Website", value: "website" },
  { label: "Branding", value: "branding" },
];

const PROJECTS: ProjectCase[] = [
  {
    href: "/projects/isora-governance-risk-and-compliance-assessment-platform",
    image: "Case-Preview-5.png.webp",
    title: "Isora – optimizing governance, risk & compliance for top institutions",
    tags: ["#UX Audit", "#Product redesign", "#Web development", "#Team extension"],
    client: "SaltyCloud",
    flag: "fi_4628635.svg",
    country: "Texas, USA",
    techStack: "React, Python, AWS",
    timeline: "12 months, ongoing",
    results: ["2x faster user workflows", "50% shorter time-to-market", "Nominated for UX Design Award 2024"],
    category: "web-app",
  },
  {
    href: "/projects/wisdom-a-digital-platform-for-safer-more-connected-aging",
    image: "Case-preview-3.png.webp",
    title: "Wisdom — a digital platform for safer, more connected aging",
    tags: ["#Product redesign", "#Mobile app development"],
    client: "Wisdom",
    flag: "fi_4628635.svg",
    country: "USA",
    techStack:
      "Flutter, Java, Spring Boot, Python, WebSocket, Computer Vision, AWS, PostgreSQL, Redis, Docker, Swagger, Liquibase",
    timeline: "5 months",
    results: [
      "$1.3M raised in pre-seed funding",
      "Strategic partnership with Samsung",
      "Recognized with Red Dot and a UX Design Award nomination",
    ],
    category: "mobile-app",
  },
  {
    href: "/projects/klickex-how-a-fintech-redesign-boosted-conversion-by-35-and-grew-users-by-3k-monthly",
    image: "Case-preview-2-2.png.webp",
    title: "KlickEx – frictionless cross-border payments for the Pacific Island communities",
    tags: ["#UX audit", "#Product redesign", "#web development"],
    client: "Nomupay",
    flag: "Clip-path-group.svg",
    country: "New Zealand",
    techStack: "Next.js, TypeScript, React Redux",
    timeline: "6 months",
    results: [
      '+35% "Add Money" conversion rate',
      '+30% "Money Transfer" completion rate',
      "Raised $1M in additional funding within 6 months",
    ],
    quote: {
      name: "Izek Lal",
      role: "Country manager",
      avatar: "Case-preview-.webp",
      text: "We have seen a significant improvement in terms of mobile friendliness and the general flow of the system. I believe this has contributed significantly to the growth of our business. Many thanks, SPL Systems.",
    },
    category: "web-app",
  },
  {
    href: "/projects/scrambly-branding-for-a-rewarded-discovery-platform-for-games-and-apps",
    image: "Case-preview-14.png.webp",
    title: "Scrambly – branding for a rewarded discovery platform for games and apps",
    tags: ["#branding"],
    client: "Scrambly",
    flag: "scrambly-flag.svg",
    country: "Italy",
    results: ["Clearer brand positioning", "Consistent visual system", "Improved market perception"],
    quote: {
      name: "Illia Frantsevskyi",
      role: "CTO & Co-Founder",
      avatar: "Rectangle-34624328-2.png",
      text: "They demonstrated a high level of expertise and efficiency in every phase of the project.",
    },
    category: "branding",
  },
  {
    href: "/projects/taitor-interactive-ai-tutoring-for-kids-and-teens",
    image: "Case-preview-67.png.webp",
    title: "Taitor – interactive AI tutoring for kids and teens",
    tags: ["#Web app design"],
    client: "Taitor",
    flag: "fi_4628635.svg",
    country: "UAE",
    results: ["Faster time-to-market", "Established credible product presence", "Built with scalability in mind"],
    category: "web-app",
  },
  {
    href: "/projects/shaga-odyssey-awarded-website-development-for-web3-gamepad",
    image: "Media-9-3-1.png.webp",
    title: "Shaga Odyssey – an award-winning web3 gamepad platform",
    tags: ["#Website design", "#Website development"],
    client: "Shaga.xyz",
    flag: "fi_4628635.svg",
    country: "USA",
    techStack: "Webflow",
    timeline: "5 months",
    results: [
      "+40% increase in user engagement",
      "3x faster platform navigation",
      'Awwwards "Site of the Day" for Best Interactive Design',
    ],
    category: "website",
  },
  {
    href: "/projects/pretty-patty-a-deliciously-interactive-fast-food-experience",
    image: "Case-preview-17.png.webp",
    title: "Pretty Patty: a deliciously interactive fast food experience",
    tags: ["#Website design", "#Website development"],
    client: "Pretty Patty",
    flag: "image-2.svg",
    country: "Switzerland",
    results: ["Brand alignment & vibrant design", "Improved conversion opportunities", "Customer-centric approach"],
    quote: {
      name: "Adrian Smith",
      role: "Co-Founder, PRETTY PATTY",
      avatar: "image-15.png.webp",
      text: "They always respected deadlines, were super reactive, and were super helpful.",
    },
    category: "website",
  },
  {
    href: "/projects/hormn-australias-highest-rated-trt-clinic",
    image: "Case-preview-51.png.webp",
    title: "Hormn: Australia's highest rated TRT Clinic",
    tags: ["#Website design", "#Website development"],
    client: "Hormn",
    flag: "sz.png",
    country: "Australia",
    techStack: "Webflow",
    timeline: "2 months",
    results: ["Clear service positioning", "Improved conversion opportunities", "Platform-ready foundation"],
    quote: {
      name: "Ash Bryant",
      role: "CEO & Founder",
      avatar: "Frame-1686558498-3.png.webp",
      text: "The design team is truly world-class, excelling in both user interface design and creating solutions optimized for conversion.",
    },
    category: "website",
  },
  {
    href: "/projects/milk-honey-turning-a-scattered-multi-page-site-into-one-story-a-visitor-can-follow-start-to-finish",
    image: "case-milk-honey.png.webp",
    title: "Milk & Honey — turning a scattered multi-page site into one story a visitor can follow start to finish",
    tags: ["#Website design", "#Website development"],
    client: "Lucas Keller",
    flag: "fi_4628635.svg",
    country: "USA",
    results: [
      "The site finally reads like the company it represents",
      "Visitors keep scanning dense content instead of dropping off",
      "Independent updates without a developer",
    ],
    category: "website",
  },
  {
    href: "/projects/artisan-the-stop-hiring-humans-ai-agent-startup",
    image: "Mobile-5-1.png.webp",
    title: 'Artisan — the "stop hiring humans" AI agent startup',
    tags: ["#UX audit", "#Website redesign"],
    client: "Artisan",
    flag: "fi_4628635.svg",
    country: "USA",
    results: [
      "Repositioned as a premium AI platform",
      "20+ marketing pages launched in less than 1 month",
      "Scalable foundation for growth",
    ],
    category: "website",
  },
];

export function ProjectsFilterableGrid({ initialCategory = "all" }: { initialCategory?: Category } = {}) {
  const [active, setActive] = useState<Category>(initialCategory);
  const visible = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="bg-white pb-24 sm:pb-40">
      <div className="sticky top-0 z-10 border-b border-[#080d10]/8 bg-white py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-2 overflow-x-auto px-4">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActive(tab.value)}
              className={cn(
                "shrink-0 rounded-md px-[27px] py-3.5 font-body text-[14px] font-semibold uppercase tracking-[2px] transition-colors",
                active === tab.value ? "bg-[#080d10] text-white" : "bg-white text-[#080d10] hover:bg-[#f4f5f4]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4">
        <div className="mt-16 flex flex-col gap-24">
          {visible.map((c) => (
            <div key={c.href} className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              <FadeUp className="lg:sticky lg:top-24 lg:self-start">
                <a href={c.href} className="block overflow-hidden rounded-xl">
                  <Image
                    src={`${ASSET}/images/${c.image}`}
                    alt={`${c.title} - image cover`}
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
                  <span className="font-body rounded-full bg-[#f4f5f4] px-3 py-1 text-xs text-[#080d10]">
                    {c.client}
                  </span>
                  <span className="font-body flex items-center gap-1.5 rounded-full bg-[#f4f5f4] px-3 py-1 text-xs text-[#080d10]">
                    <Image src={`${ASSET}/icons/${c.flag}`} alt={c.country} width={14} height={14} />
                    {c.country}
                  </span>
                </div>

                {(c.techStack || c.timeline) && (
                  <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#080d10]/8 pt-3">
                    {c.techStack && (
                      <div>
                        <div className="font-body text-xs uppercase text-[#080d10]/50">Tech Stack</div>
                        <p className="font-body mt-3 text-sm text-[#080d10]">{c.techStack}</p>
                      </div>
                    )}
                    {c.timeline && (
                      <div className="border-l border-[#080d10]/8 pl-6">
                        <div className="font-body text-xs uppercase text-[#080d10]/50">Timeline</div>
                        <p className="font-body mt-3 text-sm text-[#080d10]">{c.timeline}</p>
                      </div>
                    )}
                  </div>
                )}

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
                      <Image
                        src={`${ASSET}/images/${c.quote.avatar}`}
                        alt={c.quote.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
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
      </div>
    </section>
  );
}
