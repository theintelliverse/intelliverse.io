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

const defaultStats = { projects: 50, satisfaction: 100, clients: 30 };

// localMockDb memory extensions for mock fallback operations
if (!localMockDb.stats) {
  localMockDb.stats = defaultStats;
}
if (!localMockDb.testimonials) {
  localMockDb.testimonials = defaultTestimonials;
}
if (!localMockDb.projects) {
  localMockDb.projects = []; // Starts empty so Projects section is hidden by default
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
      
      const responsePayload = {
        hero: { subtitle: content?.hero?.subtitle || localMockDb.hero.subtitle },
        about: { p1: content?.about?.p1 || localMockDb.about.p1 },
        stats: content?.stats || localMockDb.stats,
        testimonials: testimonials.length > 0 ? testimonials.map(t => ({ text: t.text, author: t.author })) : defaultTestimonials,
        projects: projects.map(p => ({ name: p.name, description: p.description, link: p.link, review: p.review, rating: p.rating }))
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
    const { hero, about, stats, testimonials, projects, passcode } = body;
    
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
    } else {
      // Fallback local memory updates
      if (hero) localMockDb.hero = hero;
      if (about) localMockDb.about = about;
      if (stats) localMockDb.stats = stats;
      if (testimonials) localMockDb.testimonials = testimonials;
      if (projects) localMockDb.projects = projects;
    }
    
    return NextResponse.json({ success: true, message: "CMS Content updated successfully!" });
  } catch (error) {
    console.error("POST content error:", error);
    return NextResponse.json({ error: "Failed to update content database." }, { status: 500 });
  }
}
