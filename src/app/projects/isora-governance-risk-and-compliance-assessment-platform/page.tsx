import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { ProjectHero } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/ProjectHero";
import { Overview } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/Overview";
import { IntroGallery } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/IntroGallery";
import { AwardHighlight } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/AwardHighlight";
import { InfoTextBlock } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/InfoTextBlock";
import { ComparisonSlider } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/ComparisonSlider";
import { ChallengesSolutions } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/ChallengesSolutions";
import { ProcessPhase } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/ProcessPhase";
import { FeaturesScroll } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/FeaturesScroll";
import { CtaAlternative } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/CtaAlternative";
import { Conclusion } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/Conclusion";
import { MoreCases } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/MoreCases";
import {
  RESEARCH_INTRO,
  RESEARCH_INTRO_IMAGES,
  RESEARCH_STAGE_LIST,
  RESEARCH_STAGES,
  DESIGN_INTRO,
  DESIGN_STAGE_LIST,
  DESIGN_STAGES,
  DEVELOPMENT_INTRO,
  DEVELOPMENT_STAGE_LIST,
  DEVELOPMENT_STAGES,
} from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/phaseData";

export default function IsoraProjectPage() {
  return (
    <main>
      <Header variant="light" />
      <ProjectHero />
      <Overview />
      <IntroGallery />
      <AwardHighlight />
      <InfoTextBlock
        caption="Business needs"
        title="Client request & business goals"
        paragraphs={[
          "When Isora GRC came to us, their platform was frustrating to use. Navigation was unclear, workflows didn’t match how users actually worked, and the design had fallen behind. They wanted a redesign — cleaner look, less friction for end-users.",
          "Our audit found the problems ran deeper than aesthetics. The platform needed structural usability work to fit how non-technical users operate and to support what the business was trying to do.",
        ]}
        subheading="Our role"
        subheadingParagraph="We joined the client’s team to cover user-centred design and front-end development. The work went well beyond visual updates — we rethought how the product worked from the ground up. Working closely with the client, we led a full redesign that made the product easier to use and gave end-users a clearer path through processes that had previously tripped them up."
      />
      <ComparisonSlider />
      <ChallengesSolutions />
      <ProcessPhase
        caption="Research stages"
        title="Research process"
        intro={RESEARCH_INTRO}
        introImages={RESEARCH_INTRO_IMAGES}
        stageList={RESEARCH_STAGE_LIST}
        stages={RESEARCH_STAGES}
      />
      <ProcessPhase
        caption="Design stages"
        title="Product design"
        intro={DESIGN_INTRO}
        stageList={DESIGN_STAGE_LIST}
        stages={DESIGN_STAGES}
      />
      <FeaturesScroll />
      <CtaAlternative />
      <ProcessPhase
        caption="Development stages"
        title="Product development"
        intro={DEVELOPMENT_INTRO}
        stageList={DEVELOPMENT_STAGE_LIST}
        stages={DEVELOPMENT_STAGES}
      />
      <InfoTextBlock
        caption="Awards"
        title="Recognition & Impact"
        paragraphs={[
          "The Isora GRC redesign earned more than a satisfied client — it was submitted to the UX Design Awards and secured a nomination. Having industry judges recognise the work confirmed that the improvements to usability and accessibility held up beyond the project itself.",
          "The nomination strengthened Isora GRC’s position in the GRC market too. In a space where most products prioritise compliance features over user experience, recognition for design excellence was a meaningful differentiator — and a signal that the platform was built with room to grow.",
        ]}
      />
      <Conclusion />
      <MoreCases />
      <Footer />
    </main>
  );
}
