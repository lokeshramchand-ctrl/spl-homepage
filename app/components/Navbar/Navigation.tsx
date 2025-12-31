"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes'; // Import for logo switching

// Asset Imports
import logoLight from '../../assets/spl-inkscape-side.svg';      // White logo for Dark Mode
//import logoDark from '../../assets/SPL-Light.svg';  // Dark logo for Light Mode
import logoDark from '../../assets/spl-inkscape-side.svg';  // Dark logo for Light Mode
import ThemeToggle from '../Themetoggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false); // For hydration safety

  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme(); // Get current theme

  // Ensure theme is loaded before rendering logo to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Scroll Logic (Hide on scroll down, show on scroll up) ---
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollPosition = currentScrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const footerThreshold = 600;

      // Logic: Show if scrolling UP or at the very top. Hide if scrolling DOWN.
      // Also hide if near footer to prevent clash.
      if (docHeight - scrollPosition < footerThreshold) {
        setIsVisible(false);
      } else if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Approach', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  // Determine which logo to show
  // If not mounted yet, default to logoLight (or a placeholder) to prevent flicker
  const currentLogo = mounted && (theme === 'light' || resolvedTheme === 'light') ? logoDark : logoLight;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600&family=Inter:wght@400;500&display=swap');

    /* No local :root - using globals.css variables */

    /* --- Navigation Shell --- */
    .navbar-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s;
    }

    .nav-visible { transform: translateY(0); }
    .nav-hidden { transform: translateY(-100%); }

    /* --- GLASSMORPHISM --- */
    .nav-glass {
      background: var(--bg-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px; /* Slightly tighter height for modern look */
    }

/* --- Logo Wrapper --- */
.logo-wrapper {
  position: relative;
  z-index: 110;
  display: flex;
  align-items: center;
  /* Control size here instead of inline on the image */
  height: 40px;
  width: 180px; /* Set a comfortable max-width for a horizontal logo */
  transition: opacity 0.3s;
}

.logo-wrapper:hover {
  opacity: 0.7;
}

/* Ensure the image inside stays contained */
.logo-img {
  object-fit: contain;
}


    /* --- Desktop Links (The "Super Modern" Part) --- */
    .desktop-nav {
      display: none;
    }

    @media (min-width: 768px) {
      .desktop-nav {
        display: flex;
        gap: 2.5rem;
        align-items: center;
      }
    }

    .nav-link {
      position: relative;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      color: var(--text-secondary); /* Muted by default */
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;
      letter-spacing: 0.01em;
      padding: 0.5rem 0;
    }

    .nav-link:hover { color: var(--text-primary); }
    .nav-link.active { color: var(--text-primary); }

    /* Modern Gradient Underline (Replaces the Dot) */
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--grad-main); /* Your Brand Gradient */
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0.8;
    }

    .nav-link:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    .nav-link.active::after {
      transform: scaleX(1);
      transform-origin: center;
      background: var(--brand-blue); /* Solid blue for active state stability */
    }

  

    /* --- Mobile Menu Button --- */
    .menu-btn {
      position: relative;
      z-index: 110;
      color: var(--text-primary);
      background: transparent;
      border: none;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .menu-btn:hover { transform: scale(1.1); }

    @media (min-width: 768px) {
      .menu-btn { display: none; }
    }

    /* --- Mobile Overlay --- */
    .mobile-overlay {
      position: fixed;
      inset: 0;
      background: var(--bg-main);
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      overflow: hidden;
      animation: fadeIn 0.3s ease-out;
    }

    /* Add noise texture to mobile menu for depth */
    .mobile-overlay::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        pointer-events: none;
        opacity: 0.4;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .mobile-link {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 3.5rem; /* Massive mobile text */
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      margin-bottom: 1.5rem;
      transition: all 0.3s ease;
      line-height: 1;
      display: block;
      letter-spacing: -0.04em;
    }

    .mobile-link:hover, .mobile-link.active {
      color: var(--text-primary);
      padding-left: 20px; /* Slight indentation on hover */
    }
    
    /* Mobile Active Line */
    .mobile-active-line {
        display: inline-block;
        width: 40px;
        height: 4px;
        background: var(--brand-blue);
        margin-right: 15px;
        vertical-align: middle;
        border-radius: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <nav className={`navbar-fixed nav-glass ${isVisible || isOpen ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="nav-container">

          {/* Logo */}
          <Link href="/" className="logo-wrapper" onClick={() => setIsOpen(false)}>
            {mounted && (
              <Image
                src={currentLogo}
                alt="SPL Systems"
                height={40}
                width={10}
                style={{ height: '4vh', width: '15vw' }}
                priority
              />
            )}
          </Link>

          <div className="nav-right">
            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Separator Line + Theme Toggle */}
            <div className="toggle-wrapper">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-overlay">
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className={`mobile-link ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Modern Active Indicator: Line instead of Dot */}
                  {pathname === link.href && <span className="mobile-active-line" />}
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div
            style={{
              marginTop: 'auto',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem',
              position: 'relative',
              zIndex: 10
            }}
          >
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
              Engineering tomorrow's enterprises.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
