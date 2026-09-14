import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { ArticleHero } from "@/components/sites/phenomenonstudio-com-7df14782/article-faq-what-services-does-phenomenon-studio-offer-35204c8a/ArticleHero";
import { ArticleContent } from "@/components/sites/phenomenonstudio-com-7df14782/article-faq-what-services-does-phenomenon-studio-offer-35204c8a/ArticleContent";
import { MoreInsights } from "@/components/sites/phenomenonstudio-com-7df14782/article-faq-what-services-does-phenomenon-studio-offer-35204c8a/MoreInsights";
import { CtaAlternative } from "@/components/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/CtaAlternative";

export const metadata = {
  title: "What services does Phenomenon Studio offer? | Phenomenon Studio",
  description:
    "Phenomenon Studio is a boutique product design and development agency offering product discovery, UX/UI design, MVP development, web and mobile development, redesign, branding, and more.",
};

export default function WhatServicesDoesPhenomenonStudioOfferPage() {
  return (
    <main>
      <Header />
      <ArticleHero />
      <ArticleContent />
      <CtaAlternative />
      <MoreInsights />
      <Footer ctaHoverText="Get in touch" />
    </main>
  );
}
