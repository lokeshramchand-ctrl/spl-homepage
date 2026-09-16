import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { ProjectsHero } from "@/components/sites/phenomenonstudio-com-7df14782/projects-64870e7a/ProjectsHero";
import { ProjectsFilterableGrid } from "@/components/sites/phenomenonstudio-com-7df14782/projects-64870e7a/ProjectsFilterableGrid";

export const metadata = {
  title: "Website Projects | Product Design & Development Work — SPL Systems",
  description:
    "Explore SPL Systems' website design and development case studies — Webflow builds, redesigns, and conversion-focused sites delivered for clients across industries.",
};

export default function TagWebsitePage() {
  return (
    <main>
      <Header variant="light" />
      <ProjectsHero />
      <ProjectsFilterableGrid initialCategory="website" />
      <Footer />
    </main>
  );
}
