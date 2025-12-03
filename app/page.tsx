import FAQ from "./components/home/FAQ";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import StatsSection from "./components/home/StatSections";
import Industries from "./components/home/Industries/Industries";
import Preloader from "./components/Preloader/Preloader";

export default function Home() {
  return (
    <>
    <Preloader />
    <main>
      <Hero />
      <StatsSection />
      <Features />
    
      <FAQ />
    </main>
    </>
  );
}