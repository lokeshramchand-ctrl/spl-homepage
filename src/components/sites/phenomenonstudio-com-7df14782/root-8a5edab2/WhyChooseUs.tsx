import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";

const CARDS = [
  {
    eyebrow: "Design that meets regulation",
    lead: "HIPAA-compliant and GDPR-aligned expertise for Healthcare and beyond.",
    body: "Since 2019, we've built HIPAA-compliant and GDPR-aligned delivery practices and earned industry recognition, delivering hundreds of products in Healthcare, SaaS, FinTech, and EdTech — where compliance and UX go hand in hand.",
  },
  {
    eyebrow: "Design that lasts beyond trends",
    lead: "We don't chase fads. We build digital products that stay relevant.",
    body: "Our work looks sharp today and stays usable tomorrow — designed around long-term value, not short-term gimmicks. Scalable systems, brand consistency, and smart UX that grows with your product.",
  },
  {
    eyebrow: "Design that's developer-ready",
    lead: "We design for implementation, not handoff.",
    body: "Every component is built with devs in mind: design tokens, accessibility, reusability, and real-world constraints. We collaborate with your team, reuse existing elements, and stay involved until everything's live.",
  },
  {
    eyebrow: "Local presence. Global delivery",
    lead: "Work directly with the doers — not a chain of account managers.",
    body: "Collaborate with UX strategists in North America, while our senior design and development teams in Europe deliver fast, consistent results. We integrate into your tools and workflow, working as part of your team — from a single embedded designer to a full product squad.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white pb-24 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Why choose us?" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Your success is our priority" />
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CARDS.map((c) => (
            <FadeUp key={c.eyebrow} className="flex flex-col rounded-xl bg-[#f4f5f4] p-10">
              <div className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">{c.eyebrow}</div>
              <div className="mt-3 text-xl text-[#080d10]">{c.lead}</div>
              <p className="font-body mt-20 text-sm text-[#080d10]/60">{c.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
