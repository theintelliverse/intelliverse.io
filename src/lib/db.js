import { MongoClient } from "mongodb";

export const defaultTestimonials = [
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client A" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client B" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client C" },
  { text: "They transformed our vision into a reality. Exceptional work!", author: "Client D" },
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client E" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client F" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client G" }
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
  },
  founders: [
    {
      name: "Dhruvil Thummar",
      role: "Co-founder & CTO",
      tagline: "Engineering scalable systems & leading technical vision",
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
      tagline: "Driving brand strategy & marketing excellence",
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
      tagline: "Visionary leadership & strategic business growth",
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

    // 1. Content (hero, about, contact, stats, estimator)
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
    if (testimonialsCount === 0 || force) {
      seedTasks.push((async () => {
        if (force) await db.collection("testimonials").deleteMany({});
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
