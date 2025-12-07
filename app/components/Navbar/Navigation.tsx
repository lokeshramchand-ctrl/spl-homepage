"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Star } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
  ];

  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link href="/" className="logo">
            <span>SPL Systems</span>
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={isActive(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ backgroundColor: '#18181b', padding: '1rem', borderTop: '1px solid #27272a' }} className="md:hidden">
           {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ 
                  display: 'block', 
                  padding: '0.75rem', 
                  color: pathname === link.href ? '#14b8a6' : '#d4d4d8', 
                  textDecoration: 'none' 
                }}
              >
                {link.name}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
}