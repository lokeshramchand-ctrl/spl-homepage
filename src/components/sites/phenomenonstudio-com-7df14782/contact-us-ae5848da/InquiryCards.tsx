import { RevealWords } from "../shared/reveal";
import { CopyIcon } from "../shared/icons";

const CARDS = [
  {
    label: "General inquiries",
    email: "hello@phenomenon-studio.com",
    text: "Projects, estimates, timelines, or anything that doesn't fit the box on the right.",
  },
  {
    label: "Partnership",
    email: "partnership@phenomenon-studio.com",
    text: "Agencies, referral programs, co-marketing and long-term delivery partners.",
  },
];

export function InquiryCards() {
  return (
    <section className="bg-white pt-24 sm:pt-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <h2 className="max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Let's start with a conversation" />
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CARDS.map((c) => (
            <div key={c.label} className="flex flex-col justify-between gap-16 rounded-xl bg-[#f4f5f4] p-8 sm:p-10">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50">{c.label}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-2xl text-[#080d10] hover:opacity-70 sm:text-3xl"
                >
                  {c.email}
                  <CopyIcon className="size-5 shrink-0" />
                </a>
              </div>
              <p className="font-body text-base text-[#080d10]/60">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
