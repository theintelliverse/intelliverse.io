"use client";

import { useState } from "react";

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

  return (
    <section id="contact" className="py-20 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <form id="contact-form" onSubmit={handleContactSubmit}>
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Your Email"
                  className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full themed-accent themed-accent-hover text-white font-bold py-3 px-6 rounded-lg transition animated-button cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
            {formMessage.text && (
              <div
                id="form-message"
                className={`mt-4 text-center ${
                  formMessage.type === "success"
                    ? "text-green-500"
                    : formMessage.type === "error"
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {formMessage.text}
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <i className="fas fa-map-marker-alt text-2xl text-blue-500 mt-1" aria-hidden="true"></i>
                <div>
                  <h3 className="text-lg font-semibold">Our Address</h3>
                  <p className="text-gray-400">Remote</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <i className="fas fa-envelope text-2xl text-blue-500 mt-1" aria-hidden="true"></i>
                <div>
                  <h3 className="text-lg font-semibold">Email Us</h3>
                  <a href="mailto:theintelliverse@gmail.com" className="text-gray-400 hover:underline">
                    theintelliverse@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">Follow Us:</h3>
                <a
                  href="https://www.linkedin.com/company/the-intelliverse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 text-2xl"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://www.instagram.com/the_intelliverse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 text-2xl"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="mailto:theintelliverse@gmail.com"
                  className="text-gray-400 hover:text-blue-500 text-2xl"
                  title="Email Us"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
