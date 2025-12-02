"use client";

import { useEffect } from "react";

export default function NavbarScript() {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
        const footer = document.querySelector("#footer");


    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    });
    if (!navbar || !footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navbar.classList.add("hide");
        } else {
          navbar.classList.remove("hide");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => {
      window.removeEventListener("scroll", () => {});
      observer.disconnect();
    };
  }, []);

  return null; // nothing to render, script only
}
