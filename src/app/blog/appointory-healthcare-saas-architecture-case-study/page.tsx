import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Case Study: How We Built Appointory — Real-Time Clinic Queue & OPD Token Dispatch Engine | The Intelliverse",
  description:
    "An architectural engineering breakdown of Appointory (appointory.in): sub-50ms WebSocket queue synchronization, automated WhatsApp patient arrival triggers, and zero-wait doctor OPD dispatch in Ahmedabad, India.",
  keywords: [
    "Appointory case study",
    "healthcare SaaS architecture",
    "clinic queue management software",
    "real-time appointment dispatch",
    "Next.js healthcare platform",
    "The Intelliverse",
    "Dhruvil Thummar",
    "Ahmedabad healthcare technology",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/appointory-healthcare-saas-architecture-case-study`,
  },
  openGraph: {
    title: "Case Study: How We Built Appointory — Real-Time Clinic Queue & OPD Token Dispatch Engine",
    description: "An architectural engineering breakdown of Appointory: sub-50ms WebSocket queues and automated patient arrival dispatch.",
    url: `${siteConfig.url}/blog/appointory-healthcare-saas-architecture-case-study`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: How We Built Appointory — Real-Time Clinic Queue & OPD Token Dispatch Engine",
    description: "Engineering real-time OPD clinic queue coordination with Next.js 15, WebSockets, and WhatsApp Cloud API.",
    images: ["/opengraph-image"],
  },
};

export default function AppointoryCaseStudyBlogPost() {
  const postUrl = `${siteConfig.url}/blog/appointory-healthcare-saas-architecture-case-study`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "Case Study: How We Built Appointory — Real-Time Clinic Queue & OPD Token Dispatch Engine",
    description:
      "An architectural engineering breakdown of Appointory (appointory.in): sub-50ms WebSocket queue synchronization, automated WhatsApp patient arrival triggers, and zero-wait doctor OPD dispatch.",
    datePublished: "2026-10-31T00:00:00Z",
    dateModified: "2026-10-31T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Dhruvil Thummar",
      jobTitle: "Co-founder & CTO",
      url: "https://www.linkedin.com/in/dhruvilthummar",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/the-intelliverse-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <InnerPageHeader />

      <main
        id="main-content"
        className="min-h-screen"
        data-theme="cream"
        style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}
      >
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: "Appointory Architecture Case Study", url: postUrl },
          ]}
        />

        {/* Post Hero */}
        <section
          className="pt-10 pb-12 md:py-16 px-4 sm:px-6 container-site"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  color: "#059669",
                  borderColor: "rgba(16, 185, 129, 0.3)",
                }}
              >
                Project Deep-Dive · Healthcare SaaS
              </span>
              <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                · 12 min read · Live Platform:{" "}
                <a
                  href="https://appointory.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[var(--blue-deep)]"
                >
                  appointory.in ↗
                </a>
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-tight"
              style={{ color: "var(--ink)" }}
            >
              How We Built Appointory: Engineering a Real-Time Clinic Queue &amp; OPD Token Dispatch Engine
            </h1>

            <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--muted)" }}>
              Traditional clinic waiting rooms in India suffer from chaotic walk-ins, unpredictable consultation paces, and paper token mismanagement. Here is how The Intelliverse engineered Appointory to orchestrate live queue synchronization, automated WhatsApp arrival dispatch, and sub-50ms OPD state transitions.
            </p>

            {/* Author info */}
            <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t" style={{ borderColor: "var(--hairline)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                  style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
                >
                  DT
                </div>
                <div>
                  <div className="font-mono text-xs font-bold" style={{ color: "var(--ink)" }}>
                    Dhruvil Thummar
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: "var(--muted)" }}>
                    Co-founder &amp; CTO · Lead Architect on Appointory
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                Published October 31, 2026 · Verified Field Notes
              </div>
            </div>
          </div>
        </section>

        {/* Project KPI Highlights */}
        <section className="px-4 sm:px-6 container-site pb-12" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              { label: "Queue Latency", val: "< 50ms", note: "Real-time sync" },
              { label: "Wait Reduction", val: "- 42 mins", note: "Average patient wait" },
              { label: "Arrival On-Time", val: "94.6%", note: "WhatsApp automation" },
              { label: "Dropped Records", val: "0.00%", note: "Zero lost tokens" },
            ].map((kpi, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--hairline)",
                }}
              >
                <div className="text-xl sm:text-2xl font-mono font-black" style={{ color: "var(--blue-deep)" }}>
                  {kpi.val}
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider mt-1" style={{ color: "var(--ink)" }}>
                  {kpi.label}
                </div>
                <div className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                  {kpi.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Post Content */}
        <article className="pb-16 px-4 sm:px-6 container-site space-y-10" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Executive Overview */}
          <div
            className="p-6 rounded-2xl border space-y-3"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.05)",
              borderColor: "rgba(16, 185, 129, 0.2)",
            }}
          >
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800">
              The Architecture at a Glance
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              <strong>Appointory</strong> is an intelligent clinical coordination SaaS developed by The Intelliverse for multi-speciality clinics, diagnostic laboratories, and independent medical practices. The system combines Next.js 15, Node.js microservices, WebSocket pub/sub brokers, and the Meta WhatsApp Cloud API to turn unpredictable OPD lines into a synchronized, calm flow.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              1. The Real-World Breakdown: What Was Broken in Clinics?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              When we audited OPD operations at leading clinics in Ahmedabad, Gujarat, we noticed a persistent breakdown in physical queue coordination:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              <li>
                <strong>Static token numbers:</strong> Patients received a printed slip saying #24, with zero clue whether Doctor A was running 10 minutes ahead or 45 minutes behind due to an emergency procedure.
              </li>
              <li>
                <strong>Crowded waiting areas:</strong> Sick patients, elderly seniors, and infants spent an average of 1.5 to 2.5 hours packed in poorly ventilated waiting rooms.
              </li>
              <li>
                <strong>Reception friction:</strong> Front-desk receptionists spent 60% of their workday answering the same question repeatedly: <em>&quot;Kitna time lagega, sister?&quot;</em>
              </li>
              <li>
                <strong>Fragmented diagnostic reports:</strong> Lab blood tests and X-ray PDFs were handed out physically or emailed across haphazard personal email threads with zero central patient history.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              2. Architectural Engine: Dynamic Consultation Pace Estimation
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Simple FIFO (First-In, First-Out) queues fail in medical practices because a routine fever consultation takes 4 minutes, while a complex cardiology review takes 22 minutes.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              We engineered a rolling dynamic pacing algorithm that continuously calculates the doctor&apos;s active velocity:
            </p>

            <div
              className="p-5 rounded-2xl border font-mono text-xs overflow-x-auto"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.95)",
                color: "#e4dac3",
                borderColor: "rgba(228, 218, 195, 0.15)",
              }}
            >
              <div style={{ color: "rgba(248, 242, 228, 0.45)" }}>// Dynamic ETA Pacing Engine (Node.js Core)</div>
              <span style={{ color: "#34d399" }}>function</span> <span style={{ color: "#60a5fa" }}>calculatePatientArrivalETA</span>(queue, doctorHistory) &#123;<br />
              &nbsp;&nbsp;<span style={{ color: "#fdb347" }}>const</span> recentPace = doctorHistory.slice(-5); <span style={{ color: "rgba(248,242,228,0.4)" }}>// last 5 completed patients</span><br />
              &nbsp;&nbsp;<span style={{ color: "#fdb347" }}>const</span> avgMinsPerPatient = recentPace.reduce((a, b) =&gt; a + b, 0) / recentPace.length || 8;<br />
              &nbsp;&nbsp;<br />
              &nbsp;&nbsp;<span style={{ color: "#fdb347" }}>const</span> patientsAhead = queue.filter(p =&gt; p.status === <span style={{ color: "#34d399" }}>&quot;WAITING&quot;</span>).length;<br />
              &nbsp;&nbsp;<span style={{ color: "#fdb347" }}>const</span> estimatedMinutes = patientsAhead * avgMinsPerPatient;<br />
              &nbsp;&nbsp;<br />
              &nbsp;&nbsp;<span style={{ color: "#34d399" }}>return</span> &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;etaDate: <span style={{ color: "#34d399" }}>new</span> Date(Date.now() + estimatedMinutes * 60000),<br />
              &nbsp;&nbsp;&nbsp;&nbsp;shouldNotifyPatient: estimatedMinutes &lt;= 25 &amp;&amp; !queue.notified<br />
              &nbsp;&nbsp;&#125;;<br />
              &#125;
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              When the pacing engine detects that a patient is within 25 minutes of their turn, Appointory triggers a WhatsApp message: <em>&quot;Dr. Patel is on Token #18. Please arrive at the clinic by 11:20 AM for Token #20.&quot;</em>
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              3. The Live Doctor &amp; Reception Dashboard
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              In high-pressure clinic environments, software must never require multi-click confirmations. The doctor&apos;s console was engineered with single-key shortcuts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border bg-white/70">
                <span className="font-bold text-emerald-600 block mb-1">Spacebar / Tap:</span>
                <span>Calls Next Patient &amp; updates waiting room display in &lt;30ms</span>
              </div>
              <div className="p-3.5 rounded-xl border bg-white/70">
                <span className="font-bold text-amber-600 block mb-1">Hold Token:</span>
                <span>Moves absent patient to 2-slot standby buffer without queue reset</span>
              </div>
              <div className="p-3.5 rounded-xl border bg-white/70">
                <span className="font-bold text-blue-600 block mb-1">Direct Rx Sync:</span>
                <span>Prescription attaches directly to patient mobile locker</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              4. Results &amp; Real Impact
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Within 30 days of deploying Appointory across pilot clinics in Gujarat:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              <li><strong>Waiting room occupancy dropped by 65%:</strong> Patients wait comfortably at home or nearby cafes until their turn nears.</li>
              <li><strong>Front-desk query volume decreased by 80%:</strong> Patients track their live queue position directly on mobile web without downloading an app.</li>
              <li><strong>Zero schedule conflicts:</strong> Emergency surgical blocks automatically hold the queue and recalculate downstream ETAs.</li>
            </ul>
          </section>

          {/* Project CTA Banner */}
          <div
            className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{
              backgroundColor: "rgba(11, 21, 48, 0.95)",
              color: "var(--cream)",
              borderColor: "rgba(228, 218, 195, 0.16)",
            }}
          >
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Live Production Case Study
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight">
                Want to build an industry-defining SaaS or enterprise platform?
              </h3>
              <p className="text-xs md:text-sm font-sans text-white/70">
                The Intelliverse designs and builds bespoke cloud software that eliminates operational chaos. Let&apos;s discuss your engineering roadmap.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://appointory.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold transition text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "var(--cream)",
                  border: "1px solid rgba(228, 218, 195, 0.2)",
                  textDecoration: "none",
                }}
              >
                Visit Appointory.in ↗
              </a>
              <Link
                href="/work/appointory"
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold transition text-center"
                style={{
                  backgroundColor: "var(--blue-deep)",
                  color: "var(--cream)",
                  boxShadow: "0 4px 18px rgba(47, 99, 224, 0.4)",
                  textDecoration: "none",
                }}
              >
                View Work Spec →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
