"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProcessSection() {
  const sectionRef = useRef(null);
  
  const steps = [
    {
      title: 'Think',
      desc: 'We read the soil to find where ideas take root, uncovering opportunities, directions, and missions.',
      image: 'https://images.unsplash.com/photo-1490750967868-58cb7506aed6?q=80&w=800&auto=format&fit=crop', // Flower Bud
      alt: 'Flower bud representing the thinking phase',
      hoverColor: '#580c1f' // Deep Wine Red
    },
    {
      title: 'Create',
      desc: 'We coax the invisible into the inevitable, crafting identities and systems to support your growth.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', // Opening Flower
      alt: 'Opening flower representing creation',
      hoverColor: '#3a1c0e' // Deep Earthy Brown
    },
    {
      title: 'Build',
      desc: 'We engineer scalable digital products and experiences ready for real-world impact.',
      image: 'https://images.unsplash.com/photo-1462275646964-a0e338679cde?q=80&w=800&auto=format&fit=crop', // Full Bloom
      alt: 'Full bloom flower representing the build phase',
      hoverColor: '#6d4c06' // Deep Golden Bronze
    },
    {
      title: 'Grow',
      desc: 'We nurture the ecosystem, ensuring continuous evolution and adaptation to the changing landscape.',
      image: 'https://images.unsplash.com/photo-1490750967868-58cb7506aed6?q=80&w=800&auto=format&fit=crop', // Flower Bud (Reused for symmetry)
      alt: 'Flower bud representing the growth phase',
      hoverColor: '#172554' // Deep Navy Blue
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate Cards Sliding In (Symmetric Slider Effect)
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 85%", // Starts when top of section hits 85% of viewport
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out" // Super smooth ease
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const styles = `
    /* --- PROCESS SECTION --- */
    .process-section {
      padding: 8rem 0;
      background-color: #ffffff;
      overflow: hidden;
    }

    .process-grid {
      display: grid;
      /* Default to single column on mobile */
      grid-template-columns: 1fr;
      gap: 1.5rem;
      width: 100%;
    }

    /* Tablet: 2 columns */
    @media (min-width: 640px) {
      .process-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Desktop: All in one row (4 columns) for Symmetry */
    @media (min-width: 1024px) {
      .process-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .process-card {
      background-color: #f9fafb; /* Default Light Grey */
      border-radius: 1.5rem;
      padding: 2.5rem;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* Ensures equal height in grid */
      height: 100%;
      min-height: 500px;
      overflow: hidden;
      opacity: 1;
      cursor: default;
      position: relative;
      
      /* Super Smooth Transitions */
      transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                  transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                  box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* --- HOVER EFFECTS (Dynamic Color) --- */
    .process-card:hover {
      /* Uses CSS variable set inline */
      background-color: var(--card-hover-color);
      transform: translateY(-12px);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
    }

    .process-content {
      margin-bottom: 3rem;
    }

    .process-title {
      font-size: 1.75rem;
      font-weight: 500;
      color: #18181b;
      margin-bottom: 1rem;
      font-family: var(--font-sans);
      letter-spacing: -0.02em;
      transition: color 0.4s ease;
    }

    .process-desc {
      font-size: 1.05rem;
      color: #71717a;
      line-height: 1.6;
      max-width: 90%;
      transition: color 0.4s ease;
    }

    /* Hover Text Revert */
    .process-card:hover .process-title {
      color: #ffffff;
    }

    .process-card:hover .process-desc {
      color: rgba(255, 255, 255, 0.85);
    }

    .process-image-wrapper {
      width: 100%;
      height: 300px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .process-img {
      width: auto;
      height: 100%;
      max-width: 100%;
      object-fit: contain;
      /* Blend mode to handle white backgrounds on images */
      mix-blend-mode: multiply; 
      filter: contrast(1.1) saturate(0.9);
      transition: filter 0.5s ease;
    }

    /* Adjust image brightness on dark hover to keep it visible */
    .process-card:hover .process-img {
      filter: contrast(1.2) brightness(1.2) saturate(1.1);
      /* Remove blend mode on dark background so image pops */
      mix-blend-mode: normal; 
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="process-section" ref={sectionRef}>
        <div className="container">
          <div className="process-grid">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="process-card"
                style={{ '--card-hover-color': step.hoverColor } as React.CSSProperties}
              >
                <div className="process-content">
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-desc">{step.desc}</p>
                </div>
                <div className="process-image-wrapper">
                  <img 
                    src={step.image} 
                    alt={step.alt} 
                    className="process-img"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}