"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/images";
const VIDEO_ASSET = "/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/videos";

const TEAM = [
  { name: "Polina C.", role: "co-founder", photo: "team-polina.png.webp", video: "team-polina.mp4" },
  { name: "Valerii F.", role: "co-founder", photo: "team-valerii.png.webp", video: "team-valerii.mp4" },
  { name: "Yuliia A.", role: "CEO", photo: "team-yuliia.png.webp", video: "team-yuliia.mp4" },
  { name: "Ruslan V.", role: "head of design", photo: "team-ruslan.png.webp" },
  { name: "Alina S.", role: "finance & operations director", photo: "team-alina.png.webp", video: "team-alina.mp4" },
  { name: "Anatolii S.", role: "head of development", photo: "team-anatolii.png.webp", video: "team-anatolii.mp4" },
  { name: "Denis R.", role: "head of IT engineering and business analysis", photo: "team-denis.png.webp" },
  { name: "Dmitriy K.", role: "head of art", photo: "team-dmitriy.png.webp", video: "team-dmitriy.mp4" },
  { name: "Alena O.", role: "promo team lead", photo: "team-alena.png.webp" },
  { name: "Artem I.", role: "product team lead", photo: "team-artem.png.webp" },
  { name: "Anastasia D.", role: "account executive", photo: "team-anastasia.png.webp" },
  { name: "Ksenia S.", role: "account executive", photo: "team-ksenia.png.webp", video: "team-ksenia.mp4" },
  { name: "Oleksandr K.", role: "marketing manager", photo: "team-oleksandr.png.webp" },
  { name: "Iryna R.", role: "PM lead", photo: "team-iryna.png.webp", video: "team-iryna.mp4" },
  { name: "Vadym S.", role: "lead front-end engineer", photo: "team-vadym.png.webp" },
  { name: "Anna Ch.", role: "HR Lead", photo: "team-anna-ch.png.webp", video: "team-anna-ch.mp4" },
  { name: "Denys M.", role: "solution architect", photo: "team-denys-m.png.webp", video: "team-denys-m.mp4" },
  { name: "Denys Z.", role: "recruiter", photo: "team-denys-z.png.webp", video: "team-denys-z.mp4" },
  { name: "Daria L.", role: "product designer", photo: "team-daria.png.webp" },
  { name: "Katerina K.", role: "product designer", photo: "team-katerina.png.webp" },
];

function MicOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 3l18 18M9 9v3a3 3 0 0 0 4.44 2.63M15 9.34V5a3 3 0 0 0-5.68-1.33M5 10v2a7 7 0 0 0 10.53 6.05M19 12a7 7 0 0 1-.88 3.41M12 19v3m-4 0h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamCard({ member }: { member: (typeof TEAM)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeUp
      className="group relative aspect-[3/3.4] overflow-hidden rounded-xl bg-[#080d10]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image src={`${ASSET}/${member.photo}`} alt={member.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      {member.video && (
        <video
          src={`${VIDEO_ASSET}/${member.video}`}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${hover ? "opacity-100" : "opacity-0"}`}
          autoPlay={hover}
          muted
          loop
          playsInline
        />
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded bg-[#080d10]/70 px-2 py-1.5 text-white backdrop-blur-sm">
        {member.video && <MicOffIcon className="size-3.5 text-white/70" />}
        <span className="font-body text-xs">
          {member.name} ({member.role})
        </span>
      </div>
    </FadeUp>
  );
}

export function TeamGallery() {
  return (
    <section className="bg-white pt-24 pb-24 sm:pt-40 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Our team" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Meet the phenomenal people behind our projects" />
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#080d10]/60">
          We believe great work doesn&apos;t come from titles; it comes from people. Ours think deeply, care
          fiercely, and take pride in what they build. From product leads and designers to developers and advisors,
          we work across time zones and disciplines but share the same core: curiosity, honesty, and a hands-on
          commitment to doing things right.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEAM.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
