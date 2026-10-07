import { InView, RevealWords, WipeButton } from "./reveal";
import { HeroLiquid } from "./hero-liquid/HeroLiquid";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-[#fbfbfb] px-5 pb-16 pt-[117px] md:px-10 md:pb-24">
      <HeroLiquid />
      <InView className="relative mx-auto flex w-full max-w-[1800px] flex-col gap-8 md:gap-10">
        <h1 className="max-w-[18ch] text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:max-w-[20ch] md:text-[4rem]">
          <RevealWords text="Bridging capital with frontier opportunities" />
        </h1>
        <WipeButton href="#capabilities" className="w-fit text-[0.95rem] text-[#181818]">
          Explore capabilities
        </WipeButton>
      </InView>
    </section>
  );
}
