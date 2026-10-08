import { MongoClient } from "mongodb";

export const defaultTestimonials = [
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

// Fallback in-memory DB in case MongoDB Atlas is not configured or offline
export const localMockDb = {
  hero: {
    headline: "Innovation. Create. Grow.",
    subtitle: "Your one-stop solution for software development, web development, and IT services.",
    status: "Ahmedabad, India / Taking new projects",
    pillarsText: "Web Architecture · Cloud Infrastructure · SaaS · AI Workflows",
    caseStudiesHighlight: "Appointory (Healthcare) & Vrix (Headless E-Commerce)",
    studioLocation: "Ahmedabad, Gujarat · Collaborating Worldwide"
  },
  about: {
    p1: "The Intelliverse is a dynamic software development company dedicated to providing innovative solutions. We specialize in web development, mobile applications, and comprehensive IT services that empower businesses to thrive in the digital age.",
    mission: "To solve problems worth solving with teams who care about excellence — building the kind of software that remains fast, secure, and maintainable long after deployment.",
    pullQuote: "We don't engineer to check boxes. We build the architecture that lets your team scale without rewriting the core every eighteen months.",
    modelsText: "Maybe you need an ultra-fast Next.js web application or a headless storefront right now. That's a completely valid place to start. We focus strictly on what creates measurable impact, without bloated scopes or unwanted upsells."
  },
  contact: {
    email: "theintelliverse@gmail.com",
    linkedin: "https://www.linkedin.com/company/the-intelliverse/",
    instagram: "https://www.instagram.com/the_intelliverse/"
  },
  stats: {
    projects: 2,
    satisfaction: 100,
    clients: 15
  },
  estimator: {
    startingPrice: "₹15,000",
    types: [
      { id: "starter", label: "Starter Web / Landing Page", baseRange: "₹15,000 – ₹45,000" },
      { id: "web", label: "Web Architecture / Next.js", baseRange: "₹45,000 – ₹1.5L" },
      { id: "mobile", label: "Mobile App (Android / iOS)", baseRange: "₹80,000 – ₹3.5L" },
      { id: "saas", label: "Custom SaaS Platform", baseRange: "₹1.5L – ₹8L+" },
      { id: "it", label: "Cloud & DevOps Architecture", baseRange: "₹25,000 – ₹1.2L" },
      { id: "ai", label: "Applied AI / Agentic Automation", baseRange: "₹40,000 – ₹2.5L+" },
    ],
    includedCharges: [
      { title: "100% IP & Full Source Code Ownership", badge: "INCLUDED", note: "Zero vendor lock-in; complete repository rights" },
      { title: "Cloud CI/CD & Zero-Downtime Deployment", badge: "INCLUDED", note: "Automated edge staging & production pipelines" },
      { title: "End-to-End Security & QA Audit", badge: "INCLUDED", note: "OWASP best practices & performance stress testing" },
      { title: "30-Day Post-Launch SLA Warranty", badge: "INCLUDED", note: "Dedicated bug resolution & uptime guarantees" },
    ],
  },
  telemetry: {
    headerTitle: "Studio Telemetry",
    badgeLabel: "LIVE FEED",
    badgeSub: "· W41",
    terminalTimestamp: "03 OCT 21:04",
    terminalProject: "site",
    terminalColor: "#2F63E0",
    terminalMessage: "v0.7: Vrix journal published",
    metricTitle: "Active Deployments · Q1",
    metricTrend: "↑ 18.4%",
    deployCount: 302,
    deployLabel: "total live",
    activityTitle: "7-DAY ACTIVITY · PEAK 96%",
    activityStatus: "HEALTHY",
    bars: [
      { day: "M", name: "Monday", val: 45, col: "#5B3FD9" },
      { day: "T", name: "Tuesday", val: 68, col: "#3D7BF7" },
      { day: "W", name: "Wednesday", val: 82, col: "#FF6B7B" },
      { day: "T", name: "Thursday", val: 54, col: "#FDB347" },
      { day: "F", name: "Friday", val: 91, col: "#10B981" },
      { day: "S", name: "Saturday", val: 74, col: "#8B5CF6" },
      { day: "S", name: "Sunday", val: 96, col: "#2F63E0" },
    ],
    eventTag: "DEPLOY",
    eventMessage: "vrix-edge-proxy online [18ms]",
    eventStatus: "OK",
    eventColor: "var(--blue)"
  },
  services: [
    {
      id: "web",
      title: "Web Architecture & Frontend",
      index: "01",
      dotColor: "var(--blue)",
      previewText: "Sub-second Next.js 15 apps, headless Shopify storefronts, and tactile WebGL experiences.",
      sub: [
        "Next.js 15 & React 19 Architectures",
        "Headless E-Commerce & Storefronts",
        "Bespoke Interaction Design & Canvas",
        "Core Web Vitals (<800ms LCP)",
        "PWA & Offline Capability",
      ],
    },
    {
      id: "software",
      title: "Custom SaaS & Software Systems",
      index: "02",
      dotColor: "var(--indigo)",
      previewText: "Multi-tenant cloud architectures, role-based security, and high-throughput transactional APIs.",
      sub: [
        "Multi-Tenant SaaS Portals",
        "Node.js, FastAPI & Go Microservices",
        "Distributed Database Engineering",
        "Cryptographic Telemetry & Audit Trails",
        "Stripe / Razorpay Payment Systems",
      ],
    },
    {
      id: "cloud",
      title: "Cloud Infrastructure & DevOps",
      index: "03",
      dotColor: "var(--orange)",
      previewText: "Zero-downtime CI/CD deployment pipelines, multi-region Kubernetes, and edge failover.",
      sub: [
        "AWS, GCP & Cloudflare Edge",
        "Docker & Kubernetes Orchestration",
        "Terraform Infrastructure as Code",
        "Zero-Downtime Deployment Pipelines",
        "24/7 Telemetry & Health Auditing",
      ],
    },
    {
      id: "ai",
      title: "Applied AI & Agentic Workflows",
      index: "04",
      dotColor: "var(--coral)",
      previewText: "Enterprise Agentic RAG workflows, vector intelligence databases, and neural automations.",
      sub: [
        "Enterprise Agentic RAG Workflows",
        "Gemini 2.5 & OpenAI API Integrations",
        "Vector Databases (Qdrant, Pinecone)",
        "Automated Document Processing",
        "Secure On-Premise LLM Pipelines",
      ],
    },
  ],
  process: [
    {
      num: "01",
      tag: "DISCOVER",
      title: "Discover & Strategize",
      description: "We clarify system requirements, map critical edge cases, and audit architectural bottlenecks before committing a single line of code.",
      deliverables: ["Architectural Spec", "Technical Scoping Brief", "Milestone Roadmap"],
      telemetry: "SPECS: 100% DEFINED · ZERO AMBIGUITY",
    },
    {
      num: "02",
      tag: "ARCHITECT",
      title: "Architect & Engineer",
      description: "Design systems and modular backend microservices progress in synchronized sprints. Built with strict TypeScript, automated unit tests, and continuous integration.",
      deliverables: ["Modular React 19 / Next.js", "Type-safe APIs", "Weekly Playable Demos"],
      telemetry: "BUILD: TS-STRICT PASS · 98% TEST COVERAGE",
    },
    {
      num: "03",
      tag: "DEPLOY",
      title: "Deploy & Secure",
      description: "Automated CI/CD pipelines configure zero-downtime rolling deploys, distributed edge caching, TLS security hardening, and database redundancy.",
      deliverables: ["Zero-Downtime Pipeline", "Multi-Region Edge", "Zero-Trust Security"],
      telemetry: "EDGE: 24 REGIONS ONLINE · TLS 1.3 ACTIVE",
    },
    {
      num: "04",
      tag: "SCALE",
      title: "Scale & Optimize",
      description: "Post-launch telemetry monitors Core Web Vitals, API latency percentiles, and usage spikes. Features iterate continuously against empirical user data.",
      deliverables: ["24/7 Health Auditing", "P99 Latency Profiling", "Autoscaling Policies"],
      telemetry: "HEALTH: 99.99% UPTIME · 18ms P99 RESPONSE",
    },
  ],
  marquee: {
    items1: [
      "Software in the Open",
      "Systems That Outlive Hype",
      "Zero Template Engineering",
      "Resilient Web Architecture",
      "Engineered in Ahmedabad",
      "Distributed Cloud Systems",
      "Modern Next.js & React 19",
    ],
    items2: [
      "Next.js App Router",
      "Microservices & Serverless",
      "TypeScript Strict",
      "PostgreSQL & Mongo",
      "AWS & GCP Cloud Native",
      "Framer Motion & GSAP",
      "Zero-Downtime CI/CD",
      "Tailored AI Workflows",
    ],
  },
  philosophy: [
    {
      num: "01",
      circleColor: "var(--blue-deep)",
      title: "Single Service Engagement",
      subtitle: "Start with one critical objective executed impeccably.",
      body: "Maybe you need an ultra-fast Next.js web application or a headless storefront right now. That's a completely valid place to start. We focus strictly on what creates measurable impact, without bloated scopes or unwanted upsells.",
      chips: ["Next.js Architecture", "Headless Storefront", "Landing Experience", "Code Audit"],
    },
    {
      num: "02",
      circleColor: "var(--indigo)",
      title: "Multi-Service Delivery",
      subtitle: "Web, cloud systems, and AI pipelines synchronized.",
      body: "As your product scope matures, we orchestrate the frontend interfaces, cloud microservices, database schemas, and AI pipelines together — one cohesive team that understands your full architecture from first principles.",
      chips: ["Full-Stack Engineering", "AWS / Edge Cloud", "Agentic AI Pipelines", "API Integrations"],
    },
    {
      num: "03",
      circleColor: "var(--coral)",
      title: "Complete Technical Partner",
      subtitle: "Your embedded engineering leadership.",
      body: "For ambitious founders and growing companies that require continuous technical excellence: we embed into your product roadmap, help hire and mentor internal developers, and guarantee uptime as you scale.",
      chips: ["CTO Advisory", "Dedicated Retainer", "Continuous DevOps", "Enterprise Security"],
    },
  ],
  founders: [
    {
      name: "Dhruvil Thummar",
      role: "Co-founder & CTO",
      badge: "SYSTEMS & CLOUD",
      tagline: "Engineering scalable systems & leading technical vision",
      currently: "Optimizing zero-downtime edge proxies & Appointory real-time messaging pipeline.",
      image: "/founder_dhruvil.jpg",
      linkedin: "https://www.linkedin.com/in/dhruvilthummar",
      portfolio: "",
      instagram: "",
      github: "https://github.com/dhruvilthummar",
      youtube: "",
      facebook: "",
      twitter: "",
      imageX: 50,
      imageY: 50,
      order: 1,
      customLinkUrl: "",
      customLinkName: "",
      customLinkIcon: "",
      customLinks: []
    },
    {
      name: "Rudra Kankotiya",
      role: "Co-founder & CMO",
      badge: "GROWTH & PRODUCT",
      tagline: "Driving brand strategy & marketing excellence",
      currently: "Leading international rollout for Vrix Jewellery headless storefront.",
      image: "/founder_rudra.jpg",
      linkedin: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
      portfolio: "",
      instagram: "",
      github: "",
      youtube: "",
      facebook: "",
      twitter: "",
      imageX: 50,
      imageY: 50,
      order: 2,
      customLinkUrl: "",
      customLinkName: "",
      customLinkIcon: "",
      customLinks: []
    },
    {
      name: "Jal Anghan",
      role: "Founder & Director",
      badge: "STRATEGY & OPERATIONS",
      tagline: "Visionary leadership & strategic business growth",
      currently: "Structuring long-term enterprise development partnerships & compliance frameworks.",
      image: "/founder_jal.jpg",
      linkedin: "https://www.linkedin.com/in/jal-anghan-534628309",
      portfolio: "",
      instagram: "",
      github: "",
      youtube: "",
      facebook: "",
      twitter: "",
      imageX: 50,
      imageY: 50,
      order: 3,
      customLinkUrl: "",
      customLinkName: "",
      customLinkIcon: "",
      customLinks: []
    }
  ],
  projects: [
    {
      num: "01",
      name: "Appointory",
      category: "Healthcare SaaS Platform",
      type: "Healthcare SaaS Platform",
      role: "Full-Stack Product Architecture & Real-Time Cloud Integration",
      stack: ["Next.js 15", "Node.js", "MongoDB", "Cloud Messaging API", "Tailwind CSS"],
      techTags: ["Next.js 15", "Node.js", "MongoDB", "Cloud Messaging API", "Tailwind CSS"],
      impact: "Clinic Queue Coordination · Real-time Consultation Dispatch",
      link: "https://appointory.in",
      caseStudyLink: "/work/appointory",
      description: "Automated clinic queue coordination with automated real-time dispatch triggers so patients know exact arrival times. Backed by end-to-end encrypted health locker for diagnostic records.",
      summary: "Automated clinic queue coordination with automated real-time dispatch triggers so patients know exact arrival times. Backed by end-to-end encrypted health locker for diagnostic records.",
      rating: 5,
      review: "The Intelliverse delivered an outstanding medical scheduling platform that transformed our patient experience.",
      isFeatured: true
    },
    {
      num: "02",
      name: "Vrix Jewellery",
      category: "Luxury Jewellery E-Commerce",
      type: "Luxury Jewellery E-Commerce",
      role: "Headless E-Commerce Architecture & AI Product Concierge",
      stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Multi-Currency"],
      techTags: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Multi-Currency"],
      impact: "Fast Global Delivery · Multi-Currency Storefront",
      link: "https://vrix.in",
      caseStudyLink: "/work/vrix",
      description: "International luxury storefront engineered for overseas buyers. Features geolocation-aware dynamic pricing, personal AI curation, and instantaneous catalog filtering.",
      summary: "International luxury storefront engineered for overseas buyers. Features geolocation-aware dynamic pricing, personal AI curation, and instantaneous catalog filtering.",
      rating: 5,
      review: "Exceptional UI speed and international conversion rate optimization.",
      isFeatured: true
    }
  ],
  caseStudies: [
    {
      id: "cs-01",
      num: "01",
      name: "Appointory",
      category: "Healthcare SaaS Platform",
      role: "Full-Stack Product Architecture & Real-Time Cloud Integration",
      stack: ["Next.js 15", "Node.js", "MongoDB", "Cloud Messaging API", "Tailwind CSS"],
      impact: "Clinic Queue Coordination · Real-time Consultation Dispatch",
      link: "https://appointory.in",
      caseStudyLink: "/work/appointory",
      problem: "Clinic queue coordination relied on manual physical tokens causing unpredictable wait times and packed waiting rooms.",
      broke: "Legacy polling server choked under peak concurrent morning patient registrations, causing dropped appointments.",
      result: "Sub-50ms dispatch queues, zero dropped alerts, 100% secure health records.",
      summary: "Automated clinic queue coordination with automated real-time dispatch triggers so patients know exact arrival times. Backed by end-to-end encrypted health locker for diagnostic records.",
      rating: 5,
      review: "The Intelliverse delivered an outstanding medical scheduling platform that transformed our patient experience."
    },
    {
      id: "cs-02",
      num: "02",
      name: "Vrix Jewellery",
      category: "Luxury Jewellery E-Commerce",
      role: "Headless E-Commerce Architecture & AI Product Concierge",
      stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Multi-Currency"],
      impact: "Fast Global Delivery · Multi-Currency Storefront",
      link: "https://vrix.in",
      caseStudyLink: "/work/vrix",
      problem: "Global luxury buyers abandoned carts due to static currency conversions and slow high-resolution image rendering.",
      broke: "Monolithic e-commerce template bloated first contentful paint past 4.2 seconds on overseas mobile connections.",
      result: "Instant headless edge routing, 99 Core Web Vitals, 3.4x overseas checkout conversion growth.",
      summary: "International luxury storefront engineered for overseas buyers. Features geolocation-aware dynamic pricing, personal AI curation, and instantaneous catalog filtering.",
      rating: 5,
      review: "Exceptional UI speed and international conversion rate optimization."
    }
  ],
  testimonials: defaultTestimonials
};

export const defaultChatbotKnowledge = [
  {
    keywords: "who are you, what is intelliverse, about intelliverse, about company, tell me about, describe, introduction",
    response: "**The Intelliverse** is a dynamic software development company dedicated to providing innovative solutions. We specialize in web development, mobile applications, and comprehensive IT services that empower businesses to thrive in the digital age.\n\nOur mission: *Transform your ideas into powerful digital realities.*"
  },
  {
    keywords: "vision, mission, goal, purpose, aim, objective",
    response: "**Our Vision**: To be at the forefront of digital innovation, creating solutions that drive progress.\n\n**Our Mission**: To transform your ideas into powerful digital realities, ensuring growth and success through technology and creativity.\n\nWe live by **Innovation, Create and Grow** — building premium digital products that power businesses forward."
  },
  {
    keywords: "slogan, tagline, motto, brand, innovation create grow",
    response: "Our tagline is **\"Innovation, Create and Grow\"** — The Intelliverse is your one-stop solution for software development, web development, and IT services that help you scale fast."
  },
  {
    keywords: "service, what do you do, offer, capabilities, what can you do, how can you help",
    response: "We offer three core services:\n\n* 🌐 **Web Development** — Beautiful, responsive, high-performing websites\n* 💻 **Software Development** — Custom apps to streamline your operations\n* 🔧 **IT Services** — Reliable IT support to keep your business running\n\nAll solutions are custom-built, not templated. Just say **\"get a quote\"** to start!"
  },
  {
    keywords: "founder, founders, team, leader, co-founder, cto, cmo, director, who runs, who leads, who started, meet the team",
    response: "Meet the visionary founders of **The Intelliverse**:\n\n👨‍💻 **Dhruvil Thummar** — Co-founder & CTO\nLeads technical architecture and all engineering operations.\n\n📢 **Rudra Kankotiya** — Co-founder & CMO\nDrives marketing strategy, brand identity and client growth.\n\n🎯 **Jal Anghan** — Founder & Director\nProvides strategic direction and oversees overall company vision."
  }
];

let clientPromise = null;
const uri = process.env.MONGODB_URI;

// In-memory flag to ensure we only verify/seed once per server process,
// avoiding 6 sequential roundtrips on every single request.
let isDatabaseSeededCached = false;

if (uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))) {
  try {
    const options = {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      maxPoolSize: 10,
    };

    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      const client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  } catch (error) {
    console.error("[MongoDB] Failed to initialize MongoDB client.", error);
  }
}

