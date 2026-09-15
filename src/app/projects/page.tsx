import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { ProjectsHero } from "@/components/sites/phenomenonstudio-com-7df14782/projects-64870e7a/ProjectsHero";
import { ProjectsFilterableGrid } from "@/components/sites/phenomenonstudio-com-7df14782/projects-64870e7a/ProjectsFilterableGrid";

export const metadata = {
  title: "Case Studies | Product Design & Development Work — SPL Systems",
  description:
    "Explore SPL Systems' case studies — product redesigns, web and mobile app development, and branding work delivered for clients across industries.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Header variant="light" />
      <ProjectsHero />
      <ProjectsFilterableGrid />
      <Footer />
    </main>
  );
}
