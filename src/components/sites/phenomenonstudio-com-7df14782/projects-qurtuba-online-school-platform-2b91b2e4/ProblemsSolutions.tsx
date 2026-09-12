import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const PAIRS = [
  {
    problem:
      "The client needed to tackle urgent user experience challenges while ensuring the platform could scale to accommodate future growth. This required a strategic approach that addressed both short-term issues and long-term goals.",
    solution:
      "After a product audit and refined information architecture, we executed a plan balancing speed and quality. Design and development ran in parallel, with close client collaboration ensuring alignment. This approach delivered impactful results on tight deadlines while supporting future scalability.",
  },
  {
    problem:
      "The platform's original interface lacked cohesion and user experience principles. It suffered from disorganization, where each feature worked independently with inconsistent workflows. Additionally, frequent transitions to external tools and additional platforms added complexity.",
    solution:
      "To tackle these issues, we conducted a comprehensive research to pinpoint inefficiencies and inconsistencies. A modern, user-centric design united scattered features into a cohesive and flowing experience.",
  },
  {
    problem:
      "The platform had operated for years, demanding significant attention from the client's team to sustain and manage the existing infrastructure. This left limited room for making substantial changes to the backend, making it challenging to optimize usability and streamline user interactions effectively.",
    solution:
      "To address this, we carefully reviewed the platform's existing architecture to identify areas for improvement. By optimizing user flows and implementing thoughtful adjustments within the established system, we delivered meaningful enhancements to the user experience without disrupting backend functionality. This approach allowed for improved usability while maintaining the platform's stability and reliability.",
  },
  {
    problem:
      "The client had accumulated valuable insights from user feedback, highlighting key areas that needed attention. However, due to limited resources in design and development, they faced challenges implementing significant updates based on this input.",
    solution:
      "Before release, we conducted extensive testing to refine the platform based on user behavior and pain points. Insights were translated into targeted improvements, resulting in a more intuitive platform and increased user satisfaction.",
  },
];

export function ProblemsSolutions() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Project" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Problems & solutions" />
        </h2>

        <div className="mt-12 flex flex-col gap-3 sm:mt-16">
          {PAIRS.map((pair, i) => (
            <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FadeUp className="rounded-2xl border border-[#080d10]/8 p-6 sm:p-8">
                <h3 className="text-xl font-medium text-[#080d10] sm:text-2xl">Problem</h3>
                <p className="font-body mt-6 text-sm text-[#080d10]/70">{pair.problem}</p>
              </FadeUp>
              <FadeUp delayMs={80} className="rounded-2xl bg-[#080d10]/[0.04] p-6 sm:p-8">
                <h3 className="text-xl font-medium text-[#080d10] sm:text-2xl">Solution</h3>
                <p className="font-body mt-6 text-sm text-[#080d10]/70">{pair.solution}</p>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
