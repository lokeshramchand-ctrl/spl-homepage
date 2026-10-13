import { AiBand } from "@/components/sites/splsystems/ai-band";
import { AssetManagement } from "@/components/sites/splsystems/asset-management";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { Hero } from "@/components/sites/splsystems/hero";
import { Infrastructure } from "@/components/sites/splsystems/infrastructure";
import { SWIRL_TAIL_KEYFRAMES } from "@/components/sites/splsystems/metallic-swirl/shaders";
import { SwirlBackdrop } from "@/components/sites/splsystems/metallic-swirl/SwirlBackdrop";
import { ProprietaryInvestments } from "@/components/sites/splsystems/proprietary-investments";
import { Splash } from "@/components/sites/splsystems/splash";
import { Values } from "@/components/sites/splsystems/values";

const TAIL_ANCHORS = ["values", "ai-band"];

export default function Home() {
  return (
    <>
      <Splash />
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
        {/* Values + AI band get their own backdrop, seeded from the one above
            so the swirl carries across the seam and keeps evolving. */}
        <div data-swirl-tail className="relative">
          <SwirlBackdrop
            className="z-10"
            band="data-swirl-tail"
            anchorIds={TAIL_ANCHORS}
            keyframes={SWIRL_TAIL_KEYFRAMES}
          />
          <Values />
          <AiBand />
        </div>
      </main>
      <Footer />
    </>
  );
}
