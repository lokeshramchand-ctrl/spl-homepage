import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { CareerHero } from "@/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/CareerHero";
import { AboutQuotes } from "@/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/AboutQuotes";
import { ValuesSection } from "@/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/ValuesSection";
import { GrowthStories } from "@/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/GrowthStories";
import { BenefitsGrid } from "@/components/sites/phenomenonstudio-com-7df14782/career-92d350b5/BenefitsGrid";

export const metadata = {
  title: "Careers at SPL Systems | Join Our Design & Dev Team",
  description:
    "Careers at SPL Systems — we're hiring product designers, developers, and researchers. Join a 70+ team building market-ready products for global clients.",
};

export default function CareerPage() {
  return (
    <main>
      <Header />
      <CareerHero />
      <AboutQuotes />
      <ValuesSection />
      <GrowthStories />
      <BenefitsGrid />
      <Footer
        ctaText="Ready to join us?"
        ctaHoverText="View openings"
        ctaHref="https://phenomenonstudio.hurma.work/public-vacancies"
        ctaExternal
      />
    </main>
  );
}
