import FAQ from "./components/home/FAQ";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import StatsSection from "./components/home/StatSections";
import Industries from "./components/home/Industries/Industries";

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