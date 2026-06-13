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

    // Verify session and get the username
    const username = await verifySession(sessionToken, db);
    if (!username) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json(
        { error: "Cannot change password: Database connection is offline or missing." },
        { status: 500 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing current or new password fields." }, { status: 400 });
    }

    // Retrieve admin details
    const admin = await db.collection("admins").findOne({ username });
    if (!admin) {
      return NextResponse.json({ error: "Administrator account not found." }, { status: 404 });
    }

    // Verify current password
    const currentHash = getExpectedHash(currentPassword);
    if (currentHash !== admin.passwordHash) {
      return NextResponse.json({ error: "The current password is incorrect." }, { status: 400 });
    }

    // Validate new password strength / length
    if (newPassword.length < 4) {
      return NextResponse.json({ error: "The new password must be at least 4 characters long." }, { status: 400 });
    }

    const newHash = getExpectedHash(newPassword);

    // Update password hash in admins collection
    await db.collection("admins").updateOne(
      { username },
      { $set: { passwordHash: newHash, updatedAt: new Date() } }
    );

    // Update the admin_session cookie with the new hash so session stays active
    const newSessionToken = `${username}:${newHash}`;
    cookieStore.set("admin_session", newSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.error("Settings API error:", error);
    return NextResponse.json({ error: "Internal server error during password update." }, { status: 500 });
  }
}
