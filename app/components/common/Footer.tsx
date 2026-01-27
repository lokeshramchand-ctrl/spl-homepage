"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Github, Mail, MapPin } from "lucide-react";
import { useTheme } from 'next-themes';

// Assuming your logo paths
import logoLight from '../../assets/Icons/spl-inkscape-side.svg';      
import logoDark from '../../assets/Icons/spl-inkscape-side.svg';  

const MARQUEE_TEXT = ["STRATEGY", "DESIGN", "ENGINEERING", "INNOVATION", "SYSTEMS"];

export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false); 

  useEffect(() => setMounted(true), []);

  const currentLogo = mounted && (theme === 'light' || resolvedTheme === 'light') ? logoDark : logoLight;

  return (
    <footer className="footer-visual-root">
      {/* Background Orbs to match your Carousel aesthetic */}
      <div className="bg-orb orb-top-right" />
      <div className="bg-orb orb-bottom-left" />

      {/* 1. KINETIC MARQUEE SECTION */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((text, i) => (
            <span key={i} className="marquee-item">
              {text} <span className="dot">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-content-grid">
        {/* 2. MAIN CONTEXT BLOCK */}
        <section className="context-block">
          <div className="brand-header">
            {mounted && (
              <Image src={currentLogo} alt="Logo" width={110} height={32} className="logo-main" />
            )}
            <span className="est">EST. 2014</span>
          </div>
          <h2 className="headline">
            Engineering the <br /> 
            <em>Invisible</em> details.
          </h2>
          <div className="contact-pills">
            <a href="mailto:hello@spl.com" className="pill-link"><Mail size={16}/> Get in touch</a>
            <span className="pill-link"><MapPin size={16}/> San Diego, CA</span>
          </div>
        </section>

        {/* 3. NAV LINKS GRID */}
        <nav className="nav-spread">
          <div className="nav-set">
            <h6>Navigation</h6>
            <Link href="/services">Expertise</Link>
            <Link href="/industries">Industries</Link>
            <Link href="/work">Selected Work</Link>
            <Link href="/about">Our Story</Link>
          </div>
          <div className="nav-set">
            <h6>Resources</h6>
            <Link href="/docs">Documentation</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/careers">Join the Lab</Link>
          </div>
          <div className="nav-set">
            <h6>Social</h6>
            <a href="#" className="social-row"><Linkedin size={14}/> LinkedIn</a>
            <a href="#" className="social-row"><Github size={14}/> GitHub</a>
          </div>
        </nav>
      </div>

      {/* 4. REFINED BOTTOM BAR */}
      <div className="bottom-bar">
        <div className="legal">
          <span>© {new Date().getFullYear()}</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <div className="tagline">Next-Gen Systems Engineering</div>
        <motion.button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
          whileHover={{ y: -5 }}
        >
          BACK TO TOP ↑
        </motion.button>
      </div>

      <style jsx>{`
        .footer-visual-root {
          --f-bg: #050505;
          --f-text: #ffffff;
          --f-accent: #3b82f6;
          --f-border: rgba(255, 255, 255, 0.08);
          
          position: relative;
          background: var(--f-bg);
          color: var(--f-text);
          padding: 0 0 2rem 0;
          font-family: 'Instrument Sans', sans-serif;
          overflow: hidden;
        }

        /* Ambient Orbs */
        .bg-orb {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.1;
          pointer-events: none;
        }
        .orb-top-right { top: -10%; right: -5%; background: #ff3b3b; }
        .orb-bottom-left { bottom: -10%; left: -5%; background: #3b82f6; }

        /* Marquee Styles */
        .marquee-container {
          padding: 4rem 0;
          border-bottom: 1px solid var(--f-border);
          overflow: hidden;
          background: rgba(255,255,255, 0.01);
          user-select: none;
        }
        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: scroll 30s linear infinite;
        }
        .marquee-item {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 8vw, 6rem);
          font-weight: 400;
          padding: 0 2rem;
          opacity: 0.15;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .dot { font-size: 2rem; color: var(--f-accent); }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Layout Grid */
        .footer-content-grid {
          max-width: 1400px;
          margin: 6rem auto;
          padding: 0 2.5rem;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          position: relative;
          z-index: 10;
        }

        /* Context Block */
        .brand-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .est {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border: 1px solid var(--f-border);
          border-radius: 4px;
          color: rgba(255,255,255,0.4);
        }
        .headline {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 2.5rem;
        }
        .headline em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          opacity: 0.6;
        }
        .contact-pills {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pill-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(255,255,255,0.05);
          border-radius: 100px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: 0.3s;
        }
        .pill-link:hover { background: rgba(255,255,255,0.1); }

        /* Nav Spread */
        .nav-spread {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
        }
        .nav-set h6 {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.3);
          margin-bottom: 1.5rem;
        }
        .nav-set :global(a) {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--f-text);
          text-decoration: none;
          font-size: 1rem;
          margin-bottom: 0.8rem;
          opacity: 0.6;
          transition: 0.3s;
        }
        .nav-set :global(a:hover) { opacity: 1; transform: translateX(4px); }

        /* Bottom Bar */
        .bottom-bar {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2.5rem;
          border-top: 1px solid var(--f-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .legal { display: flex; gap: 1.5rem; }
        .legal :global(a) { color: inherit; text-decoration: none; }
        .legal :global(a:hover) { color: #fff; }
        .back-to-top {
          background: none;
          border: none;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.1em;
        }

        @media (max-width: 1024px) {
          .footer-content-grid { grid-template-columns: 1fr; text-align: center; }
          .brand-header, .contact-pills { justify-content: center; }
          .nav-spread { grid-template-columns: 1fr; gap: 3rem; }
          .bottom-bar { flex-direction: column; gap: 2rem; }
        }
      `}</style>
    </footer>
  );
}