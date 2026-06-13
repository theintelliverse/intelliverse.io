import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clientPromise } from "@/lib/db";
import { ensureDefaultAdmin, getExpectedHash } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();
    
    let db = null;
    if (clientPromise) {
      const client = await clientPromise;
      db = client.db("intelliverse");
    }

    const passwordHash = getExpectedHash(password);
    let isAuthenticated = false;

    if (db) {
      // Bootstrap default admin if admins collection is empty
      await ensureDefaultAdmin(db);

      // Query specific admin from database
      const admin = await db.collection("admins").findOne({ username: normalizedUsername });
      if (admin && admin.passwordHash === passwordHash) {
        isAuthenticated = true;
      }
    } else {
      // Offline / local mock fallback credentials (no database connection)
      if (normalizedUsername === "admin" && password === "admin123") {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    // Set cookie: username:passwordHash
    const sessionToken = `${normalizedUsername}:${passwordHash}`;
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Logged in successfully." });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal server error during login." }, { status: 500 });
  }
}
