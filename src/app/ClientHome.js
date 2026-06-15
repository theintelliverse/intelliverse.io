"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Background3D from "@/components/ui/Background3D";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Chatbot from "@/components/ui/Chatbot";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Footer from "@/components/sections/Footer";

export default function ClientHome({ initialData }) {
  const { scrollY } = useScroll();
  const letterboxYTop = useTransform(scrollY, [0, 200], [-20, 0]);
  const letterboxYBottom = useTransform(scrollY, [0, 200], [20, 0]);

  // --- Content Data State (Modifiable by Admin Panel) ---
  const [contentData, setContentData] = useState({
    hero: initialData?.hero || {
      subtitle: "Your one-stop solution for software development, web development, and IT services."
    },
    about: initialData?.about || {
      p1: "The Intelliverse is a dynamic software development company dedicated to providing innovative solutions. We specialize in web development, mobile applications, and comprehensive IT services that empower businesses to thrive in the digital age."
    },
    stats: initialData?.stats || {
      projects: 50,
      satisfaction: 100,
      clients: 30
    }
  });

  // --- Dynamic Lists States ---
  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [projects, setProjects] = useState(initialData?.projects || []);
  const [founders, setFounders] = useState(initialData?.founders || []);

  // --- Preloader Loading States ---
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  // --- Fetch Content from DB (in background to keep sync) ---
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
            if (data.founders) setFounders(data.founders);
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
      // Play cinematic preloader exit swell/chime
            const timer = setTimeout(() => setShowPreloader(false), 900);
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

  // --- Initialize Audio Context on First Interaction ---
  

  return (
    <>
      {/* Preloader */}
      {showPreloader && (
        <div id="preloader" className={loading ? "" : "hidden"}>
          <div className="preloader-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* Persistent 3D WebGL Background (Particles + Wave Shaders) */}
      <Background3D />

      {/* Cinematic Film Grain Overlay */}
      <div className="film-grain" />

      {/* Navigation Header */}
      <Header />

      <main>
        {/* Hero Banner Section */}
        <Hero data={contentData.hero} />

        {/* About Info Section */}
        <About data={contentData.about} />

        {/* Seamless Running Marquee Banner */}
        <div className="py-6 border-y border-white/5 bg-[#080415]/30 overflow-hidden whitespace-nowrap flex select-none pointer-events-none relative z-10">
          <div className="flex gap-12 text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-indigo-400/20 animate-marquee">
            <span>{"// "}Innovation</span>
            <span>{"// "}Create</span>
            <span>{"// "}Grow</span>
            <span>{"// "}Software Engineering</span>
            <span>{"// "}Web Applications</span>
            <span>{"// "}IT Infrastructure</span>
            <span>{"// "}DevOps Pipelines</span>
            <span>{"// "}Cloud Architectures</span>
            {/* Repeat for seamless loop */}
            <span>{"// "}Innovation</span>
            <span>{"// "}Create</span>
            <span>{"// "}Grow</span>
            <span>{"// "}Software Engineering</span>
            <span>{"// "}Web Applications</span>
            <span>{"// "}IT Infrastructure</span>
            <span>{"// "}DevOps Pipelines</span>
            <span>{"// "}Cloud Architectures</span>
          </div>
        </div>

        {/* Services Showcase Section */}
        <Services />

        {/* Team Founders Section */}
        <Team data={founders} />

        {/* Dynamic Worked Projects Portfolio (Hides if empty) */}
        <Projects data={projects} />

        {/* Statistics Numbers Section (Hides if no projects) */}
        {projects.length > 0 && (
          <Stats
            data={{
              projects: projects.length,
              satisfaction: Math.round(
                (projects.reduce((sum, p) => sum + (Number(p.rating) || 5), 0) / (projects.length * 5)) * 100
              ),
              clients: testimonials.length
            }}
          />
        )}

        {/* Client Reviews Section (Hides if empty) */}
        {testimonials.length > 0 && (
          <Testimonials data={testimonials} />
        )}

        {/* Contact Submission & Address Section */}
        <Contact />

      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Floating AI Assistant Chatbot */}
      <Chatbot />

      {/* Scroll to top action bubble */}
      <ScrollToTop />

      {/* Custom Trailing Glow Cursor on Desktop */}
      <CustomCursor />

      {/* Cinematic Widescreen Letterbox Frames (Movie Frame Transition on Scroll) */}
      <motion.div
        style={{ height: "20px", y: letterboxYTop }}
        className="fixed top-0 left-0 right-0 bg-[#05020c] z-[99] border-b border-white/5 pointer-events-none flex items-center justify-between px-6 overflow-hidden select-none"
      >
        <span className="text-[8px] font-mono tracking-widest text-red-500 animate-pulse flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> REC
        </span>
        <span className="text-[8px] font-mono tracking-widest text-gray-500">
          24 FPS • 1.85:1
        </span>
      </motion.div>
      <motion.div
        style={{ height: "20px", y: letterboxYBottom }}
        className="fixed bottom-0 left-0 right-0 bg-[#05020c] z-[99] border-t border-white/5 pointer-events-none flex items-center justify-between px-6 overflow-hidden select-none"
      >
        <span className="text-[8px] font-mono tracking-widest text-gray-500">
          SHUTTER 180°
        </span>
        <span className="text-[8px] font-mono tracking-widest text-gray-500">
          INTELLIVERSE_CAM_A
        </span>
      </motion.div>
    </>
  );
}
