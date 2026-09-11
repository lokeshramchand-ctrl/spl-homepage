import Image from "next/image";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { StarIcon } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const RATING_CARDS = [
  { href: "https://clutch.co/profile/phenomenon-studio", icon: "clutch-icon.svg", rating: "5.0" },
  { href: "https://www.designrush.com/agency/profile/phenomenon-studio", icon: "design-icon.svg", rating: "4.9" },
];

const TESTIMONIALS = [
  { name: "Craig Tortolani", role: "CPO at Dekryption Labs", avatar: "1516924597216.jpeg.webp", video: "review-craig.mp4", poster: "cover-craig.webp" },
  { name: "Ash Bryant", role: "Founder of Hormn", avatar: "1766946800665.jpeg.webp", text: "The design team is truly world-class, excelling in both user interface design and creating solutions optimized for conversion." },
  { name: "KlickEx Team", role: "", avatar: "KlickEx.jpeg.webp", video: "klickex-review.mp4", poster: "klickex-cover.webp" },
  { name: "George Fry", role: "Founder at Neap", avatar: "Rectangle-34624326.png.webp", text: "The quality of the designs is fantastic. Phenomenon Studio works at speed and is extremely punctual with timelines. They deliver top-notch outcomes with exceptional designs." },
  { name: "Andre Guerra", role: "Co-Owner at RADCAT Design", avatar: "image.png.webp", video: "radcat-review.mp4", poster: "cover-andre-scaled.webp" },
  { name: "Kevin Alvarez", role: "Founder & General Partner, Predictive", avatar: "1683997337066.jpeg.webp", text: "Phenomenon Studio's ability to translate concepts and rough design mock-ups into high-fidelity assets, designs, and visuals was very impressive. The goal was to maintain simple elegance in the design aesthetic, and they did it very well." },
];

export function Testimonials() {
  return (
    <section className="bg-white pb-24 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <ScrambleText text="what our clients say" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
            <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
              <RevealWords text="5.0 is our average on clutch & designrush" />
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {RATING_CARDS.map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="nofollow" className="flex flex-col gap-6 rounded-xl bg-[#f4f5f4] p-4">
                <Image src={`${ASSET}/images/${r.icon}`} alt="" width={32} height={32} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="size-3" />
                    ))}
                  </div>
                  <span className="font-body text-xs font-semibold text-[#080d10]/60">{r.rating}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <FadeUp key={t.name} className="flex flex-col rounded-xl bg-[#f4f5f4] p-6">
              <div className="flex items-center gap-4">
                <Image src={`${ASSET}/images/${t.avatar}`} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="font-body text-sm text-[#080d10]">{t.name}</p>
                  {t.role && <span className="font-body text-xs text-[#080d10]/50">{t.role}</span>}
                </div>
              </div>
              {t.video ? (
                <video className="mt-auto w-full rounded-xl pt-6" src={`${ASSET}/videos/${t.video}`} poster={`${ASSET}/images/${t.poster}`} controls />
              ) : (
                <p className="mt-auto pt-6 text-base text-[#080d10]">{t.text}</p>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
