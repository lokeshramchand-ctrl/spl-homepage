import { InView, Reveal, RevealWords, SectionLabel } from "../reveal";
import { ArrowSwap } from "../icons";
import { ContactForm } from "./contact-form";
import { CopyButton } from "./copy-button";

const CONTACTS = [
  {
    label: "+1 (650) 993-9799",
    href: "tel:+16509939799",
    note: "Call us, available 24/7",
    what: "phone number",
  },
  {
    label: "pri@splsystems.in",
    href: "mailto:pri@splsystems.in",
    note: "For general inquiries",
    what: "email address",
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="px-5 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1800px]">
        <SectionLabel>Get in touch</SectionLabel>

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
              <div key={item.href} className="flex flex-col gap-3 border-t border-[#181818]/20 py-3">
                <a href={item.href} className="group flex items-start justify-between gap-4">
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.75rem] font-medium tracking-[-0.03em] text-[#181818] underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-300 group-hover:decoration-[#181818]/40 md:text-[2rem]">
                      {item.label}
                    </span>
                    <span className="text-sm text-[#181818]/60">{item.note}</span>
                  </span>
                  <ArrowSwap className="mt-3 h-5 w-[10px] text-[#181818]" />
                </a>
                <CopyButton value={item.label} what={item.what} />
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
