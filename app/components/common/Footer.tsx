"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter, Instagram } from "lucide-react";
import { useTheme } from 'next-themes';
// Asset Imports
import logoLight from '../../assets/Icons/spl-inkscape-side.svg';      // White logo for Dark Mode
import logoDark from '../../assets/Icons/spl-inkscape-side.svg';  // Dark logo for Light Mode
export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // For hydration safety
  const currentLogo = mounted && (theme === 'light' || resolvedTheme === 'light') ? logoDark : logoLight;
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    /* No local :root - using globals.css variables */

    .footer-section {
      position: relative;
      background-color: var(--bg-main); /* Theme Aware */
      color: var(--text-primary);       /* Theme Aware */
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      padding-top: 6rem;
      transition: background-color 0.4s ease, color 0.4s ease;
    }

    /* Subtle background glow - Uses Brand Colors */
    .footer-glow {
      position: absolute;
      bottom: -30%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 198, 251, 0.1) 0%, transparent 60%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 1;
    }

    .container {
      position: relative;
      z-index: 10;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* --- CTA Section --- */
    .footer-cta {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 6rem;
      border-bottom: 1px solid var(--border-color); /* Theme Aware */
      padding-bottom: 4rem;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .cta-heading {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      line-height: 1;
      max-width: 600px;
      color: var(--text-primary); /* Theme Aware */
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--text-primary); /* Inverts based on theme */
      color: var(--bg-main);          /* Inverts based on theme */
      padding: 1rem 2rem;
      border-radius: 100px;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .cta-button:hover {
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(0, 198, 251, 0.2); /* Brand Glow */
    }

    /* --- Grid Section --- */
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem;
      margin-bottom: 6rem;
    }

    @media (min-width: 768px) {
      .footer-grid { grid-template-columns: repeat(4, 1fr); }
    }

    .footer-col h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-secondary); /* Theme Aware */
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .footer-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    .footer-link {
      color: var(--text-dim); /* Theme Aware */
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: inline-block;
    }
    .footer-link:hover {
      color: var(--text-primary); /* Theme Aware */
      transform: translateX(4px);
    }

    /* --- HUGE BRAND TEXT (Letter-by-Letter Interaction) --- */
    .footer-brand-section {
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid var(--border-color); /* Theme Aware */
      padding-bottom: 4rem;
      cursor: default;
    }

    .huge-text-wrapper {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(4rem, 16vw, 16rem);
      line-height: 0.8;
      white-space: nowrap;
      display: flex;
    }

    /* Base Letter Style: Outline */
    .char {
      color: transparent;
      /* Theme Aware Stroke: Visible in Light/Dark */
      -webkit-text-stroke: 1px var(--text-secondary); 
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
    }

    /* HOVER STATES */
    
    /* When hovering the container... */
    .footer-brand-section:hover .char-s {
      color: var(--brand-red);
      -webkit-text-stroke: 0px transparent;
      text-shadow: 0 0 40px rgba(255, 81, 47, 0.4);
    }

    .footer-brand-section:hover .char-p {
      color: var(--brand-blue);
      -webkit-text-stroke: 0px transparent;
      text-shadow: 0 0 40px rgba(0, 198, 251, 0.4);
    }

    .footer-brand-section:hover .char-l {
      color: var(--brand-green);
      -webkit-text-stroke: 0px transparent;
      text-shadow: 0 0 40px rgba(56, 239, 125, 0.4);
    }
    
    .footer-brand-section:hover .char-systems {
      color: var(--text-primary); /* Becomes solid main text color */
      -webkit-text-stroke: 0px transparent;
      text-shadow: 0 0 40px var(--bg-card-hover);
    }

    /* Staggered transition delays for a wave effect on hover */
    .footer-brand-section:hover .char-s { transition-delay: 0s; }
    .footer-brand-section:hover .char-p { transition-delay: 0.05s; }
    .footer-brand-section:hover .char-l { transition-delay: 0.1s; }
    .footer-brand-section:hover .char-systems { transition-delay: 0.15s; }


    /* --- Bottom Bar --- */
    .footer-bottom {
      padding: 2rem 0;
      display: flex;
      flex-direction: column-reverse;
      gap: 1.5rem;
      align-items: center;
      justify-content: space-between;
      color: var(--text-dim);
      font-size: 0.875rem;
    }
    @media (min-width: 768px) {
      .footer-bottom { flex-direction: row; }
    }

    .social-links { display: flex; gap: 1.5rem; }
    .social-icon { color: var(--text-dim); transition: all 0.3s; }
    .social-icon:hover { color: var(--text-primary); transform: translateY(-2px); }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <footer className="footer-section">
        <div className="footer-glow" />

        <div className="container">
          
          {/* CTA Section */}
          <div className="footer-cta">
            <h2 className="cta-heading">
              Ready to transform your <br />
              <span style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>digital infrastructure?</span>
            </h2>
            <a href="#" className="cta-button">
              Contact Us <ArrowUpRight size={20} />
            </a>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3>Company</h3>
                <ul>
                  <li><a href="#about" className="footer-link">About</a></li>
		  {/*
                  <li><a href="./404_nf" className="footer-link">Careers</a></li>
                  <li><a href="./404_nf" className="footer-link">Blog</a></li>
                  <li><a href="./404_nf" className="footer-link">Legal</a></li>
		  */}
                </ul>
              </motion.div>
            </div>
            
            <div className="footer-col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3>Contact</h3>
                <ul>
                  <li><a href="#" className="footer-link">Email</a></li>
                  <li><a href="#" className="footer-link">Phone</a></li>
                  <li><a href="#" className="footer-link">1281 9th Ave, San Diego CA 92101</a></li>
                </ul>
              </motion.div>
            </div>
          </div> 
          {/* Huge Brand Section - Letter Separation 
          <div className="footer-brand-section">
            <div className="huge-text-wrapper">
                <span className="char char-s">S</span>
                <span className="char char-p">P</span>
                <span className="char char-l">L</span>
                <span style={{ width: '0.2em' }} />                 <span className="char char-systems">SYSTEMS</span>
            </div>
          </div> */}

            <div className="huge-text-wrapper">
          <Link href="/" className="footer-logo-wrapper">
              <Image
                src={currentLogo}
		            className="char-systems"
                alt="SPL Systems"
                height={40}
                width={100}
                style={{ width: 'auto', height: '40px'}}
                priority
              />
          </Link>
	  </div>

          {/* Copyright & Socials */}
          <div className="footer-bottom">
            <div className="copyright">
              © 2014 — 2025 SPL Systems, Inc.
            </div>
            
            <div className="social-links">
              <a href="https://www.linkedin.com/company/splsystems/" className="social-icon"><Linkedin size={20} /></a>

            </div>
          </div>

        </div>
      </footer>
    </>
  );
}