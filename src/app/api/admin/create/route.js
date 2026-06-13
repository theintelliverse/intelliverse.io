import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clientPromise } from "@/lib/db";
import { verifySession, getExpectedHash } from "@/lib/auth";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    let db = null;
    if (clientPromise) {
      const client = await clientPromise;
      db = client.db("intelliverse");
    }

    // Verify requester's session
    const requesterUsername = await verifySession(sessionToken, db);
    if (!requesterUsername) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: "Cannot create admin account: Database is offline." }, { status: 500 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    // Normalize username
    const normalizedUsername = username.trim().toLowerCase();
    if (normalizedUsername.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters long." }, { status: 400 });
    }

    if (password.length < 4) {
      return NextResponse.json({ error: "Password must be at least 4 characters long." }, { status: 400 });
    }

    // Check if username already exists
    const existingAdmin = await db.collection("admins").findOne({ username: normalizedUsername });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin username already exists." }, { status: 400 });
    }

    // Insert new admin
    const passwordHash = getExpectedHash(password);
    await db.collection("admins").insertOne({
      username: normalizedUsername,
      passwordHash,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: `Admin account '${normalizedUsername}' created successfully!` });
  } catch (error) {
    console.error("Create Admin API Error:", error);
    return NextResponse.json({ error: "Internal server error during admin creation." }, { status: 500 });
  }
}
