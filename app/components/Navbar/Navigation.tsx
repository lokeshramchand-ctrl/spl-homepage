"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/SPL.svg';
import ThemeToggle from '../Themetoggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // --- Scroll Logic ---
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollPosition = currentScrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const footerThreshold = 600;

      // Hide if near footer OR scrolling down
      if (docHeight - scrollPosition < footerThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
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
  ];

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

    .nav-visible { transform: translateY(0); }
    .nav-hidden { transform: translateY(-100%); }

    /* --- GLASSMORPHISM (Using Global Vars) --- */
    .nav-glass {
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
    }

    /* Logo Wrapper */
    .logo-wrapper {
      position: relative;
      z-index: 110;
      display: flex;
      align-items: center;
      transition: opacity 0.3s;
    }
    .logo-wrapper:hover { opacity: 0.8; }

    /* Right Side Container (Nav + Toggle) */
    .nav-right {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    /* Desktop Links */
    .desktop-nav {
      display: none;
    }

    @media (min-width: 768px) {
      .desktop-nav {
        display: flex;
        gap: 3rem;
        align-items: center;
      }
    }

    .nav-link {
      position: relative;
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      color: var(--text-secondary); /* Global Variable */
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;
      letter-spacing: 0.01em;
      padding: 0.5rem 0;
    }

    .nav-link:hover { color: var(--text-primary); }
    .nav-link.active { color: var(--text-primary); }

    /* Animated Dot Indicator */
    .link-dot {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) scale(0);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--brand-green);
      box-shadow: 0 0 8px var(--brand-green);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .nav-link:hover .link-dot, 
    .nav-link.active .link-dot {
      transform: translateX(-50%) scale(1);
    }

    /* Mobile Menu Button */
    .menu-btn {
      position: relative;
      z-index: 110;
      color: var(--text-primary);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .menu-btn:hover { background: var(--bg-card-hover); }

    @media (min-width: 768px) {
      .menu-btn { display: none; }
    }

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      inset: 0;
      background: var(--bg-glass-heavy); /* Use heavy glass var */
      backdrop-filter: blur(20px);
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      overflow: hidden;
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .mobile-link {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 3rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-decoration: none;
      margin-bottom: 2rem;
      transition: all 0.3s ease;
      line-height: 1.1;
      display: block;
      letter-spacing: -0.03em;
    }

    .mobile-link:hover {
      color: var(--text-primary);
      transform: translateX(10px);
    }
    
    .mobile-active-dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: var(--brand-green);
        border-radius: 50%;
        margin-right: 15px;
        box-shadow: 0 0 15px var(--brand-green);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <nav className={`navbar-fixed nav-glass ${isVisible || isOpen ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="logo-wrapper" onClick={() => setIsOpen(false)}>
            <Image
              src={logo}
              alt="SPL Systems"
              height={40}
              width={100}
              style={{ width: 'auto', height: '40px' }}
              priority
            />
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
                  <span className="link-dot" />
                </Link>
              ))}
            </div>

            {/* THEME TOGGLE (Visible on both Mobile & Desktop) */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                   {/* Show dot only for active link */}
                  {pathname === link.href && <span className="mobile-active-dot" />}
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
              paddingTop: '2rem'
            }}
          >
            <p style={{ color: 'var(--text-dim)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
              Engineering tomorrow's enterprises.
            </p>
          </div>
        </div>
      )}
    </>
  );
}