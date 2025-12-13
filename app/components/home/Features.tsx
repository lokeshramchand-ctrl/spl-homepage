"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import arrows for the cursor

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  // Refs for the custom cursor
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const steps = [
    {
      id: "01",
      title: "Think",
      desc: "We read the soil to find where ideas take root, uncovering opportunities, directions, and missions.",
      color: "#FF512F",
      gradient: "linear-gradient(135deg, #FF512F, #DD2476)"
    },
    {
      id: "02",
      title: "Create",
      desc: "We coax the invisible into the inevitable, crafting identities and systems to support your growth.",
      color: "#00C6FB",
      gradient: "linear-gradient(135deg, #00C6FB, #005BEA)"
    },
    {
      id: "03",
      title: "Build",
      desc: "We engineer scalable digital products and experiences ready for real-world impact.",
      color: "#38ef7d",
      gradient: "linear-gradient(135deg, #11998e, #38ef7d)"
    },
    {
      id: "04",
      title: "Grow",
      desc: "We nurture the ecosystem, ensuring continuous evolution and adaptation to the changing landscape.",
      color: "#DD2476",
      gradient: "linear-gradient(135deg, #DD2476, #FF512F)"
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Card Entry Animation
      const cards = gsap.utils.toArray(".process-card");
      gsap.fromTo(cards, 
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: ".process-section", start: "top 70%" }
        }
      );

      // 2. Custom Cursor Logic (GSAP QuickTo for performance)
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

      const moveCursor = (e: MouseEvent) => {
        // Only move if we are hovering the scroll area
        if (isHovering) {
            xTo(e.clientX);
            yTo(e.clientY);
        }
      };

      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);

    }, sectionRef);

    // --- DRAG LOGIC (Standard) ---
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsDragging(true);
      container.classList.add("active");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      setIsDragging(false);
      container.classList.remove("active");
    };
    const onMouseUp = () => {
      isDown = false;
      setIsDragging(false);
      container.classList.remove("active");
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      ctx.revert();
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, [isHovering]); // Re-bind if hover state changes to ensure listeners are active

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=Inter:wght@300;400;500&display=swap');

    :root {
      --bg-dark: #050505;
      --card-bg: rgba(255, 255, 255, 0.02);
      --card-border: rgba(255, 255, 255, 0.06);
      --text-main: #ffffff;
      --text-muted: #a1a1aa;
      --brand-red: #FF512F;
      --brand-blue: #00C6FB;
    }

    .process-section {
      position: relative;
      background-color: var(--bg-dark);
      padding: 8rem 0;
      width: 100%;
      overflow: hidden;
      font-family: 'Instrument Sans', sans-serif;
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
      max-width: 700px;
    }
    .header-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--brand-blue);
      margin-bottom: 1.5rem;
      display: inline-block;
      padding: 0.5rem 1rem;
      border: 1px solid rgba(0, 198, 251, 0.2);
      border-radius: 50px;
      background: rgba(0, 198, 251, 0.05);
    }
    .header-title {
      font-family: 'Instrument Sans', sans-serif; 
      font-weight: 600;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      color: var(--text-main);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    /* Scroll Wrapper */
    .scroll-wrapper {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 2rem;
      padding: 1rem 1rem 4rem 1rem;
      cursor: none; /* Hides Default Cursor */
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      margin: 0 -1rem;
    }
    .scroll-wrapper::-webkit-scrollbar { display: none; }

    /* Custom Cursor */
    .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none; /* Lets clicks pass through to the cards */
        z-index: 9999;
        transform: translate(-50%, -50%); /* Centers the cursor div on the mouse */
        transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
        opacity: 0; /* Hidden by default */
    }

    .custom-cursor.visible {
        opacity: 1;
    }

    .custom-cursor.dragging {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.9);
    }
    
    .cursor-content {
        display: flex;
        align-items: center;
        gap: 8px;
        color: white;
        transition: color 0.3s ease;
    }
    
    .custom-cursor.dragging .cursor-content {
        color: black;
    }

    /* Process Card */
    .process-card {
      position: relative;
      flex: 0 0 320px;
      height: 480px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      opacity: 1; 
      user-select: none; /* Prevents text highlighting while dragging */
    }

    @media (min-width: 768px) {
      .process-card { flex: 0 0 450px; height: 520px; }
    }

    .process-card:hover {
      transform: translateY(-12px);
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
    }

    /* Inner Content */
    .card-number {
      font-family: 'Instrument Sans', sans-serif;
      font-weight: 700;
      font-size: 7rem;
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
      opacity: 0.3;
      transition: all 0.5s ease;
      margin-bottom: auto;
    }
    .process-card:hover .card-number { opacity: 0.1; transform: scale(1.1) translateX(10px); }

    .card-title {
      font-family: 'Instrument Sans', sans-serif;
      font-weight: 600;
      font-size: 2.75rem;
      color: var(--text-main);
      margin-bottom: 1rem;
      letter-spacing: -0.01em;
    }

    .card-desc {
      font-family: 'Inter', sans-serif;
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-muted);
      font-weight: 300;
    }

    /* Gradient Effects */
    .card-glow {
      position: absolute;
      top: -50%; right: -50%; width: 100%; height: 100%;
      background: radial-gradient(circle, var(--glow-color) 0%, transparent 60%);
      filter: blur(80px); opacity: 0;
      transition: opacity 0.6s ease; pointer-events: none; z-index: 0;
    }
    .process-card:hover .card-glow { opacity: 0.15; }
    
    .indicator-line {
      position: absolute; bottom: 0; left: 0; width: 100%; height: 4px;
      background: var(--glow-gradient);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .process-card:hover .indicator-line { transform: scaleX(1); }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="process-section" ref={sectionRef}>

        {/* --- CUSTOM CURSOR --- */}
        <div 
            ref={cursorRef} 
            className={`custom-cursor ${isHovering ? 'visible' : ''} ${isDragging ? 'dragging' : ''}`}
        >
            <div ref={cursorLabelRef} className="cursor-content">
                {/* Changes based on drag state */}
                {isDragging ? (
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px' }}>DRAGGING</span>
                ) : (
                    <>
                        <ArrowLeft size={16} />
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>DRAG</span>
                        <ArrowRight size={16} />
                    </>
                )}
            </div>
        </div>

        {/* Ambient Blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '10%', width: '800px', height: '800px', background: 'radial-gradient(circle, #005BEA 0%, transparent 70%)', filter: 'blur(120px)', opacity: '0.08', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, #DD2476 0%, transparent 70%)', filter: 'blur(100px)', opacity: '0.06', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container">
          <div className="section-header">
            <span className="header-label">Our Process</span>
            <h2 className="header-title">
              From abstract ideas <br />
              <span style={{ background: 'linear-gradient(90deg, #a1a1aa, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                to concrete reality.
              </span>
            </h2>
          </div>

          <div 
            className="scroll-wrapper" 
            ref={scrollRef}
            // Mouse Enter/Leave to toggle the Custom Cursor
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="process-card group"
                style={{ 
                  // @ts-ignore
                  '--glow-color': step.color,
                  '--glow-gradient': step.gradient
                }}
              >
                <div className="card-glow" />
                <div className="card-number">{step.id}</div>
                <div className="card-content">
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-desc">{step.desc}</p>
                </div>
                <div className="indicator-line" />
              </div>
            ))}
            <div style={{ minWidth: '1px', flex: '0 0 1px' }} />
          </div>
        </div>
      </section>
    </>
  );
}