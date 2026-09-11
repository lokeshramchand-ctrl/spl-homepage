import Image from "next/image";
import { Button } from "../shared/button";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const CLIENT_STATS = [
  { value: "500M+", label: "investments raised by our clients" },
  { value: "x2", label: "avg projects per client — most come back" },
  { value: "5.0", label: "on clutch — 50+ reviews" },
  { value: "35%", label: "conversion lift — klickex case" },
];

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[40px] bg-[#080d10] pt-32 pb-16 text-white sm:rounded-b-[64px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <ScrambleText
            text="Product Design and Development Agency"
            as="p"
            className="font-body text-xs font-semibold uppercase tracking-wide text-white/70"
          />
          <a
            href="https://phenomenonstudio.com/projects/wisdom-a-digital-platform-for-safer-more-connected-aging"
            className="flex items-center gap-2 rounded bg-white/5 px-3 py-2"
          >
            <Image src={`${ASSET}/icons/Frame-2131329725.svg`} alt="Red dot winner 2026" width={16} height={16} />
            <span className="font-body text-xs font-semibold uppercase tracking-wide">Red dot winner 2026</span>
          </a>
        </div>

        <h1 className="mt-6 max-w-[1040px] text-[44px] font-medium leading-[1.05] tracking-tight sm:text-[56px] lg:text-[72px]">
          <RevealWords text="We take brands, websites, and products to the next level." />
        </h1>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button href="/#contact" variant="orange">
            Let&apos;s talk
          </Button>
          <Button href="/cases" variant="white-light">
            View our cases
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
          <FadeUp className="relative overflow-hidden rounded-xl">
            <video
              className="w-full rounded-xl"
              style={{ aspectRatio: "1.33", objectFit: "cover" }}
              src={`${ASSET}/videos/showreel_homepage_2_tiny-2.mp4`}
              autoPlay
              playsInline
              muted
              loop
            />
            <span className="absolute bottom-4 left-4 border-b border-white/60 pb-0.5 text-xs font-semibold uppercase tracking-wide">
              Showreel 25/26
            </span>
          </FadeUp>

          <div className="flex flex-col">
            <FadeUp>
              <p className="text-xl leading-snug sm:text-2xl">
                We work with teams who&apos;ve outgrown what they&apos;ve built — and need one partner to rethink,
                redesign, and ship it right. From the first strategy call to post-launch support, we own it end to
                end.
              </p>
            </FadeUp>

            <ScrambleText
              text="Designing products backed by top-tier investors"
              as="p"
              className="font-body mt-8 text-xs font-semibold uppercase tracking-wide text-white/60"
            />

            <div className="mt-6 grid grid-cols-4 items-center gap-4 sm:grid-cols-4">
              {["l_1.svg", "l_2.svg", "l_3.svg"].map((f) => (
                <div key={f} className="flex items-center justify-center">
                  <Image src={`${ASSET}/icons/${f}`} alt="Investor logo" width={80} height={57} className="h-auto w-full opacity-80" />
                </div>
              ))}
              <div className="flex items-center justify-center">
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-white/50">and more</span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
              {CLIENT_STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <div className="text-3xl font-medium">{s.value}</div>
                  <p className="font-body mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
