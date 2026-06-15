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

export default function PrivacyPage() {
  const [openIndex, setOpenIndex] = useState(0);

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
      title: "1. Information We Collect",
      icon: "fa-database",
      content: (
        <div className="space-y-3">
          <p>
            When you interact with <strong>The Intelliverse</strong> — through our website, contact forms, or services — we may collect the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Personal Identifiers:</strong> Full name, email address, phone number, and organization name submitted via contact or onboarding forms.</li>
            <li><strong>Usage Data:</strong> Browser type, IP address, device type, pages visited, session duration, and referral URLs — collected automatically via analytics tools.</li>
            <li><strong>Project Data:</strong> Technical requirements, uploaded files, or documents shared during the scope definition or consultation process.</li>
            <li><strong>Communication Records:</strong> Emails, chat transcripts, or messages exchanged through our support channels or AI Chatbot.</li>
            <li><strong>Payment Metadata:</strong> We do not store full card numbers. Only payment confirmation metadata (e.g., invoice IDs) is retained.</li>
          </ul>
        </div>
      )
    },
    {
      title: "2. How We Use Your Information",
      icon: "fa-cogs",
      content: (
        <div className="space-y-3">
          <p>
            The information we collect is used exclusively for legitimate operational and business purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Service Delivery:</strong> To scope, build, and deliver software products and digital solutions tailored to your requirements.</li>
            <li><strong>Communication:</strong> To respond to inquiries, provide project updates, and send relevant technical information.</li>
            <li><strong>Improvement:</strong> To analyze usage patterns and improve our website, services, and AI-powered tools.</li>
            <li><strong>Legal Compliance:</strong> To meet regulatory obligations including invoicing, taxation, and dispute resolution requirements.</li>
            <li><strong>Marketing (Opt-in only):</strong> With your explicit consent, we may send newsletters or case study updates. You can opt out anytime.</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Data Sharing & Third Parties",
      icon: "fa-share-nodes",
      content: (
        <div className="space-y-3">
          <p>
            We do not sell, trade, or rent your personal data. However, we may share limited information with trusted third parties under these conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Infrastructure Partners:</strong> Hosting providers (e.g., Vercel, AWS, GCP) that process data solely to operate our services under strict data processing agreements.</li>
            <li><strong>Analytics Tools:</strong> Anonymized aggregated data may be shared with analytics platforms (e.g., Google Analytics) to understand user behavior.</li>
            <li><strong>Payment Processors:</strong> Secure payment gateways process billing information independently under their own privacy frameworks.</li>
            <li><strong>Legal Requirements:</strong> We may disclose data when required by law, court order, or government authority with documented legal basis.</li>
            <li><strong>Business Transitions:</strong> In the event of a merger or acquisition, user data may be transferred as part of business assets with prior notification.</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. Cookies & Tracking Technologies",
      icon: "fa-cookie-bite",
      content: (
        <div className="space-y-3">
          <p>
            Our website uses cookies and similar tracking technologies to enhance your browsing experience:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Essential Cookies:</strong> Required for core functionality such as session management and security. Cannot be disabled.</li>
            <li><strong>Analytics Cookies:</strong> Track how users interact with our site to help us optimize layouts and content. Can be disabled via browser settings.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings (e.g., audio state, theme) across sessions.</li>
            <li><strong>Third-Party Cookies:</strong> Embedded content (e.g., maps, widgets) may set their own cookies governed by their providers&apos; policies.</li>
          </ul>
          <p className="text-gray-400">
            You can manage cookie preferences through your browser settings. Disabling certain cookies may limit functionality of some features.
          </p>
        </div>
      )
    },
    {
      title: "5. Data Storage & Security",
      icon: "fa-shield-halved",
      content: (
        <div className="space-y-3">
          <p>
            We implement robust, industry-standard technical and organizational measures to protect your data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers is encrypted using TLS 1.3 protocols (HTTPS).</li>
            <li><strong>Encryption at Rest:</strong> Sensitive records stored in our databases are encrypted using AES-256.</li>
            <li><strong>Access Controls:</strong> Internal access to personally identifiable information is restricted to authorized personnel on a need-to-know basis.</li>
            <li><strong>Retention Period:</strong> Client project data is retained for a maximum of 24 months post-project completion, after which it is securely purged unless legal retention is required.</li>
            <li><strong>Breach Notification:</strong> In the unlikely event of a data breach affecting your information, we will notify you within 72 hours of discovery.</li>
          </ul>
        </div>
      )
    },
    {
      title: "6. Your Rights (GDPR / Data Subject Rights)",
      icon: "fa-person-circle-check",
      content: (
        <div className="space-y-3">
          <p>
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data (&quot;Right to be Forgotten&quot;), subject to legal retention obligations.</li>
            <li><strong>Right to Restriction:</strong> Request that we restrict how we process your data in certain circumstances.</li>
            <li><strong>Right to Portability:</strong> Receive your data in a structured, machine-readable format to transfer to another provider.</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests, including direct marketing.</li>
          </ul>
          <p className="text-gray-400">
            To exercise any of these rights, contact us at <span className="text-indigo-400">theintelliverse@gmail.com</span>. We will respond within 30 days.
          </p>
        </div>
      )
    },
    {
      title: "7. Children's Privacy",
      icon: "fa-child",
      content: (
        <div className="space-y-3">
          <p>
            The Intelliverse services are designed for professional and educational use by individuals 13 years of age and older.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>No Intentional Collection:</strong> We do not knowingly collect personal data from children under the age of 13.</li>
            <li><strong>Parental Consent:</strong> Users aged 13–17 should only use our services with verifiable parental or guardian consent.</li>
            <li><strong>Reporting:</strong> If you believe a child has submitted personal data without proper consent, contact us immediately at <span className="text-indigo-400">theintelliverse@gmail.com</span> and we will delete it promptly.</li>
          </ul>
        </div>
      )
    },
    {
      title: "8. Links to External Sites",
      icon: "fa-arrow-up-right-from-square",
      content: (
        <div className="space-y-3">
          <p>
            Our website may contain links to third-party websites, social media platforms, or embedded previews of client projects.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>No Control:</strong> We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.</li>
            <li><strong>Review Policies:</strong> We recommend reviewing the privacy policy of every site you visit.</li>
            <li><strong>Social Embeds:</strong> Social sharing buttons may transmit data to platforms like LinkedIn or Instagram under their respective policies.</li>
          </ul>
        </div>
      )
    },
    {
      title: "9. Changes to This Policy",
      icon: "fa-rotate",
      content: (
        <div className="space-y-3">
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Notification:</strong> Material changes will be communicated via a notice on this page with an updated &quot;Last Revised&quot; date at the top.</li>
            <li><strong>Continued Use:</strong> Your continued use of our services after the effective date of changes constitutes acceptance of the revised policy.</li>
            <li><strong>Version Archive:</strong> Prior versions of this policy are available upon request by contacting our team.</li>
          </ul>
        </div>
      )
    },
    {
      title: "10. Contact & Data Controller",
      icon: "fa-envelope-open-text",
      content: (
        <div className="space-y-3">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2 text-gray-300">
            <li className="flex items-center gap-3">
              <i className="fas fa-building text-indigo-400 w-4 text-center" />
              <span><strong>Organization:</strong> The Intelliverse Tech Community</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-envelope text-indigo-400 w-4 text-center" />
              <span><strong>Email:</strong> <a href="mailto:theintelliverse@gmail.com" className="text-indigo-400 hover:text-white transition-colors">theintelliverse@gmail.com</a></span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fab fa-instagram text-indigo-400 w-4 text-center" />
              <span><strong>Instagram:</strong> <a href="https://www.instagram.com/the_intelliverse/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors">@the_intelliverse</a></span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fab fa-linkedin text-indigo-400 w-4 text-center" />
              <span><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/the-intelliverse/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors">The Intelliverse</a></span>
            </li>
          </ul>
          <p className="text-gray-400 pt-2">
            We aim to respond to all privacy-related queries within <strong className="text-white">30 business days</strong>.
          </p>
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

          {/* Hero Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400 border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 rounded-full mb-6">
              <i className="fas fa-shield-halved text-[9px]" />
              Last Updated // June 13, 2026
            </div>
            <h1
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}
              className="text-4xl sm:text-6xl font-black text-white font-mono uppercase tracking-tighter mb-4"
            >
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              We are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights over it.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-[#0c061d]/75 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white font-mono uppercase tracking-tight mb-1">
                  The Intelliverse — Privacy Policy
                </h2>
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  10 Sections · Effective June 13, 2026
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/terms"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] px-4 py-2 rounded-full duration-300"
                >
                  <i className="fas fa-file-contract text-[9px]" />
                  <span>Terms</span>
                </Link>
                <Link
                  href="/"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] px-4 py-2 rounded-full duration-300"
                >
                  <i className="fas fa-arrow-left text-[9px]" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              At <strong>The Intelliverse</strong>, your privacy is our priority. This Privacy Policy outlines how we collect, process, store, and protect your personal information when you use our website, services, or interact with our team. Click any section below to expand it.
            </p>

            {/* Accordion */}
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
                    <button
                      onClick={() => toggleAccordion(idx)}
                      onMouseEnter={playHover}
                      className="w-full flex items-center justify-between p-5 text-left font-mono font-bold text-sm sm:text-base text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <i
                          className={`fas ${section.icon} w-5 text-center transition-colors duration-300 ${isOpen ? "text-indigo-400" : "text-gray-500"}`}
                          aria-hidden="true"
                        />
                        <span>{section.title.toUpperCase()}</span>
                      </div>
                      <i
                        className={`fas fa-chevron-down text-xs text-gray-500 transition-transform duration-500 ${isOpen ? "rotate-180 text-indigo-400" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

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

            {/* Bottom signature */}
            <div className="border-t border-white/10 pt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center">
              <span>THE INTELLIVERSE // PRIVACY & COMPLIANCE</span>
              <span>SECURED SYSTEM // ACTIVE</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
      <ScrollToTop />
      <CustomCursor />
    </>
  );
}
