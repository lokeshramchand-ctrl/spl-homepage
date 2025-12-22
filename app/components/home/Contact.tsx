"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Underline } from "lucide-react";

// --- Sub-component: Counting Number ---
function CountingNumber({ value, label, link }: { value: string; label: string, link: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix (e.g., "10+" -> 10 and "+")
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));


  return (
    <div ref={ref} className="stat-card group">
      <a href={link} target="_blank" className="stat-card-link">
      <div className="stat-value-wrapper">
        <motion.span className="stat-number">{value}</motion.span>
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-line" />
        </a>
    </div>
  );
}

// --- Main Component ---
export default function ContactSection() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    /* --- Base --- */
    .stats-section {
      position: relative;
      background-color: var(--bg-main); /* Theme Aware */
      color: var(--text-primary);       /* Theme Aware */
      padding: 8rem 0;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      transition: background-color 0.4s ease, color 0.4s ease;
    }

    .container {
      position: relative;
      z-index: 10;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* --- Typography --- */
    .pill-label {
      display: inline-block;
      padding: 0.35rem 1rem;
      margin-bottom: 2rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-secondary);
    }

    .section-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 400;
      line-height: 1.1;
      margin-bottom: 2rem;
      color: var(--text-primary);
    }

    .italic-highlight {
      font-style: italic;
      padding-right: 0.1em;
      /* Brand Gradient - Consistent across themes */
      background: var(--grad-red);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .text-body {
      color: var(--text-secondary);
      font-size: 1.125rem;
      line-height: 1.75;
      margin-bottom: 2rem;
      font-weight: 400;
    }

    /* --- Grid Layouts --- */
    .stats-intro-grid {
      display: grid;
      gap: 3rem;
    }

    @media (min-width: 1024px) {
      .stats-intro-grid {
        grid-template-columns: 1fr 1fr;
        gap: 6rem;
        align-items: start;
      }
    }

    /* --- Stats Row --- */
    .stats-cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0;
      margin-top: 6rem;
      border-top: 1px solid var(--border-color);
    }

    @media (min-width: 768px) {
      .stats-cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* --- Stat Card --- */
    .stat-card {
      position: relative;
      padding: 3rem 1rem;
      transition: background 0.3s ease;
    }
    .stat-card-link{
        text-decoration: none;
    
    }

    .stat-card:hover {
      background: var(--bg-card-hover);
    }

    /* Vertical Dividers for Desktop */
    @media (min-width: 768px) {
      .stat-card:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 20%;
        height: 60%;
        width: 1px;
        background: var(--border-color);
      }
    }

    .stat-value-wrapper {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(3rem, 5vw, 4.0rem);
      line-height: 1;
      font-weight: 400;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: baseline;
    }


    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 600;
    }

    /* Decorative line that grows on hover */
    .stat-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0%;
      height: 2px; 
      background: var(--grad-blue);
      transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .stat-card:hover .stat-line {
      width: 100%;
    }

    /* --- Button --- */
    .btn-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-primary);
      font-size: 0.95rem;
      text-decoration: none;
      cursor: pointer;
      padding-bottom: 2px;
      border-bottom: 1px solid var(--border-color);
      transition: all 0.3s ease;
    }

    .btn-link:hover {
      border-color: var(--brand-red);
      color: var(--brand-red);
      gap: 1rem;
    }
  `;

  const stats = [
    { value: '+1 (650) 993-9799', label: 'Call us', link: 'tel:+16509939799' },
    { value: 'naveen@splsystems.in', label: 'Email', link: 'mailto:naveen@splsystems.in' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section className="stats-section">
        
        {/* Ambient Glows - Using Brand Colors (Visible in both themes) */}
        <div style={{ position: 'absolute', top: '10%', right: '0', width: '300px', height: '300px', background: 'var(--brand-blue)', filter: 'blur(120px)', opacity: '0.1', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '0', width: '300px', height: '300px', background: 'var(--brand-red)', filter: 'blur(120px)', opacity: '0.08', borderRadius: '50%' }} />

        <div className="container">
          <div className="stats-intro-grid">
            {/* Title Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="pill-label">Contact Us</div>
              <h2 className="section-title">
               Our growth is from <br /> 
                <span className="italic-highlight">your growth</span>
              </h2>
            </motion.div>

            {/* Content Column */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-body">
              We are very friendly to discuss, whether it's a potential project or an idea. We can develop it together.
              </p>
              <p className="text-body">
                Email us for free consultation, or call us on the phone 24/7, we will get back to you with answers if we don't pick up the phone.
              </p>
              
              <div className="mt-8">
                <a href="#" className="btn-link group">
                  Learn More 
                  <ArrowRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div 
            className="stats-cards"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            {stats.map((stat, idx) => (
              <CountingNumber key={idx} value={stat.value} label={stat.label} link={stat.link} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}