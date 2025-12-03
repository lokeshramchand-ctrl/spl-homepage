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

  /* ✨ GSAP entrance animation */
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".faq-card");
    if (items) {
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
      });
    }
  }, []);

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
