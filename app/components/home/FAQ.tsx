"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: 1,
    q: "What services does your company provide?",
    a: "We build custom software solutions tailored to business needs — including web applications, enterprise systems, AI-powered platforms, mobile apps, automation tools, and workflow systems."
  },
  {
    id: 2,
    q: "What industries do you work with?",
    a: "We work with startups, SMEs, and enterprise organizations across multiple sectors such as education, finance, manufacturing, healthcare, logistics, and e-commerce."
  },
  {
    id: 3,
    q: "Do you develop AI-powered solutions?",
    a: "Yes. We design and deploy AI systems including document understanding, answer-sheet evaluation, chatbot assistants, predictive analytics, and automation models trained specifically for your operations."
  },
  {
    id: 4,
    q: "Can you build software based on our unique workflow or use case?",
    a: "Absolutely. Every solution is built around your business process — not the other way around. We analyze requirements, map your workflow, and deliver a scalable product that fits your ecosystem."
  },
  {
    id: 5,
    q: "Do you support mobile and cross-platform applications?",
    a: "Yes — we build native Android/iOS apps, Flutter cross-platform products, and internal device-specific applications depending on the project requirements."
  },
];

// Animation Variants (Unchanged)
const letterAnim = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  }),
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

const styles = `
/* --- Imports & Fonts --- */

/* No local :root - using globals.css variables */

/* --- Global Reset & Base --- */
* {
  box-sizing: border-box;
}

::selection {
  background: rgba(0, 198, 251, 0.2);
  color: var(--brand-blue);
}

.faq-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-main); /* Theme Aware */
  color: var(--text-primary);       /* Theme Aware */
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  padding: 6rem 1.5rem;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 1;
  opacity: 0.12;
}

/* Orbs use Brand Gradients (Work in both modes) */
.orb-1 {
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: var(--grad-red);
}

.orb-2 {
  bottom: -10%;
  right: -10%;
  width: 40vw;
  height: 40vw;
  background: var(--grad-blue);
}

/* --- Container --- */
.container {
  position: relative;
  z-index: 10;
  max-width: 900px;
  margin: 0 auto;
}

/* --- Header Section --- */
.header-section {
  text-align: center;
  margin-bottom: 6rem;
}

.pill-label {
  display: inline-block;
  padding: 0.35rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  backdrop-filter: blur(8px);
  font-size: 0.75rem;
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  box-shadow: 0 0 20px rgba(0, 198, 251, 0.05);
}

.main-title {
  font-family: 'Instrument Sans', sans-serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
  font-weight: 500; 
  color: var(--text-primary);
}

.word-wrapper {
  display: inline-flex;
  overflow: hidden;
  margin-right: 0.3em;
}

.char-span {
  display: inline-block;
}

.highlight-italic {
  font-style: italic;
  font-family: 'Instrument Sans', sans-serif;
  background: var(--grad-red);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-right: 0.1em;
}

/* --- FAQ List --- */
.faq-list {
  border-top: 1px solid var(--border-color);
}

/* --- FAQ Item --- */
.faq-item {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.4s ease;
}

.faq-item:hover {
  background-color: var(--bg-card-hover);
}

.faq-item.active {
  background-color: var(--bg-card);
}

/* --- Trigger Button --- */
.faq-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .faq-trigger {
    padding: 2.5rem 2rem;
  }
}

.faq-index {
  font-family: 'Inter', monospace;
  font-size: 0.875rem;
  color: var(--text-dim);
  margin-right: 2rem;
  display: none;
}

@media (min-width: 768px) {
  .faq-index {
    display: block;
  }
}

.faq-question {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .faq-question {
    font-size: 1.5rem;
  }
}

.faq-item:hover .faq-question {
  color: var(--text-primary);
}

.faq-item.active .faq-question {
  color: var(--text-primary);
}

/* --- Icon Wrapper --- */
.icon-wrapper {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  transition: all 0.3s ease;
  margin-left: 1rem;
}

.faq-item:hover .icon-wrapper {
  border-color: var(--brand-blue);
  background: rgba(0, 198, 251, 0.1);
}

.icon {
  position: absolute;
}

.icon-plus {
  color: var(--text-secondary);
}

.icon-minus {
  color: var(--brand-red);
}

/* --- Answer Content --- */
.faq-answer-wrapper {
  overflow: hidden;
}

.faq-answer {
  padding: 0 1rem 2.5rem 1rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 650px;
}

@media (min-width: 768px) {
  .faq-answer {
    padding: 0 2rem 2.5rem 6rem;
  }
}

/* --- Footer --- */
.faq-footer {
  margin-top: 5rem;
  text-align: center;
  color: var(--text-dim);
}

.contact-link {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: var(--text-dim);
  transition: all 0.2s;
}

.contact-link:hover {
  background: var(--grad-green);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration-color: var(--brand-green);
}`;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const titleText = "Frequently Asked";
  const highlightText = "Questions";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <main className="faq-page">
        {/* Visual Effects */}
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />

        <div className="container">
          {/* Header */}
          <div className="header-section">
            <motion.div 
              className="pill-label"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Support & Info
            </motion.div>

            <h2 className="main-title">
              <span className="word-wrapper">
                {titleText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="char-span"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <span className="word-wrapper highlight-italic">
                {highlightText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i + titleText.length}
                    variants={letterAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="char-span"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>
          </div>

          {/* FAQ List */}
          <motion.div className="faq-list" layout>
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              
              return (
                <motion.div
                  key={item.id}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                  custom={index}
                  variants={itemAnim}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="faq-trigger"
                  >
                    <span className="faq-index">0{index + 1}</span>
                    <span className="faq-question">{item.q}</span>
                    
                    <div className="icon-wrapper">
                      <AnimatePresence mode="wait">
                        {isOpen ? (
                          <motion.div
                            key="minus"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            className="icon"
                          >
                            <Minus size={16} className="icon-minus" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="plus"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="icon"
                          >
                            <Plus size={16} className="icon-plus" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] as const }, 
                          opacity: { duration: 0.25 } 
                        }}
                      >
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="faq-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              Still have questions? <a href="#" className="contact-link">Contact Support</a>
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}