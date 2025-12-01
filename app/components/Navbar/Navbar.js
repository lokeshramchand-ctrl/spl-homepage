"use client";

import { useEffect } from "react";

export default function NavbarScript() {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return null; // nothing to render, script only
}
