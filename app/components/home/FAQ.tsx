"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css"; // Ensure you import the CSS file

const faqData = [
  {
    id: 1,
    q: "What is AutoBiz.ai?",
    a: "AutoBiz.ai is an AI-driven automation engine designed to accelerate business workflows, improve operational efficiency, and increase digital scalability seamlessly.",
  },
  {
    id: 2,
    q: "How does integration work?",
    a: "We plug directly into your existing systems via APIs — no infrastructure rewriting needed. Our team handles the handshake, so setup takes minutes, not months.",
  },
  {
    id: 3,
    q: "Can AI improve customer success?",
    a: "Absolutely. Our AI automates onboarding, support responses, sentiment prediction, and provides real-time actionable insights that significantly boost retention rates.",
  },
  {
    id: 4,
    q: "Does it work with CRM tools?",
    a: "We support native deep-integrations with HubSpot, Salesforce, Notion, Airtable, and offer a robust SDK for custom CRM architectures.",
  },
  {
    id: 5,
    q: "Is my data secure?",
    a: "Security is our bedrock. Your data is encrypted end-to-end (AES-256) and processed in private enclaves. We are fully SOC2 Type II and GDPR compliant.",
  },
];

// Animation Variants
const letterAnim = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
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
      ease: "easeOut",
    },
  }),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const titleText = "Frequently Asked";
  const highlightText = "Questions";

  return (
    <main className="faq-page">
      {/* Visual Effects */}
      <div className="noise-overlay" />
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
                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, 
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
  );
}