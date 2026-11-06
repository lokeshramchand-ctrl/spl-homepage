import { InView, Reveal, RevealWords, SectionLabel } from "../reveal";
import { ContactForm } from "./contact-form";

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

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
