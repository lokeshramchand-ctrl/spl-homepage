import { Button } from "../shared/button";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";
import { StatCardGrid } from "./StatCard";

const IMPROVEMENTS = [
  "Flexible lesson builder – Teachers can create lessons, assign tasks, and run automated tests with built-in feedback",
  "Streamlined payment flow – A clean interface, payment gateway integration",
  "Daily tools for teachers – Scheduling, in-platform messaging, and data analytics to stay organized and connected",
  "Admin dashboard – A restructured interface that simplifies managing applications and student registrations",
];

export function Conclusion() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Conclusion" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Results" />
        </h2>

        <div className="mt-12 sm:mt-16">
          <StatCardGrid />
        </div>

        <FadeUp className="mt-16 max-w-3xl sm:mt-20">
          <p className="text-lg text-[#080d10]/80 sm:text-xl">
            The redesign of Qurtuba transformed it into a modern, user-friendly platform built specifically for
            schools. We focused on simplifying the experience for both teachers and administrators, addressing pain
            points around lessons, payments, and overall usability.
          </p>
          <p className="font-body mt-6 text-sm font-semibold text-[#080d10]">Key improvements include:</p>
          <ul className="font-body mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-[#080d10]/70">
            {IMPROVEMENTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg text-[#080d10]/80 sm:text-xl">
            With these updates, Qurtuba now empowers schools to teach more effectively, communicate with ease, and
            handle operations with confidence.
          </p>
          <div className="mt-8">
            <Button href="https://www.qurtubaonline.com/" variant="orange" target="_blank">
              View website
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
