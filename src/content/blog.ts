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
    slug: "what-is-the-intelliverse",
    title: "What is The Intelliverse? Our Story and What We Build",
    description:
      "The official founding story, engineering philosophy, and architectural capabilities of The Intelliverse in Ahmedabad, Gujarat, India.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-10-05",
    updatedDate: "2026-10-05",
    readTime: "10 min read",
    category: "Brand Story & Architecture",
  },
  {
    slug: "how-much-does-custom-software-cost-in-india",
    title: "How Much Does Custom Software Cost in India? (2026 Transparent Guide)",
    description:
      "A realistic, transparent cost breakdown of custom software development in India: typical hourly rates, MVP budgets, multi-tenant SaaS tiers, and hidden cost traps to avoid.",
    author: "Dhruvil Thummar",
    authorRole: "Co-founder & CTO",
    publishedDate: "2026-03-10",
    updatedDate: "2026-10-05",
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
    updatedDate: "2026-10-05",
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
    updatedDate: "2026-10-05",
    readTime: "8 min read",
    category: "Healthcare Engineering",
  },
];
