import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import Features from '@/components/home/Features';
import Industries from '@/components/home/Industries';
import FAQ from '@/components/home/FAQ';


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