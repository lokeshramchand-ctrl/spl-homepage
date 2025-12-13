"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const styles = `
    /* Using Global Variables for Theme Support */
    .hero-wrapper {
      position: relative;
      min-height: 100vh;
      width: 100%;
      background-color: var(--bg-main);
      color: var(--text-primary);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 0 1.5rem;
      transition: background-color 0.4s ease, color 0.4s ease;
    }

    /* --- Ambient Background --- */
    /* This creates the "breathing" gradient effect */
    .ambient-glow {
      position: absolute;
      width: 60vw;
      height: 60vw;
      filter: blur(100px); /* Soft blur */
      opacity: 0.15; /* Subtle by default */
      border-radius: 50%;
      z-index: 0;
      pointer-events: none;
      animation: pulseGlow 12s ease-in-out infinite alternate;
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
      animation-delay: -6s; /* Offset animation */
    }

    @keyframes pulseGlow {
      0% { transform: scale(1) translate(0, 0); opacity: 0.12; }
      100% { transform: scale(1.2) translate(20px, 20px); opacity: 0.2; }
    }

    /* --- Content Container --- */
    .hero-container {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 1100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
    }


    /* --- Typography --- */
    .hero-title {
      font-family: 'Instrument Sans', sans-serif;
      /* Responsive sizing: massive on desktop, readable on mobile */
      font-size: clamp(3.5rem, 9vw, 8rem);
      line-height: 1.05;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.03em;
      margin-top: 1.9rem;
      padding-top: 0.2em;
      padding-bottom: 0.1em;
      
    }

    .hero-title span {
      display: inline-block;
    }

    /* The "Serif" part for elegance */
    .serif-italic {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
      /* Gradient text effect */
      background: var(--grad-red);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      padding-top: 0.1em;
      padding-right: 0.1em;
      padding-bottom: 0.1em;
    }

    .hero-desc {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      line-height: 1.6;
      color: var(--text-secondary);
      max-width: 650px;
      margin-bottom: 3.5rem;
      font-weight: 400;
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
      padding: 1.1rem 3rem;
      background: var(--text-primary); /* Adapts to theme */
      color: var(--bg-main);          /* Adapts to theme */
      border-radius: 100px;
      font-family: 'Instrument Sans', sans-serif;
      font-weight: 600;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: none;
      overflow: hidden;
    }

    .btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 40px -10px rgba(0, 198, 251, 0.4);
    }

    .btn-secondary {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 1.1rem;
      color: var(--text-primary);
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 100px;
      cursor: pointer;
      font-weight: 500;
      padding: 1.1rem 2.5rem;
      transition: all 0.3s ease;
    }
    
    .btn-secondary:hover {
      border-color: var(--text-primary);
      background: var(--bg-card-hover);
    }

    /* --- Scroll Hint --- */
    .scroll-hint {
      position: absolute;
      bottom: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-dim);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      opacity: 0.6;
      font-weight: 500;
    }
    
    /* Mobile Adjustments */
    @media (max-width: 768px) {
        .hero-title {
            line-height: 1.15;
        }
        .btn-group {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
        }
        .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
        }
    }
  `;

  // --- Animation Variants (Silky Smooth) ---
  const wrapperVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { y: 40, opacity: 0, rotateX: 5 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } // Custom Easing
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
            {/* <span className="eyebrow">SPL SYSTEMS v2.0</span> */}
          </motion.div>

          {/* 2. Main Title */}
          <h1 className="hero-title">
            {/* Lines split for staggering effect */}
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
              Start a Project <ArrowRight size={20} />
            </button>
            <button className="btn-secondary">
              View Our Work
            </button>
          </motion.div>

        </motion.div>

        {/* 5. Bottom Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="scroll-hint"
        >
          <span>Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>

      </div>
    </>
  );
}