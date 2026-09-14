import { FadeUp } from "../shared/reveal";

export const RESULT_STATS = [
  {
    title: "2x increase in user efficiency",
    body: "The workflow and design improvements doubled how quickly users could complete assessments — less back-and-forth, fewer dead ends, and a platform that got out of the way when the work got complex.",
  },
  {
    title: "50% reduced time-to-market",
    body: "A design system built on reusable atomic components — mirrored in Storybook on the development side — kept the product visually consistent and cut time-to-market by over 50%.",
  },
  {
    title: "Industry recognition and market growth",
    body: "A UX Design Award nomination and measurable growth in traffic and lead generation gave Isora GRC a stronger footing in the GRC market — recognised not just for what it does, but for how it works.",
  },
];

export function StatCardGrid({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {RESULT_STATS.map((s, i) => (
        <FadeUp
          key={s.title}
          delayMs={i * 100}
          className={
            variant === "dark"
              ? "rounded-2xl bg-white/[0.06] p-6 sm:p-8"
              : "rounded-2xl bg-[#080d10]/[0.04] p-6 sm:p-8"
          }
        >
          <h3 className={`text-base font-medium sm:text-lg ${variant === "dark" ? "text-white" : "text-[#080d10]"}`}>{s.title}</h3>
          <p className={`font-body mt-3 text-sm ${variant === "dark" ? "text-white/70" : "text-[#080d10]/70"}`}>{s.body}</p>
        </FadeUp>
      ))}
    </div>
  );
}
