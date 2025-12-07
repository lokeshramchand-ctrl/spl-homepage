"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, MousePointer2 } from "lucide-react";

export default function Hero() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --bg-dark: #050505;
      --text-white: #ffffff;
      --text-muted: #a1a1aa;
      --accent-primary: #ffffff;
      --accent-secondary: #71717a;
    }

    .hero-wrapper {
      position: relative;
      height: 100vh;
      width: 100%;
      background-color: var(--bg-dark);
      color: var(--text-white);
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* --- Ambient Background --- */

    .aurora-glow {
      position: absolute;
      width: 60vw;
      height: 40vw;
      background: linear-gradient(120deg, #3b82f6, #14b8a6, #8b5cf6);
      opacity: 0.15;
      border-radius: 50%;
      animation: drift 20s infinite alternate;
      z-index: 0;
    }

    .glow-1 { top: -10%; left: -10%; animation-delay: 0s; }
    .glow-2 { bottom: -10%; right: -10%; animation-delay: -10s; background: linear-gradient(120deg, #ec4899, #f43f5e); }

    @keyframes drift {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(5%, 10%) scale(1.1); }
    }

    /* --- Content --- */
    .container {
      position: relative;
      z-index: 10;
      max-width: 1200px;
      padding: 0 2rem;
      width: 100%;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2.5rem;
      max-width: 900px;
    }

    /* --- Badge --- */
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 100px;
      margin-bottom: 1rem;
      backdrop-filter: blur(10px);
    }

    .badge-text {
      font-size: 0.8rem;
      color: var(--text-muted);
      letter-spacing: 0.02em;
    }

    .stars-wrapper {
      display: flex;
      color: #fbbf24; /* Amber 400 */
    }

    /* --- Typography --- */
    .hero-title {
    padding-top: 7rem;
      font-family: 'Instrument Serif', serif;
      font-size: clamp(3rem, 7vw, 6rem);
      line-height: 1.15;
      font-weight: 400;
      letter-spacing: -0.02em;
          

    }

    .hero-title span {
      display: inline-block;
    }

    .italic-accent {
      font-style: italic;
      color: #9ca3af; /* zinc-400 */
      font-weight: 300;
    }

    .hero-desc {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-muted);
      max-width: 500px;
      font-weight: 300;
    }

    /* --- Actions --- */
    .btn-primary {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      background: #ffffff;
      color: #000000;
      border-radius: 100px;
      font-size: 1rem;
      font-weight: 500;
      overflow: hidden;
      transition: all 0.4s ease;
      cursor: pointer;
      border: none;
    }

    .btn-primary:hover {
      padding-right: 3rem; /* Make room for arrow movement */
      background: #e4e4e7;
    }

    .btn-icon-wrapper {
      position: absolute;
      right: 1.5rem;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.4s ease;
    }

    .btn-primary:hover .btn-icon-wrapper {
      opacity: 1;
      transform: translateX(0);
    }

    /* --- Scroll Indicator --- */
    .scroll-indicator {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      opacity: 0.5;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      z-index: 10;
    }

    .mouse-icon {
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
      40% {transform: translateY(-6px);}
      60% {transform: translateY(-3px);}
    }
  `;

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVars = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="hero-wrapper">
        <div className="hero-noise" />
        <div className="aurora-glow glow-1" />
        <div className="aurora-glow glow-2" />

        <div className="container">
          <motion.div 
            className="hero-content"
            variants={containerVars}
            initial="hidden"
            animate="visible"
          >
           

            {/* Main Title - Split for emphasis */}
            <h1 className="hero-title">
              <div style={{ overflow: 'hidden' }}>
                <motion.span variants={itemVars} style={{ display: 'block' }}>
                  SPL Systems is a custom
                </motion.span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.span variants={itemVars} style={{ display: 'block' }}>
                  <span className="italic-accent">software studio</span> engineering
                </motion.span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.span variants={itemVars} style={{ display: 'block' }}>
                  tomorrow’s enterprises.
                </motion.span>
              </div>
            </h1>

            {/* Description */}
            <motion.p variants={itemVars} className="hero-desc">
              Discover cutting-edge AI solutions designed to elevate your business to new heights and drive sustainable growth in today's competitive landscape.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVars} className="hero-actions">
              <button className="btn btn-primary group">
                <span>View Our Work</span>
                <div className="btn-icon-wrapper">
                  <ArrowRight size={18} />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="mouse-icon">
            <MousePointer2 size={20} strokeWidth={1} />
          </div>
          <span>Scroll</span>
        </motion.div>
      </div>
    </>
  );
}