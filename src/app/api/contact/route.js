import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

// POST: Save contact submission, capture IP, and forward to Web3Forms
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill out all contact fields." }, { status: 400 });
    }

    // Resolve client IP address from request headers
    let ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
    if (ip) {
      // x-forwarded-for can be a comma-separated list; extract the client IP (first item)
      ip = ip.split(",")[0].trim();
    } else {
      ip = "127.0.0.1"; // Default fallback (localhost)
    }

    const newContact = {
      name,
      email,
      message,
      ip,
      createdAt: new Date()
    };

    // Save to MongoDB Atlas if connection is active
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db("intelliverse");
      await db.collection("contacts").insertOne(newContact);
    } else {
      console.warn("MongoDB Atlas is not configured. Submission captured in server console log:", newContact);
    }

    // Forward the email alert request to Web3Forms API (backend-side integration)
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "2128b8f3-02b4-48ab-8632-a74674f99b6d";
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message
        })
      });
    } catch (e) {
      console.error("Failed to forward submission to Web3Forms API:", e);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("POST contact submissions error:", error);
    return NextResponse.json({ error: "Failed to record message submission." }, { status: 500 });
  }
}

// GET: Retrieve contact submissions list (requires passcode authentication query parameter)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const passcode = searchParams.get("passcode");
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
        return NextResponse.json({ error: "Unauthorized access: Invalid session or passcode." }, { status: 401 });
      }
    }

    // Load from database if Atlas connection is active
    if (db) {
      const submissions = await db
        .collection("contacts")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return NextResponse.json(submissions);
    }

    // Return mock submission if no DB is present (so admin dashboard loads successfully)
    const dummySubmissions = [
      {
        _id: "mock-1",
        name: "Test Submitter",
        email: "test@example.com",
        message: "This is a demo contact submission showing how captured inputs and IPs look on the dashboard.",
        ip: "192.168.1.101",
        createdAt: new Date().toISOString()
      }
    ];
    return NextResponse.json(dummySubmissions);
  } catch (error) {
    console.error("GET contact submissions error:", error);
    return NextResponse.json({ error: "Failed to retrieve submissions logs." }, { status: 500 });
  }
}

// DELETE: Remove a specific contact submission log by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing lead ID." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    let db = null;
    if (clientPromise) {
      const client = await clientPromise;
      db = client.db("intelliverse");
    }

    const requesterUsername = await verifySession(sessionToken, db);
    if (!requesterUsername) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: "Cannot delete lead: Database is offline." }, { status: 500 });
    }

    const { ObjectId } = require("mongodb");
    
    // Ignore deletions for dummy mock records
    if (id.startsWith("mock-")) {
      return NextResponse.json({ success: true, message: "Mock lead removed from display." });
    }

    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead submission deleted successfully." });
  } catch (error) {
    console.error("DELETE contact lead error:", error);
    return NextResponse.json({ error: "Internal server error during lead deletion." }, { status: 500 });
  }
}
