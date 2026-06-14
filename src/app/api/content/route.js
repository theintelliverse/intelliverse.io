import { NextResponse } from "next/server";
import { clientPromise, localMockDb } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

// Default list structures if the database collections are empty
const defaultTestimonials = [
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client A" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client B" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client C" },
  { text: "They transformed our vision into a reality. Exceptional work!", author: "Client D" },
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client E" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client F" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client G" }
];

const defaultStats = { projects: NaN, satisfaction: NaN, clients: NaN };

const defaultChatbotKnowledge = [
  // Identity & About
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
    keywords: "values, culture, principles, work ethic, belief",
    response: "At The Intelliverse, we are guided by:\n* ✅ **Innovation First** — We constantly explore the latest tech\n* ✅ **Client-Centric** — Your success is our success\n* ✅ **Transparency** — Open communication at every step\n* ✅ **Quality Over Quantity** — We deliver right, not just fast\n* ✅ **Continuous Growth** — We learn, iterate, and improve always"
  },

  // Services
  {
    keywords: "service, what do you do, offer, capabilities, what can you do, how can you help",
    response: "We offer three core services:\n\n* 🌐 **Web Development** — Beautiful, responsive, high-performing websites\n* 💻 **Software Development** — Custom apps to streamline your operations\n* 🔧 **IT Services** — Reliable IT support to keep your business running\n\nAll solutions are custom-built, not templated. Just say **\"get a quote\"** to start!"
  },
  {
    keywords: "web development, website, web app, web application, frontend, backend, landing page",
    response: "Our **Web Development** services include:\n* Custom **Next.js & React** websites with blazing speed\n* **Responsive, mobile-first** design for all devices\n* **E-Commerce** storefronts with payment integration\n* Admin dashboards & CMS platforms\n* **SEO-optimized** architecture from day one\n* API integrations and third-party services"
  },
  {
    keywords: "software development, custom software, application, app development, mobile app, android, ios",
    response: "Our **Software Development** services include:\n* Native **iOS & Android** mobile applications\n* **SaaS platforms** and enterprise portals\n* Custom business automation tools\n* API integrations and microservice architectures\n* **Cloud-native** applications with CI/CD pipelines\n* Real-time dashboards and analytics systems"
  },
  {
    keywords: "it service, it support, infrastructure, devops, cloud, hosting, server, maintenance",
    response: "Our **IT Services** include:\n* Managed IT support and helpdesk services\n* **Cloud migrations** — AWS, Vercel, Firebase\n* DevOps pipelines with Docker and CI/CD\n* System monitoring, security audits\n* Database management and optimization\n* Server scaling and performance tuning"
  },
  {
    keywords: "ecommerce, e-commerce, online store, shop, shopify, payment, woocommerce",
    response: "We build **powerful E-Commerce platforms** including:\n* Custom product catalogs and inventory management\n* Secure payment gateways (Stripe, Razorpay, PayPal)\n* Cart, wishlist, and order tracking systems\n* Admin dashboards for order management\n* Mobile-responsive shopping experiences\n* SEO and performance optimization"
  },
  {
    keywords: "saas, software as a service, subscription, platform, portal",
    response: "We specialize in building **SaaS platforms** including:\n* Multi-tenant architecture with role-based access\n* Subscription billing and plan management\n* Real-time data dashboards and analytics\n* Automated notifications (Email, WhatsApp, SMS)\n* Secure Health Lockers, CRM, HRM systems\n* White-label solutions for resellers\n\nOur **Appointory** project is a live example of a SaaS healthcare portal we built!"
  },

  // Tech Stack
  {
    keywords: "tech, stack, technology, react, next, node, mongodb, tools, framework, language, programming",
    response: "Our primary tech stack:\n* **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, TypeScript\n* **Backend**: Node.js, Express, Next.js API Routes\n* **Database**: MongoDB, PostgreSQL, Firebase Firestore\n* **Cloud & DevOps**: AWS, Vercel, Docker, GitHub Actions\n* **Mobile**: React Native, Flutter\n* **Languages**: JavaScript, TypeScript, Python"
  },

  // Founders
  {
    keywords: "founder, founders, team, leader, co-founder, cto, cmo, director, who runs, who leads, who started, meet the team",
    response: "Meet the visionary founders of **The Intelliverse**:\n\n👨‍💻 **Dhruvil Thummar** — Co-founder & CTO\nLeads technical architecture and all engineering operations.\n\n📢 **Rudra Kankotiya** — Co-founder & CMO\nDrives marketing strategy, brand identity and client growth.\n\n🎯 **Jal Anghan** — Founder & Director\nProvides strategic direction and oversees overall company vision."
  },
  {
    keywords: "dhruvil, thummar, dhruvil thummar, cto, chief technology",
    response: "**Dhruvil Thummar** is the **Co-founder & CTO** of The Intelliverse.\n\nHe leads all technical architecture, development strategy, and engineering operations — ensuring every product we build is scalable, secure, and state-of-the-art. Connect with him on LinkedIn!"
  },
  {
    keywords: "rudra, kankotiya, rudra kankotiya, cmo, chief marketing",
    response: "**Rudra Kankotiya** is the **Co-founder & CMO** of The Intelliverse.\n\nHe drives all marketing strategies, brand identity, content, and client acquisition — ensuring The Intelliverse reaches the right businesses with the right message. Connect with him on LinkedIn!"
  },
  {
    keywords: "jal, anghan, jal anghan, director, founder director",
    response: "**Jal Anghan** is the **Founder & Director** of The Intelliverse.\n\nHe provides high-level strategic direction, oversees all business operations, and guides the company's long-term vision and partnerships. Connect with him on LinkedIn!"
  },

  // Portfolio
  {
    keywords: "project, portfolio, work, worked, delivered, case study, appointory, saas portal, healthcare",
    response: "Our flagship portfolio project is **Appointory** — a SaaS healthcare portal we designed and built from scratch:\n\n* ⚡ Automated appointment queues\n* 📱 WhatsApp status alerts for patients\n* 🏥 Secure Health Locker for medical records\n* 📊 Real-time admin dashboard\n* ⭐ Rated **5/5** by our client\n\nAsk me to *\"show worked projects\"* to see the full live database of our work!"
  },

  // Contact
  {
    keywords: "contact, email, phone, support, reach, touch, get in touch, how to contact, connect",
    response: "📬 **Reach us anytime:**\n* **Email**: theintelliverse@gmail.com\n* **Contact Form**: Scroll to the Contact section on this page\n* **LinkedIn**: Connect with our founders directly\n\nWe respond to **all inquiries within 24 hours**!\n\nWant a project quote? Just say **\"get a quote\"** and I'll capture your details right here. 🚀"
  },

  // Pricing
  {
    keywords: "price, pricing, cost, how much, budget, affordable, cheap, rate, quote, estimate, custom project",
    response: "We provide **custom quotes** tailored to your exact requirements — no one-size-fits-all pricing.\n\nTypical ranges:\n* **Landing Pages**: Starts from ₹15,000\n* **Web Apps / Portals**: ₹50,000 – ₹2,00,000+\n* **Mobile Apps**: ₹80,000 – ₹3,00,000+\n* **Enterprise Systems**: Custom pricing\n\nWant a personalized estimate? Say **\"get a quote\"** and I'll connect you with our team! 💼"
  },

  // Timeline
  {
    keywords: "time, timeline, duration, how long, delivery, deadline, when, fast, quick",
    response: "⏱️ **Typical project timelines:**\n* **Landing Pages / MVPs**: 2–3 weeks\n* **Custom Web Apps**: 6–10 weeks\n* **SaaS Platforms**: 10–16 weeks\n* **Enterprise Portals**: 16+ weeks\n\nWe send **weekly sprint updates** and demos throughout — you always know exactly where your project stands."
  },

  // Process
  {
    keywords: "process, how do you work, workflow, methodology, approach, agile, steps, sprint",
    response: "Our **6-step development process:**\n\n1. 🔍 **Discovery** — Deep-dive into your goals and requirements\n2. 🎨 **UI/UX Design** — Wireframes and interactive prototypes\n3. ⚙️ **Development** — Agile sprints with weekly demos\n4. 🧪 **Testing & QA** — Cross-device and performance testing\n5. 🚀 **Launch** — Deployment with monitoring and analytics\n6. 🔧 **Post-Launch** — Ongoing support, updates, and scaling\n\nTransparency and communication are central to how we work."
  },

  // Why choose us
  {
    keywords: "why, choose, different, better, advantage, unique, special, benefit, compare",
    response: "Why **The Intelliverse** stands out:\n\n* ✅ **100% Custom** — No templates, tailored to your brand\n* ✅ **Modern Tech Stack** — Next.js, React, Node, MongoDB\n* ✅ **Agile Process** — Weekly sprints with transparent updates\n* ✅ **100% Client Satisfaction** — Proven track record\n* ✅ **Post-Launch Support** — We're with you after go-live\n* ✅ **Competitive Pricing** — Premium quality at fair rates\n* ✅ **SEO & Performance First** — Every product is optimized out of the box"
  },

  // Hiring / Careers
  {
    keywords: "hire, hiring, job, career, work for, join, internship, position, vacancy, apply, opportunity",
    response: "🎉 **Join The Intelliverse Team!**\n\nWe're always looking for talented:\n* 👨‍💻 Full-stack Developers (React, Node.js)\n* 🎨 UI/UX Designers\n* 📢 Digital Marketing Specialists\n* 📱 Mobile App Developers\n\nSend your resume to **theintelliverse@gmail.com** with subject: *\"Career Inquiry — [Your Role]\"* and we'll get back to you promptly!"
  },

  // Location
  {
    keywords: "where, location, based, office, address, country, city, india, remote",
    response: "🌍 **The Intelliverse** operates as a **digital-first company** — we work seamlessly with clients across India and globally.\n\nAll our work is delivered remotely with clear communication, regular demos, and full transparency. Reach us anytime at **theintelliverse@gmail.com**."
  },

  // Support / Maintenance
  {
    keywords: "support, maintenance, update, bug, fix, help, post-launch, after delivery",
    response: "We provide **dedicated post-launch support** including:\n* 🐛 **Bug fixes** and issue resolution\n* 🔄 **Feature updates** and new modules\n* 📈 **Performance monitoring** and optimization\n* 🔐 **Security patches** and SSL renewals\n* 📊 **Analytics** setup and reporting\n\nWe don't disappear after delivery — we're your long-term digital partner. 🤝"
  },

  // Testimonials / Reviews
  {
    keywords: "review, testimonial, client say, feedback, rating, satisfied, opinion, happy",
    response: "Our clients love working with us! Here's what they say:\n\n⭐ *\"The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!\"* — **Client A**\n\n⭐ *\"A fantastic team to work with. Professional, creative, and highly skilled.\"* — **Client B**\n\n⭐ *\"Our new website has seen a significant increase in traffic thanks to their expertise.\"* — **Client C**\n\n💬 Ask to *\"show worked projects\"* to see our full portfolio!"
  },

  // Greetings
  {
    keywords: "hello, hi, hey, greet, good morning, good evening, howdy, yo, sup, namaste",
    response: "Hello! 👋 I'm the **Intelliverse AI** assistant — your guide to everything about our services, team, and projects.\n\nI can help you with:\n* 🌐 **Services** we offer\n* 👥 **Meet the Founders**\n* 💼 **Portfolio Projects**\n* 💰 **Get a Custom Quote**\n* 🔧 **Tech Stack & Process**\n\nWhat would you like to know?"
  },

  // Thanks
  {
    keywords: "thank, thanks, appreciate, grateful, awesome, great, nice, wonderful, perfect",
    response: "You're welcome! 😊 It's a pleasure helping you. Feel free to ask me anything else about The Intelliverse, or say **\"get a quote\"** to start your project journey with us!"
  },

  // Goodbye
  {
    keywords: "bye, goodbye, see you, later, cya, take care, farewell",
    response: "Goodbye! 👋 It was great chatting with you. Come back anytime — I'm always here to help. Have an amazing day! 🚀"
  }
];

