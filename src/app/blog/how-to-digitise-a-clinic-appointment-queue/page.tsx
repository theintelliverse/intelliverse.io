import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "How to Digitise a Clinic's Appointment Queue: An Architectural Blueprint",
  description:
    "Lessons learned from engineering Appointory: event-driven WebSocket queues, dynamic consultation pace estimation, and automated patient arrival notifications.",
  keywords: [
    "digitise clinic appointment queue",
    "clinic queue management system architecture",
    "healthcare software development India",
    "real-time appointment dispatch",
    "Appointory architecture",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/how-to-digitise-a-clinic-appointment-queue`,
  },
  openGraph: {
    title: "How to Digitise a Clinic's Appointment Queue: An Architectural Blueprint",
    description:
      "An engineering breakdown of building a dynamic, real-time clinic queue management system.",
    url: `${siteConfig.url}/blog/how-to-digitise-a-clinic-appointment-queue`,
    siteName: siteConfig.name,
    images: [{ url: "/marina-bay-sands.png", width: 1200, height: 630 }],
  },
};

export default function DigitiseClinicQueuePost() {
  const postUrl = `${siteConfig.url}/blog/how-to-digitise-a-clinic-appointment-queue`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "How to Digitise a Clinic's Appointment Queue: An Architectural Blueprint",
    description:
      "Lessons learned from engineering Appointory: event-driven WebSocket queues, dynamic consultation pace estimation, and patient arrival notifications.",
    datePublished: "2026-04-05T00:00:00Z",
    dateModified: "2026-10-05T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Rudra Kankotiya",
      jobTitle: "Co-founder & CMO",
      url: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/the%20intelliverse%20logo.jpg`,
      },
    },
    mainEntityOfPage: postUrl,
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <InnerPageHeader />

      <main id="main-content" className="min-h-screen" data-theme="cream" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: "Digitising Clinic Appointment Queues", url: "/blog/how-to-digitise-a-clinic-appointment-queue" },
          ]}
        />

        <article className="py-12 md:py-16 px-4 sm:px-6 container-site" style={{ maxWidth: "840px", margin: "0 auto" }}>
          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "var(--muted)" }}>
              <span className="uppercase text-[var(--blue-deep)] font-bold">Healthcare Engineering</span>
              <span>·</span>
              <span>8 min read</span>
              <span>·</span>
              <span>Updated October 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
              How to Digitise a Clinic&apos;s Appointment Queue: An Architectural Blueprint
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder_rudra.jpg"
                alt="Rudra Kankotiya"
                width={40}
                height={40}
                className="rounded-full object-cover border"
                style={{ borderColor: "var(--hairline)" }}
              />
              <div className="text-xs font-mono">
                <span className="font-bold text-[var(--ink)] block">Rudra Kankotiya</span>
                <span className="text-[var(--muted)]">Co-founder &amp; CMO at The Intelliverse</span>
              </div>
            </div>
          </div>

          {/* AEO Answer-First Direct Summary Block */}
          <div className="p-6 rounded-2xl border mb-10" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
            <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
              <strong>Direct Answer: </strong>
              To successfully digitise a medical clinic&apos;s queue, you must abandon static time slots in favor of a <strong>dynamic event-driven buffer queue</strong>. When doctors complete a consultation, background triggers recalculate real-time arrival windows and automatically notify the next 3 patients via WhatsApp/SMS. In our production deployment with Appointory, this architecture reduced physical clinic waiting room congestion by 40% while preserving high physician consultation throughput.
            </p>
          </div>

          {/* Article Body */}
          <div className="prose max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-[var(--muted)]">
            <h2 className="text-2xl font-serif text-[var(--ink)] mt-8">
              The Fundamental Flaw in Traditional Medical Scheduling
            </h2>
            <p>
              In conventional clinics, 20 patients are booked into fixed 15-minute slots (e.g. 10:00 AM, 10:15 AM, 10:30 AM). However, medical diagnostics are inherently non-linear: an elderly patient may require 35 minutes of careful examination, while a routine prescription refill takes only 4 minutes.
            </p>
            <p>
              By 11:30 AM, the doctor is 45 minutes behind schedule. The waiting room becomes overcrowded, receptionists face escalating stress, and patients who arrived punctually sit in frustrating discomfort.
            </p>

            <h2 className="text-2xl font-serif text-[var(--ink)] mt-8">
              The 4-Step Event-Driven Queue Architecture
            </h2>
            <p>
              When engineering the Appointory platform, we developed an architectural model that treats the clinic waiting line as a dynamic state machine:
            </p>

            <div className="space-y-4 my-6">
              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Step 01 / Smart Token Staging</span>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Instead of promising an exact minute, patients receive a Token Number (e.g., Token #14) with an estimated 30-minute target window.
                </p>
              </div>

              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Step 02 / Doctor Consultation Heartbeat</span>
                <p className="text-xs text-[var(--muted)] mt-1">
                  The physician dashboard features a single tactile toggle: &ldquo;Call Next Patient&rdquo; and &ldquo;Complete Consultation&rdquo;. This emits an instantaneous WebSocket event through Redis Pub/Sub.
                </p>
              </div>

              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Step 03 / Moving Average Recalculation</span>
                <p className="text-xs text-[var(--muted)] mt-1">
                  A lightweight background worker calculates the physician&apos;s rolling average consultation duration over the preceding 5 patients. If the doctor is moving quickly, estimated arrival times adjust forward; if delayed, times adjust backward automatically.
                </p>
              </div>

              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Step 04 / Automated Dispatch Window Triggers</span>
                <p className="text-xs text-[var(--muted)] mt-1">
                  When a patient reaches Position #3 in the live queue, the system triggers a WhatsApp &amp; SMS message: <em>&ldquo;You are #3 in line. Please proceed to the clinic now.&rdquo;</em> The patient arrives exactly 10 minutes before their turn.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-serif text-[var(--ink)] mt-8">
              Security &amp; Health Records Compliance
            </h2>
            <p>
              Digitising a medical clinic queue is incomplete without secure document management. We paired the queue engine with a client-side encrypted diagnostic records locker:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Patients upload previous laboratory test reports and MRIs directly to temporary encrypted S3 buckets.</li>
              <li>Only the verified consulting physician can decrypt and view records during the active consultation session.</li>
              <li>All health record accesses are written to an immutable append-only audit log.</li>
            </ul>
          </div>

          {/* Related Case Study */}
          <div className="mt-12 p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
            <span className="text-xs font-mono text-[var(--blue-deep)] font-bold uppercase">Explore The Live Implementation</span>
            <h3 className="text-xl font-bold font-serif mt-1 mb-2">
              <Link href="/work/appointory" className="hover:underline" data-cursor="link">
                Read the Complete Appointory Healthcare Case Study ↗
              </Link>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)]">
              Learn how our team in Ahmedabad brought this architecture to production with Next.js 15, Redis queues, and MongoDB.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
