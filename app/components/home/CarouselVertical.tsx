"use client";
import type React from "react";
import { useEffect, useState } from "react";

// ✅ Import icon components (not SVG files)
import { Finance } from "../svg/Finance";
import { FinanceStrategyIcon } from "../svg/Finance-strategy";
import { EducationIcon } from "../svg/Education";
import { BadgeIcon } from "../svg/Badge";
import { RealEstateIcon } from "../svg/Real_Estate";
import { GovernmentIcon } from "../svg/Government";
import { HomeFrontIcon } from "../svg/Home_Front";

export type SvgComponent = (
  props: React.SVGProps<SVGSVGElement>
) => React.ReactNode;

type Slide = {
  title: string;
  leftIcon: SvgComponent;
  rightIcon: SvgComponent;
};

// ✅ Define slide-to-icon mapping
const slides: Slide[] = [
  {
    title: "Finance",
    leftIcon: Finance,
    rightIcon: FinanceStrategyIcon
  },
  {
    title: "Real Estate",
    leftIcon: RealEstateIcon,
    rightIcon: HomeFrontIcon
  },
  {
    title: "Government",
    leftIcon: GovernmentIcon,
    rightIcon: GovernmentIcon
  },
  {
    title: "Education",
    leftIcon: EducationIcon,
    rightIcon: BadgeIcon
  },
];

const INTERVAL_MS = 3500;

export default function CarouselVertical() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  const slide = slides[index];
  const LeftIcon = slide.leftIcon;
  const RightIcon = slide.rightIcon;

  return (
    <main className="carousel-page">
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />

      <h2 className="main-title">Industries we served</h2>

      {/* Left Background Icon */}
      <div className="bg bg-left">
        <LeftIcon className="bg-img" />
      </div>

      {/* Right Background Icon */}
      <div className="bg bg-right">
        <RightIcon className="bg-img" />
      </div>

      {/* Carousel Content */}
      <div className="content">
        <div className="carousel">
          {slides.map((s, i) => {
            const offset = i - index;
            return (
              <div
                key={i}
                className="carousel-item"
                style={{
                  transform: `translateY(${offset * 110}%) scale(${i === index ? 1 : 0.7
                    })`,
                  opacity: i === index ? 1 : 0.4,
                }}
              >
                {s.title}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
.carousel-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-main); /* Theme Aware */
  color: var(--text-primary);       /* Theme Aware */
  font-family: 'Inter', sans-serif;
  
  /* FIX: 'hidden' clips the orbs so they don't cause scrollbars */
  overflow: hidden; 
  
  padding: 6rem 1.5rem;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 1;
  opacity: 0.12;
  pointer-events: none; /* Ensure clicks pass through */
}

/* Orbs use Brand Gradients */
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
  .scene {
    position: relative;
    min-height: 100svh;
    background: #000;
    overflow: hidden;
  }

  /* ================= TOP HEADING ================= */
  .top-heading {
    position: absolute;
    top: clamp(12px, 3vw, 24px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    color: white;
    font-size: clamp(1.25rem, 4vw, 2.5rem);
    letter-spacing: 1.5px;
    text-align: center;
    padding: 0 16px;
    width: 100%;
    max-width: 90%;
  }

  /* ================= BACKGROUND ================= */
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 45%;
    overflow: hidden;
    display: none;
  }

  .bg-img {
	  color: blue;
    object-fit: cover;
    filter: blur(18px);
    opacity: 0.7;
    transform: scale(1.15);
  }

  /* Tablet+ */
  @media (min-width: 640px) {
    .bg {
      display: block;
      width: 30%;
    }
  }

  /* Desktop+ */
  @media (min-width: 1024px) {
    .bg {
      width: 45%;
    }
  }

  .bg-left {
    left: 10%;
    height: 10vh;
    width: 10vh;
    mask-image: linear-gradient(
      to right,
      black 0%,
      black 45%,
      transparent 100%
    );
  }

  .bg-right {
    right: 10%;
    height: 10vh;
    width: 10vh;
    mask-image: linear-gradient(
      to left,
      black 0%,
      black 45%,
      transparent 100%
    );
  }

  /* ================= CENTER CONTENT ================= */
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 0 16px;
  }

  .title {
    font-size: clamp(1.5rem, 6vw, 3.5rem);
    margin-bottom: clamp(16px, 4vw, 32px);
  }

  /* ================= CAROUSEL ================= */
  .carousel {
    position: relative;
    width: 100%;
    max-width: 340px;
    height: 200px;
  }

  @media (min-width: 640px) {
    .carousel {
      max-width: 380px;
      height: 220px;
    }
  }

  @media (min-width: 1024px) {
    .carousel {
      max-width: 420px;
      height: 240px;
    }
  }

  .carousel-item {
    position: absolute;
    width: 100%;
    padding: clamp(12px, 3vw, 18px);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(6px);
    border-radius: 14px;
    transition: transform 1s ease, opacity 1s ease;
    font-size: 2em;
  }
`}</style>
    </main>
  );
}
