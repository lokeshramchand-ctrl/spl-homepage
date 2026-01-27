"use client";
import React, { useState } from "react";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const instrumentSansFamily = instrumentSans.style.fontFamily;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    field_ypUi: "", // Name
    field_pMMK: "", // Email
    field_C0O4: "", // Comment
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(
        "https://analytics.priyatham.in/open/workspace/clnzoxcy10001vy2ohi4obbi0/survey/cmc5z1pca03jx95kud4x3c2a1/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: formData }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({ field_ypUi: "", field_pMMK: "", field_C0O4: "" });
        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className={`contact-page ${instrumentSans.className}`}>
      {/* Background Decor matching Carousel */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />

      <div className="form-container">
        <header className="form-header">
          <span className="eyebrow">Contact Us</span>
          <h2 className="form-title">Get in Touch</h2>
        </header>

        <form onSubmit={handleSubmit} className="glass-card">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="Name"
              autoComplete="name"
              value={formData.field_ypUi}
              onChange={(e) => setFormData({ ...formData, field_ypUi: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Contact Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email"
              autoComplete="email"
              value={formData.field_pMMK}
              onChange={(e) => setFormData({ ...formData, field_pMMK: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="comment">Message</label>
            <textarea
              id="comment"
              required
              rows={4}
              placeholder="Leave us a message"
              value={formData.field_C0O4}
              onChange={(e) => setFormData({ ...formData, field_C0O4: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`submit-btn ${status}`}
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? (
              <span className="loader">Sending...</span>
            ) : status === "success" ? (
              "Message Sent!"
            ) : (
              "Send Message"
            )}
          </button>

          {status === "error" && (
            <p className="error-msg">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>

      <style jsx>{`
        .contact-page {
          font-family: ${instrumentSansFamily}, -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          min-height: 100svh;
          width: 100%;
          background-color: var(--bg-main, #050505);
          color: var(--text-primary, #fff);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
          pointer-events: none;
        }
        .orb-1 { top: -15%; left: -10%; width: 60vw; height: 60vw; background: var(--grad-red, #ff3b3b); }
        .orb-2 { bottom: -15%; right: -10%; width: 50vw; height: 50vw; background: var(--grad-blue, #3b82f6); }

        .form-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 34rem;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .eyebrow {
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

        .form-title {
          font-family: ${instrumentSansFamily}, -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: clamp(1.5rem, 5vw, 3rem);
          border-radius: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        label {
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0.4;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-left: 0.25rem;
        }

        input, textarea {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 1rem;
          padding: 1.1rem;
          color: white;
          font-family: var(--font-main);
          font-size: 1rem;
          transition: all 0.25s ease;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        input:focus, textarea:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03);
        }

        /* --- Button State Styling --- */
        .submit-btn {
          margin-top: 1rem;
          padding: 1.25rem;
          border-radius: 1rem;
          border: none;
          background: #ffffff;
          color: #000000;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
          background: #f0f0f0;
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn.success {
          background: #22c55e;
          color: white;
        }

        .error-msg {
          color: #ff5f5f;
          font-size: 0.85rem;
          font-weight: 500;
          text-align: center;
          margin-top: -0.5rem;
        }

        @media (max-width: 640px) {
          .glass-card { padding: 2rem 1.5rem; }
          .form-title { font-size: 2.2rem; }
        }
      `}</style>
    </section>
  );
}