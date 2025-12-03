"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      title: "Think",
      desc: "We read the soil to find where ideas take root, uncovering opportunities, directions, and missions.",
     // image: "https://images.unsplash.com/photo-1490750967868-58cb7506aed6?q=80&w=800&auto=format&fit=crop",
      hoverColor: "#580c1f",
    },
    {
      title: "Create",
      desc: "We coax the invisible into the inevitable, crafting identities and systems to support your growth.",
     // image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      hoverColor: "#3a1c0e",
    },
    {
      title: "Build",
      desc: "We engineer scalable digital products and experiences ready for real-world impact.",
     // image: "https://images.unsplash.com/photo-1462275646964-a0e338679cde?q=80&w=800&auto=format&fit=crop",
      hoverColor: "#6d4c06",
    },
    {
      title: "Grow",
      desc: "We nurture the ecosystem, ensuring continuous evolution and adaptation to the changing landscape.",
    //  image: "https://images.unsplash.com/photo-1490750967868-58cb7506aed6?q=80&w=800&auto=format&fit=crop",
      hoverColor: "#172554",
    },
  ];

 useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".process-card", {
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 80%",
      },
      opacity: 0,
      y: 60,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });

    // --- DRAG-TO-SCROLL LOGIC ---
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.style.cursor = "grabbing";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.style.cursor = "grab";
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.style.cursor = "grab";
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // sensitivity
      container.scrollLeft = scrollLeft - walk;
    });

    return () => ScrollTrigger.killAll();
  }, []);

  const styles = `
    .process-section {
      padding: 1rem 0;
      width: 100vw;
    }

    /* HORIZONTAL SCROLL CONTAINER */
    .scroll-wrapper {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 2rem;
      gap: 1.5rem;
      scroll-behavior: smooth;
      cursor: grab;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .scroll-wrapper::-webkit-scrollbar {
      display: none;
    }

    .process-card {
      flex: 0 0 600px; /* 🔥 Width stays fixed without breaking layout */
      height: 500px;
      background: #f4f4f5;
      border-radius: 1.5rem;
      padding: 2.5rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      transition: background .45s ease, box-shadow .45s ease;
    }

    .process-card:hover {
      background: var(--hover);
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    }

    .process-title {
      font-size: 2rem;
      font-weight: 600;
      transition: color .3s ease;
    }

    .process-card:hover .process-title {
      color: #fff;
    }

    .process-desc {
      font-size: 1rem;
      color: #555;
      transition: color .3s ease;
    }

    .process-card:hover .process-desc {
      color: #eee;
    }

    .process-image-wrapper {
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .process-img {
      height: 100%;
      object-fit: contain;
      mix-blend-mode: multiply;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="process-section" ref={sectionRef}>
        <div className="container">
          <div className="scroll-wrapper" ref={scrollRef}>
            {steps.map((step, i) => (
              <div key={i} className="process-card" style={{ "--hover": step.hoverColor } as React.CSSProperties}>
                <div>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-desc">{step.desc}</p>
                </div>
                <div className="process-image-wrapper">
                  {/* <img src={step.image} alt={step.title} className="process-img" /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}