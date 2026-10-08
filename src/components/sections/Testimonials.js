"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { springs, ease } from "@/lib/motion";

const FALLBACK_TESTIMONIALS = [
    {
        author: "Harshil Vora",
        role: "Founder & Creative Director",
        project: "Vrix",
        tag: "Vrix · Luxury E-Commerce",
        rating: 5.0,
        text: "Intelliverse built our headless luxury storefront with custom 3D ring visualizers and sub-second checkout. Our conversion rate increased by 42% on launch day — sheer engineering excellence."
    },
    {
        author: "Dr. Rajesh K. Patel",
        role: "Senior Consultant Cardiologist",
        project: "Appointry",
        tag: "Appointry · Doctor",
        rating: 4.5,
        text: "Appointry's automated token queue and digital prescription flow eliminated patient congestion at our OPD. Schedule conflicts dropped to zero within our first week of operation."
    },
    {
        author: "Dr. Meera Shah",
        role: "Director, Metro Multispeciality Clinic",
        project: "Appointry",
        tag: "Appointry · Clinic",
        rating: 4.0,
        text: "Managing multiple visiting doctors across departments used to cause daily front-desk chaos. Appointry unified our doctor shifts, reception desk, and billing into one synchronized real-time dashboard."
    },
    {
        author: "Karan Singhania",
        role: "Operations Head, Apex Diagnostic Labs",
        project: "Appointry",
        tag: "Appointry · Lab",
        rating: 3.5,
        text: "Home sample collection dispatch and direct WhatsApp report delivery saved our phlebotomists hours every day. Fast patient sync, with ongoing UI refinements making it even smoother."
    },
    {
        author: "Sneha Parikh",
        role: "Verified Patient & Care Recipient",
        project: "Appointry",
        tag: "Appointry · Patient",
        rating: 4.0,
        text: "No more waiting for two hours in crowded clinic waiting rooms. The live queue tracker showed exactly when my consultation was up, and all my blood work reports arrived directly on my phone."
    },
    {
        author: "Pooja Chawla",
        role: "Head of Digital Retail, Vrix Storefront",
        project: "Vrix",
        tag: "Vrix · Luxury E-Commerce",
        rating: 4.5,
        text: "The high-resolution zoom and instant catalog filtering on mobile browsers made our diamond collections shine. Highly performant Shopify headless stack that handles heavy seasonal traffic effortlessly."
    }
];

