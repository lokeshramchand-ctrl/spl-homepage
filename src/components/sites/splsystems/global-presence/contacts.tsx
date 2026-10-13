import { InView, Reveal, RevealWords, SectionLabel } from "../reveal";
import { ArrowUpRightIcon } from "../icons";

const CONTACTS = [
  {
    label: "+1 (650) 993-9799",
    href: "tel:+16509939799",
    note: "Call us",
  },
  {
    label: "pri@splsystems.com",
    href: "mailto:pri@splsystems.com",
    note: "For general inquiries",
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="px-5 md:px-10">
      <div className="mx-auto max-w-[1800px]">
        <SectionLabel>Contacts</SectionLabel>

        <div className="flex flex-col gap-10 py-16 md:gap-16 md:py-24">
          <InView>
            <Reveal
              as="h2"
              className="mx-auto max-w-[19ch] text-center text-[2.5rem] font-medium leading-[1] tracking-[-0.016em] text-[#181818] md:text-[4rem]"
            >
              <RevealWords text="Speak to the SPL Systems team" />
            </Reveal>
          </InView>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {CONTACTS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-4 border-t border-[#181818]/20 py-3"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-[2rem] font-medium tracking-[-0.03em] text-[#181818] group-hover:underline">
                    {item.label}
                  </span>
                  <span className="text-sm text-[#181818]/60">{item.note}</span>
                </span>
                <ArrowUpRightIcon className="mt-2 shrink-0 text-[#181818]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
