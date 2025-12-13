"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const styles = `
    /* Using Global Variables from globals.css */
    
    .error-page {
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
      padding: 2rem;
      font-family: 'Instrument Sans', sans-serif;
    }

    /* --- Atmosphere --- */
    .glow-spot {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.1;
      z-index: 0;
      animation: float 10s ease-in-out infinite alternate;
    }

    .spot-1 {
      top: -10%;
      left: 20%;
      width: 40vw;
      height: 40vw;
      background: var(--grad-red);
    }

    .spot-2 {
      bottom: -10%;
      right: 20%;
      width: 50vw;
      height: 50vw;
      background: var(--grad-blue);
      animation-delay: -5s;
    }

    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(20px, -20px) scale(1.1); }
    }

    /* --- Content --- */
    .content-wrapper {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 600px;
    }

    .pill-status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      border-radius: 50px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      background: var(--brand-red);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--brand-red);
      animation: blink 2s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* --- Glitch Typography --- */
    .huge-number {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(6rem, 20vw, 12rem);
      line-height: 0.8;
      font-weight: 400;
      color: var(--text-primary);
      position: relative;
      margin-bottom: 1rem;
      letter-spacing: -0.05em;
    }
    
    /* Overlay gradient text for style */
    .huge-number span {
        background: linear-gradient(180deg, var(--text-primary) 20%, var(--bg-main) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .error-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .error-desc {
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 3rem;
    }

    /* --- Buttons --- */
    .btn-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn-home {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      background: var(--text-primary);
      color: var(--bg-main);
      border-radius: 100px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s;
    }

    .btn-home:hover {
      transform: scale(1.05);
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      border-radius: 100px;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-back:hover {
      background: var(--bg-card-hover);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="error-page">
        {/* Background Atmosphere */}
        <div className="glow-spot spot-1" />
        <div className="glow-spot spot-2" />

        <div className="content-wrapper">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pill-status"
          >
            <div className="status-dot" />
            <span>System Error 404</span>
          </motion.div>

          <motion.h1 
            className="huge-number"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>404</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="error-title">Page Not Found</h2>
            <p className="error-desc">
              The coordinates you are looking for do not exist in this system. <br />
              It might have been moved or is currently under development.
            </p>

            <div className="btn-group">
              <button onClick={() => window.history.back()} className="btn-back">
                <ArrowLeft size={18} />
                Go Back
              </button>
              
              <Link href="/" className="btn-home">
                <Home size={18} />
                Return Home
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}