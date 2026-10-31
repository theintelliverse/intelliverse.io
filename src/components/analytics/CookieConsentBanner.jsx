"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { allConsentGranted, allConsentDenied } from "@/lib/analytics";

export default function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie_consent");
      if (!stored) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // LocalStorage access restricted; do not display banner
    }

    // Optional event listener to allow re-opening consent settings from footer or privacy page
    const handleReopen = () => setIsOpen(true);
    window.addEventListener("open-cookie-settings", handleReopen);
    return () => window.removeEventListener("open-cookie-settings", handleReopen);
  }, []);

  const handleAcceptAll = () => {
    allConsentGranted();
    setIsOpen(false);
  };

  const handleDeclineAll = () => {
    allConsentDenied();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9999] rounded-2xl p-5 shadow-2xl backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(11, 21, 48, 0.94)",
            border: "1px solid rgba(61, 123, 247, 0.3)",
            boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 30px -10px rgba(61, 123, 247, 0.2)",
          }}
          role="region"
          aria-label="Cookie and Privacy Consent Banner"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 text-sm">
                <i className="fa-solid fa-shield-halved" />
              </span>
              <h3 className="text-sm font-semibold text-white tracking-wide">
                Cookie & Privacy Consent
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
              DPDP Act & GDPR
            </span>
          </div>

          {/* Body Copy */}
          <p className="text-xs text-gray-300/90 leading-relaxed mb-4">
            We use Google Tag Manager and Analytics to evaluate technical site usage, optimize response times, and analyze traffic in compliance with India&apos;s DPDP Act, 2023. You can grant or decline consent at any time.
          </p>

          {/* Links & Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1 border-t border-white/5">
            <Link
              href="/privacy"
              className="text-[11px] text-gray-400 hover:text-blue-300 transition-colors underline underline-offset-2 py-1 text-center sm:text-left"
            >
              Privacy Notice
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDeclineAll}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all cursor-pointer"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
