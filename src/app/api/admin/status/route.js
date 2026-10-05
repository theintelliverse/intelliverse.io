import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    let counts = {
      testimonials: 0,
      projects: 0,
      contacts: 0,
      caseStudies: 0,
      founders: 0
    };
    let admins = ["admin"]; // Default fallback list
    let currentUser = null;

    const db = await getDb();
    const isDbConnected = Boolean(db);

    currentUser = await verifySession(sessionToken, db);

    if (!currentUser) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (isDbConnected && db) {
      counts.testimonials = await db.collection("testimonials").countDocuments({});
      counts.projects = await db.collection("projects").countDocuments({});
      counts.contacts = await db.collection("contacts").countDocuments({});
      counts.caseStudies = await db.collection("case_studies").countDocuments({});
      counts.founders = await db.collection("founders").countDocuments({});
      
      const dbAdmins = await db.collection("admins").find({}).project({ username: 1, _id: 0 }).toArray();
      if (dbAdmins.length > 0) {
        admins = dbAdmins.map(a => a.username);
      }
    }

    return NextResponse.json({
      authenticated: true,
      currentUser,
      dbStatus: isDbConnected ? "Connected" : "Mock DB Fallback (Offline)",
      counts,
      admins,
    });
  } catch (error) {
    console.error("Admin status API error:", error);
    return NextResponse.json({ error: "Internal server error check." }, { status: 500 });
  }
}
