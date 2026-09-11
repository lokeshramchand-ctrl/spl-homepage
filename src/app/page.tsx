import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Hero } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Hero";
import { FeaturedWins } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/FeaturedWins";
import { ProblemsWeSolve } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/ProblemsWeSolve";
import { ServicesAccordion } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/ServicesAccordion";
import { CasesSection } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/CasesSection";
import { IndustriesTabs } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/IndustriesTabs";
import { TeamGallery } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/TeamGallery";
import { WhyChooseUs } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/WhyChooseUs";
import { Testimonials } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Testimonials";
import { Awards } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Awards";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedWins />
      <ProblemsWeSolve />
      <ServicesAccordion />
      <CasesSection />
      <IndustriesTabs />
      <TeamGallery />
      <WhyChooseUs />
      <Testimonials />
      <Awards />
      <Footer />
    </main>
  );
}
