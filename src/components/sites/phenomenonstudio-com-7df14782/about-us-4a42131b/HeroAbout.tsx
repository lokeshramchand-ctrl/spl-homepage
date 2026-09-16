import { Button } from "../shared/button";
import { RevealWords, ScrambleText } from "../shared/reveal";

const STATS = [
  { value: "98%", label: "customer satisfaction rate" },
  { value: "35%+", label: "boost in conversions after redesign" },
  { value: "70+", label: "top-tier designers and developers on board" },
  { value: "92%", label: "of clients return for additional work" },
];

export function HeroAbout() {
  return (
    <section className="relative overflow-hidden rounded-b-[40px] bg-[#080d10] pt-32 pb-16 text-white sm:rounded-b-[64px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Product Design and Development Agency"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-white/70"
        />

        <h1 className="mt-6 max-w-[1040px] text-[44px] font-medium leading-[1.05] tracking-tight sm:text-[56px] lg:text-[72px]">
          <RevealWords text="From a four-person startup studio to a 70+ talent team designing across industries and continents" />
        </h1>

        <p className="mt-8 max-w-xl text-lg text-white/70">
          Phenomenon Studio began with late nights on Upwork, often chasing projects until 3&nbsp;&ndash; 4 a.m. First
          clients came &ndash; and stayed. The work scaled. So did the team. What&apos;s never changed: high
          standards, deep thinking, and a shared drive to do things right.
        </p>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Button href="/contact-us" variant="orange">
            Let&apos;s talk
          </Button>
          <Button href="/projects" variant="white-light">
            View our cases
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-4xl font-medium sm:text-5xl">{s.value}</div>
              <p className="font-body mt-2 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
