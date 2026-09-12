import { FadeUp } from "../shared/reveal";

export const RESULT_STATS = [
  {
    title: "95% satisfaction in progress tracking",
    body: "95% of parents and educators praise the platform for simplifying progress tracking with live class access, automated updates, and quick homework checks, boosting academic engagement by 30%.",
  },
  {
    title: "2x boost in learning productivity",
    body: "Optimized tools enable students to complete lessons twice as fast, while interactive methods increase engagement by 40%, making learning faster and more enjoyable.",
  },
  {
    title: "Streamlined communication tools",
    body: "New chat and notifications enhance communication among teachers, students, and parents, ensuring instant updates and 25% faster response times, boosting satisfaction.",
  },
];

export function StatCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {RESULT_STATS.map((s, i) => (
        <FadeUp key={s.title} delayMs={i * 100} className="rounded-2xl bg-[#080d10]/[0.04] p-6 sm:p-8">
          <h3 className="text-base font-medium text-[#080d10] sm:text-lg">{s.title}</h3>
          <p className="font-body mt-3 text-sm text-[#080d10]/70">{s.body}</p>
        </FadeUp>
      ))}
    </div>
  );
}