export default function Testimonials({ data }) {
    const scrollRef = useRef(null);
    const testimonials = data && data.length > 0 ? data : FALLBACK_TESTIMONIALS;

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
        }
    };

    return (
        <section
            id="testimonials"
            data-theme="cream"
            style={{
                background: "var(--cream)",
                borderTop: "1px solid var(--hairline)",
                paddingTop: "clamp(4.5rem, 8vh, 6.5rem)",
                paddingBottom: "clamp(4.5rem, 8vh, 6.5rem)",
                position: "relative",
            }}
        >
            <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
                {/* Header with Title and Scroll Controls */}
                <div
                    style={{
                        marginBottom: "3rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        flexWrap: "wrap",
                        gap: "1.5rem",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.75, ease: ease.expo }}
                    >
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span
                                style={{
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--orange)",
                                    display: "inline-block",
                                    boxShadow: "0 0 10px rgba(253, 179, 71, 0.7)",
                                }}
                            />
                            <span
                                style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.6875rem",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    color: "var(--orange)",
                                    fontWeight: 700,
                                }}
                            >
                                What clients say
                            </span>
                        </div>
                        <h2
                            style={{
                                fontFamily: "var(--serif)",
                                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                letterSpacing: "-0.025em",
                                lineHeight: 1.05,
                                color: "var(--ink)",
                                margin: 0,
                                fontWeight: 400,
                            }}
                        >
                            Client Endorsements.
                        </h2>
                    </motion.div>

                    {/* Navigation Arrows */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: ease.expo }}
                        style={{ display: "flex", gap: "0.5rem" }}
                    >
                        <motion.button
                            onClick={scrollLeft}
                            aria-label="Scroll left"
                            data-cursor="link"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            transition={springs.snappy}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                border: "1px solid var(--hairline)",
                                backgroundColor: "var(--surface)",
                                color: "var(--ink)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease, border-color 0.2s ease",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            ←
                        </motion.button>
                        <motion.button
                            onClick={scrollRight}
                            aria-label="Scroll right"
                            data-cursor="link"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            transition={springs.snappy}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                border: "1px solid var(--hairline)",
                                backgroundColor: "var(--surface)",
                                color: "var(--ink)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease, border-color 0.2s ease",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            →
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scrollable Testimonials Gallery */}
                <div
                    ref={scrollRef}
                    data-cursor="drag"
                    data-cursor-label="Drag"
                    style={{
                        display: "flex",
                        gap: "1.5rem",
                        overflowX: "auto",
                        paddingBottom: "1.5rem",
                        paddingTop: "0.25rem",
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                    }}
                    role="list"
                    aria-label="Client testimonials"
                >
                    {testimonials.map((testimonial, i) => {
                        const indexStr = i < 9 ? `0${i + 1}` : `${i + 1}`;
                        const text = testimonial.text || testimonial.quote || "";
                        const ratingVal = typeof testimonial.rating === "number" ? testimonial.rating : (parseFloat(testimonial.rating) || 5);
                        const displayTag = testimonial.tag || (testimonial.project ? `${testimonial.project} · Verified` : null);

                        return (
                            <motion.div
                                key={testimonial.author || testimonial.id || `testi-${i}`}
                                role="listitem"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.65, delay: Math.min(i * 0.08, 0.35), ease: ease.expo }}
                                whileHover={{ y: -6, boxShadow: "0 14px 34px -10px rgba(14, 27, 61, 0.12)" }}
                                style={{
                                    flexShrink: 0,
                                    width: "clamp(300px, 78vw, 420px)",
                                    scrollSnapAlign: "start",
                                    border: "1px solid var(--hairline)",
                                    borderRadius: "16px",
                                    padding: "clamp(1.75rem, 3vw, 2.25rem)",
                                    background: "#FFFFFF",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 20px rgba(14, 27, 61, 0.05)",
                                    cursor: "default",
                                }}
                            >
                                <div>
                                    {/* Top Bar: Index + Tag + Rating Stars */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            gap: "0.75rem",
                                            marginBottom: "1.5rem",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <span
                                                style={{
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontSize: "0.75rem",
                                                    fontWeight: 700,
                                                    color: "var(--orange)",
                                                    letterSpacing: "0.1em",
                                                }}
                                            >
                                                {indexStr}
                                            </span>
                                            {displayTag && (
                                                <span
                                                    style={{
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        fontSize: "0.625rem",
                                                        letterSpacing: "0.04em",
                                                        textTransform: "uppercase",
                                                        padding: "2px 7px",
                                                        borderRadius: "100px",
                                                        background: "rgba(224, 86, 36, 0.08)",
                                                        color: "var(--orange)",
                                                        fontWeight: 700,
                                                        border: "1px solid rgba(224, 86, 36, 0.2)",
                                                    }}
                                                >
                                                    {displayTag}
                                                </span>
                                            )}
                                        </div>

                                        {/* Dynamic Star Rating */}
                                        <div
                                            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                                            aria-label={`${ratingVal} out of 5 stars`}
                                        >
                                            <div style={{ fontSize: "0.875rem", letterSpacing: "1px", display: "flex" }}>
                                                {[1, 2, 3, 4, 5].map((star) => {
                                                    const isFilled = ratingVal >= star;
                                                    const isHalf = !isFilled && ratingVal >= star - 0.5;
                                                    return (
                                                        <span
                                                            key={`star-${star}`}
                                                            style={{
                                                                color: isFilled || isHalf ? "var(--orange)" : "rgba(26, 26, 26, 0.2)",
                                                            }}
                                                        >
                                                            ★
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <span
                                                style={{
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontSize: "0.75rem",
                                                    fontWeight: 700,
                                                    color: "var(--ink)",
                                                    marginLeft: "0.2rem",
                                                }}
                                            >
                                                {ratingVal.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <p
                                        className="testimonial-quote"
                                        style={{
                                            fontFamily: "'Instrument Serif', Georgia, serif",
                                            fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                                            letterSpacing: "-0.015em",
                                            lineHeight: 1.45,
                                            color: "var(--ink)",
                                            fontStyle: "italic",
                                            margin: 0,
                                            marginBottom: "1.75rem",
                                        }}
                                    >
                                        &ldquo;{text}&rdquo;
                                    </p>
                                </div>

                                {/* Attribution & Status */}
                                <div
                                    style={{
                                        borderTop: "1px solid var(--hairline)",
                                        paddingTop: "1.25rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                                        <p
                                            style={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: "0.75rem",
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: "var(--ink)",
                                                fontWeight: 700,
                                                margin: 0,
                                            }}
                                        >
                                            — {testimonial.author}
                                        </p>
                                        {testimonial.role && (
                                            <span
                                                style={{
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                    fontSize: "0.6875rem",
                                                    color: "var(--ink-2)",
                                                }}
                                            >
                                                {testimonial.role}
                                            </span>
                                        )}
                                    </div>

                                    <span
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: "0.625rem",
                                            letterSpacing: "0.05em",
                                            color: "#10b981",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.35rem",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "50%",
                                                background: "#10b981",
                                                display: "inline-block",
                                            }}
                                        />
                                        Verified
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
