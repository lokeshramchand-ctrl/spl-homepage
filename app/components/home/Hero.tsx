"use client";

import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const styles = `
    .hero-wrapper {
      position: relative;
      min-height: 100svh;
      width: 100%;
      background-color: var(--bg-main);
      color: var(--text-primary);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding-inline: clamp(1rem, 5vw, 3rem);
      transition: background-color 0.4s ease, color 0.4s ease;
    }

    .ambient-glow {
      position: absolute;
      width: clamp(40rem, 80vw, 90rem);
      height: clamp(40rem, 80vw, 90rem);
      filter: blur(clamp(4rem, 10vw, 8rem));
      opacity: 0.95;
      border-radius: 50%;
      z-index: 0;
      pointer-events: none;
      animation: pulseGlow 12s ease-in-out infinite alternate;
    }

    .glow-red {
      top: -25%;
      left: -15%;
      background: var(--grad-red);
    }

    .glow-blue {
      bottom: -25%;
      right: -15%;
      background: var(--grad-blue);
      animation-delay: -6s;
    }

    @keyframes pulseGlow {
      0% { transform: scale(1) translate(0, 0); opacity: 0.12; }
      100% { transform: scale(1.2) translate(2vw, 2vw); opacity: 0.2; }
    }

    .hero-container {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: min(90vw, 70rem);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
.hero-title {
  font-family: 'Instrument Sans', sans-serif;
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 1.05;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  margin-top: clamp(1rem, 4vw, 2.5rem);
  padding-block: 0.15em;
  margin-bottom: clamp(2rem, 6vw, 3.5rem);
}

.hero-title > div {
  display: flex;
  justify-content: center;
}



    .hero-title span {
      display: inline-block;
    }

    .serif-italic {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
      background: var(--grad-red);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      padding: 0.15em 0.1em;
    }
      .hero-line {
  display: flex;
  justify-content: center;
  overflow: visible;
}


    .hero-desc {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1rem, 2vw, 1.35rem);
      line-height: 1.6;
      color: var(--text-secondary);
      max-width: 42rem;
      margin-bottom: clamp(2rem, 6vw, 3.5rem);
      font-weight: 400;
    }

    .btn-group {
      display: flex;
      gap: clamp(0.75rem, 3vw, 1.5rem);
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
    }

    .btn-primary {
      padding: clamp(0.9rem, 2vw, 1.2rem) clamp(2rem, 6vw, 3.5rem);
      background: var(--text-primary);
      color: var(--bg-main);
      border-radius: 100vmax;
      font-family: 'Instrument Sans', sans-serif;
      font-weight: 600;
      font-size: clamp(1rem, 2vw, 1.1rem);
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
      font-size: clamp(1rem, 2vw, 1.1rem);
      color: var(--text-primary);
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 100vmax;
      cursor: pointer;
      font-weight: 500;
      padding: clamp(0.9rem, 2vw, 1.2rem) clamp(1.75rem, 5vw, 2.75rem);
      transition: all 0.3s ease;
      width: fit-content;
    }

    .btn-secondary:hover {
      border-color: var(--text-primary);
      background: var(--bg-card-hover);
    }

    .scroll-hint {
      position: absolute;
      bottom: clamp(1.5rem, 5vw, 2.5rem);
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

    @media (max-width: 48rem) {
      .hero-title {
        line-height: 1.15;
      }

      .btn-group {
        flex-direction: column;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        justify-content: center;
      }
    }
  `;

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
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="hero-wrapper">
        <div className="ambient-glow glow-red" />
        <div className="ambient-glow glow-blue" />

<motion.div className="hero-container" variants={wrapperVars} initial="hidden" animate="visible">
  <h1 className="hero-title">
    <div className="hero-line">
      <motion.div variants={itemVars}>Engineering the</motion.div>
    </div>
    <div className="hero-line">
      <motion.div variants={itemVars}>
        <span className="serif-italic">Intelligent</span> Future.
      </motion.div>
    </div>
  </h1>


          <motion.p variants={itemVars} className="hero-desc">
            We build high-performance digital infrastructure for ambitious enterprises.
            Scalable, secure, and designed for tomorrow.
          </motion.p>

          <motion.div variants={itemVars} className="btn-group">
            <button
              className="btn-secondary"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Reach Out to Us
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
