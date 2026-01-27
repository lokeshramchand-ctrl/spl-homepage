"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

export default function ProjectSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const steps = [
    {
      id: "01",
      title: "AI OCR",
      desc: "Able to read, recognize numbers and characters on paper sheets and barcode IDs",
      border: "#FF512F", // Brand Red
      gradient: "linear-gradient(135deg, #FF512F, #DD2476)"
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scoped selector to ensure we only target cards inside this specific section
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".process-card");
      
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
            start: "top 60%", 
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


    .process-section {
      position: relative;
      background-color: var(--bg-main); /* Theme Aware */
      padding: 8rem 0;
      width: 100%;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
      transition: background-color 0.4s ease;
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
      display: inline-block;
      padding: 0.35rem 1rem;
      margin-bottom: 2rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-secondary);
    }

    .header-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: var(--text-primary); /* Theme Aware */
      line-height: 1.1;
    }

    /* Scroll Wrapper */
    .scroll-wrapper {
      display: flex;
      flex-wrap: nowrap;
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
      flex: 0 0 320px;
      height: 480px;
      background: var(--bg-card); /* Theme Aware */
      border: 1px solid var(--border-color); /* Theme Aware */
      border-radius: 12px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
      overflow: hidden;
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
      background: var(--bg-card-hover); /* Theme Aware */
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); /* Softer shadow */
    }

    /* Inner Content */
    .card-number {
      font-family: 'Instrument Serif', serif;
      font-size: 6rem;
      line-height: 1;
      color: transparent;
      /* Using border color allows stroke to be visible in both modes */
      -webkit-text-stroke: 1px var(--text-dim); 
      opacity: 0.3;
      transition: all 0.5s ease;
      margin-bottom: auto;
    }

    .process-card:hover .card-number {
      opacity: 1;
      -webkit-text-stroke: 1px var(--text-secondary);
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
      color: var(--text-primary); /* Theme Aware */
      margin-bottom: 1rem;
    }

    .card-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary); /* Theme Aware */
      font-weight: 400;
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
      opacity: 0.1; /* Subtle colored tint */
    }
    
    /* Decorative Gradient Line */
    .card-line {
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 100%; 
        height: 4px; 
        background: var(--glow-gradient);
        transform: scaleX(0); 
        transform-origin: left;
        transition: transform 0.7s ease-out;
    }
    
    .process-card:hover .card-line {
        transform: scaleX(1);
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
        
        {/* Ambient background blob - Theme Aware */}
        <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '600px', height: '600px', background: 'var(--brand-blue)', filter: 'blur(150px)', opacity: '0.08', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container">
          <div className="section-header">
            <span className="header-label">Our Projects</span>
            <h2 className="header-title">
              From big goals <br />
              <span style={{ 
                background: 'linear-gradient(90deg, var(--text-secondary), var(--text-primary))', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                to niche software.
              </span>
            </h2>
          </div>

          <div className="scroll-wrapper" ref={scrollRef}>
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="process-card group"
                style={{ 
                  // @ts-ignore
                  '--glow-color': step.border,
                  '--glow-gradient': step.gradient
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
                <div className="card-line" />
              </div>
            ))}
            
            {/* Spacer ensures the last card has room to breathe on the right */}
            <div style={{ minWidth: '1px', flex: '0 0 1px' }} />
          </div>

          <div className={`drag-hint transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
            <span className="hidden md:inline">Many others we did will come up soon</span>
            <MoveRight size={16} />
          </div>
        </div>
      </section>
    </>
  );
}
