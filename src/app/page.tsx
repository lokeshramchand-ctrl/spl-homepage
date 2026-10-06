import { AiBand } from "@/components/sites/cyphercapital/ai-band";
import { AssetManagement } from "@/components/sites/cyphercapital/asset-management";
import { Footer } from "@/components/sites/cyphercapital/footer";
import { Header } from "@/components/sites/cyphercapital/header";
import { Hero } from "@/components/sites/cyphercapital/hero";
import { Infrastructure } from "@/components/sites/cyphercapital/infrastructure";
import { SwirlBackdrop } from "@/components/sites/cyphercapital/metallic-swirl/SwirlBackdrop";
import { ProprietaryInvestments } from "@/components/sites/cyphercapital/proprietary-investments";
import { Values } from "@/components/sites/cyphercapital/values";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        <Hero />
        {/* Asset Management, Proprietary Investments and Infrastructure share
            one scroll-driven WebGL backdrop instead of each owning its own:
            the canvas fills this band and sits above each section's own
            background but below its content (see each section's z-index). */}
        <div data-swirl-band className="relative">
          <SwirlBackdrop className="z-10" />
          <AssetManagement />
          <ProprietaryInvestments />
          <Infrastructure />
        </div>
        <Values />
        <AiBand />
      </main>
      <Footer />
    </>
  );
}
