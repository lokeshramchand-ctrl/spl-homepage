import { Header } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Header";
import { Footer } from "@/components/sites/phenomenonstudio-com-7df14782/root-8a5edab2/Footer";
import { FaqHero } from "@/components/sites/phenomenonstudio-com-7df14782/faq-ec0c2005/FaqHero";
import { FaqList } from "@/components/sites/phenomenonstudio-com-7df14782/faq-ec0c2005/FaqList";

export const metadata = {
  title: "Product Design & Development FAQ | Phenomenon Studio",
  description:
    "Answers to the most common questions about our process, team, and development approach at Phenomenon Studio.",
};

export default function FaqPage() {
  return (
    <main>
      <Header />
      <FaqHero />
      <FaqList />
      <Footer />
    </main>
  );
}
