import { AskAi } from "./ask-ai";
import { HeroLiquid } from "./hero-liquid/HeroLiquid";

/** Standalone band between the last content section and the footer. */
export function AiBand() {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfb] px-4 py-24 md:px-8 md:py-16">
      <HeroLiquid
        intro={false}
        className="opacity-30"
        params={{
          repetition: 1.4,
          angle: 10,
          shiftRed: 0.25,
          shiftBlue: 0.3,
          shadowBlue: 0.08,
          contour: 0.7,
          distortion: 0.05,
          flow: 0.6,
          speed: 0.22,
          softness: 1.3,
        }}
      />
      <div className="relative mx-auto flex min-h-0 w-full max-w-[2000px] items-center justify-center md:min-h-[50vh]">
        <AskAi
          label="Summarize this page with AI"
          prompt="Summarize this page: https://cyphercapital.com"
          size="lg"
        />
      </div>
    </section>
  );
}
