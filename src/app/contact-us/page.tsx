import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { IndustriesTabs } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/IndustriesTabs";
import { Testimonials } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Testimonials";
import { ContactHero } from "@/components/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da/ContactHero";
import { InquiryCards } from "@/components/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da/InquiryCards";
import { WorldwideMap } from "@/components/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da/WorldwideMap";

export const metadata = {
  title: "Contact us | Start Your Product Design Project — Phenomenon",
  description:
    "Got an idea? Let's talk. Reach out to SPL Systems for product design, development, and partnership inquiries — we respond within one business day.",
};

export default function ContactUsPage() {
  return (
    <main>
      <Header />
      <ContactHero />
      <InquiryCards />
      <WorldwideMap />
      <IndustriesTabs />
      <Testimonials />
      <Footer ctaText="Let's collaborate" ctaHoverText="Get in touch" ctaHref="/contact-us" />
    </main>
  );
}
