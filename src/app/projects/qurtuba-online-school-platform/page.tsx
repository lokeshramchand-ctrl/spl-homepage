import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { ProjectHero } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/ProjectHero";
import { HeroGallery } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/HeroGallery";
import { ComparisonSlider } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/ComparisonSlider";
import { ProblemsSolutions } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/ProblemsSolutions";
import { ProcessPhase } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/ProcessPhase";
import { FeaturesScroll } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/FeaturesScroll";
import { Conclusion } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/Conclusion";
import { FutureChanges } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/FutureChanges";
import { MoreCases } from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/MoreCases";
import {
  RESEARCH_INTRO,
  RESEARCH_INTRO_IMAGES,
  RESEARCH_STAGES,
  DESIGN_INTRO,
  DESIGN_STAGES,
  DEVELOPMENT_INTRO,
  DEVELOPMENT_INTRO_IMAGES,
  DEVELOPMENT_STAGES,
} from "@/components/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/phaseData";

export default function QurtubaProjectPage() {
  return (
    <main>
      <Header variant="light" />
      <ProjectHero />
      <HeroGallery />
      <ComparisonSlider />
      <ProblemsSolutions />
      <ProcessPhase
        caption="Research"
        title="From complexity to clarity"
        intro={RESEARCH_INTRO}
        introImages={RESEARCH_INTRO_IMAGES}
        stages={RESEARCH_STAGES}
      />
      <ProcessPhase caption="Design" title="Transforming analysis into a user-friendly interface" intro={DESIGN_INTRO} stages={DESIGN_STAGES} />
      <FeaturesScroll />
      <ProcessPhase
        caption="Development"
        title="Seamless frontend–backend collaboration"
        intro={DEVELOPMENT_INTRO}
        introImages={DEVELOPMENT_INTRO_IMAGES}
        stages={DEVELOPMENT_STAGES}
      />
      <Conclusion />
      <FutureChanges />
      <MoreCases />
      <Footer />
    </main>
  );
}
