import FAQ from "./components/home/FAQ";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import Industries from "./components/home/Industries";
import StatsSection from "./components/home/StatSections";


export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <Features />
      <Industries />
      <FAQ />
    </>
  );
}