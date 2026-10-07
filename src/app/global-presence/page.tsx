import type { Metadata } from "next";
import { Footer } from "@/components/sites/cyphercapital/footer";
import { Header } from "@/components/sites/cyphercapital/header";
import { Contacts } from "@/components/sites/cyphercapital/global-presence/contacts";
import { GlobalPresenceHero } from "@/components/sites/cyphercapital/global-presence/hero";
import { Places } from "@/components/sites/cyphercapital/global-presence/places";

export const metadata: Metadata = {
  title: "Cypher Capital | Global presence",
  description: "Headquartered in Hyderabad, India, with a presence in San Jose.",
};

export default function GlobalPresencePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        <GlobalPresenceHero />
        <Places />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