// localMockDb memory extensions for mock fallback operations
if (!localMockDb.stats) {
  localMockDb.stats = defaultStats;
}
if (!localMockDb.testimonials) {
  localMockDb.testimonials = []; // Starts empty to avoid mock testimonials
}
if (!localMockDb.projects) {
  localMockDb.projects = []; // Starts empty so Projects section is hidden by default
}
if (!localMockDb.chatbotKnowledge) {
  localMockDb.chatbotKnowledge = defaultChatbotKnowledge;
}

// GET: Retrieve layout data from DB or fallback mock
export async function GET() {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db("intelliverse");

      // Fetch basic content (hero & about) and stats
      const content = await db.collection("content").findOne({});
      const testimonials = await db.collection("testimonials").find({}).toArray();
      const projects = await db.collection("projects").find({}).toArray();
      const chatbotKnowledge = await db.collection("chatbot_knowledge").find({}).toArray();
      const founders = await db.collection("founders").find({}).sort({ order: 1 }).toArray();

      const responsePayload = {
        hero: { subtitle: content?.hero?.subtitle || localMockDb.hero.subtitle },
        about: { p1: content?.about?.p1 || localMockDb.about.p1 },
        stats: content?.stats || localMockDb.stats,
        testimonials: testimonials.map(t => ({ text: t.text, author: t.author })),
        projects: projects.map(p => ({
          name: p.name,
          description: p.description,
          link: p.link,
          review: p.review,
          rating: p.rating,
          type: p.type || "",
          featureLink: p.featureLink || "",
          featureText: p.featureText || "",
          features: p.features || [],
          techTags: p.techTags || [],
          tagline: p.tagline || "",
          isFeatured: p.isFeatured || false
        })),
        chatbotKnowledge: chatbotKnowledge.length > 0
          ? chatbotKnowledge.map(k => ({ keywords: k.keywords, response: k.response }))
          : defaultChatbotKnowledge,
        founders: founders.length > 0
          ? founders.map(f => ({
              name: f.name,
              role: f.role,
              tagline: f.tagline || "",
              image: f.image || "",
              imageX: f.imageX !== undefined ? Number(f.imageX) : 50,
              imageY: f.imageY !== undefined ? Number(f.imageY) : 50,
              linkedin: f.linkedin || "",
              instagram: f.instagram || "",
              customLinkUrl: f.customLinkUrl || "",
              customLinkName: f.customLinkName || "",
              customLinkIcon: f.customLinkIcon || "",
              order: f.order !== undefined ? Number(f.order) : 1
            }))
          : localMockDb.founders
      };

      return NextResponse.json(responsePayload);
    }

    // Fallback to local mock if DB connection string is missing
    return NextResponse.json(localMockDb);
  } catch (error) {
    console.error("GET content error:", error);
    return NextResponse.json({
      ...localMockDb,
      testimonials: defaultTestimonials,
      stats: defaultStats,
      projects: []
    });
  }
}

