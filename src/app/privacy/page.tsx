import type { Metadata } from "next";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { PrivacyHero, PrivacySections } from "@/components/sites/splsystems/legal/privacy-body";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description: "How SPL Systems collects, uses and protects personal information on splsystems.in, and the choices you have.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        <PrivacyHero />
        <PrivacySections />
      </main>
      <Footer />
    </>
  );
}