/**
 * Ensures all collections in MongoDB Atlas have live, editable data.
 * Seeds data directly into the database if collections are missing or empty.
 */
export async function ensureDatabaseSeeded(db, force = false) {
  if (!db) return;
  if (isDatabaseSeededCached && !force) return;

  try {
    const [existingContent, foundersCount, projectsCount, caseStudiesCount, testimonialsCount, chatbotCount] = await Promise.all([
      db.collection("content").findOne({}),
      db.collection("founders").countDocuments({}),
      db.collection("projects").countDocuments({}),
      db.collection("case_studies").countDocuments({}),
      db.collection("testimonials").countDocuments({}),
      db.collection("chatbot_knowledge").countDocuments({})
    ]);

    const seedTasks = [];

    // 1. Content (hero, about, contact, stats, estimator, services, process, marquee)
    if (!existingContent || force) {
      seedTasks.push(
        db.collection("content").updateOne(
          {},
          {
            $set: {
              hero: localMockDb.hero,
              about: localMockDb.about,
              contact: localMockDb.contact,
              stats: localMockDb.stats,
              estimator: localMockDb.estimator,
              services: localMockDb.services,
              process: localMockDb.process,
              marquee: localMockDb.marquee,
              philosophy: localMockDb.philosophy,
              updatedAt: new Date()
            },
            $setOnInsert: { createdAt: new Date() }
          },
          { upsert: true }
        )
      );
    } else {
      const updates = {};
      if (!existingContent.estimator) updates.estimator = localMockDb.estimator;
      if (!existingContent.services) updates.services = localMockDb.services;
      if (!existingContent.process) updates.process = localMockDb.process;
      if (!existingContent.marquee) updates.marquee = localMockDb.marquee;
      if (!existingContent.philosophy) updates.philosophy = localMockDb.philosophy;
      if (!existingContent.hero?.caseStudiesHighlight && localMockDb.hero.caseStudiesHighlight) {
        updates["hero.caseStudiesHighlight"] = localMockDb.hero.caseStudiesHighlight;
      }
      if (!existingContent.hero?.studioLocation && localMockDb.hero.studioLocation) {
        updates["hero.studioLocation"] = localMockDb.hero.studioLocation;
      }
      if (!existingContent.hero?.pillarsText && localMockDb.hero.pillarsText) {
        updates["hero.pillarsText"] = localMockDb.hero.pillarsText;
      }
      if (Object.keys(updates).length > 0) {
        seedTasks.push(db.collection("content").updateOne({}, { $set: updates }));
      }
    }

    // 2. Founders
    if (foundersCount === 0 || force) {
      seedTasks.push((async () => {
        if (force) await db.collection("founders").deleteMany({});
        await db.collection("founders").insertMany(localMockDb.founders);
      })());
    }

    // 3. Projects
    if (projectsCount === 0 || force) {
      seedTasks.push((async () => {
        if (force) await db.collection("projects").deleteMany({});
        await db.collection("projects").insertMany(localMockDb.projects);
      })());
    }

    // 4. Case Studies
    if (caseStudiesCount === 0 || force) {
      seedTasks.push((async () => {
        if (force) await db.collection("case_studies").deleteMany({});
        await db.collection("case_studies").insertMany(localMockDb.caseStudies);
      })());
    }

    // 5. Testimonials
    const hasPlaceholderTestimonials = await db.collection("testimonials").findOne({ author: "Client A" });
    if (testimonialsCount === 0 || force || hasPlaceholderTestimonials) {
      seedTasks.push((async () => {
        await db.collection("testimonials").deleteMany({});
        await db.collection("testimonials").insertMany(defaultTestimonials);
      })());
    }

    // 6. Chatbot Knowledge
    if (chatbotCount === 0 || force) {
      seedTasks.push((async () => {
        if (force) await db.collection("chatbot_knowledge").deleteMany({});
        await db.collection("chatbot_knowledge").insertMany(defaultChatbotKnowledge);
      })());
    }

    if (seedTasks.length > 0) {
      await Promise.all(seedTasks);
      console.log("[MongoDB] Database seed & sync completed successfully.");
    }

    isDatabaseSeededCached = true;
  } catch (error) {
    console.error("[MongoDB] ensureDatabaseSeeded error:", error);
  }
}

/**
 * Returns connected MongoDB database instance and guarantees data is seeded
 */
export async function getDb(forceSeed = false) {
  if (!clientPromise) return null;
  try {
    const client = await clientPromise;
    const db = client.db("intelliverse");
    if (!isDatabaseSeededCached || forceSeed) {
      await ensureDatabaseSeeded(db, forceSeed);
    }
    return db;
  } catch (err) {
    console.error("[MongoDB] Connection error in getDb:", err);
    return null;
  }
}

export { clientPromise };
