"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formMessage, setFormMessage] = useState({ text: "", type: "" }); // type: 'sending' | 'success' | 'error' | ''

  const handleContactSubmit = async (e) => {
    e.preventDefault();
        setFormMessage({ text: "Sending...", type: "sending" });

    const payload = {
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (response.status === 200) {
         // play nice transition sound on success
        setFormMessage({ text: "Message sent successfully!", type: "success" });
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setFormMessage({ text: json.message || "Something went wrong!", type: "error" });
      }
    } catch (error) {
      setFormMessage({ text: "Something went wrong!", type: "error" });
    }

    setTimeout(() => {
      setFormMessage({ text: "", type: "" });
    }, 5000);
  };

  const playHover = () => {};

  const playClick = () => {};

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section Heading */}
        <ScrollReveal variant="lens-focus" playSound={true}>
          <div className="text-center mb-16">
            <div className="glassmorphic-text-bg">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase text-white font-sans">
                Contact Us
              </h2>
            </div>
            <div className="w-16 h-[2px] bg-blue-500 mx-auto mt-4"></div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Contact Form */}
          <ScrollReveal variant="fade-right" className="md:w-1/2 w-full" delay={0.1}>
            <div>
              <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  onMouseEnter={playHover}
                  placeholder="YOUR NAME"
                  className="w-full p-4 bg-white/[0.02] text-white rounded-xl border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-mono text-xs placeholder:text-gray-400 backdrop-blur-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  onMouseEnter={playHover}
                  placeholder="YOUR EMAIL"
                  className="w-full p-4 bg-white/[0.02] text-white rounded-xl border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-mono text-xs placeholder:text-gray-400 backdrop-blur-md"
                  required
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  onMouseEnter={playHover}
                  placeholder="YOUR MESSAGE"
                  rows="5"
                  className="w-full p-4 bg-white/[0.02] text-white rounded-xl border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-mono text-xs placeholder:text-gray-400 backdrop-blur-md"
                  required
                ></textarea>
                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="w-full group relative py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
                >
                  {/* Sliding hover fill */}
                  <span className="absolute inset-0 w-full h-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
                  Send Message
                </button>
              </form>
              {formMessage.text && (
                <div
                  id="form-message"
                  className={`mt-4 text-center font-mono text-xs uppercase tracking-widest ${
                    formMessage.type === "success"
                      ? "text-green-400"
                      : formMessage.type === "error"
                      ? "text-rose-400"
                      : "text-gray-400"
                  }`}
                >
                  {"// "}{formMessage.text}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal variant="fade-left" className="md:w-1/2 w-full space-y-8" delay={0.2}>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl glassmorphic-card">
                <i className="fas fa-map-marker-alt text-lg text-blue-400 mt-1" aria-hidden="true"></i>
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-white mb-1">Our Address</h3>
                  <p className="text-gray-200 text-sm font-normal">Remote</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl glassmorphic-card">
                <i className="fas fa-envelope text-lg text-blue-400 mt-1" aria-hidden="true"></i>
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-white mb-1">Email Us</h3>
                  <a href="mailto:theintelliverse@gmail.com" onMouseEnter={playHover} onClick={playClick} className="text-gray-200 hover:text-white transition-colors text-sm font-normal">
                    theintelliverse@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 p-5 rounded-2xl glassmorphic-card w-max">
              <span className="text-xs uppercase font-mono tracking-widest text-gray-400">FOLLOW US:</span>
              <a
                href="https://www.linkedin.com/company/the-intelliverse/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-gray-300 hover:text-blue-400 transition-colors text-xl p-1"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/the_intelliverse/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-gray-300 hover:text-blue-400 transition-colors text-xl p-1"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="mailto:theintelliverse@gmail.com"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-gray-300 hover:text-blue-400 transition-colors text-xl p-1"
                title="Email Us"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
