"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/SPL.svg';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // --- Scroll Logic to Hide Navbar near Footer ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const footerThreshold = 600;

      if (docHeight - scrollPosition < footerThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Approach', href: '#services' },
  ];

  // --- CSS Styles ---
  const styles = `
    /* Navigation Styles */
    .navbar-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s;
    }

    .nav-visible {
      transform: translateY(0);
    }

    .nav-hidden {
      transform: translateY(-100%);
    }

    /* Glass Effect Container */
    .nav-glass {
      background: rgba(2, 2, 2, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1.25rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Logo */
    .logo-text {
      font-family: 'Instrument Serif', serif;
      font-size: 1.5rem;
      color: var(--text-white, #fff);
      font-weight: 500;
      letter-spacing: -0.02em;
      position: relative;
      z-index: 110;
    }

    /* Desktop Links */
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
      font-size: 0.9rem;
      color: var(--text-muted, #94a3b8);
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 400;
      letter-spacing: 0.02em;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--text-white, #fff);
    }

    /* Animated Underline */
    .link-dot {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--accent-teal, #22c55e);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .nav-link:hover .link-dot, .nav-link.active .link-dot {
      opacity: 1;
    }

    /* Mobile Menu Button */
    .menu-btn {
      position: relative;
      z-index: 110;
      color: var(--text-white, #fff);
      background: none;
      border: none;
      cursor: pointer;
      display: block;
    }

    @media (min-width: 768px) {
      .menu-btn {
        display: none;
      }
    }

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      inset: 0;
      background: var(--bg-dark, #020202);
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      overflow: hidden;
      /* Simple CSS Fade In */
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .mobile-bg-noise {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      pointer-events: none;
    }

    .mobile-link {
      font-family: 'Instrument Serif', serif;
      font-size: 3.5rem;
      color: var(--text-muted, #94a3b8);
      text-decoration: none;
      margin-bottom: 1.5rem;
      transition: color 0.3s;
      line-height: 1;
      display: block;
    }

    .mobile-link:hover {
      color: var(--accent-blue, #2563eb);
      padding-left: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <nav className={`navbar-fixed nav-glass ${isVisible || isOpen ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="logo-text" onClick={() => setIsOpen(false)}>
            <Image
              src={logo}
              alt="SPL Systems"
              height={60}
              width={120}
              style={{ width: 'auto', height: '60px' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.name}
                <span className="link-dot" />
              </Link>
            ))}
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
      </nav>

      {/* Full Screen Mobile Menu Overlay - Standard React Rendering */}
      {isOpen && (
        <div className="mobile-overlay">
          <div className="mobile-bg-noise" />

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Footer Details */}
          <div
            style={{
              marginTop: 'auto',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '2rem'
            }}
          >
            <p style={{ color: '#52525b', fontSize: '0.875rem' }}>
              Engineering tomorrow's enterprises.
            </p>
          </div>
        </div>
      )}
    </>
  );
}