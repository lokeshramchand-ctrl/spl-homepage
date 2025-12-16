"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- Sub-component: Counting Number ---
function CountingNumber({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix (e.g., "10+" -> 10 and "+")
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  return (
    <div ref={ref} className="stat-card group">
      <div className="stat-value-wrapper">
        <motion.span className="stat-number">{display}</motion.span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-line" />
    </div>
  );
}

// --- Main Component ---
export default function CarouselVertical() {
  const styles = `
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
  height: 100vh;
}

.wrapper {
  background: linear-gradient(60deg, #420285, #08bdbd);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.carousel__item {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  padding: 0 12px;
  opacity: 0;
  filter: drop-shadow(0 2px 2px #555);
  will-change: transform, opacity;
  -webkit-animation: carousel-animate-vertical 27s linear infinite;
          animation: carousel-animate-vertical 27s linear infinite;
}

.carousel__item:nth-child(1) {
  -webkit-animation-delay: calc(3s * -1);
          animation-delay: calc(3s * -1);
}

.carousel__item:nth-child(2) {
  -webkit-animation-delay: calc(3s * 0);
          animation-delay: calc(3s * 0);
}

.carousel__item:nth-child(3) {
  -webkit-animation-delay: calc(3s * 1);
          animation-delay: calc(3s * 1);
}

.carousel__item:nth-child(4) {
  -webkit-animation-delay: calc(3s * 2);
          animation-delay: calc(3s * 2);
}

.carousel__item:nth-child(5) {
  -webkit-animation-delay: calc(3s * 3);
          animation-delay: calc(3s * 3);
}

.carousel__item:nth-child(6) {
  -webkit-animation-delay: calc(3s * 4);
          animation-delay: calc(3s * 4);
}

.carousel__item:nth-child(7) {
  -webkit-animation-delay: calc(3s * 5);
          animation-delay: calc(3s * 5);
}

.carousel__item:nth-child(8) {
  -webkit-animation-delay: calc(3s * 6);
          animation-delay: calc(3s * 6);
}

.carousel__item:last-child {
  -webkit-animation-delay: calc(-3s * 2);
          animation-delay: calc(-3s * 2);
}

.carousel__item-head {
  border-radius: 50%;
  background-color: #d7f7fc;
  width: 90px;
  height: 90px;
  padding: 14px;
  position: relative;
  margin-right: -45px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}

.carousel__item-body {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 20px 16px 70px;
}

.title {
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 10px;
}

@-webkit-keyframes carousel-animate-vertical {
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
  3%, 11.1111111111% {
    transform: translateY(100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  14.1111111111%, 22.2222222222% {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
  25.2222222222%, 33.3333333333% {
    transform: translateY(-100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  36.3333333333% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: visible;
  }
  100% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes carousel-animate-vertical {
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
  3%, 11.1111111111% {
    transform: translateY(100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  14.1111111111%, 22.2222222222% {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
  25.2222222222%, 33.3333333333% {
    transform: translateY(-100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  36.3333333333% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: visible;
  }
  100% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
}
  `;

  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '200+', label: 'Projects Delivered' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section className="stats-section">
<div className='wrapper'>
  <div className='carousel'>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐳
      </div>
      <div className='carousel__item-body'>
        <p className='title'>spouting whale</p>
        <p>Unicode: U+1F433</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐋
      </div>
      <div className='carousel__item-body'>
        <p className='title'>whale</p>
        <p>Unicode: U+1F40B</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐬
      </div>
      <div className='carousel__item-body'>
        <p className='title'>dolphin</p>
        <p>Unicode: U+1F42C</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐟
      </div>
      <div className='carousel__item-body'>
        <p className='title'>fish</p>
        <p>Unicode: U+1F41F</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐠
      </div>
      <div className='carousel__item-body'>
        <p className='title'>tropical fish</p>
        <p>Unicode: U+1F420</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐡
      </div>
      <div className='carousel__item-body'>
        <p className='title'>blowfish</p>
        <p>Unicode: U+1F421</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🦈
      </div>
      <div className='carousel__item-body'>
        <p className='title'>shark</p>
        <p>Unicode: U+1F988</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐙
      </div>
      <div className='carousel__item-body'>
        <p className='title'>octopus</p>
        <p>Unicode: U+1F419</p>
      </div>
    </div>
    <div className='carousel__item'>
      <div className='carousel__item-head'>
        🐚
      </div>
      <div className='carousel__item-body'>
        <p className='title'>spiral shell</p>
        <p>Unicode: U+1F41A</p>
      </div>
    </div>
  </div>
</div>
        
      </section>
    </>
  );
}
