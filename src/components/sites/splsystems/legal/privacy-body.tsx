import { InView, Reveal } from "../reveal";
import { SheenText } from "../contact/sheen-text";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from "./privacy-content";

export function PrivacyHero() {
  return (
    <section className="relative px-5 pb-16 pt-[117px] md:px-10 md:pb-24">
      <InView className="mx-auto flex max-w-[1800px] flex-col gap-4 md:gap-6">
        <SheenText
          as="h1"
          text="Privacy Policy"
          className="max-w-[18ch] text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:text-[4rem]"
        />
        <Reveal
          as="p"
          stagger={1}
          className="max-w-[48ch] text-[1rem] font-medium tracking-[-0.03em] text-[#181818]/50"
        >
          What we collect, why we collect it, and the choices you have. Last updated {PRIVACY_UPDATED}.
        </Reveal>
      </InView>
    </section>
  );
}

export function PrivacySections() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-12 md:flex-row md:gap-16">
        <nav aria-label="On this page" className="md:sticky md:top-24 md:w-[30%] md:self-start">
          <div className="border-t border-[#181818]/20 pt-4 text-[0.95rem] tracking-[-0.02em] text-[#181818]">
            Contents
          </div>
          <ol className="mt-4 flex flex-col gap-2 text-[1rem] tracking-[-0.03em] text-[#181818]/60">
            {PRIVACY_SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-[#181818]">
                  <span className="mr-2 tabular-nums text-[#181818]/30">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-1 flex-col">
          {PRIVACY_SECTIONS.map((s, i) => (
            <InView key={s.id}>
              <Reveal as="div" stagger={0} className="border-t border-[#181818]/20 py-8 md:py-10">
                <section id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
                  <h2
                    id={`${s.id}-h`}
                    className="text-[1.5rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#181818] md:text-[2rem]"
                  >
                    <span className="mr-3 tabular-nums text-[#181818]/30">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 flex max-w-[68ch] flex-col gap-4 text-[1rem] leading-[1.5] tracking-[-0.01em] text-[#181818]/70">
                    {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                    {s.items ? (
                      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[#181818]/30">
                        {s.items.map((it) => <li key={it}>{it}</li>)}
                      </ul>
                    ) : null}
                  </div>
                </section>
              </Reveal>
            </InView>
          ))}
          <div className="border-t border-[#181818]/20" />
        </div>
      </div>
    </section>
  );
}
