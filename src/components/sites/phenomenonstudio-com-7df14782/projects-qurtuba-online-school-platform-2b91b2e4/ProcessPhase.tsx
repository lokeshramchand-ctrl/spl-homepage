import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images";

export type Stage = {
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  images?: string[];
};

const GRID_COLS_CLASS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

function ImageRow({ images }: { images: string[] }) {
  return (
    <div className={`mt-12 grid grid-cols-1 gap-3 sm:mt-16 ${GRID_COLS_CLASS[images.length] ?? "sm:grid-cols-3"}`}>
      {images.map((src) => (
        <FadeUp key={src} className="overflow-hidden rounded-2xl bg-[#f4f5f4]">
          <Image src={`${ASSET}/${src}`} alt="" width={1400} height={900} className="w-full object-cover" />
        </FadeUp>
      ))}
    </div>
  );
}

function StageBlock({ stage }: { stage: Stage }) {
  return (
    <div className="mt-24 sm:mt-32">
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">{stage.label}</p>
      <h3 className="mt-4 text-4xl font-medium tracking-tight text-[#080d10] sm:text-6xl lg:text-7xl">
        <RevealWords text={stage.title} />
      </h3>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2">
        <div className="hidden sm:block" />
        <FadeUp>
          <div className="flex flex-col gap-4">
            {stage.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-[#080d10]/80 sm:text-xl">
                {p}
              </p>
            ))}
          </div>
          {stage.bullets && (
            <ul className="font-body mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-[#080d10]/70">
              {stage.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </FadeUp>
      </div>
      {stage.images && stage.images.length > 0 && <ImageRow images={stage.images} />}
    </div>
  );
}

export function ProcessPhase({
  caption,
  title,
  intro,
  introImages,
  stages,
}: {
  caption: string;
  title: string;
  intro: string[];
  introImages?: string[];
  stages: Stage[];
}) {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text={caption} as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text={title} />
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-[#080d10]/8 pt-8 sm:grid-cols-2">
          <div className="hidden sm:block" />
          <FadeUp className="flex flex-col gap-4">
            {intro.map((p, i) => (
              <p key={i} className="text-lg text-[#080d10]/80 sm:text-xl">
                {p}
              </p>
            ))}
          </FadeUp>
        </div>
        {introImages && introImages.length > 0 && <ImageRow images={introImages} />}

        {stages.map((stage) => (
          <StageBlock key={stage.title} stage={stage} />
        ))}
      </div>
    </section>
  );
}
