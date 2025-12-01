"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "What is the AutoBiz.ai?", a: "AutoBiz.ai is an innovative AI solution designed to assist your business in achieving significant growth." },
    { q: "How does Walawe work?", a: "Walawe works by integrating seamlessly with your existing data stack, analyzing patterns, and providing actionable insights." },
    { q: "Can Walawe improve customer service?", a: "Absolutely. Our AI chatbots and customer insight tools help you respond faster and more accurately to customer needs." },
    { q: "How can Walawe find new opportunities?", a: "By analyzing market trends and your internal data, our AI identifies gaps and potential areas for expansion." },
    { q: "What benefits does Walawe offer businesses?", a: "Increased efficiency, reduced operational costs, 24/7 customer support via AI, and data-driven strategic planning." }
  ];

  return (
    <div className="faq-section">
      <div className="container">
        <div className="faq-grid">
          <div>
            <h2 className="section-title">Frequently<br />Asked Question</h2>
            <p className="text-muted">Here are some frequently asked questions with answers to clarify doubts.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button 
                  className="faq-button"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={20} color="#a1a1aa" /> : <ChevronDown size={20} color="#a1a1aa" />}
                </button>
                {openIndex === idx && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}