"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const styles = `
    .process-section {
      padding: 8rem 0;
      background: white;
    }

    .process-grid {
      display: grid;
      gap: 2rem;
      width: 100%;
    }

    @media (min-width: 640px) {
      .process-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .process-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    /* --- UNIFORM CARD --- */
    .process-card {
      background: #f9fafb;
      border-radius: 1.75rem;
      padding: 2.5rem;
      min-height: 600px;  /* 🔥 Fixed Size */
      min-width: 600px;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      transition: background .45s ease, box-shadow .45s ease;
      cursor: pointer;
    }

    .process-card:hover {
      background: var(--hover);
      box-shadow: 0 20px 50px rgba(0,0,0,0.25);
    }

    .process-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      transition: color .4s ease;
    }

    .process-card:hover .process-title {
      color: #ffffff;
    }

    .process-desc {
      font-size: 1.125rem;
      line-height: 1.7;
      color: #676767;
      max-width: 90%;
      transition: color .4s ease;
    }

    .process-card:hover .process-desc {
      color: rgba(255,255,255,0.85);
    }

    .process-image-wrapper {
      width: 100%;
      height: 260px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .process-img {
      height: 100%;
      object-fit: contain;
      mix-blend-mode: multiply;
      transition: filter .4s ease;
    }

    .process-card:hover .process-img {
      mix-blend-mode: normal;
      filter: brightness(1.2) contrast(1.15);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="process-section" ref={sectionRef}>
        <div className="container">
          <div className="process-grid">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-card"
                style={{ '--hover': step.hoverColor } as React.CSSProperties}
              >
                <div>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-desc">{step.desc}</p>
                </div>

                <div className="process-image-wrapper">
                  <img src={step.image} className="process-img" alt={step.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
