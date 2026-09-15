import { RevealWords } from "../shared/reveal";

export function ProjectsHero() {
  return (
    <section className="bg-white pb-12 pt-[50px] sm:pt-[70px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <h1 className="mt-1 max-w-[1156px] text-[44px] font-medium leading-[1.1] tracking-[-0.8px] text-[#080d10] sm:text-[64px] lg:text-[88px]">
          <RevealWords text="Explore our projects" />
        </h1>
      </div>
    </section>
  );
}
