"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [index, setIndex] = useState(0);
  
  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  const words = ["System", "Processing", "Logic", "SPL"]; // Cycling words

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // --- Word Cycling Logic ---
    // Change word every 400ms (approx) to match loading feel
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 450);

    // --- 1. Counter Animation ---
    const obj = { value: 0 };
    tl.to(obj, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = `${Math.floor(obj.value)}%`;
        }
      },
    });

    // --- 2. Progress Bar Width ---
    // Runs simultaneously with counter
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.2,
      ease: "power2.inOut",
    }, "<");

    // --- 3. Exit Sequence ---
    tl.call(() => clearInterval(interval)); // Stop word cycle

    // Fade out text first
    tl.to([numberRef.current, wordsRef.current, progressBarRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.in",
    });

    // Slide up the main black curtain
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    });

    // Slide up the secondary "follow" curtain slightly later for depth
    tl.to(curtainRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "-=1.0"); // Overlap animation

    // Cleanup
    tl.call(() => {
        // Unlock scroll
        document.body.style.overflow = "";
        // Optional: Remove component from DOM logic here if parent supports it
        if(containerRef.current) containerRef.current.style.display = "none";
    });

  }, []);

  const styles = `
    .loader-text {
      font-family: 'Instrument Serif', serif;
      font-weight: 400;
    }
    .loader-mono {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: 0.85rem;
      color: #94a3b8; /* text-muted */
    }
    
    /* RGB Gradient Bar */
    .loader-bar {
       background: linear-gradient(90deg, #ef4444, #2563eb, #22c55e);
       height: 2px;
       width: 0%;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* This is the "Follower" Curtain. 
        It sits behind the main black one and provides that 
        premium "layered" exit effect. 
      */}
      <div 
        ref={curtainRef}
        style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#1f1f22", // Dark Zinc
            zIndex: 9998,
        }}
      />

      {/* Main Preloader Container */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#020202", // Your Void Black
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        {/* Top: Brand or Status */}
        <div className="flex justify-between items-start w-full">
            <span className="loader-mono">SPL Systems</span>
        </div>

        {/* Center: Big Numbers & Words */}
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            {/* The Percentage */}
            <div 
                ref={numberRef} 
                className="loader-text"
                style={{
                    fontSize: "clamp(4rem, 15vw, 12rem)",
                    color: "white",
                    lineHeight: 0.8,
                }}
            >
                0%
            </div>

            {/* The Cycling Words */}
            <div 
                ref={wordsRef}
                className="loader-mono"
                style={{ marginTop: '1rem', minHeight: '20px' }}
            >
                {words[index]}
            </div>
        </div>

        {/* Bottom: Progress Bar */}
        <div className="w-full">
            <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                <div ref={progressBarRef} className="loader-bar" />
            </div>
            <div className="flex justify-between mt-2">
                <span className="loader-mono" style={{fontSize: '0.7rem'}}>001</span>
                <span className="loader-mono" style={{fontSize: '0.7rem'}}>100</span>
            </div>
        </div>

      </div>
    </>
  );
}