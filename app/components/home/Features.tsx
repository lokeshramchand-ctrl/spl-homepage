"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const steps = [
    {
      id: "01",
      title: "Think",
      desc: "We read the soil to find where ideas take root, uncovering opportunities, directions, and missions.",
      border: "rgba(244, 63, 94, 0.5)" // Rose
    },
    {
      id: "02",
      title: "Create",
      desc: "We coax the invisible into the inevitable, crafting identities and systems to support your growth.",
      border: "rgba(245, 158, 11, 0.5)" // Amber
    },
    {
      id: "03",
      title: "Build",
      desc: "We engineer scalable digital products and experiences ready for real-world impact.",
      border: "rgba(16, 185, 129, 0.5)" // Emerald
    },
    {
      id: "04",
      title: "Grow",
      desc: "We nurture the ecosystem, ensuring continuous evolution and adaptation to the changing landscape.",
      border: "rgba(59, 130, 246, 0.5)" // Blue
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scoped selector to ensure we only target cards inside this specific section
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".process-card");
      
      // FIXED: Used fromTo instead of from to prevent React strict mode "stuck at 0 opacity" bug
      gsap.fromTo(cards, 
        { 
          y: 100, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 60%", // Trigger slightly earlier for better UX
          }
        }
      );
    }, sectionRef);

    // --- DRAG LOGIC ---
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsDragging(true);
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      setIsDragging(false);
    };

    const onMouseUp = () => {
      isDown = false;
      setIsDragging(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Friction
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      ctx.revert(); // Clean up GSAP
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap');

    :root {
      --bg-dark: #050505;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --text-main: #ffffff;
      --text-muted: #a1a1aa;
    }

    .process-section {
      position: relative;
      background-color: var(--bg-dark);
      padding: 8rem 0;
      width: 100%;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }

  

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 2;
    }

    /* Header */
    .section-header {
      margin-bottom: 4rem;
      max-width: 600px;
    }

    .header-label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 1rem;
      display: block;
    }

    .header-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: var(--text-main);
      line-height: 1.1;
    }

    /* Scroll Wrapper */
    .scroll-wrapper {
      display: flex;
      flex-wrap: nowrap; /* Forces horizontal layout */
      overflow-x: auto;
      gap: 2rem;
      padding: 1rem 1rem 4rem 1rem;
      cursor: grab;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      margin: 0 -1rem;
    }
    
    .scroll-wrapper:active {
      cursor: grabbing;
    }

    .scroll-wrapper::-webkit-scrollbar {
      display: none;
    }

    /* Process Card */
    .process-card {
      position: relative;
      flex: 0 0 320px; /* Fixed width, no shrinking/growing */
      height: 480px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
      overflow: hidden;
      
      /* Ensure opacity starts at 1 via CSS, GSAP will handle the rest */
      opacity: 1; 
    }

    @media (min-width: 768px) {
      .process-card {
        flex: 0 0 450px;
        height: 520px;
      }
    }

    .process-card:hover {
      transform: translateY(-10px);
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    /* Inner Content */
    .card-number {
      font-family: 'Instrument Serif', serif;
      font-size: 6rem;
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
      opacity: 0.5;
      transition: all 0.5s ease;
      margin-bottom: auto;
    }

    .process-card:hover .card-number {
      opacity: 1;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
      transform: scale(1.05);
      transform-origin: left top;
    }

    .card-content {
      position: relative;
      z-index: 10;
    }

    .card-title {
      font-family: 'Instrument Serif', serif;
      font-size: 2.5rem;
      color: var(--text-main);
      margin-bottom: 1rem;
    }

    .card-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-muted);
      font-weight: 300;
    }

    /* Gradient Background Effect */
    .card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top right, var(--glow-color), transparent 70%);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .process-card:hover .card-glow {
      opacity: 1;
    }

    /* Drag Indicator */
    .drag-hint {
      position: absolute;
      bottom: 3rem;
      right: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      font-size: 0.875rem;
      pointer-events: none;
      opacity: 0.6;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="process-section" ref={sectionRef}>
        <div className="process-noise" />
        
        {/* Ambient background blob */}
        <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '600px', height: '600px', background: '#3b82f6', filter: 'blur(150px)', opacity: '0.04', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container">
          <div className="section-header">
            <span className="header-label">Our Process</span>
            <h2 className="header-title">
              From abstract ideas <br />
              <span style={{ color: '#a1a1aa' }}>to concrete reality.</span>
            </h2>
          </div>

          <div className="scroll-wrapper" ref={scrollRef}>
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="process-card group"
                style={{ 
                  // @ts-ignore
                  '--glow-color': step.border 
                }}
              >
                {/* Ambient Glow */}
                <div className="card-glow" />
                
                {/* Number */}
                <div className="card-number">{step.id}</div>

                {/* Content */}
                <div className="card-content">
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-desc">{step.desc}</p>
                </div>

                {/* Decorative border line on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </div>
            ))}
            
            {/* Spacer ensures the last card has room to breathe on the right */}
            <div style={{ minWidth: '1px', flex: '0 0 1px' }} />
          </div>

          <div className={`drag-hint transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
            <span className="hidden md:inline">Drag to explore</span>
            <MoveRight size={16} />
          </div>
        </div>
      </section>
    </>
  );
}