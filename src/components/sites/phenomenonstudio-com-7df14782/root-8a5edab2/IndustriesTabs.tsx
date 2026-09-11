"use client";

import { useState } from "react";
import { ScrambleText, RevealWords } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const TABS = [
  {
    label: "SaaS",
    title: "Scalable platforms for growth-focused teams",
    video: "tinyvid_optimized_1_c3e89d72e9ca2837d9e85643956c8544.mp4",
    href: "/saas-design-agency",
    challenges: ["High churn from poor and fragmented UX", "Scaling product features without compromising speed", "Converting freemium users into paying subscribers"],
    solutions: ["Streamlined flows to improve activation and retention", "Modular UX and design systems to scale features faster", "Clean billing and plan management UX to improve conversion"],
  },
  {
    label: "Healthcare",
    title: "HIPAA-compliant design and development for health tech products",
    video: "tinyvid_optimized_2_original-7d5a927fb8e1aed94b2f0dadb537fe63.mp4",
    href: "/app-development-for-healthcare",
    challenges: ["UX complexity in health tracking, patient records, and telehealth", "Data privacy and HIPAA compliance", "Building trust with patients and practitioners"],
    solutions: ["Patient-first UX that simplifies complex workflows", "Secure infrastructure aligned with regulatory standards", "Clean, professional UI that builds user trust"],
  },
  {
    label: "EdTech",
    title: "Digital learning platforms that engage and scale",
    video: "tinyvid_optimized_5_original-c138f335ff5d89bfd76a54cb9b1b76f4.mp4",
    href: "/education-it-services",
    challenges: ["Low engagement in self-paced learning environments", "Accessibility compliance (ADA, WCAG)", "Performance under high concurrent user loads"],
    solutions: ["Gamified UX to keep learners motivated", "Adaptive UI for different learning needs and devices", "Cloud-based, scalable architecture for education at scale"],
  },
  {
    label: "FinTech",
    title: "Secure, compliant digital products for modern finance",
    video: "tinyvid_optimized_3_original-73b35d49f86d187eea5f51868f628bd4.mp4",
    href: "/fintech-design-agency",
    challenges: ["KYC, AML, and global compliance requirements", "Drop-offs during complex onboarding and verification flows", "Real-time integrations with payment and exchange systems"],
    solutions: ["Frictionless onboarding and verification UX", "Secure UI for transactions and money movement", "API-driven architecture built for performance and scale"],
  },
];

export function IndustriesTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="industries" className="scroll-mt-24 bg-white py-24 sm:py-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Key Industries" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Our areas of expertise" />
        </h2>

        <div className="mt-16 flex gap-2 overflow-x-auto pb-2">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className="font-body shrink-0 rounded-lg px-6 py-4 text-xs font-semibold uppercase tracking-wide transition-colors"
              style={{
                backgroundColor: active === i ? "#080d10" : "#f4f5f4",
                color: active === i ? "#fff" : "#080d10",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-[#080d10]/8 pt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <video
              key={tab.video}
              className="w-full rounded-xl"
              src={`${ASSET}/videos/${tab.video}`}
              autoPlay
              playsInline
              muted
              loop
            />
            <div>
              <h3 className="text-2xl font-medium text-[#080d10] sm:text-3xl">{tab.title}</h3>
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <div className="font-body text-xs uppercase text-[#080d10]/50">Challenges:</div>
                  <ul className="font-body mt-3 flex flex-col gap-2 border-t border-[#080d10]/8 pt-3 text-sm text-[#080d10]">
                    {tab.challenges.map((c) => (
                      <li key={c} className="list-disc pl-1 marker:text-[#080d10]/30">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-body text-xs uppercase text-[#080d10]/50">How we solve them:</div>
                  <ul className="font-body mt-3 flex flex-col gap-2 border-t border-[#080d10]/8 pt-3 text-sm text-[#080d10]">
                    {tab.solutions.map((s) => (
                      <li key={s} className="list-disc pl-1 marker:text-[#080d10]/30">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <Button href={tab.href} variant="orange">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
