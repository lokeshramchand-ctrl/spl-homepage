"use client";
import type React from "react";
import { useEffect, useState } from "react";

import { Finance } from "../svg/Finance";
import { FinanceStrategyIcon } from "../svg/Finance-strategy";
import { EducationIcon } from "../svg/Education";
import { BadgeIcon } from "../svg/Badge";
import { RealEstateIcon } from "../svg/Real_Estate";
import { GovernmentIcon } from "../svg/Government";
import { HomeFrontIcon } from "../svg/Home_Front";
import { GovernmentUsersIcon } from "../svg/Govern_users";

export type SvgComponent = (
  props: React.SVGProps<SVGSVGElement>
) => React.ReactNode;

type Slide = {
  title: string;
  leftIcon: SvgComponent;
  rightIcon: SvgComponent;
};

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
    rightIcon: GovernmentUsersIcon
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
  min-height: 100svh;
  width: 100%;
  background-color: var(--bg-main);
  color: var(--text-primary);
  overflow: hidden;
  padding: clamp(3rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem);
  font-family: 'Instrument Sans', system-ui, sans-serif;
}

/* ---------- Orbs ---------- */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(clamp(60px, 12vw, 160px));
  opacity: 0.12;
  pointer-events: none;
}

.orb-1 {
  top: -15%;
  left: -15%;
  width: 60vw;
  height: 60vw;
  background: var(--grad-red);
}

.orb-2 {
  bottom: -15%;
  right: -15%;
  width: 50vw;
  height: 50vw;
  background: var(--grad-blue);
}

/* ---------- Heading ---------- */
.main-title {
  position: absolute;
  top: clamp(1.5rem, 5vw, 3rem);
  left: clamp(1rem, 4vw, 3rem);
  font-family: 'Instrument Sans', system-ui, sans-serif;
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 600;
  letter-spacing: 0.03em;
  z-index: 3;
  margin: 0;
}

/* ---------- Background Icons ---------- */
.bg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}

.bg-left {
  left: 0;
  width: clamp(4rem, 12vw, 14rem);
  height: clamp(4rem, 12vw, 14rem);
}

.bg-right {
  right: 0;
  width: clamp(4rem, 12vw, 14rem);
  height: clamp(4rem, 12vw, 14rem);
}

.bg-img {
  width: 100%;
  height: 100%;
}

@media (max-width: 640px) {
  .bg {
    display: none;
  }
}

/* ---------- Center Content ---------- */
.content {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
}

/* ---------- Carousel ---------- */
.carousel {
  position: relative;
  width: min(80vw, 28rem);
  height: clamp(10rem, 22vw, 16rem);
}

.carousel-item {
  position: absolute;
  width: 100%;
  padding: clamp(0.8rem, 2.5vw, 1.4rem);
  font-size: clamp(1.2rem, 4vw, 2rem);
  border-radius: clamp(0.8rem, 2vw, 1.2rem);
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: transform 1s ease, opacity 1s ease;
  will-change: transform, opacity;
}
`}</style>

    </main>
  );
}
