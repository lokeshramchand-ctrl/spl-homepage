import { RevealWords, ScrambleText } from "../shared/reveal";
import { ContactForm } from "./ContactForm";
import { ContactSidebar } from "./ContactSidebar";

export function ContactHero() {
  return (
    <section id="contact" className="scroll-mt-24 rounded-b-[40px] bg-[#080d10] pt-32 pb-24 text-white sm:rounded-b-[64px] sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="We turn bold ideas into successful products"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-white/60"
        />
        <h1 className="mt-6 max-w-[1040px] text-[44px] font-medium leading-[1.05] tracking-tight sm:text-[56px] lg:text-[72px]">
          <RevealWords text="Got an idea? Let's talk!" />
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <ContactForm />
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
