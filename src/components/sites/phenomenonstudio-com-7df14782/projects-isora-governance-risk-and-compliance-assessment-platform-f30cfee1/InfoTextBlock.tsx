import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

export function InfoTextBlock({
  caption,
  title,
  paragraphs,
  subheading,
  subheadingParagraph,
}: {
  caption: string;
  title: string;
  paragraphs: string[];
  subheading?: string;
  subheadingParagraph?: string;
}) {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text={caption} as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text={title} />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2">
          <div className="hidden sm:block" />
          <FadeUp className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-[#080d10]/80 sm:text-xl">
                {p}
              </p>
            ))}
            {subheading && (
              <>
                <h3 className="mt-4 text-xl font-medium text-[#080d10] sm:text-2xl">{subheading}</h3>
                <p className="text-lg text-[#080d10]/80 sm:text-xl">{subheadingParagraph}</p>
              </>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
