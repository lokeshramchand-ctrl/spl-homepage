"use client";

import { useEffect, useRef, useState } from "react";
import { ScrambleText, RevealWords } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const SLIDES = [
  {
    id: "launch",
    nav: "Launch",
    title: "Launch your product & win early traction",
    cards: [
      { num: "01", title: "Design prototype", desc: "Test product ideas fast with clickable user journeys and visual flows.", href: "/service/design-prototype", video: "Design-prototype.mp4" },
      { num: "02", title: "Product discovery", desc: "Map out key features, user flows, and architecture to align your team and reduce risks.", href: "/service/product-discovery", video: "Product-discovery.mp4" },
      { num: "03", title: "Rapid mvp development", desc: "Get your MVP 50% faster with lean sprints and pre-built frameworks.", href: "/service/rapid-mvp-development", video: "compressed-video-2.mp4" },
      { num: "04", title: "Custom mvp development", desc: "Expand your prototype into a fully functional, production-ready product.", href: "/service/custom-mvp-software-development", video: "Custom-MVP-development.mp4" },
    ],
  },
  {
    id: "evolve",
    nav: "Evolve",
    title: "Your product outgrew its first version",
    cards: [
      { num: "01", title: "Ux audit", desc: "Identify usability bottlenecks, improve engagement, and optimize for conversions.", href: "/service/ux-design-audit", video: "UX-audit.mp4" },
      { num: "02", title: "Product redesign", desc: "Upgrade legacy interfaces with scalable, business-driven UX and UI from a top-notch design agency.", href: "/service/product-redesign", video: "cab5f51f-a135-4777-8895-398644445757.mp4" },
      { num: "03", title: "Web development", desc: "Custom web solutions, from complex platforms to interactive dashboards and scalable SaaS products, designed to boost functionality and drive growth.", href: "/service/web-development-services", video: "tinyvid_optimized_4_273c0b39593e094d9f8cc0a654963dd3.mp4" },
      { num: "04", title: "Mobile app development", desc: "End-to-end development of mobile applications for iOS and Android.", href: "/service/mobile-app-development-services", video: "tinyvid_optimized_3_991b1abdaf86fca5400630dcdf446984.mp4" },
    ],
  },
  {
    id: "rebrand",
    nav: "Rebrand",
    title: "Your brand fell behind your business",
    cards: [
      { num: "01", title: "Branding", desc: "Develop a brand that resonates — visually, emotionally, and strategically.", href: "/service/branding-and-identity-services", video: "Branding.mp4" },
      { num: "02", title: "Website design services", desc: "Custom website layouts and UX/UI strategies to improve engagement and conversions.", href: "/service/website-design-services", video: "tinyvid_optimized_2_e4513defad5093e0e45118e3a5a4b727.mp4" },
      { num: "03", title: "Website redesign", desc: "Modernize your web presence with a digital product design agency that drives engagement and brand authority.", href: "/service/website-redesign-services", video: "Website-redesign.mp4" },
      { num: "04", title: "Website development", desc: "Launch a fast, scalable site that converts and supports product growth.", href: "/service/website-development-agency", video: "Website-development.mp4" },
    ],
  },
  {
    id: "extend",
    nav: "Extend",
    title: "Senior hands, without the hiring cycle",
    cards: [
      { num: "01", title: "Team extension", desc: "Instantly scale with dedicated designers and developers ready to start.", href: "/service/team-extension", video: "Team-extension.mp4" },
      { num: "02", title: "Dedicated team", desc: "Access a team of experts to fuel your product's growth.", href: "/service/dedicated-software-development-team", video: "Dedicated-team.mp4" },
    ],
  },
];

export function ServicesAccordion() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rounded-[40px] bg-[#080d10] py-24 text-white sm:rounded-[64px] sm:py-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="End-to-End Product Design and Development Agency Services"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-white/60"
        />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight sm:text-5xl">
          <RevealWords text="From first prototype to full reinvention." />
        </h2>
        <p className="font-body mt-6 max-w-[706px] text-lg text-white/70">
          Great products don&apos;t happen by accident. As a digital product design and development agency, we
          partner with venture-backed startups and established market leaders alike, combining product strategy,
          UX/UI design, and scalable web and mobile development under one roof.
        </p>

        <div className="mt-16 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="hidden lg:sticky lg:top-32 lg:flex lg:w-[180px] lg:shrink-0 lg:flex-col">
            <ul className="flex flex-col gap-1">
              {SLIDES.map((slide, i) => (
                <li key={slide.id}>
                  <a
                    href={`#${slide.id}`}
                    className="block text-xl transition-colors"
                    style={{ color: active === i ? "#fff" : "rgba(255,255,255,0.4)" }}
                  >
                    {slide.nav}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/services" variant="orange">
                Explore all
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-24 lg:w-[75%]">
            {SLIDES.map((slide, i) => (
              <div key={slide.id} id={slide.id} ref={(el) => { refs.current[i] = el; }}>
                <h3 className="px-2 text-2xl font-medium sm:text-4xl">
                  <RevealWords text={slide.title} />
                </h3>
                <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
                  {slide.cards.map((card) => (
                    <a key={card.title} href={card.href} className="group flex flex-col bg-[#080d10] p-8 hover:bg-white/[0.03]">
                      <span className="hidden text-sm text-white/30 sm:block">{card.num}</span>
                      <video
                        className="mt-2 w-full rounded-xl"
                        src={`${ASSET}/videos/${card.video}`}
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                      <div className="mt-12">
                        <div className="text-base font-medium">{card.title}</div>
                        <p className="font-body mt-2 text-sm text-white/60">{card.desc}</p>
                      </div>
                      <div className="mt-8">
                        <span className="font-body inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#080d10]">
                          Explore
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <Button href="/services" variant="orange" className="w-full">
            Explore all
          </Button>
        </div>
      </div>
    </section>
  );
}
