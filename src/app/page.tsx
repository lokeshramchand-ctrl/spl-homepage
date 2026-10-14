import { About } from "@/components/sites/splsystems/about";
import { Approach } from "@/components/sites/splsystems/approach";
import { CtaBand } from "@/components/sites/splsystems/cta-band";
import { Expertise } from "@/components/sites/splsystems/expertise";
import { Faq } from "@/components/sites/splsystems/faq";
import { Footer } from "@/components/sites/splsystems/footer";
import { Header } from "@/components/sites/splsystems/header";
import { Hero } from "@/components/sites/splsystems/hero";
import { SWIRL_TAIL_KEYFRAMES } from "@/components/sites/splsystems/metallic-swirl/shaders";
import { SwirlBackdrop } from "@/components/sites/splsystems/metallic-swirl/SwirlBackdrop";
import { Projects } from "@/components/sites/splsystems/projects";
import { Splash } from "@/components/sites/splsystems/splash";

const TAIL_ANCHORS = ["expertise", "faq"];

export default function Home() {
  return (
    <>
      <Splash />
      <Header />
      <main className="flex-1 bg-[#fbfbfb]">
        <Hero />
        {/* About, Projects and Approach share one scroll-driven WebGL
            backdrop instead of each owning its own: the canvas fills this
            band and sits above each section's own background but below its
            content (see each section's z-index). */}
        <div data-swirl-band className="relative">
          <SwirlBackdrop className="z-10" />
          <About />
          <Projects />
          <Approach />
        </div>
        {/* Expertise, FAQ and the closing CTA get their own backdrop, seeded
            from the one above so the swirl carries across the seam and keeps
            evolving. */}
        <div data-swirl-tail className="relative">
          <SwirlBackdrop
            className="z-10"
            band="data-swirl-tail"
            anchorIds={TAIL_ANCHORS}
            keyframes={SWIRL_TAIL_KEYFRAMES}
          />
          <Expertise />
          <Faq />
          <CtaBand />
        </div>
      </main>
      <Footer />
    </>
  );
}
