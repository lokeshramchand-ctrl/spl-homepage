import { InView, RevealWords, WipeButton } from "./reveal";

/** Static ribbon graphic: exact paths/colors read from the source's hero SVG. */
function HeroLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 810"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-222.724 504.473C-222.724 504.473 304.862 504.473 749.059 504.473C1193.25 504.473 1176.74 692.755 1668 692.755"
        stroke="#202020"
        strokeWidth="151.074"
      />
      <path
        d="M-222.724 504.473C-222.724 504.473 60.4716 504.473 504.668 504.473C948.864 504.473 1176.74 -52.4742 1668 -52.4742"
        stroke="#868383"
        strokeWidth="151.074"
      />
      <path
        d="M-222.724 504.473C-222.724 504.473 304.862 504.473 749.059 504.473C1193.25 504.473 1176.74 259.574 1668 259.574"
        stroke="#383838"
        strokeWidth="151.074"
      />
      <path
        d="M-223.057 504.476C-223.057 504.476 -299.029 504.476 145.246 504.476C912.887 504.476 657.455 924.491 1668 924.491"
        stroke="#000000"
        strokeWidth="151.074"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfb] px-5 pb-24 pt-10 md:px-10 md:pb-32 md:pt-16">
      <HeroLines />
      <InView className="relative mx-auto flex max-w-[1800px] flex-col gap-8 md:gap-10">
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
