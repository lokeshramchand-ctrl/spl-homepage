import { HeroLiquid } from "./hero-liquid/HeroLiquid";
import { ArrowUpRightIcon } from "./icons";
import { InView, Reveal, RevealWords } from "./reveal";

export function Infrastructure() {
  return (
    <section
      id="infrastructure"
      className="relative overflow-hidden bg-[#181818] px-5 py-24 text-white md:px-10 md:py-32"
    >
      <HeroLiquid
        intro={false}
        mirror
        shadeFloor={0.5}
        fallbackTone="light"
        className="opacity-90"
        params={{
          repetition: 3.4,
          angle: 50,
          shiftRed: 0.95,
          shiftBlue: 0.15,
          shadowBlue: 0.02,
          contour: 1,
          distortion: 0.2,
          flow: 1,
          speed: 0.6,
          softness: 0.55,
        }}
      />
      <div className="relative mx-auto flex max-w-[1800px] flex-col items-center gap-10 text-center md:gap-12">
        <div className="w-full border-t border-[#ffffff33] pt-4 text-[0.95rem] tracking-[-0.02em] text-white">
          Infrastructure
        </div>

        <InView className="flex flex-col items-center gap-10 md:gap-12">
          <h2 className="max-w-[20ch] text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3.25rem]">
            <RevealWords text="Powering the AI transition: global data infrastructure" />
          </h2>

          <Reveal
            as="p"
            stagger={1}
            className="max-w-[56ch] text-[1rem] leading-[1.6] tracking-[-0.01em] text-[#ffffff99]"
          >
            Storm Group, Cypher Capital&rsquo;s affiliate, develops and operates AI
            data-centre infrastructure in Europe. Through Storm Group, Cypher
            Capital structures institutional access to the physical
            infrastructure powering AI and compute growth.
          </Reveal>

          <Reveal
            as="div"
            stagger={2}
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
          >
            <a
              href="https://www.cyphercapital.com/ai-infrastructure"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.95rem] font-medium tracking-[-0.02em] text-white underline decoration-white/40 underline-offset-4"
            >
              Explore AI Infrastructure
            </a>
            <span className="hidden h-5 w-px bg-white/30 sm:block" />
            <a
              href="https://stormgroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.95rem] font-medium tracking-[-0.02em] text-white underline decoration-white/40 underline-offset-4"
            >
              Visit stormgroup.com
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </InView>
      </div>
    </section>
  );
}
