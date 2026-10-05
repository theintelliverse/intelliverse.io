/**
 * The Intelliverse — Centralized SEO & AEO Configuration
 * 
 * Non-developers can inspect and edit page titles, meta descriptions, 
 * target keywords, and question-and-answer pairs here.
 * 
 * Target Keywords:
 * - "software development company in Ahmedabad"
 * - "web development company Ahmedabad"
 * - "IT services Ahmedabad"
 * - "custom software development India"
 * - "SaaS development Ahmedabad"
 */

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
  h1: string;
  heroAnswer: string;
  faqs?: { question: string; answer: string }[];
}

export const seoConfig: Record<string, PageSeoConfig> = {
  home: {
    title: "Software & Web Development Company in Ahmedabad — The Intelliverse",
    description:
      "Engineering-first software development company in Ahmedabad, Gujarat. Custom SaaS platforms, Next.js web applications, and enterprise IT services built to scale.",
    canonicalPath: "/",
    keywords: [
      "software development company in Ahmedabad",
      "web development company Ahmedabad",
      "IT services Ahmedabad",
      "custom software development India",
      "SaaS development Ahmedabad",
      "Next.js agency Ahmedabad",
    ],
    h1: "Software, Web & IT Services, Built Like a Craft.",
    heroAnswer:
      "The Intelliverse is an engineering-first software development, web architecture, and IT services company headquartered in Ahmedabad, Gujarat, India. We design, build, and deploy production-grade SaaS platforms, Next.js web systems, and resilient cloud architectures.",
    faqs: [
      {
        question: "What does The Intelliverse do?",
        answer:
          "The Intelliverse is an engineering-first technology company in Ahmedabad, Gujarat. We build custom SaaS platforms, modern Next.js web applications, mobile applications, and resilient cloud IT architectures for startups and scaling businesses worldwide.",
      },
      {
        question: "Where is The Intelliverse located?",
        answer:
          "The Intelliverse is based in Ahmedabad, Gujarat, India (Coordinates: 23.0225° N, 72.5714° E). We collaborate with clients locally in Ahmedabad and globally across India, North America, the UK, Europe, and the Middle East.",
      },
      {
        question: "How much does custom software development cost in India?",
        answer:
          "Indicative project pricing at The Intelliverse starts from ₹15,000 for focused landing architectures, ₹45,000 to ₹1.5L for full-scale Next.js web apps, and ₹1.5L to ₹8L+ for comprehensive multi-tenant SaaS platforms, depending on scope and integrations.",
      },
      {
        question: "Which technologies does The Intelliverse specialize in?",
        answer:
          "Our core engineering stack comprises Next.js 15, React 19, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, and Cloudflare edge networks.",
      },
      {
        question: "Who are the founders of The Intelliverse?",
        answer:
          "The Intelliverse was founded by Dhruvil Thummar (Co-founder & CTO), Rudra Kankotiya (Co-founder & CMO), and Jal Anghan (Founder & Director).",
      },
    ],
  },

  locationAhmedabad: {
    title: "Top Software Development Company in Ahmedabad | The Intelliverse",
    description:
      "Looking for a software development company in Ahmedabad? The Intelliverse provides custom web systems, SaaS architecture, and IT services for modern businesses.",
    canonicalPath: "/software-development-company-ahmedabad",
    keywords: [
      "software development company in Ahmedabad",
      "software company Ahmedabad",
      "web development company Ahmedabad",
      "IT services Ahmedabad",
      "best IT company Ahmedabad Gujarat",
      "SaaS developers Ahmedabad",
    ],
    h1: "Software Development Company in Ahmedabad, Gujarat",
    heroAnswer:
      "The Intelliverse is a premier software development and IT services company based in Ahmedabad, Gujarat. We help local enterprises and international brands design, engineer, and deploy high-performance web applications, custom SaaS platforms, and secure cloud infrastructure.",
    faqs: [
      {
        question: "Why choose a software development company in Ahmedabad like The Intelliverse?",
        answer:
          "Ahmedabad has grown into a major Indian technology corridor. Working with The Intelliverse gives you direct access to senior full-stack architects, transparent sprint delivery, direct communication with technical founders, and competitive global pricing without offshore quality compromises.",
      },
      {
        question: "What industries in Ahmedabad and Gujarat do you build software for?",
        answer:
          "We build bespoke software systems for healthcare clinics, pharmaceutical suppliers, gems and jewellery e-commerce brands, logistics networks, manufacturing supply chains, and B2B SaaS startups.",
      },
      {
        question: "Can we schedule an in-person meeting in Ahmedabad?",
        answer:
          "Yes. While we work digitally with international partners, we readily host in-person architecture planning sessions, project scoping workshops, and technical reviews across Ahmedabad.",
      },
      {
        question: "How do you guarantee project delivery timelines?",
        answer:
          "We operate in 2-week agile sprints with continuous staging deployments. Clients receive live access to code repositories, test environments, and direct founder reviews at every milestone.",
      },
    ],
  },

  servicesWeb: {
    title: "Web Development Company Ahmedabad — Custom Next.js Architecture",
    description:
      "Leading web development company in Ahmedabad. Fast, SEO-optimized Next.js web applications, headless CMS integrations, and modern UI engineered for conversion.",
    canonicalPath: "/services/web-development",
    keywords: [
      "web development company Ahmedabad",
      "Next.js development company Ahmedabad",
      "custom web development India",
      "React web developers Ahmedabad",
      "responsive web design Ahmedabad",
    ],
    h1: "Web Development & Architecture Services",
    heroAnswer:
      "We build ultra-fast, accessible, and search-optimized web applications with Next.js, React, and TypeScript. Every web platform is crafted from first principles to achieve sub-second Core Web Vitals, bulletproof uptime, and measurable conversion gains.",
    faqs: [
      {
        question: "What web development technologies do you use?",
        answer:
          "We build primarily with Next.js 15 App Router, React 19, TypeScript, Vanilla CSS, Tailwind CSS, and headless backends like Node.js, Supabase, and PostgreSQL.",
      },
      {
        question: "Will our website be optimized for Core Web Vitals and SEO?",
        answer:
          "Yes. Every build undergoes strict performance auditing targeting LCP < 2.5s, CLS < 0.1, INP < 200ms, semantic HTML5 hierarchy, OpenGraph, JSON-LD structured data, and automated sitemaps.",
      },
      {
        question: "How long does a custom web development project take?",
        answer:
          "A targeted marketing or product landing architecture takes approximately 2–3 weeks. Complex corporate portals with headless CMS, authentication, and custom integrations typically take 4–8 weeks.",
      },
    ],
  },

  servicesSoftware: {
    title: "Custom Software Development India & SaaS Engineering — Ahmedabad",
    description:
      "Reliable custom software development in India. We engineer scalable multi-tenant SaaS platforms, REST/GraphQL APIs, and enterprise cloud software.",
    canonicalPath: "/services/software-engineering",
    keywords: [
      "custom software development India",
      "SaaS development Ahmedabad",
      "software development company in Ahmedabad",
      "SaaS product engineering India",
      "full stack software engineers",
    ],
    h1: "Custom Software Engineering & SaaS Architecture",
    heroAnswer:
      "From database indexing to distributed background worker queues, we engineer custom software and SaaS platforms designed to handle growth without requiring architectural rewrites every eighteen months.",
    faqs: [
      {
        question: "What is your approach to SaaS platform development?",
        answer:
          "We begin with data model design, multi-tenant isolation, role-based access control (RBAC), and transactional integrity. We build clean API boundaries with automated test coverage and zero-downtime CI/CD deployment pipelines.",
      },
      {
        question: "Do clients retain 100% intellectual property (IP) of the source code?",
        answer:
          "Yes. All custom code, database schemas, CI/CD scripts, and architecture assets are 100% owned by the client upon project completion.",
      },
      {
        question: "Can you take over and refactor an existing software codebase?",
        answer:
          "Yes. We frequently conduct code audits, performance profiling, security vulnerability assessments, and incremental modernization without interrupting ongoing business operations.",
      },
    ],
  },

  servicesIT: {
    title: "IT Services Ahmedabad — Cloud DevOps & Architecture Support",
    description:
      "Comprehensive IT services in Ahmedabad, Gujarat. AWS cloud migrations, Kubernetes clusters, Dockerized CI/CD, and 24/7 infrastructure monitoring.",
    canonicalPath: "/services/it-architecture-support",
    keywords: [
      "IT services Ahmedabad",
      "cloud architecture services India",
      "DevOps consulting Ahmedabad",
      "AWS cloud migration Gujarat",
      "enterprise IT support Ahmedabad",
    ],
    h1: "Cloud Architecture, DevOps & IT Infrastructure",
    heroAnswer:
      "Resilient, automated cloud infrastructure engineered for zero-downtime deployments. We design and manage AWS, Docker, Kubernetes, and Cloudflare configurations with proactive security hardening.",
    faqs: [
      {
        question: "What cloud platforms do you support?",
        answer:
          "We primarily support Amazon Web Services (AWS), Google Cloud Platform (GCP), DigitalOcean, and Cloudflare Edge networks, with containerized orchestration via Docker and Kubernetes.",
      },
      {
        question: "How do you handle backups and disaster recovery?",
        answer:
          "We implement automated point-in-time recovery (PITR) for relational databases, cross-region S3 object replication, and Infrastructure-as-Code (Terraform) to rebuild full environments in minutes.",
      },
    ],
  },

  servicesAI: {
    title: "Applied AI, Data & Automation Workflows — The Intelliverse",
    description:
      "Enterprise AI agent workflows, Retrieval-Augmented Generation (RAG), and intelligent process automation built for measurable ROI.",
    canonicalPath: "/services/ai-data-robotics-iot",
    keywords: [
      "AI automation company Ahmedabad",
      "applied AI development India",
      "LLM agent workflows Gujarat",
      "RAG development company",
      "AI integration services",
    ],
    h1: "Applied AI, Data Systems & Automation Workflows",
    heroAnswer:
      "We build practical AI systems that solve real operational bottlenecks: autonomous triage agents, document understanding pipelines, and private knowledge-base RAG workflows connected directly to internal databases.",
    faqs: [
      {
        question: "How do you ensure data privacy when deploying AI systems?",
        answer:
          "We deploy private VPC models or enterprise API endpoints with zero-data-retention agreements, ensuring your proprietary customer data is never used to train public LLM models.",
      },
      {
        question: "What is RAG (Retrieval-Augmented Generation)?",
        answer:
          "RAG grounds language models with your organization's real documents, manuals, and database records, delivering accurate, citable answers while preventing hallucinations.",
      },
    ],
  },

  workAppointory: {
    title: "Appointory Case Study — Healthcare SaaS Queue Architecture",
    description:
      "How The Intelliverse architected Appointory: automated clinic queue coordination, real-time consultation dispatch, and encrypted diagnostic health lockers.",
    canonicalPath: "/work/appointory",
    keywords: [
      "healthcare SaaS development",
      "clinic queue management software",
      "Appointory case study",
      "software development company in Ahmedabad",
    ],
    h1: "Appointory — Healthcare SaaS Clinic Queue Platform",
    heroAnswer:
      "Appointory is a specialized healthcare SaaS platform that eliminates waiting room bottlenecks. The Intelliverse engineered the full-stack architecture, real-time arrival notification triggers, and an end-to-end encrypted health records locker.",
    faqs: [
      {
        question: "What technical challenge did Appointory solve?",
        answer:
          "Traditional clinic booking leads to crowded waiting rooms and unpredictable doctor delays. Appointory coordinates arrival windows dynamically based on real-time doctor consultation paces.",
      },
      {
        question: "What is the tech stack behind Appointory?",
        answer:
          "Appointory runs on Next.js 15, Node.js, MongoDB, Redis pub/sub for real-time socket events, Cloud Messaging API for SMS/WhatsApp triggers, and Tailwind CSS.",
      },
    ],
  },

  workVrix: {
    title: "Vrix Jewellery Case Study — Headless Luxury E-Commerce",
    description:
      "How The Intelliverse engineered an ultra-fast headless e-commerce storefront with multi-currency checkout and personal AI jewellery curation.",
    canonicalPath: "/work/vrix",
    keywords: [
      "headless e-commerce development",
      "luxury jewellery website Next.js",
      "Vrix Jewellery case study",
      "Shopify Storefront API agency India",
    ],
    h1: "Vrix Jewellery — International Luxury E-Commerce",
    heroAnswer:
      "Vrix is an international luxury jewellery storefront engineered for overseas buyers. The Intelliverse delivered a headless Next.js frontend with sub-second page transitions, dynamic currency conversion, and instant catalog search.",
    faqs: [
      {
        question: "Why did Vrix transition to a headless architecture?",
        answer:
          "Standard Shopify themes struggled with international load times and bespoke diamond filter interactions. Headless Next.js reduced TTFB by over 60% and unlocked custom curation workflows.",
      },
      {
        question: "What tech stack powers Vrix Jewellery?",
        answer:
          "Vrix utilizes Next.js App Router, Shopify Storefront API, Tailwind CSS, Cloudflare edge caching, and multi-currency payment routing.",
      },
    ],
  },

  about: {
    title: "About The Intelliverse — Engineering Studio Ahmedabad, Gujarat",
    description:
      "Learn about The Intelliverse: our philosophy, founders Dhruvil Thummar, Rudra Kankotiya, and Jal Anghan, and our commitment to architectural craft.",
    canonicalPath: "/about",
    keywords: [
      "About The Intelliverse",
      "software studio Ahmedabad",
      "Dhruvil Thummar",
      "Rudra Kankotiya",
      "Jal Anghan",
      "engineering first tech company Gujarat",
    ],
    h1: "About The Intelliverse: Engineering First, Always.",
    heroAnswer:
      "The Intelliverse is an independent technology company founded in Ahmedabad, Gujarat. We believe that great software is built like a craft: with rigorous architecture, transparent communication, and zero technical bloat.",
    faqs: [
      {
        question: "Who leads The Intelliverse?",
        answer:
          "The studio is directed by founders Dhruvil Thummar (CTO), Rudra Kankotiya (CMO), and Jal Anghan (Director).",
      },
      {
        question: "What is your engineering philosophy?",
        answer:
          "We refuse to build fragile throwaway code. We engineer modular, maintainable architectures that allow businesses to scale without rewriting their core infrastructure every year.",
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions (FAQ) — The Intelliverse",
    description:
      "Answers to common questions about hiring The Intelliverse for software engineering, web development, SaaS architecture, pricing, and timelines.",
    canonicalPath: "/faq",
    keywords: [
      "The Intelliverse FAQ",
      "software development pricing India",
      "hire developers Ahmedabad",
      "IT consultation questions",
    ],
    h1: "Frequently Asked Questions About Our Services & Process",
    heroAnswer:
      "Find transparent answers to common questions about our software development services, project pricing, technology stack, engagement models, and delivery timelines.",
  },

  blog: {
    title: "Engineering Blog & Tech Insights — The Intelliverse",
    description:
      "In-depth architectural guides, cost breakdowns, and technical perspectives on software engineering, Next.js, cloud systems, and SaaS development.",
    canonicalPath: "/blog",
    keywords: [
      "software development blog India",
      "Next.js engineering guide",
      "SaaS cost breakdown India",
      "web development insights",
    ],
    h1: "The Intelliverse Engineering & Architectural Field Notes",
    heroAnswer:
      "Practical engineering field notes, software cost breakdowns, and architecture guides written by the technical team at The Intelliverse in Ahmedabad.",
  },
};