// POST: Update content, stats, testimonials, and projects (secured by admin passcode)
export async function POST(request) {
  try {
    const body = await request.json();
    const { hero, about, stats, testimonials, projects, chatbotKnowledge, founders, passcode } = body;

    let db = null;
    if (clientPromise) {
      const client = await clientPromise;
      db = client.db("intelliverse");
    }

    // Verify session via cookie or fallback to passcode
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;
    const isSessionValid = await verifySession(sessionToken, db);

    if (!isSessionValid) {
      // Fallback passcode check
      const { getAdminPasscode } = require("@/lib/auth");
      const activePasscode = await getAdminPasscode(db);
      if (passcode !== activePasscode) {
        return NextResponse.json({ error: "Invalid admin session or passcode." }, { status: 401 });
      }
    }

    if (db) {

      // 1. Save Content (hero, about, stats)
      await db.collection("content").updateOne(
        {},
        {
          $set: {
            hero: hero || localMockDb.hero,
            about: about || localMockDb.about,
            stats: stats || defaultStats,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );

      // 2. Save Testimonials
      if (Array.isArray(testimonials)) {
        await db.collection("testimonials").deleteMany({});
        if (testimonials.length > 0) {
          await db.collection("testimonials").insertMany(testimonials);
        }
      }

      // 3. Save Projects
      if (Array.isArray(projects)) {
        await db.collection("projects").deleteMany({});
        if (projects.length > 0) {
          await db.collection("projects").insertMany(projects);
        }
      }

      // 4. Save Chatbot Knowledge
      if (Array.isArray(chatbotKnowledge)) {
        await db.collection("chatbot_knowledge").deleteMany({});
        if (chatbotKnowledge.length > 0) {
          await db.collection("chatbot_knowledge").insertMany(chatbotKnowledge);
        }
      }

      // 5. Save Founders
      if (Array.isArray(founders)) {
        await db.collection("founders").deleteMany({});
        if (founders.length > 0) {
          const formattedFounders = founders.map(f => ({
            name: f.name,
            role: f.role,
            tagline: f.tagline || "",
            image: f.image || "",
            imageX: f.imageX !== undefined ? Number(f.imageX) : 50,
            imageY: f.imageY !== undefined ? Number(f.imageY) : 50,
            linkedin: f.linkedin || "",
            instagram: f.instagram || "",
            customLinkUrl: f.customLinkUrl || "",
            customLinkName: f.customLinkName || "",
            customLinkIcon: f.customLinkIcon || "",
            order: f.order !== undefined ? Number(f.order) : 1
          }));
          await db.collection("founders").insertMany(formattedFounders);
        }
      }
    } else {
      // Fallback local memory updates
      if (hero) localMockDb.hero = hero;
      if (about) localMockDb.about = about;
      if (stats) localMockDb.stats = stats;
      if (testimonials) localMockDb.testimonials = testimonials;
      if (projects) localMockDb.projects = projects;
      if (chatbotKnowledge) localMockDb.chatbotKnowledge = chatbotKnowledge;
      if (founders) localMockDb.founders = founders;
    }

    return NextResponse.json({ success: true, message: "CMS Content updated successfully!" });
  } catch (error) {
    console.error("POST content error:", error);
    return NextResponse.json({ error: "Failed to update content database." }, { status: 500 });
  }
}
