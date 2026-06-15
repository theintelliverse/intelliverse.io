"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Background3D from "@/components/ui/Background3D";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Chatbot from "@/components/ui/Chatbot";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function TermsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  // Initialize audio triggers on interaction
  useEffect(() => {
    const handleInteraction = () => {
            window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const playHover = () => {};

  const playClick = () => {};

  const toggleAccordion = (index) => {
    playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: "fa-signature",
      content: (
        <div className="space-y-3">
          <p>
            By accessing or using the services, websites, or custom software solutions provided by <strong>The Intelliverse</strong>, you agree to comply with and be bound by these Terms & Conditions.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Eligibility:</strong> You must be at least 18 years of age or possess the legal authority to represent your organization to enter into this agreement.</li>
            <li><strong>Account Security:</strong> Using our systems implies that you accept all legal liabilities regarding user accounts and keys registered under your domain.</li>
            <li><strong>Discontinuation:</strong> If you disagree with any portion of these conditions, please terminate all active connections and access immediately.</li>
          </ul>
        </div>
      )
    },
    {
      title: "2. Scope of Custom Tech Services",
      icon: "fa-laptop-code",
      content: (
        <div className="space-y-3">
          <p>
            The Intelliverse delivers specialized software engineering, full-stack web development, and digital consulting services.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Milestones:</strong> Project deliverables are divided into structured sprints or milestones outlined in a custom Statement of Work (SOW).</li>
            <li><strong>Revisions:</strong> A fixed number of feedback revision rounds (typically 2-3 per milestone) are included. Scope extensions are handled via change request agreements.</li>
            <li><strong>Third-Party Integrations:</strong> API keys, server hosting fees, and subscription fees for platforms (e.g. AWS, Vercel, Stripe) are paid directly by the client.</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Intellectual Property Rights",
      icon: "fa-copyright",
      content: (
        <div className="space-y-3">
          <p>
            We maintain strict protocols regarding the ownership of source code, designs, and intellectual assets.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Client Ownership:</strong> Upon full and final settlement of all milestone payments, the client receives exclusive, perpetual, unrestricted rights to the custom source code and assets delivered.</li>
            <li><strong>Pre-existing Code:</strong> Pre-existing frameworks, design modules, or library utilities owned by The Intelliverse remain our property but are licensed to you perpetually for use within the application.</li>
            <li><strong>Portfolio Use:</strong> The Intelliverse reserves the right to display screen mockups and link live versions of completed projects for portfolio marketing purposes, unless a strict NDA forbids it.</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. Payments, Milestone Billing & Refunds",
      icon: "fa-credit-card",
      content: (
        <div className="space-y-3">
          <p>
            Our financial agreements are structured to ensure mutual progress and resource allocation.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Deposit:</strong> A non-refundable setup deposit is required to kick off project scheduling and UI design.</li>
            <li><strong>Late Fees:</strong> Invoices not settled within 7 business days are subject to a late interest fee of 1.5% per month.</li>
            <li><strong>Suspension:</strong> Delaying payments beyond 14 days will lead to automatic system suspension and freeze of active staging instances.</li>
            <li><strong>Refunds:</strong> Refund requests for completed milestones are not accepted. Disputed milestones must be submitted in writing within 5 days of delivery.</li>
          </ul>
        </div>
      )
    },
    {
      title: "5. Confidentiality & NDAs",
      icon: "fa-user-shield",
      content: (
        <div className="space-y-3">
          <p>
            We enforce strict security and privacy policies to protect your intellectual assets and trade secrets.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Mutual Non-Disclosure:</strong> Both parties agree to protect proprietary source code, database structures, business models, and user data.</li>
            <li><strong>Data Storage:</strong> Client data hosted on development staging servers is securely purged within 30 days of production launch.</li>
            <li><strong>GDPR/CCPA:</strong> For applications collecting consumer data, clients are solely responsible for publishing compliant privacy policies on their production portals.</li>
          </ul>
        </div>
      )
    },
    {
      title: "6. Warranty & System Support",
      icon: "fa-bug",
      content: (
        <div className="space-y-3">
          <p>
            We back our software with quality assurances and structured maintenance agreements.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Warranty Window:</strong> We offer a 30-day post-launch warranty period to resolve any system bugs or functional deviations from the signed SOW free of charge.</li>
            <li><strong>Exclusions:</strong> Warranty is void if the source code is modified by third-party developers, or if server environments are altered without our supervision.</li>
            <li><strong>Maintenance:</strong> Ongoing server maintenance, security patching, and core framework updates are covered under separate monthly retainer packages.</li>
          </ul>
        </div>
      )
    },
    {
      title: "7. Limitations of Liability",
      icon: "fa-gavel",
      content: (
        <div className="space-y-3">
          <p>
            Our legal liabilities are capped to minimize operational risk.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Service Outages:</strong> The Intelliverse is not liable for business interruptions, loss of revenue, or service outages caused by third-party hosting partners (e.g., AWS, GCP, Vercel).</li>
            <li><strong>Liability Cap:</strong> Our total aggregate liability for any claims, actions, or damages under any agreement shall not exceed the total amounts actually paid by you to us in the preceding six (6) months.</li>
          </ul>
        </div>
      )
    },
    {
      title: "8. Dispute Resolution & Jurisdiction",
      icon: "fa-scale-balanced",
      content: (
        <div className="space-y-3">
          <p>
            We prioritize amicable collaboration, but establish formal channels if disputes arise.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Negotiation:</strong> Both parties agree to attempt to resolve disputes through good-faith executive discussion for at least 30 days before initiating litigation.</li>
            <li><strong>Arbitration:</strong> Unresolved disputes will be submitted to binding arbitration in Ahmedabad, Gujarat, India, under the Indian Arbitration and Conciliation Act.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <>
      {/* 3D WebGL Background */}
      <Background3D />

      {/* Cinematic Film Grain Overlay */}
      <div className="film-grain" />

      {/* Header Navigation */}
      <Header />

      <main className="min-h-screen relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Main Card */}
          <div className="bg-[#0c061d]/75 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tighter mb-2">
                  Terms & Conditions
                </h1>
                <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
                  LAST UPDATED // JUNE 13, 2026
                </p>
              </div>
              <div>
                <Link
                  href="/"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] px-4 py-2 rounded-full duration-300"
                >
                  <i className="fas fa-arrow-left text-[9px]"></i>
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Welcome to <strong>The Intelliverse</strong>. These Terms & Conditions define the agreement between our software development agency and our clients/users. Click on any section below to expand and view the detailed policies.
            </p>

            {/* Interactive Accordion Layout */}
            <div className="space-y-4">
              {sections.map((section, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
                      isOpen
                        ? "border-indigo-500/40 bg-[#05020c]/60 shadow-lg shadow-indigo-500/[0.02]"
                        : "border-white/5 bg-[#05020c]/20 hover:border-white/10"
                    }`}
                  >
                    {/* Header Button */}
                    <button
                      onClick={() => toggleAccordion(idx)}
                      onMouseEnter={playHover}
                      className="w-full flex items-center justify-between p-5 text-left font-mono font-bold text-sm sm:text-base text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <i className={`fas ${isOpen ? "text-indigo-400" : "text-gray-500"} ${section.icon} w-5 text-center transition-colors duration-300`} aria-hidden="true"></i>
                        <span>{section.title.toUpperCase()}</span>
                      </div>
                      <i
                        className={`fas fa-chevron-down text-xs text-gray-500 transition-transform duration-500 ${
                          isOpen ? "transform rotate-180 text-indigo-400" : ""
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>

                    {/* Content Section */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-white/5 text-gray-300 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                            {section.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Signature Line */}
            <div className="border-t border-white/10 pt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center">
              <span>THE INTELLIVERSE // LEGAL COMPLIANCE</span>
              <span>SECURED SYSTEM // ACTIVE</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Chatbot */}
      <Chatbot />

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Custom Cursor */}
      <CustomCursor />
    </>
  );
}
