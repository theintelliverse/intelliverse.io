"use client";

import { useState, useEffect } from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Estimator from "@/components/sections/Estimator";
import Team from "@/components/sections/Team";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Chatbot from "@/components/ui/Chatbot";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/sections/Footer";

export default function ClientHome({ initialData }) {
  // Content Data State
  const [contentData, setContentData] = useState({
    hero: initialData?.hero || null,
    about: initialData?.about || null,
    contact: initialData?.contact || null,
    stats: initialData?.stats || {
      projects: 2,
      satisfaction: 100,
      clients: 15,
    },
    estimator: initialData?.estimator || null,
  });

  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [projects, setProjects] = useState(initialData?.projects || []);
  const [caseStudies, setCaseStudies] = useState(initialData?.caseStudies || []);
  const [founders, setFounders] = useState(initialData?.founders || []);

  // Fetch updated content if API is available
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
              contact: data.contact || null,
              stats: data.stats || { projects: 2, satisfaction: 100, clients: 15 },
              estimator: data.estimator || null,
            });
            if (data.testimonials) setTestimonials(data.testimonials);
            if (data.projects) setProjects(data.projects);
            if (data.caseStudies) setCaseStudies(data.caseStudies);
            if (data.founders) setFounders(data.founders);
          }
        }
      } catch {
        // Silently fallback to static defaults
      }
    };
    fetchContent();
  }, []);

  return (
    <>
      {/* Editorial Preloader */}
      <Preloader />

      {/* Subtle Analog Film Grain */}
      <div className="film-grain" />

      {/* Navigation Header */}
      <Header />

      <main id="main-content">
        {/* 01 / Hero */}
        <Hero data={contentData.hero} />

        {/* 01 / Manifesto & Context */}
        <About data={contentData.about} />

        {/* 02 / Philosophy: Single Service · Multi-Service · Complete Partner */}
        <Philosophy />

        {/* 03 / Services: 4 Core Pillars */}
        <Services />

        {/* 04 / Works & Sketchbook (ThreeUI exact MengToSketchbookLandingPage + Case Studies) */}
        <Projects data={projects} caseStudies={caseStudies} />

        {/* 05 / Process: The Build Flywheel */}
        <Process />

        {/* 06 / Project Scope & Budget Estimator */}
        <Estimator data={contentData.estimator} />

        {/* 07 / Team & Leadership (Hidden if no team data provided) */}
        {founders && founders.length > 0 && <Team data={founders} />}

        {/* 08 / Metrics (Render numbers from database/content) */}
        {contentData?.stats && (
          <Stats data={contentData.stats} />
        )}

        {/* 09 / Client Endorsements */}
        <Testimonials data={testimonials} />

        {/* 10 / Direct Inquiries (Contact Form & Direct Channels) */}
        <Contact data={contentData.contact} />
      </main>

      {/* Editorial Colophon & Footer */}
      <Footer data={contentData.contact} />

      {/* Interactive Floating Chatbot */}
      <Chatbot />

      {/* Scroll Progress & Back to Top */}
      <ScrollProgress />
    </>
  );
}
