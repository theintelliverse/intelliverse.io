import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  clientPromise,
  localMockDb,
  defaultTestimonials,
  defaultChatbotKnowledge,
  getDb,
  ensureDatabaseSeeded
} from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const defaultStats = { projects: 2, satisfaction: 100, clients: 15 };

// GET: Retrieve layout data directly from MongoDB Atlas or fallback mock
export async function GET(request) {
  try {
    const isSeedRequested = request?.nextUrl?.searchParams?.get("seed") === "true";
    const db = await getDb(isSeedRequested);

    if (isSeedRequested && db) {
      return NextResponse.json({
        success: true,
        message: "All initial data successfully seeded and synchronized into MongoDB Atlas database ('intelliverse')!"
      });
    }

    if (db) {
      // Fetch collections concurrently from MongoDB
      const [content, testimonials, projects, caseStudies, chatbotKnowledge, founders] = await Promise.all([
        db.collection("content").findOne({}),
        db.collection("testimonials").find({}).toArray(),
        db.collection("projects").find({}).toArray(),
        db.collection("case_studies").find({}).toArray(),
        db.collection("chatbot_knowledge").find({}).toArray(),
        db.collection("founders").find({}).sort({ order: 1 }).toArray()
      ]);

      const responsePayload = {
        hero: {
          headline: content?.hero?.headline || localMockDb.hero.headline,
          subtitle: content?.hero?.subtitle || localMockDb.hero.subtitle,
          status: content?.hero?.status || localMockDb.hero.status,
          pillarsText: content?.hero?.pillarsText || localMockDb.hero.pillarsText,
          caseStudiesHighlight: content?.hero?.caseStudiesHighlight || localMockDb.hero.caseStudiesHighlight,
          studioLocation: content?.hero?.studioLocation || localMockDb.hero.studioLocation,
        },
        about: {
          p1: content?.about?.p1 || localMockDb.about.p1,
          mission: content?.about?.mission || localMockDb.about.mission,
          pullQuote: content?.about?.pullQuote || localMockDb.about.pullQuote,
          modelsText: content?.about?.modelsText || localMockDb.about.modelsText,
        },
        contact: {
          email: content?.contact?.email || localMockDb.contact.email,
          linkedin: content?.contact?.linkedin || localMockDb.contact.linkedin,
          instagram: content?.contact?.instagram || localMockDb.contact.instagram,
        },
        stats: content?.stats || localMockDb.stats || defaultStats,
        estimator: content?.estimator || localMockDb.estimator,
        services: content?.services || localMockDb.services,
        process: content?.process || localMockDb.process,
        marquee: content?.marquee || localMockDb.marquee,
        philosophy: content?.philosophy || localMockDb.philosophy,
        testimonials: (testimonials.length > 0 ? testimonials : defaultTestimonials).map(t => ({
          text: t.text || t.quote || "",
          author: t.author || "",
          role: t.role || "",
          project: t.project || "",
          tag: t.tag || "",
          rating: t.rating !== undefined ? Number(t.rating) : 5,
        })),
        projects: (projects.length > 0 ? projects : (localMockDb.projects || [])).map(p => ({
          name: p.name,
          description: p.description || p.summary || "",
          summary: p.summary || p.description || "",
          role: p.role || "",
          impact: p.impact || "",
          stack: p.stack || p.techTags || [],
          techTags: p.techTags || p.stack || [],
          link: p.link || "",
          review: p.review || "",
          rating: p.rating || 5,
          type: p.type || p.category || "",
          category: p.category || p.type || "",
          featureLink: p.featureLink || "",
          featureText: p.featureText || "",
          features: p.features || [],
          tagline: p.tagline || "",
          isFeatured: p.isFeatured || false,
          logo: p.logo || p.logoUrl || p.image || "",
          icon: p.icon || ""
        })),
        caseStudies: (caseStudies.length > 0 ? caseStudies : (localMockDb.caseStudies || [])).map((cs, idx) => ({
          id: cs.id || cs._id?.toString() || `cs-${idx + 1}`,
          num: cs.num || `0${idx + 1}`,
          name: cs.name || "",
          category: cs.category || cs.type || "",
          role: cs.role || "",
          impact: cs.impact || "",
          problem: cs.problem || cs.summary || "",
          broke: cs.broke || "",
          result: cs.result || "",
          summary: cs.summary || cs.description || "",
          description: cs.description || cs.summary || "",
          stack: Array.isArray(cs.stack) ? cs.stack : (Array.isArray(cs.techTags) ? cs.techTags : []),
          techTags: Array.isArray(cs.techTags) ? cs.techTags : (Array.isArray(cs.stack) ? cs.stack : []),
          link: cs.link || "",
          caseStudyLink: cs.caseStudyLink || (cs.name?.toLowerCase().includes("appointory") ? "/work/appointory" : cs.name?.toLowerCase().includes("vrix") ? "/work/vrix" : ""),
          review: cs.review || "",
          rating: cs.rating !== undefined ? Number(cs.rating) : 5
        })),
        chatbotKnowledge: chatbotKnowledge.length > 0
          ? chatbotKnowledge.map(k => ({ keywords: k.keywords, response: k.response }))
          : defaultChatbotKnowledge,
        founders: founders.length > 0
          ? founders.map(f => {
            let customLinks = f.customLinks || [];
            if (customLinks.length === 0 && f.customLinkUrl) {
              customLinks = [{
                url: f.customLinkUrl,
                name: f.customLinkName || "Link",
                icon: f.customLinkIcon || "fas fa-link"
              }];
            }
            return {
              name: f.name,
              role: f.role,
              badge: f.badge || "",
              tagline: f.tagline || "",
              currently: f.currently || "",
              image: f.image || "",
              imageX: f.imageX !== undefined ? Number(f.imageX) : 50,
              imageY: f.imageY !== undefined ? Number(f.imageY) : 50,
              linkedin: f.linkedin || "",
              portfolio: f.portfolio || "",
              instagram: f.instagram || "",
              github: f.github || "",
              youtube: f.youtube || "",
              facebook: f.facebook || "",
              twitter: f.twitter || "",
              customLinkUrl: f.customLinkUrl || "",
              customLinkName: f.customLinkName || "",
              customLinkIcon: f.customLinkIcon || "",
              customLinks: customLinks.map(cl => ({
                url: cl.url || "",
                name: cl.name || "",
                icon: cl.icon || "fas fa-link"
              })),
              order: f.order !== undefined ? Number(f.order) : 1
            };
          })
          : localMockDb.founders
      };

      return NextResponse.json(responsePayload, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
    }

    // Fallback to local mock if DB connection is unavailable
    return NextResponse.json(localMockDb, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("[MongoDB] GET content error:", error);
    return NextResponse.json({
      ...localMockDb,
      testimonials: defaultTestimonials,
      stats: defaultStats,
      projects: []
    });
  }
}

// POST: Update content, stats, testimonials, projects, and founders in MongoDB Atlas
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      hero,
      about,
      contact,
      stats,
      estimator,
      services,
      process: processStages,
      marquee,
      philosophy,
      testimonials,
      projects,
      caseStudies,
      chatbotKnowledge,
      founders,
      passcode
    } = body;

    const db = await getDb();

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
      // 1. Save Content (hero, about, contact, stats, estimator, services, process, marquee, philosophy)
      await db.collection("content").updateOne(
        {},
        {
          $set: {
            hero: hero || localMockDb.hero,
            about: about || localMockDb.about,
            contact: contact || localMockDb.contact,
            stats: stats || defaultStats,
            estimator: estimator || localMockDb.estimator,
            services: services || localMockDb.services,
            process: processStages || localMockDb.process,
            marquee: marquee || localMockDb.marquee,
            philosophy: philosophy || localMockDb.philosophy,
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

      // 3b. Save Case Studies & Specifications
      if (Array.isArray(caseStudies)) {
        await db.collection("case_studies").deleteMany({});
        if (caseStudies.length > 0) {
          const formattedCaseStudies = caseStudies.map((cs, i) => ({
            id: cs.id || `cs-${i + 1}`,
            num: cs.num || `0${i + 1}`,
            name: cs.name || "",
            category: cs.category || cs.type || "",
            role: cs.role || "",
            impact: cs.impact || "",
            problem: cs.problem || "",
            broke: cs.broke || "",
            result: cs.result || "",
            summary: cs.summary || cs.description || "",
            description: cs.description || cs.summary || "",
            stack: Array.isArray(cs.stack) ? cs.stack : (Array.isArray(cs.techTags) ? cs.techTags : []),
            techTags: Array.isArray(cs.techTags) ? cs.techTags : (Array.isArray(cs.stack) ? cs.stack : []),
            link: cs.link || "",
            caseStudyLink: cs.caseStudyLink || (cs.name?.toLowerCase().includes("appointory") ? "/work/appointory" : cs.name?.toLowerCase().includes("vrix") ? "/work/vrix" : ""),
            review: cs.review || "",
            rating: cs.rating !== undefined ? Number(cs.rating) : 5
          }));
          await db.collection("case_studies").insertMany(formattedCaseStudies);
        }
      }

      // 4. Save Chatbot Knowledge
      if (Array.isArray(chatbotKnowledge)) {
        await db.collection("chatbot_knowledge").deleteMany({});
        if (chatbotKnowledge.length > 0) {
          await db.collection("chatbot_knowledge").insertMany(chatbotKnowledge);
        }
      }

      // 5. Save Founders (with badge, currently, all multi-links and positioning)
      if (Array.isArray(founders)) {
        await db.collection("founders").deleteMany({});
        if (founders.length > 0) {
          const formattedFounders = founders.map((f, i) => {
            const links = f.customLinks || [];
            const firstLink = links[0] || {};
            return {
              name: f.name || `Founder ${i + 1}`,
              role: f.role || "Co-Founder",
              badge: f.badge || "",
              tagline: f.tagline || "",
              currently: f.currently || "",
              image: f.image || "",
              imageX: f.imageX !== undefined ? Number(f.imageX) : 50,
              imageY: f.imageY !== undefined ? Number(f.imageY) : 50,
              linkedin: f.linkedin || "",
              portfolio: f.portfolio || "",
              instagram: f.instagram || "",
              github: f.github || "",
              youtube: f.youtube || "",
              facebook: f.facebook || "",
              twitter: f.twitter || "",
              customLinkUrl: firstLink.url || f.customLinkUrl || "",
              customLinkName: firstLink.name || f.customLinkName || "",
              customLinkIcon: firstLink.icon || f.customLinkIcon || "",
              customLinks: links.map(l => ({
                url: l.url || "",
                name: l.name || "",
                icon: l.icon || "fas fa-link"
              })),
              order: typeof f.order === "number" ? f.order : (i + 1)
            };
          });
          await db.collection("founders").insertMany(formattedFounders);
        }
      }
    }

    // Always keep memory fallback in sync as mirror
    if (hero) localMockDb.hero = hero;
    if (about) localMockDb.about = about;
    if (contact) localMockDb.contact = contact;
    if (stats) localMockDb.stats = stats;
    if (estimator) localMockDb.estimator = estimator;
    if (services) localMockDb.services = services;
    if (processStages) localMockDb.process = processStages;
    if (marquee) localMockDb.marquee = marquee;
    if (testimonials) localMockDb.testimonials = testimonials;
    if (projects) localMockDb.projects = projects;
    if (caseStudies) localMockDb.caseStudies = caseStudies;
    if (chatbotKnowledge) localMockDb.chatbotKnowledge = chatbotKnowledge;
    if (founders) localMockDb.founders = founders;

    // Purge cached paths immediately so changes appear on the live site without delay
    try {
      revalidatePath("/");
      revalidatePath("/admin");
    } catch (e) {
      // ignore in environments where revalidatePath is unavailable
    }

    return NextResponse.json(
      {
        success: true,
        message: "All CMS content successfully saved and synchronized into MongoDB Atlas database ('intelliverse')!"
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("[MongoDB] POST content error:", error);
    return NextResponse.json({ error: "Failed to save CMS changes to database." }, { status: 500 });
  }
}
