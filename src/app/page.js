"use client";

import { useState, useEffect } from "react";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

export default function Home() {
  // --- Content Data State (Modifiable by Admin Panel) ---
  const [contentData, setContentData] = useState({
    hero: {
      subtitle: "Your one-stop solution for software development, web development, and IT services."
    },
    about: {
      p1: "The Intelliverse is a dynamic software development company dedicated to providing innovative solutions. We specialize in web development, mobile applications, and comprehensive IT services that empower businesses to thrive in the digital age."
    },
    stats: {
      projects: 50,
      satisfaction: 100,
      clients: 30
    }
  });

  // --- Dynamic Lists States ---
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);

  // --- Preloader Loading States ---
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  // --- Fetch Initial Content from DB ---
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          if (data.hero && data.about) {
            setContentData({
              hero: data.hero,
              about: data.about,
              stats: data.stats || { projects: 50, satisfaction: 100, clients: 30 }
            });
            if (data.testimonials) setTestimonials(data.testimonials);
            if (data.projects) setProjects(data.projects);
          }
        }
      } catch (error) {
        console.error("Failed to load initial page content:", error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      const timer = setTimeout(() => setShowPreloader(false), 500);
      return () => clearTimeout(timer);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const fallback = setTimeout(handleLoad, 1500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);


  // --- Scroll Reveal Animation initialization for component triggers ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [projects]);

  return (
    <>
      {/* Preloader */}
      {showPreloader && (
        <div id="preloader" className={loading ? "" : "hidden"}>
          <div className="preloader-content">
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="The Intelliverse Logo Loading"
              className="preloader-logo"
            />
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Background (Particles + Images) */}
      <Background />

      {/* Navigation Header */}
      <Header />

      <main>
        {/* Hero Banner Section */}
        <Hero data={contentData.hero} />

        {/* About Info Section */}
        <About data={contentData.about} />

        {/* Services Showcase Section */}
        <Services />

        {/* Team Founders Section */}
        <Team />

        {/* Dynamic Worked Projects Portfolio (Hides if empty) */}
        <Projects data={projects} />

        {/* Statistics Numbers Section */}
        <Stats data={contentData.stats} />

        {/* Client Reviews Section */}
        <Testimonials data={testimonials} />

        {/* Contact Submission & Address Section */}
        <Contact />

      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Floating AI Assistant Chatbot */}
      <Chatbot />

      {/* Scroll to top action bubble */}
      <ScrollToTop />
    </>
  );
}
