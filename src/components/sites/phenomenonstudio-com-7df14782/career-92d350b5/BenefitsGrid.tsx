import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/career-92d350b5";

const BENEFITS = [
  { icon: "asterisk-1.svg", title: "Remote work with flexible hours", body: "Work from anywhere and set your own hours. Just stay connected with the team and get the work done. Freedom with responsibility." },
  { icon: "asterisk-2.svg", title: "Autonomy and ownership in your projects", body: "You own your work here. Make decisions, shape direction, and solve problems the way you think is best. Your projects, your call." },
  { icon: "asterisk-3.svg", title: "Annual performance reviews with salary revisions", body: "We review your work annually. When you grow and deliver, your salary reflects that. Your growth, your reward. It's that simple." },
  { icon: "asterisk-4.svg", title: "Workshops and learning playgrounds", body: "Regular time to explore new tools, build skills, and share what you've learned. Growth isn't extra here - it's part of how we work." },
  { icon: "asterisk-5.svg", title: "Access to IT Loyalty Club", body: "Discounts at cafés, in stores, on various services, and more. Basically, things you'd use anyway, just cheaper. Small perks add up." },
  { icon: "asterisk-6.svg", title: "Equipment provided as needed", body: "Need better gear to do your best work? Let us know. We'll make sure you have everything you need to deliver. No compromises here." },
  { icon: "asterisk-7.svg", title: "Corporate English classes", body: "Want to improve your English? We cover the classes. Helps you grow and work better with international clients. Skills that matter." },
  { icon: "asterisk-8.svg", title: "18 paid vacation days", body: "Take your time off when you need it. Plus an extra day on your birthday, because working on your birthday isn't fun. Recharge well." },
  { icon: "asterisk-9.svg", title: "7 sick days + 7 personal days off", body: "Sick or dealing with life stuff? Take the time you need. These days are separate from your vacation. Life happens, and we get it." },
  { icon: "asterisk-10.svg", title: "All public holidays off", body: "Every single one. No \"working through the holiday\" nonsense here. If it's a public holiday, you're off. Enjoy it without any guilt." },
];

export function BenefitsGrid() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-[200px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="What we offer"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50"
        />
        <h2 className="mt-4 max-w-[1040px] text-[40px] leading-[1.15] font-medium tracking-tight text-[#080d10] sm:text-[52px] lg:text-[68px]">
          <RevealWords text="Extra benefits" />
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-[1440px] px-4 lg:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <FadeUp
              key={b.title}
              delayMs={(i % 3) * 80}
              className={`flex flex-col border-t border-[#080d10]/10 px-0 py-8 sm:px-8 sm:py-10 ${
                i % 3 !== 0 ? "sm:border-l" : ""
              }`}
            >
              <Image src={`${ASSET}/images/${b.icon}`} alt="" width={32} height={32} className="size-8" />
              <div className="mt-auto pt-12">
                <h3 className="text-xl font-medium text-[#080d10] sm:text-2xl">{b.title}</h3>
                <p className="mt-2 text-base text-[#080d10]/70">{b.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
