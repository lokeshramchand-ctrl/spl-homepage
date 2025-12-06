"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

const faqData = [
  { q: "What is AutoBiz.ai?", a: "AutoBiz.ai is an AI-driven automation engine designed to accelerate business workflows, improve operational efficiency, and increase digital scalability." },
  { q: "How does integration work?", a: "We plug directly into your existing systems via APIs — no infrastructure rewriting needed. Setup takes minutes, not months." },
  { q: "Can AI improve customer success?", a: "Yes — our AI automates onboarding, support responses, sentiment prediction, and insights that boost retention." },
  { q: "Does it work with CRM tools?", a: "We support integrations with HubSpot, Salesforce, Notion, Airtable and custom CRMs with authentication support." },
  { q: "Is my data secure?", a: "Your data is encrypted end-to-end and processed privately. We comply with SOC2, GDPR, and enterprise-grade compliance." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);


  const styles = `
  
.faq-wrapper {
  background: #0f0f10;
  padding: 8rem 0;
  color: white;
}

.faq-title {
  text-align: center;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-family: "Instrument Serif", serif;
  font-weight: 700;
  margin-bottom: 4rem;
  letter-spacing: -1px;
}

.faq-title span {
  background: linear-gradient(90deg, #14b8a6, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.faq-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  transition: border 0.3s, box-shadow 0.3s;
}

.faq-card:hover {
  border-color: rgba(20,184,166,0.4);
  box-shadow: 0 0 15px rgba(20,184,166,0.15);
}

.faq-header {
  width: 100%;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}

.faq-body {
  overflow: hidden;
  margin-top: 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1rem;
}

.faq-body p {
  font-size: 0.95rem;
  color: #d1d5db;
  line-height: 1.7;
}
  `;

  return (
    <section className="faq-wrapper" ref={sectionRef}>
      <div className="container">
        
        {/* Fancy Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="faq-title"
        >
          Frequently Asked <span>Questions</span>
        </motion.h2>
        
        <div className="faq-list">
          {faqData.map((item, index) => (
            <motion.div
              className="faq-card"
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <button
                className="faq-header"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span>{item.q}</span>
                <motion.div
                  animate={{ rotate: open === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={22} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    className="faq-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
