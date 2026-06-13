"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Hero({ data }) {
  const typedEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: ["Welcome to The Intelliverse", "Innovation, Create and Grow", "Your Digital Partner"],
      typeSpeed: 51,
      backSpeed: 25,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <h1
        className="hero-background-text text-4xl md:text-6xl lg:text-8xl whitespace-nowrap"
        style={{ fontSize: "min(8vw, 8rem)" }}
        aria-hidden="true"
      >
        The Intelliverse
      </h1>
      <div className="container mx-auto px-6 text-center hero-content">
        <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold mb-4">
          <span ref={typedEl}></span>
        </h1>
        <p id="hero-subtitle" className="text-lg md:text-xl text-gray-300 mb-8">
          {data.subtitle}
        </p>
        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, "contact")}
          className="themed-accent themed-accent-hover text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 inline-block animated-button cursor-pointer"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
