import { AiBand } from "@/components/sites/cyphercapital/ai-band";
import { AssetManagement } from "@/components/sites/cyphercapital/asset-management";
import { Footer } from "@/components/sites/cyphercapital/footer";
import { Header } from "@/components/sites/cyphercapital/header";
import { Hero } from "@/components/sites/cyphercapital/hero";
import { Infrastructure } from "@/components/sites/cyphercapital/infrastructure";
import { ProprietaryInvestments } from "@/components/sites/cyphercapital/proprietary-investments";
import { Values } from "@/components/sites/cyphercapital/values";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        <Hero />
        <AssetManagement />
        <ProprietaryInvestments />
        <Infrastructure />
        <Values />
        <AiBand />
      </main>
      <Footer />
    </>
  );
}
