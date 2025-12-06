"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "./components/home/Hero";
import StatsSection from "./components/home/StatSections";
import ProcessSection from "./components/home/Features";
import FAQ from "./components/home/FAQ";
import Footer from "./components/Footer";


export default function Home() {

  useEffect(() => {
    // Initialize Lenis for that "flowy" feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="main-wrapper">
      {/* Global Styles for the RGB Theme 
         We put this here so it applies to ALL components 
      */}
      <style jsx global>{`
        :root {
          /* DEEP VOID BLACK BACKGROUND */
          --bg-dark: #020202;

          /* TEXT COLORS */
          --text-white: #ffffff;
          --text-muted: #94a3b8; /* Cool slate */
          --text-dim: #475569;

          /* YOUR LOGO ACCENTS (RGB) */
          --accent-teal: #22c55e;   /* The 'L' Green */
          --accent-blue: #2563eb;   /* The 'P' Blue */
          --border-hover: #ef4444;  /* The 'S' Red */
          
          /* SHARED VARS */
          --border-light: rgba(123, 146, 214, 0.12);
        }

        body {
          background-color: var(--bg-dark);
          margin: 0;
          padding: 0;
          overflow-x: hidden; /* Prevent horizontal scrollbars */
        }
        
        /* Smooth selection color */
        ::selection {
          background: rgba(37, 99, 235, 0.3); /* Blue selection */
          color: white;
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="relative z-50">
        <Hero />
      </section>

      {/* 2. Stats Section */}
      <section className="relative z-40">
        <StatsSection />
      </section>

      {/* 3. Horizontal Scroll Process 
          Z-index ensures it sits correctly if shadows overlap 
      */}
      <section className="relative z-30">
        <ProcessSection />
      </section>

      {/* 4. FAQ Section */}
      <section className="relative z-20">
        <FAQ />
      </section>

      {/* 5. Footer */}
      <section className="relative z-10">
        <Footer />
      </section>

    </main>
  );
}