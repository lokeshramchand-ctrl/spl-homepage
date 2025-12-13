"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400&display=swap');

    :root {
      --bg-dark: #050505;
      --text-white: #ffffff;
      --text-muted: #a1a1aa;
      
      /* SPL Brand Gradients */
      --grad-red: linear-gradient(135deg, #FF512F, #DD2476);
      --grad-blue: linear-gradient(135deg, #00C6FB, #005BEA);
      --grad-text: linear-gradient(90deg, #ffffff, #a1a1aa);
    }

    .hero-wrapper {
      position: relative;
      min-height: 100vh;
      width: 100%;
      background-color: var(--bg-dark);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 0 1.5rem;
    }

    /* --- Ambient Background (Subtle & Clean) --- */
    .ambient-glow {
      position: absolute;
      width: 60vw;
      height: 60vw;
      filter: blur(120px);
      opacity: 0.15;
      border-radius: 50%;
      z-index: 0;
      pointer-events: none;
      animation: pulseGlow 10s ease-in-out infinite alternate;
    }

    .glow-red {
      top: -20%;
      left: -10%;
      background: var(--grad-red);
    }

    .glow-blue {
      bottom: -20%;
      right: -10%;
      background: var(--grad-blue);
      animation-delay: -5s;
    }

    @keyframes pulseGlow {
      0% { transform: scale(1); opacity: 0.12; }
      100% { transform: scale(1.1); opacity: 0.18; }
    }

    /* --- Typography --- */
    .hero-container {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 1000px;
    }

    .eyebrow {
      display: inline-block;
      font-family: 'Instrument Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 2rem;
      border: 1px solid rgba(255,255,255,0.1);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      backdrop-filter: blur(5px);
    }

    .hero-title {
      font-family: 'Instrument Sans', sans-serif;
      font-size: clamp(3.5rem, 8vw, 7.5rem);
      line-height: 1.1; /* Tighter line height for modern look */
      font-weight: 500;
      color: var(--text-white);
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
    }

    /* The "Serif" part for contrast */
    .serif-italic {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
      color: #00C6FB; /* Brand Blue Accent */
    }

    .hero-desc {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.1rem, 2vw, 1.25rem);
      line-height: 1.6;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 3rem auto;
      font-weight: 300;
    }

    /* --- Buttons --- */
    .btn-group {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn-primary {
      position: relative;
      padding: 1rem 2.5rem;
      background: var(--text-white);
      color: #000;
      border-radius: 100px;
      font-family: 'Instrument Sans', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      overflow: hidden;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 40px -10px rgba(255, 255, 255, 0.3);
    }

    .btn-secondary {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 1rem;
      color: var(--text-white);
      background: transparent;
      border: none;
      cursor: pointer;
      font-weight: 500;
      padding: 0.5rem 1rem;
      transition: opacity 0.2s;
    }
    
    .btn-secondary:hover { opacity: 0.7; }

    /* --- Scroll Hint --- */
    .scroll-hint {
      position: absolute;
      bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      opacity: 0.5;
    }
    
    /* Mobile Adjustments */
    @media (max-width: 768px) {
        .hero-title {
            line-height: 1.15;
        }
        .btn-group {
            flex-direction: column;
            width: 100%;
        }
        .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
        }
    }
  `;

  // --- Animation Variants (Smooth & Staggered) ---
  const wrapperVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { y: 50, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } // "Apple" easing
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="hero-wrapper">
        {/* Background Atmosphere */}
        <div className="ambient-glow glow-red" />
        <div className="ambient-glow glow-blue" />

        <motion.div
          className="hero-container"
          variants={wrapperVars}
          initial="hidden"
          animate="visible"
        >
          {/* 1. Eyebrow Label */}
          <motion.div variants={itemVars}>
          </motion.div>

          {/* 2. Main Title (Clean & Kinetic) */}
          <h1 className="hero-title">
            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={itemVars}>
                Engineering the
              </motion.div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={itemVars}>
                <span className="serif-italic">Intelligent</span> Future.
              </motion.div>
            </div>
          </h1>

          {/* 3. Description */}
          <motion.p variants={itemVars} className="hero-desc">
            We build high-performance digital infrastructure for ambitious enterprises.
            Scalable, secure, and designed for tomorrow.
          </motion.p>

          {/* 4. Actions */}
          <motion.div variants={itemVars} className="btn-group">
            <button className="btn-primary">
              Start a Project <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              View Our Work
            </button>
          </motion.div>

        </motion.div>



      </div>
    </>
  );
}