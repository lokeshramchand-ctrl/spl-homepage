import { Button } from "../shared/button";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";
import { StatCardGrid } from "./StatCard";

export function Conclusion() {
  return (
    <section className="mt-24 rounded-[2.5rem] bg-[#080d10] py-20 sm:mt-32 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Conclusion" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-white/50" />
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-white sm:text-5xl">
          <RevealWords text="Results" />
        </h2>

        <div className="mt-12 sm:mt-16">
          <StatCardGrid variant="dark" />
        </div>

        <FadeUp className="mt-16 max-w-3xl border-t border-white/10 pt-10 sm:mt-20 sm:pt-12">
          <p className="text-lg text-white/80 sm:text-xl">
            The Isora GRC redesign brought the product in line with what its users actually needed — a modern,
            efficient tool that could handle the complexity of GRC work without creating more of it.
          </p>
          <p className="mt-6 text-lg text-white/80 sm:text-xl">
            The improvements were concrete. Assessment management got streamlined, the survey workflow was rebuilt
            with expanded functionality, and reporting was overhauled to allow comparisons across units and vendors.
            The new assessment builder and collaborative commenting tools made Isora GRC a better fit for teams
            working through assessments together. A dynamic sidebar and a consistent design system cleaned up the
            workflows that had been generating the most friction.
          </p>
          <p className="mt-6 text-lg text-white/80 sm:text-xl">
            The project was submitted to the UX Design Awards and received a nomination — recognition from outside
            the client relationship that the work stood on its own merits.
          </p>
          <div className="mt-8">
            <Button href="https://www.saltycloud.com" variant="white" target="_blank">
              View live
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
