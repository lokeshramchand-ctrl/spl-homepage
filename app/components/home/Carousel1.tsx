"use client";
import type React from "react";
import { useEffect, useState } from "react";

import { Finance } from "../../assets/SVGs/Finance";
import { FinanceStrategyIcon } from "../../assets/SVGs/Finance-strategy";
import { EducationIcon } from "../../assets/SVGs/Education";
import { BadgeIcon } from "../../assets/SVGs/Badge";
import { RealEstateIcon } from "../../assets/SVGs/Real_Estate";
import { GovernmentIcon } from "../../assets/SVGs/Government";
import { HomeFrontIcon } from "../../assets/SVGs/Home_Front";
import { GovernmentUsersIcon } from "../../assets/SVGs/Govern_users";

export type SvgComponent = (
  props: React.SVGProps<SVGSVGElement>
) => React.ReactNode;

type Slide = {
  title: string;
  leftIcon: SvgComponent;
  rightIcon: SvgComponent;
};

const slides: Slide[] = [
  { title: "Finance", leftIcon: Finance, rightIcon: FinanceStrategyIcon },
  { title: "Real Estate", leftIcon: RealEstateIcon, rightIcon: HomeFrontIcon },
  { title: "Government", leftIcon: GovernmentIcon, rightIcon: GovernmentUsersIcon },
  { title: "Education", leftIcon: EducationIcon, rightIcon: BadgeIcon },
];

const INTERVAL_MS = 4000;

export default function CarouselVertical() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="carousel-page">
      {/* Background Orbs */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />

      <header className="header">
        <span className="eyebrow">Expertise</span>
        <h2 className="main-title">Industries we served</h2>
      </header>

      <div className="visual-container">
        {slides.map((s, i) => {
          const isActive = i === index;
          const LeftIcon = s.leftIcon;
          const RightIcon = s.rightIcon;

          return (
            <div key={i} className={`slide-layer ${isActive ? "active" : ""}`}>
              <div className="bg-icon-wrapper left">
                <LeftIcon className="bg-img" />
              </div>
              <div className="bg-icon-wrapper right">
                <RightIcon className="bg-img" />
              </div>
            </div>
          );
        })}

        <div className="content-overlay">
          <div className="carousel-track">
            {slides.map((s, i) => {
              const offset = i - index;
              return (
                <div
                  key={i}
                  className="carousel-item"
                  style={{
                    transform: `translateY(${offset * 120}%) scale(${i === index ? 1 : 0.85})`,
                    opacity: i === index ? 1 : 0,
                    visibility: Math.abs(offset) <= 1 ? "visible" : "hidden",
                  }}
                >
                  <div className="glass-card">
                    <span className="title-text">{s.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-page {
          position: relative;
          min-height: 100svh;
          width: 100%;
          background-color: var(--bg-main, #0a0a0a);
          color: var(--text-primary, #ffffff);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* --- Orbs --- */
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 1;
        }
        .orb-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--grad-red, #ff4d4d); }
        .orb-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: var(--grad-blue, #4d79ff); }

        /* --- Header --- */
        .header {
          position: relative;
          z-index: 10;
          padding: 4rem 5% 0;
          text-align: center;
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
        .main-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* --- Visual Core --- */
        .visual-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Animated Icons Layer */
        .slide-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.9);
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .slide-layer.active {
          opacity: 0.4;
          transform: scale(1);
        }

        .bg-icon-wrapper {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(10rem, 25vw, 20rem);
          height: clamp(10rem, 25vw, 20rem);
          filter: grayscale(1) brightness(1.5);
        }
        .bg-icon-wrapper.left { left: 5%; }
        .bg-icon-wrapper.right { right: 5%; }
        .bg-img { width: 100%; height: 100%; object-fit: contain; }

        /* --- Carousel Card --- */
        .content-overlay {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 32rem;
          height: 12rem;
        }
        .carousel-track {
          position: relative;
          height: 100%;
          width: 100%;
        }
        .carousel-item {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.8s ease;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2.5rem 4rem;
          border-radius: 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .index-number {
          font-family: monospace;
          font-size: 0.9rem;
          opacity: 0.4;
        }
        .title-text {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        @media (max-width: 768px) {
          .bg-icon-wrapper { display: none; }
          .glass-card { margin: 0 1.5rem; padding: 2rem; }
        }
      `}</style>
    </main>
  );
}
