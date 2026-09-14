import Image from "next/image";
import Link from "next/link";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";

const ASSET =
  "/sites/phenomenonstudio-com-7df14782/article-faq-what-services-does-phenomenon-studio-offer-35204c8a/images";

const INSIGHTS = [
  {
    href: "https://phenomenonstudio.com/article/top-fintech-ux-design-agencies-and-why-theyre-different/",
    img: `${ASSET}/insight-fintech-ux.png.webp`,
    title: "Top fintech UX design agencies and why they’re different",
    excerpt:
      "Compare the top UX design agencies for fintech in 2026 by specialization, pricing, client fit, compliance expertise, and proven financial product outcomes.",
    author: "Yuliya Apanasenko",
    date: "Aug 31, 2026",
    readTime: "7 min read",
    avatar: `${ASSET}/author-yuliya.png.webp`,
    tag: "Analytics",
  },
  {
    href: "https://phenomenonstudio.com/article/top-10-website-development-agencies-in-the-us-in-2026/",
    img: `${ASSET}/insight-website-development.png.webp`,
    title: "Top 10 website development agencies in the USA in 2026",
    excerpt:
      "Compare top website development companies in the USA for 2026 by pricing, expertise, AI capabilities, compliance, and the best fit for your business stage.",
    author: "Oleksandr Kostiuchenko",
    date: "Aug 31, 2026",
    readTime: "6 min read",
    avatar: `${ASSET}/author-oleksandr.png.webp`,
    tag: "Analytics",
  },
];

export function MoreInsights() {
  return (
    <section className="bg-white pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-[120px] lg:pb-[120px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="More insights"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50"
        />
        <h2 className="mt-4 max-w-[1040px] text-[34px] leading-[1.2] font-medium tracking-tight text-[#080d10] sm:text-[48px] lg:text-[68px]">
          <RevealWords text="We have dozens of articles written by our studio. We're happy to share them with you!" />
        </h2>

        <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-2">
          {INSIGHTS.map((item, i) => (
            <FadeUp key={item.href} delayMs={i * 100}>
              <Link href={item.href} target="_blank" className="group block">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-[#080d10]/5">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-center gap-2.5">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={23}
                    height={23}
                    className="size-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-[#080d10]">{item.author}</span>
                  <span className="text-sm text-[#080d10]/50">
                    {item.date} · {item.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-[#080d10] transition-colors group-hover:text-[#ff7a00] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-[#080d10]/70">{item.excerpt}</p>
                <div className="mt-5 border-t border-[#080d10]/[0.06] pt-5">
                  <span className="rounded bg-[#080d10]/[0.04] px-4 py-1 text-xs font-semibold tracking-wide text-[#080d10] uppercase">
                    {item.tag}
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
