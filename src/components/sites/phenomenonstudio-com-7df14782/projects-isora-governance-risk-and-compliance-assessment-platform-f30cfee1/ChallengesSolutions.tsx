import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const PAIRS = [
  {
    problem:
      "The platform had years of production history behind it, and the client's team was mostly focused on keeping things running. Backend changes were off the table for the most part, so we had to find ways to improve the user flows without touching much of the underlying infrastructure.",
    solution:
      "We started by going through the backend to understand what we had to work with. From there we refined the user flows within the existing architecture — enough to noticeably improve the experience without pulling the platform apart.",
  },
  {
    problem:
      "The client had years of user feedback and knew where the problems were. Their internal team didn't have the design or development capacity to do much with it.",
    solution:
      "We worked directly with the client's team and used their existing user feedback to drive the redesign. That kept the changes tied to what users had actually asked for, rather than what we assumed they needed.",
  },
  {
    problem:
      "The client needed to fix usability problems without destabilizing a platform that still had to scale. That meant sequencing the work carefully rather than trying to do everything at once.",
    solution:
      "We started with a product audit and reworked the information architecture, then split the project into phases. The biggest user-facing problems went first so there was something tangible to show early on. Design and development ran in parallel, which kept the timeline from blowing out.",
  },
  {
    problem:
      "The original interface had been built by developers without much UX input. It showed. The layout was cluttered and non-technical users had a hard time finding their way around.",
    solution:
      "We went through the interface and mapped out where users were getting stuck. The workflows got simplified, the design got a proper overhaul, and non-technical users could finally navigate it without hand-holding.",
  },
];

export function ChallengesSolutions() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Project" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Challenges & solutions" />
        </h2>

        <div className="mt-12 flex flex-col gap-3 sm:mt-16">
          {PAIRS.map((pair, i) => (
            <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FadeUp className="rounded-2xl border border-[#080d10]/8 p-6 sm:p-8">
                <h3 className="text-xl font-medium text-[#080d10] sm:text-2xl">Challenge</h3>
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
