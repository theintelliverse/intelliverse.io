"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function Background() {
  const particlesInitRef = useRef(false);

  const initParticles = () => {
    if (particlesInitRef.current) return;
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        "particles": {
          "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#ffffff" },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.5, "random": false },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
          "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
          "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
      });
      particlesInitRef.current = true;
    }
  };

  useEffect(() => {
    if (window.particlesJS) {
      initParticles();
    }
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={initParticles}
      />
      <div id="persistent-bg">
        <div className="hero-background"></div>
        <div id="particles-js"></div>
      </div>
    </>
  );
}
