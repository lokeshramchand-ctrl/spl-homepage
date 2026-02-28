"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { useTheme } from 'next-themes';

// Asset Imports (Update paths as needed)
import logoLight from '../../assets/Icons/spl-inkscape-side.svg';
import logoDark from '../../assets/Icons/spl-inkscape-side.svg';

export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted && (theme === 'light' || resolvedTheme === 'light') ? 'light' : 'dark';
  const currentLogo = currentTheme === 'light' ? logoDark : logoLight;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    .footer-section {
      position: relative;
      background-color: var(--bg-main);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      padding-top: 6rem;
      transition: background-color 0.4s ease, color 0.4s ease;
      border-top: 1px solid var(--border-color);
    }

    .footer-glow {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 500px;
      background: radial-gradient(ellipse at top, rgba(0, 198, 251, 0.08) 0%, transparent 70%);
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
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 5rem;
      gap: 2rem;
    }

    @media (min-width: 900px) {
      .footer-cta {
        flex-direction: row;
        align-items: flex-end;
      }
    }

    .cta-heading {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(3rem, 6vw, 4.5rem);
      line-height: 1.05;
      max-width: 700px;
      color: var(--text-primary);
      margin: 0;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--text-primary);
      color: var(--bg-main);
      padding: 1.125rem 2.5rem;
      border-radius: 100px;
      font-size: 1.1rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      white-space: nowrap;
    }

    .cta-button:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 198, 251, 0.25);
    }

    /* --- Grid Section --- */
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      margin-bottom: 5rem;
      border-top: 1px solid var(--border-color);
      padding-top: 5rem;
    }

    @media (min-width: 768px) {
      .footer-grid { 
        grid-template-columns: 1fr 1fr; 
      }
    }

    @media (min-width: 1024px) {
      .footer-grid { 
        grid-template-columns: 1fr 1.5fr 1.5fr; 
        gap: 4rem;
      }
    }

    .footer-col h3 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      font-weight: 600;
    }

    .footer-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .footer-link {
      color: var(--text-dim);
      text-decoration: none;
      font-size: 1.05rem;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-link:hover {
      color: var(--text-primary);
      transform: translateX(6px);
    }

    .icon-wrapper {
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* --- Modern Map Section --- */
    .map-container {
      width: 100%;
      height: 220px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--border-color);
      position: relative;
      background: var(--bg-main);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .map-iframe {
      width: 100%;
      height: 100%;
      border: none;
      /* Sleek grayscale by default, lights up on hover */
      filter: grayscale(100%) opacity(0.8) contrast(1.1);
      transition: all 0.5s ease;
    }

    /* Invert colors slightly if in dark mode for a better blend */
    .theme-dark .map-iframe {
      filter: grayscale(100%) invert(90%) opacity(0.7) contrast(1.2);
    }

    .map-container:hover .map-iframe {
      filter: grayscale(20%) opacity(1) contrast(1);
    }

    /* --- Bottom Bar --- */
    .footer-bottom {
      padding: 2.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      border-top: 1px solid var(--border-color);
    }

    @media (min-width: 768px) {
      .footer-bottom { 
        flex-direction: row; 
        justify-content: space-between;
      }
    }

    .brand-logo img {
      height: 40px;
      width: auto;
      opacity: 0.9;
      transition: opacity 0.3s;
    }
    
    .brand-logo:hover img {
      opacity: 1;
    }

    .copyright-social {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .copyright-social {
        flex-direction: row;
        gap: 3rem;
      }
    }

    .copyright {
      color: var(--text-dim);
      font-size: 0.9rem;
    }

    .social-links { display: flex; gap: 1rem; }
    
    .social-icon { 
      color: var(--text-dim); 
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      padding: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s; 
    }

    .social-icon:hover { 
      color: var(--bg-main); 
      background: var(--text-primary);
      border-color: var(--text-primary);
      transform: translateY(-3px); 
    }
  `;

  return (
    <>
      {/* Wrapper injects a class to help with CSS conditional theming on the iframe map */}
      <div className={`theme-${currentTheme}`}>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        
        <footer className="footer-section">
          <div className="footer-glow" />

          <div className="container">
            
            {/* CTA Section */}
            <div className="footer-cta">
              <motion.h2 
                className="cta-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to transform your <br />
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  digital infrastructure?
                </span>
              </motion.h2>
              
              <motion.a 
                href="#" 
                className="cta-button"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Contact Us <ArrowUpRight size={22} strokeWidth={2.5} />
              </motion.a>
            </div>

            <div className="footer-grid">
              {/* Column 1: Company Links */}
              <div className="footer-col">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
                  <h3>Company</h3>
                  <ul>
                    <li><a href="#about" className="footer-link">About</a></li>
                    {/* Uncomment when pages are ready
                    <li><a href="/careers" className="footer-link">Careers</a></li>
                    <li><a href="/blog" className="footer-link">Blog</a></li>
                    <li><a href="/legal" className="footer-link">Legal</a></li>
                    */}
                  </ul>
                </motion.div>
              </div>
              
              {/* Column 2: Contact Info */}
              <div className="footer-col">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                  <h3>Contact</h3>
                  <ul>
                    <li>
                      <a href="mailto:hello@splsystems.com" className="footer-link">
                        <span className="icon-wrapper"><Mail size={18} /></span> Email
                      </a>
                    </li>
                    <li>
                      <a href="tel:+1234567890" className="footer-link">
                        <span className="icon-wrapper"><Phone size={18} /></span> Phone
                      </a>
                    </li>
                    <li>
                      <div className="footer-link" style={{ pointerEvents: 'none' }}>
                        <span className="icon-wrapper"><MapPin size={18} /></span> 
                        1281 9th Ave, San Diego CA
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Column 3: Modern Map */}
              <div className="footer-col">
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
                  <h3>Location</h3>
                  <div className="map-container">
                    <iframe 
                      className="map-iframe"
                      src="https://maps.google.com/maps?q=1281+9th+Ave,+San+Diego,+CA+92101&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SPL Systems Location"
                    />
                  </div>
                </motion.div>
              </div>
            </div> 

            {/* Bottom Bar: Logo, Copyright & Socials */}
            <div className="footer-bottom">
              <Link href="/" className="brand-logo">
                {mounted && (
                  <Image
                    src={currentLogo}
                    alt="SPL Systems"
                    height={40}
                    width={100}
                    priority
                  />
                )}
              </Link>
              
              <div className="copyright-social">
                <div className="copyright">
                  © {new Date().getFullYear()} SPL Systems, Inc. All rights reserved.
                </div>
                
                <div className="social-links">
                  <a href="https://www.linkedin.com/company/splsystems/" className="social-icon" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  {/* Add more icons here seamlessly if needed */}
                </div>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
}