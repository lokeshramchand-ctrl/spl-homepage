"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --bg-dark: #050505;
      --text-white: #ffffff;
      --text-muted: #a1a1aa;
      --text-dim: #52525b;
      --accent-teal: #2dd4bf;
      --border-light: rgba(255, 255, 255, 0.08);
    }

    .footer-section {
      position: relative;
      background-color: var(--bg-dark);
      color: var(--text-white);
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      padding-top: 6rem;
    }

    /* Noise & Glow */
    .footer-noise {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    .footer-glow {
      position: absolute;
      bottom: -30%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 400px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
      filter: blur(80px);
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
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 4rem;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .cta-heading {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      line-height: 1;
      max-width: 600px;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--text-white);
      color: var(--bg-dark);
      padding: 1rem 2rem;
      border-radius: 100px;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .cta-button:hover {
      background: #e4e4e7;
      transform: scale(1.02);
    }

    .cta-button:hover svg {
      transform: rotate(45deg);
    }

    /* --- Grid Section --- */
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem;
      margin-bottom: 6rem;
    }

    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .footer-col h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
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
      color: var(--text-dim);
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .footer-link:hover {
      color: var(--text-white);
      transform: translateX(4px);
    }

    /* --- Badge --- */
    .soc-badge {
      margin-top: 2rem;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border: 1px solid var(--border-light);
      background: rgba(255,255,255,0.02);
      border-radius: 12px;
      text-align: center;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--text-muted);
      line-height: 1.2;
      backdrop-filter: blur(5px);
    }

    /* --- Huge Brand --- */
    .footer-brand-section {
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid var(--border-light);
    }

    .footer-huge-text {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(4rem, 16vw, 16rem);
      line-height: 0.8;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,0.2);
      white-space: nowrap;
      padding-bottom: 2rem;
      transition: all 0.5s ease;
      cursor: default;
    }

    .footer-brand-section:hover .footer-huge-text {
      color: rgba(255,255,255,0.1);
      -webkit-text-stroke: 1px rgba(255,255,255,0.4);
    }

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
      .footer-bottom {
        flex-direction: row;
      }
    }

    .social-links {
      display: flex;
      gap: 1.5rem;
    }

    .social-icon {
      color: var(--text-dim);
      transition: color 0.3s;
    }

    .social-icon:hover {
      color: var(--text-white);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <footer className="footer-section">
        <div className="footer-noise" />
        <div className="footer-glow" />

        <div className="container">
          
          {/* CTA Section */}
          <div className="footer-cta">
            <h2 className="cta-heading">
              Ready to transform your <br />
              <span style={{color: '#a1a1aa', fontStyle: 'italic'}}>digital infrastructure?</span>
            </h2>
            <a href="#" className="cta-button">
              Get Started <ArrowUpRight size={20} className="transition-transform duration-300" />
            </a>
          </div>

          {/* Links Grid */}
          <div className="footer-grid">
            {/* Column 1 */}
            <div className="footer-col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3>Product</h3>
                <ul>
                  <li><a href="#" className="footer-link">Overview</a></li>
                  <li><a href="#" className="footer-link">Models</a></li>
                  <li><a href="#" className="footer-link">Search</a></li>
                  <li><a href="#" className="footer-link">Embed</a></li>
                  <li><a href="#" className="footer-link">Pricing</a></li>
                </ul>
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="footer-col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3>Resources</h3>
                <ul>
                  <li><a href="#" className="footer-link">Documentation</a></li>
                  <li><a href="#" className="footer-link">API Reference</a></li>
                  <li><a href="#" className="footer-link">Community</a></li>
                  <li><a href="#" className="footer-link">Status</a></li>
                </ul>
              </motion.div>
            </div>

            {/* Column 3 */}
            <div className="footer-col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3>Company</h3>
                <ul>
                  <li><a href="#" className="footer-link">About</a></li>
                  <li><a href="#" className="footer-link">Careers</a></li>
                  <li><a href="#" className="footer-link">Blog</a></li>
                  <li><a href="#" className="footer-link">Legal</a></li>
                </ul>
              </motion.div>
            </div>

            {/* Column 4 - Badge */}
            <div className="footer-col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h3>Security</h3>
                <ul>
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link">Terms of Use</a></li>
                  <li><a href="#" className="footer-link">Trust Center</a></li>
                </ul>
                <div className="soc-badge">
                  AICPA<br />SOC 2
                </div>
              </motion.div>
            </div>
          </div>

          {/* Huge Brand Section */}
          <div className="footer-brand-section">
            <h1 className="footer-huge-text">SPL Systems</h1>
          </div>

          {/* Copyright & Socials */}
          <div className="footer-bottom">
            <div className="copyright">
              © 2014 — 2025 SPL Systems, Inc.
            </div>
            
            <div className="social-links">
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
              <a href="#" className="social-icon"><Github size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}