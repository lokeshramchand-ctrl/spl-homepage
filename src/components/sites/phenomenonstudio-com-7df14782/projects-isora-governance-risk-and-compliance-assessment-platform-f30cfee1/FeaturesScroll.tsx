"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RevealWords, ScrambleText } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/images";

const FEATURES = [
  {
    title: "Assessment management",
    image: "feature-1-assessment-management.png.webp",
    problem:
      "Users struggled with navigating and interpreting the information due to a lack of clear structure and visual prioritization, leading to inefficiencies in managing assessments.",
    bullets: [
      "Introduced an intuitive layout for effortless navigation and management of assessments.",
      "Implemented visual progress indicators, enabling users to quickly grasp critical information.",
      "Improved clarity and efficiency in handling assessments by simplifying key workflows.",
    ],
  },
  {
    title: "Assessment survey completion",
    image: "feature-2-survey-completion.png.webp",
    problem:
      "The survey process lacked clarity and flexibility, making it difficult for users to complete tasks efficiently and understand their roles within collaborative workflows.",
    bullets: [
      "Redesigned the survey process to mirror familiar tools, enhancing usability.",
      "Developed a step-by-step pipeline to guide users through the survey seamlessly.",
      "Optimized workflows for role-based permissions, ensuring smooth collaboration between distinct user roles.",
    ],
  },
  {
    title: "Assessment reporting",
    image: "feature-3-reporting.png.webp",
    problem:
      "Comparing data across assessments was cumbersome and error-prone, with no intuitive way to analyze or switch between reports seamlessly.",
    bullets: [
      "Enabled seamless switching between reports for improved side-by-side comparisons.",
      "Introduced features to streamline data analysis across organizational units and vendors.",
      "Enhanced decision-making by reducing reliance on manual cross-referencing.",
    ],
  },
  {
    title: "Assessment builder",
    image: "feature-4-builder.png.webp",
    problem:
      "Creating new assessments was overly complex and unintuitive, resulting in confusion and a steep learning curve for users attempting to set up processes.",
    bullets: [
      "Transformed assessment creation into a guided, user-friendly process.",
      "Provided contextual tips at each step to assist less experienced users.",
      "Simplified complex workflows, improving accessibility for diverse user skill levels.",
    ],
  },
  {
    title: "Commenting the survey",
    image: "feature-5-commenting.png.webp",
    problem:
      "The absence of built-in collaboration tools forced users to rely on external solutions, leading to fragmented workflows and reduced team efficiency.",
    bullets: [
      "Added collaboration tools allowing users to comment on specific survey sections.",
      "Introduced threaded discussions, fostering team-based problem-solving.",
      "Positioned the product as a collaborative tool, enhancing teamwork and communication.",
    ],
  },
  {
    title: "Dynamic sidebar",
    image: "feature-6-sidebar.png.webp",
    problem:
      "Users faced friction when reviewing or editing records, as the process was slow and required unnecessary steps, disrupting the overall workflow.",
    bullets: [
      "Integrated a context-sensitive sidebar for quick access to record details and edits.",
      "Streamlined workflows by enabling seamless transitions between sections without extra steps.",
      "Enhanced productivity by eliminating friction in repetitive tasks.",
    ],
  },
];

function FeatureItem({
  feature,
  active,
  registerRef,
}: {
  feature: (typeof FEATURES)[number];
  active: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={registerRef}
      className="flex min-h-[420px] flex-col justify-center py-12 transition-opacity duration-300 sm:min-h-[560px]"
      style={{ opacity: active ? 1 : 0.5 }}
    >
      <h3 className="text-2xl font-medium text-[#080d10] sm:text-3xl">{feature.title}</h3>
      <p className="font-body mt-4 text-sm text-[#080d10]/70">{feature.problem}</p>
      <p className="font-body mt-6 text-sm font-semibold text-[#080d10]">What we&apos;ve done:</p>
      <ul className="font-body mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-[#080d10]/70">
        {feature.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {/* Mobile-only inline image since the sticky illustration column is desktop-only */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-[#f4f5f4] lg:hidden">
        <Image src={`${ASSET}/${feature.image}`} alt={feature.title} width={1200} height={900} className="w-full object-cover" />
      </div>
    </div>
  );
}

export function FeaturesScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Project" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Key project's features" />
        </h2>

        <div className="mt-12 flex flex-col gap-8 sm:mt-16 lg:flex-row">
          <div className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:w-[58%] lg:shrink-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f4f5f4]">
              {FEATURES.map((f, i) => (
                <Image
                  key={f.image}
                  src={`${ASSET}/${f.image}`}
                  alt={f.title}
                  fill
                  sizes="60vw"
                  className="object-cover transition-opacity duration-[600ms]"
                  style={{ opacity: activeIndex === i ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            {FEATURES.map((f, i) => (
              <FeatureItem
                key={f.title}
                feature={f}
                active={activeIndex === i}
                registerRef={(el) => {
                  itemRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
