import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

export function FutureChanges() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Future changes" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="What happened next?" />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-12">
          <FadeUp>
            <h3 className="text-xl font-medium text-[#080d10] sm:text-2xl">Adapting to new needs</h3>
            <p className="font-body mt-4 text-sm text-[#080d10]/70">
              With the growth of the business and changes in the audience, additional optimizations for new devices
              and platforms became essential. Elements were redesigned to enhance the experience for mobile users.
            </p>
          </FadeUp>
          <FadeUp delayMs={100}>
            <h3 className="text-xl font-medium text-[#080d10] sm:text-2xl">Adapting for inclusive users</h3>
            <p className="font-body mt-4 text-sm text-[#080d10]/70">
              With the growth of the business and the evolving audience, we prioritized adaptations for inclusivity.
              This included implementing features for reading accessibility, such as adjustable text size,
              customizable color schemes, a larger cursor for easier navigation, and a reading line to assist users
              in following text. These enhancements ensure that Qurtuba provides a more accessible and supportive
              environment for all users, catering to diverse needs in the learning experience.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
