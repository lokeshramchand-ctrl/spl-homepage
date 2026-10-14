import type { Metadata } from "next";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { Contacts } from "@/components/sites/splsystems/global-presence/contacts";
import { GlobalPresenceHero } from "@/components/sites/splsystems/global-presence/hero";
import { Places } from "@/components/sites/splsystems/global-presence/places";

export const metadata: Metadata = {
  title: "SPL Systems | Global presence",
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
