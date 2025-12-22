"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Image, { StaticImageData} from "next/image"
import InvoiceSvg from "../svg/Invoice";
import BadgeSvg from "../svg/Badge";
export type SvgComponent = (
  props: React.SVGProps<SVGSVGElement>
) => React.ReactNode;

type Slide = {
  title: string;
  //leftImg: StaticImageData;
    leftSvg: SvgComponent;
    rightSvg: SvgComponent;
};

import financeLeft from '../../assets/invoice.svg';
import financeRight from '../../assets/finance--strategy.svg';
import govtLeft from '../../assets/govern--users.svg';
import govtRight from '../../assets/government--01.svg';
import realEstateLeft from '../../assets/real-estate.svg';
import realEstateRight from '../../assets/home--front.svg';
import educationLeft from '../../assets/badge.svg';
import educationRight from '../../assets/education.svg';
const slides: Slide[] = [
  {
    title: "Finance",
    leftSvg: InvoiceSvg,
    rightSvg: BadgeSvg 
  },
  {
    title: "Real Estate",
    leftSvg: InvoiceSvg,
    rightSvg: BadgeSvg 
  },
  {
    title: "Government",
    leftSvg: InvoiceSvg,
    rightSvg: BadgeSvg 
  },
  {
    title: "Education",
    leftSvg: InvoiceSvg,
    rightSvg: BadgeSvg 
  },
];

const INTERVAL_MS = 3500;


export default function CarouselVertical() {
  const [index, setIndex] = useState(0);

  /* Auto spin */
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);


  const slide = slides[index];

  return (
    <main className="carousel-page">
        {/* Visual Effects */}
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
{/* 🔹 TOP HEADING */}
      <h2 className="main-title">Industries we served</h2>
      {/* LEFT GRADIENT */}

      {/* FOREGROUND */}
      <div className="content">
      {/*
        <h2 className="title">{slides[index].title}</h2>
	*/}

      <div
        className="bg bg-left"
      >
      <slide.leftSvg className="bg-img" />
      </div>

      {/* RIGHT GRADIENT */}
      <div
        className="bg bg-right"
      >

      <slide.rightSvg className="bg-img" />
	      </div>
        <div className="carousel">
          {slides.map((s, i) => {
            const offset = i - index;

            return (
              <div
                key={i}
                className="carousel-item"
                style={{
                  transform: `translateY(${offset * 110}%) scale(${
                    i === index ? 1 : 0.7
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
