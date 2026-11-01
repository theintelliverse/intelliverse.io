export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  category: string;
  images?: string[];
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "b2b-saas-multi-tenancy-postgresql-rls-vs-schemas",
    title: "B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas",
    description:
      "A deep architectural benchmark comparing Postgres Row-Level Security (RLS), schema-per-tenant, and database-per-tenant for high-scale multi-tenant SaaS platforms.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-11-01",
    updatedDate: "2026-11-01",
    readTime: "11 min read",
    category: "Database & SaaS Architecture",
  },
  {
    slug: "appointory-healthcare-saas-architecture-case-study",
    title: "Case Study: How We Built Appointory — Real-Time Clinic Queue & OPD Token Dispatch Engine",
    description:
      "An engineering breakdown of Appointory (appointory.in): sub-50ms WebSocket queue synchronization, automated WhatsApp patient arrival triggers, and zero-wait doctor OPD dispatch.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "12 min read",
    category: "Project Case Study · Healthcare",
  },
  {
    slug: "vrix-jewels-headless-shopify-nextjs-case-study",
    title: "Case Study: How We Engineered Vrix Jewellery — Sub-Second Headless Storefront with Next.js & Shopify",
    description:
      "How The Intelliverse built vrixjewels.com: Next.js headless architecture, dynamic multi-currency geolocation checkout, high-res diamond visualizers, and 99 Core Web Vitals.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "11 min read",
    category: "Project Case Study · E-Commerce",
  },
  {
    slug: "what-is-the-intelliverse",
    title: "What is The Intelliverse? Our Story and What We Build",
    description:
      "The official founding story, engineering philosophy, and architectural capabilities of The Intelliverse in Ahmedabad, Gujarat, India.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-05",
    updatedDate: "2026-10-31",
    readTime: "10 min read",
    category: "Brand Story & Architecture",
  },
  {
    slug: "top-software-development-companies-ahmedabad",
    title: "Top Software Development Companies in Ahmedabad (2026 Tech Guide)",
    description:
      "A comprehensive guide to the leading software development and IT services companies in Ahmedabad, Gujarat. Discover how The Intelliverse leads in Next.js web systems, custom SaaS engineering, and enterprise architecture.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "9 min read",
    category: "Industry Benchmarks",
  },
  {
    slug: "nextjs-15-enterprise-saas-architecture",
    title: "Next.js 15 for Enterprise SaaS: Server Components, Turbopack & Multi-Tenancy",
    description:
      "An architectural deep-dive by The Intelliverse CTO on engineering production SaaS platforms with Next.js 15, React 19 Server Components, and edge routing.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "11 min read",
    category: "Web Architecture",
  },
  {
    slug: "how-to-build-saas-mvp-india-guide",
    title: "How to Build a Scalable SaaS MVP in 2026: The Founder’s Engineering Blueprint",
    description:
      "From database schemas and RBAC auth to multi-tenant isolation and cloud deployments: a technical guide for founders building software products.",
    author: "Jal Anghan",
    authorRole: "Founder & Director",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "10 min read",
    category: "SaaS Engineering",
  },
  {
    slug: "cloud-infrastructure-cost-optimization-guide",
    title: "Cloud Cost Optimization: How We Cut AWS & Cloudflare Bills by 60%",
    description:
      "Practical infrastructure patterns from The Intelliverse: smart database connection pooling, edge caching, serverless compute, and container right-sizing.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "8 min read",
    category: "Cloud & DevOps",
  },
  {
    slug: "ai-agent-automation-workflows-for-business",
    title: "Applied AI & Agentic Workflows for Modern Business: Beyond Simple Chatbots",
    description:
      "How modern enterprises deploy autonomous AI agent pipelines, Retrieval-Augmented Generation (RAG), and vector databases to automate complex operations.",
    author: "Rudra Kankotiya",
    authorRole: "Co-founder & CMO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "9 min read",
    category: "Applied AI & Data",
  },
  {
    slug: "how-much-does-custom-software-cost-in-india",
    title: "How Much Does Custom Software Cost in India? (2026 Transparent Guide)",
    description:
      "A realistic, transparent cost breakdown of custom software development in India: typical hourly rates, MVP budgets, multi-tenant SaaS tiers, and hidden cost traps to avoid.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-03-10",
    updatedDate: "2026-10-31",
    readTime: "7 min read",
    category: "Cost & Scoping",
  },
  {
    slug: "web-app-vs-mobile-app-how-to-choose",
    title: "Web App vs Mobile App: How to Choose for Your Product in 2026",
    description:
      "A technical decision framework comparing responsive Next.js web applications, Progressive Web Apps (PWAs), and native iOS/Android apps for modern startups.",
    author: "Jal Anghan",
    authorRole: "Founder & Director",
    publishedDate: "2026-03-20",
    updatedDate: "2026-10-31",
    readTime: "6 min read",
    category: "Architecture Strategy",
  },
  {
    slug: "how-to-digitise-a-clinic-appointment-queue",
    title: "How to Digitise a Clinic's Appointment Queue: An Architectural Blueprint",
    description:
      "Lessons learned from engineering Appointory: event-driven WebSocket queues, dynamic consultation pace estimation, and patient arrival notifications.",
    author: "Rudra Kankotiya",
    authorRole: "Co-founder & CMO",
    publishedDate: "2026-04-05",
    updatedDate: "2026-10-31",
    readTime: "8 min read",
    category: "Healthcare Engineering",
  },
  {
    slug: "modern-full-stack-architecture-react-node-postgresql",
    title: "Modern Full-Stack Architecture in 2026: Next.js, Node.js, and PostgreSQL at Scale",
    description:
      "How The Intelliverse builds resilient, production-grade full-stack web applications combining Next.js 15, Node.js micro-services, and ACID-compliant PostgreSQL with connection pooling.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "10 min read",
    category: "Full-Stack Systems",
  },
  {
    slug: "react-native-vs-flutter-performance-comparison",
    title: "React Native vs Flutter in 2026: Benchmark Performance, Dev Velocity & Native Bridges",
    description:
      "A realistic engineering benchmark comparing React Native (Fabric architecture) and Flutter (Impeller engine) for cross-platform iOS and Android apps.",
    author: "Jal Anghan",
    authorRole: "Founder & Director",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "9 min read",
    category: "Mobile Engineering",
  },
  {
    slug: "zero-trust-security-architecture-for-modern-web-apps",
    title: "Zero-Trust Security for Modern Web Applications: Auth, Secrets, and API Hardening",
    description:
      "Defending modern cloud web applications against credential stuffing, token forgery, SSRF, and data leaks using zero-trust network boundaries and cryptographic verification.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "11 min read",
    category: "Cybersecurity & SecOps",
  },
  {
    slug: "modular-monolith-vs-microservices-guide",
    title: "Modular Monolith vs Microservices: Why Most Startups Choose Wrong",
    description:
      "Why distributed microservices often fail early-stage startups and how domain-driven modular monoliths deliver 10x faster shipping velocity with zero network latency overhead.",
    author: "Jal Anghan",
    authorRole: "Founder & Director",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "8 min read",
    category: "Software Architecture",
  },
  {
    slug: "automated-ci-cd-pipelines-docker-kubernetes-guide",
    title: "Automated CI/CD Pipelines with Docker, GitHub Actions, and Kubernetes: Production Blueprint",
    description:
      "Step-by-step production blueprint for zero-downtime rolling deployments, immutable container registries, Helm charts, and automated testing pipelines.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "10 min read",
    category: "DevOps & Cloud",
  },
  {
    slug: "postgresql-vs-mongodb-vs-vectordb-database-guide",
    title: "Choosing the Right Database in 2026: PostgreSQL, MongoDB, or Vector Search?",
    description:
      "An engineering guide to database selection: ACID relational consistency with pgvector, document flexibility with MongoDB, or specialized vector engines like Pinecone & Qdrant.",
    author: "Rudra Kankotiya",
    authorRole: "Co-founder & CMO",
    publishedDate: "2026-10-31",
    updatedDate: "2026-10-31",
    readTime: "9 min read",
    category: "Database Engineering",
  },
];

