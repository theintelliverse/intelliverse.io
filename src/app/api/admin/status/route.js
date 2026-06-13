import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clientPromise } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    let db = null;
    let isDbConnected = false;
    let counts = {
      testimonials: 0,
      projects: 0,
      contacts: 0,
    };
    let admins = ["admin"]; // Default fallback list
    let currentUser = null;

    if (clientPromise) {
      try {
        const client = await clientPromise;
        db = client.db("intelliverse");
        isDbConnected = true;
      } catch (err) {
        console.error("DB connection error in status API:", err);
      }
    }

    currentUser = await verifySession(sessionToken, db);

    if (!currentUser) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (isDbConnected && db) {
      counts.testimonials = await db.collection("testimonials").countDocuments({});
      counts.projects = await db.collection("projects").countDocuments({});
      counts.contacts = await db.collection("contacts").countDocuments({});
      
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
