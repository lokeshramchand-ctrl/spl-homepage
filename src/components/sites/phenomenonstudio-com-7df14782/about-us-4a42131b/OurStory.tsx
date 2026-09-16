"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/about-us-4a42131b";

function QuoteAudio({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("00:00");

  const toggle = () => {
    const audio = ref.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const audio = ref.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
    const s = Math.floor(audio.currentTime);
    setTime(`${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`);
  };

  return (
    <div className="mt-6 flex items-center gap-4 rounded-full bg-[#080d10] px-3 py-2.5 text-white">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#080d10]"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20">
        <div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${progress}%` }} />
      </div>
      <span className="font-body text-xs text-white/70">{time}</span>
      <audio
        ref={ref}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
        className="hidden"
      />
    </div>
  );
}

function FounderQuote({
  avatar,
  name,
  quote,
  audioSrc,
}: {
  avatar: string;
  name: string;
  quote: string;
  audioSrc: string;
}) {
  return (
    <FadeUp className="mt-16 max-w-md rounded-2xl bg-[#080d10]/[0.04] p-6 sm:ml-auto">
      <div className="flex items-center gap-3">
        <Image src={avatar} alt={name} width={48} height={48} className="rounded-full object-cover" />
        <div>
          <p className="text-base font-medium text-[#080d10]">{name}</p>
          <span className="font-body text-xs text-[#080d10]/50">co-founder</span>
        </div>
      </div>
      <p className="mt-6 text-xl text-[#080d10]">{quote}</p>
      <QuoteAudio src={audioSrc} />
    </FadeUp>
  );
}

export function OurStory() {
  return (
    <section className="bg-white pt-24 pb-16 sm:pt-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="What grounded us then, and still does" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="It wasn't one client or one breakthrough: just consistent work, good people, and a clear sense of what matters" />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#080d10]/8 pt-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">In the founders&apos; words</p>
          <div className="max-w-2xl text-lg text-[#080d10]/70">
            <p>
              Our company was founded in 2019 by Valerii Filimonov and Polina Chebanova, both with a background in
              product design but different perspectives.
            </p>
            <p className="mt-4">
              Valerii came from e-commerce and early-stage startups, driven by systems thinking and user flows.
              Polina led cross-functional teams at design studios in Ukraine and the UK, refining how interfaces
              look, feel, and behave.
            </p>
          </div>
        </div>

        <FounderQuote
          avatar="/sites/phenomenonstudio-com-7df14782/root-8a5edab2/images/Rectangle-34624326.png.webp"
          name="Valerii Filimonov"
          quote="I saw that for many designers, beauty mattered more than logic. I wanted to create something grounded—with people who think deeply."
          audioSrc={`${ASSET}/audio/valerii-quote.mp3`}
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["gallery-1.jpg.webp", "gallery-2.jpg.webp", "gallery-3.jpg.webp", "gallery-4.jpg.webp", "gallery-5.jpg.webp"].map((f, i) => (
            <FadeUp
              key={f}
              delayMs={i * 60}
              className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[16/10] sm:col-span-2" : "aspect-[3/4]"}`}
            >
              <Image src={`${ASSET}/images/${f}`} alt="Phenomenon team" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
            </FadeUp>
          ))}
        </div>

        <FounderQuote
          avatar={`${ASSET}/images/polina-avatar.png.webp`}
          name="Polina Chebanova"
          quote="We never aimed to grow fast. The goal was to build something better—and people who felt the same kept joining us."
          audioSrc={`${ASSET}/audio/polina-quote.mp3`}
        />
      </div>
    </section>
  );
}
