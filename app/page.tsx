"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "./components/home/Hero";
import { Navigation } from "lucide-react";
import StatsSection from "./components/home/StatSections";
import ProjectSection from "./components/home/Projects";
import ProcessSection from "./components/home/Features";
import ContactSection from "./components/home/Contact";
import FAQ from "./components/home/FAQ";
import CarouselVertical from "./components/home/Carousel1";



export default function Home() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="main-wrapper">
      <style jsx global>{`
        :root {
          --bg-dark: #020202;
          --text-white: #ffffff;
          --text-muted: #94a3b8;
          --accent-teal: #22c55e;
          --accent-blue: #2563eb;
          --border-hover: #ef4444;
          --border-light: rgba(123, 146, 214, 0.12);
        }
        body {
          background-color: var(--bg-dark);
          margin: 0;
          overflow-x: hidden;
        }
        ::selection {
          background: rgba(37, 99, 235, 0.3);
          color: white;
        }
      `}</style>

      {/* Preloader appears first */}
      {/* <Preloader /> */}

      {/* Navigation fixed on top */}
      <Navigation />

      {/* 1. HERO (Home) */}
      <section id="hero" className="relative z-60">
        <Hero />
      </section>

      {/* 2. ABOUT (Stats Section) 
          Mapped 'About' link here as requested 
      */}
      <section id="about" className="relative z-50">
        <StatsSection />
      </section>
      <section id="projects" className="relative z-50">
        <ProjectSection />
      </section>
      <section id="contact" className="relative z-50">
        <ContactSection />
      </section>

      <section id="about" className="relative z-40">
        <CarouselVertical />
      </section>
      {/* 3. SERVICES (Process Section) 
          Mapped 'Services' link here as requested
      */}
      <section id="services" className="relative z-30">
        <ProcessSection />
      </section>

      {/* 4. FAQ Section */}
      <section className="relative z-20">
        <FAQ />
      </section>


    </main>
  );
}
