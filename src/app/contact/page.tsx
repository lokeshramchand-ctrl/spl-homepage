import type { Metadata } from "next";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { Contacts } from "@/components/sites/splsystems/contact/contacts";
import { ContactHero } from "@/components/sites/splsystems/contact/hero";
import { Places } from "@/components/sites/splsystems/contact/places";

export const metadata: Metadata = {
  title: "Contact | SPL Systems",
  description: "Reach SPL Systems for a free consultation on your next project or idea. Call +1 (650) 993-9799 or email pri@splsystems.in.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        <ContactHero />
        <Places />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
