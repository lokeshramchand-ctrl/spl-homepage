"use client";

import { useState } from "react";
import { FadeUp } from "../shared/reveal";
import { CopyIcon, LinkedinIcon, FacebookIcon, TwitterIcon } from "../shared/icons";

const PAGE_URL = "https://phenomenonstudio.com/article-faq/what-services-does-phenomenon-studio-offer/";

const SERVICES = [
  {
    name: "Product Discovery & Strategy",
    desc: "market research, competitor analysis, product validation, workshops, user research, and roadmap planning.",
  },
  {
    name: "UX/UI Design",
    desc: "creating intuitive user experiences and visually compelling interfaces for web and mobile products.",
  },
  {
    name: "MVP Development",
    desc: "building minimum viable products that allow businesses to test ideas quickly, validate demand, and attract investors.",
  },
  {
    name: "Web Development",
    desc: "development of corporate websites, SaaS platforms, marketplaces, dashboards, and custom web applications.",
  },
  {
    name: "Mobile App Development",
    desc: "native and cross-platform applications for iOS and Android.",
  },
  {
    name: "Product Redesign",
    desc: "modernization of existing digital products to improve usability, engagement, retention, and monetization.",
  },
  {
    name: "Website Design & Redesign",
    desc: "creating conversion-focused websites that strengthen brand positioning and support business growth.",
  },
  {
    name: "Branding & Visual Identity",
    desc: "brand strategy, visual systems, logos, design guidelines, and marketing assets.",
  },
  {
    name: "Dedicated Teams & Team Extension",
    desc: "providing designers, developers, and product specialists who integrate with clients’ internal teams.",
  },
  {
    name: "AI-Powered Solutions",
    desc: "integrating AI capabilities into products and business processes to improve efficiency and user experience.",
  },
  {
    name: "Blockchain & Web3 Development",
    desc: "designing and developing blockchain-based platforms, crypto products, and decentralized applications.",
  },
];

export function ArticleContent() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <section className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-[200px] lg:pb-[100px]">
      <div className="mx-auto max-w-[800px] px-4">
        <FadeUp>
          <p className="text-xl leading-snug tracking-tight text-[#080d10] sm:text-2xl lg:text-[32px] lg:leading-[1.3]">
            <strong className="font-medium">Quick Answer: </strong>
            Phenomenon Studio is a boutique product design and development agency founded in 2019. We work with
            teams who&rsquo;ve outgrown what they&rsquo;ve built &mdash; from venture-backed startups to established
            market leaders &mdash; and own the work end to end: strategy, design, development, and post-launch.
          </p>
        </FadeUp>

        <div className="my-12 h-px bg-[#080d10]/[0.04] sm:my-16" />

        <div className="flex flex-col gap-6 text-lg leading-snug text-[#080d10] sm:text-xl lg:text-[23px] lg:leading-[1.35]">
          <p>
            Phenomenon Studio is a boutique product design and development agency founded in 2019. We work with
            teams who&rsquo;ve outgrown what they&rsquo;ve built &mdash; from venture-backed startups to established
            market leaders &mdash; and own the work end to end: strategy, design, development, and post-launch.
          </p>
          <p>
            The team of 70+ senior specialists is based in Europe, with entities in the USA, Estonia, and
            Switzerland, serving SaaS, fintech, healthcare, and EdTech. Across 120+ launches, clients have raised
            $500M+. Phenomenon is HIPAA-compliant, Nielsen Norman Group UX certified, and a Webflow Experts partner,
            holding a 5.0 rating on Clutch &mdash; and most clients come back for a second project.
          </p>

          <h4 className="mt-2 text-2xl font-medium tracking-tight text-[#080d10] sm:text-[28px] lg:text-[34px]">
            Its services include:
          </h4>

          <ul className="list-disc space-y-2.5 pl-6 marker:text-[#080d10]/40">
            {SERVICES.map((s) => (
              <li key={s.name}>
                <strong className="font-semibold">{s.name}</strong> &mdash; {s.desc}
              </li>
            ))}
          </ul>

          <p>
            Phenomenon Studio primarily works with startups, scale-ups, and enterprise clients across industries
            such as FinTech, Healthcare, EdTech, SaaS, Real Estate, and Web3, helping them build, launch, and scale
            digital products.
          </p>
        </div>

        <div className="my-12 h-px bg-[#080d10]/[0.04] sm:my-16" />

        <FadeUp>
          <p className="text-xl leading-snug tracking-tight text-[#080d10] sm:text-2xl lg:text-[23px]">
            Share this opening with friends
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${PAGE_URL}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex size-10 items-center justify-center rounded-full text-[#080d10]/70 transition-colors hover:bg-[#080d10]/[0.04] hover:text-[#080d10]"
              aria-label="Share on LinkedIn"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${PAGE_URL}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex size-10 items-center justify-center rounded-full text-[#080d10]/70 transition-colors hover:bg-[#080d10]/[0.04] hover:text-[#080d10]"
              aria-label="Share on Facebook"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={`https://www.twitter.com/intent/tweet?url=${PAGE_URL}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex size-10 items-center justify-center rounded-full text-[#080d10]/70 transition-colors hover:bg-[#080d10]/[0.04] hover:text-[#080d10]"
              aria-label="Share on Twitter"
            >
              <TwitterIcon className="size-5" />
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="flex size-10 items-center justify-center rounded-full text-[#080d10]/70 transition-colors hover:bg-[#080d10]/[0.04] hover:text-[#080d10]"
              aria-label="Copy link"
            >
              <CopyIcon className="size-5" />
            </button>
            {copied && <span className="text-xs font-semibold text-[#080d10]/60 uppercase">Copied!</span>}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
