import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { Testimonials } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Testimonials";
import { WorldwideMap } from "@/components/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da/WorldwideMap";
import { HeroAbout } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/HeroAbout";
import { OurStory } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/OurStory";
import { StatsCounters } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/StatsCounters";
import { ClientLogos } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/ClientLogos";
import { WhatMakesUsDifferent } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/WhatMakesUsDifferent";
import { TeamGallery } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/TeamGallery";
import { TraitsGrid } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/TraitsGrid";
import { Awards } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/Awards";
import { DivingDeeper } from "@/components/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/DivingDeeper";

export const metadata = {
  title: "About us | Phenomenon — Product Design Studio Since 2019",
  description:
    "From a four-person startup studio to a 70+ talent team designing across industries and continents. Meet the people and story behind SPL Systems.",
};

export default function AboutUsPage() {
  return (
    <main>
      <Header />
      <HeroAbout />
      <OurStory />
      <StatsCounters />
      <ClientLogos />
      <WorldwideMap />
      <WhatMakesUsDifferent />
      <TeamGallery />
      <TraitsGrid />
      <Awards />
      <Testimonials />
      <DivingDeeper />
      <Footer ctaText="Let's collaborate" ctaHoverText="Get in touch" ctaHref="/contact-us" />
    </main>
  );
}
