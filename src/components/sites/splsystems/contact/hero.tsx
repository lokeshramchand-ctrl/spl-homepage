import { InView, Reveal } from "../reveal";
import { SheenText } from "./sheen-text";

export function GlobalPresenceHero() {
  return (
    <section className="relative px-5 pb-20 pt-[117px] md:px-10 md:pb-32">
      <InView className="mx-auto flex max-w-[1800px] flex-col gap-4 md:gap-6">
        <SheenText
          as="h1"
          text="Global presence"
          className="max-w-[18ch] text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:text-[4rem]"
        />
        <Reveal
          as="p"
          stagger={1}
          className="text-[1rem] font-medium tracking-[-0.03em] text-[#181818]/50"
        >
          Headquartered in Hyderabad, India, with a presence in San Jose.
        </Reveal>
      </InView>
    </section>
  );
}
