import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clientPromise } from "@/lib/db";
import { verifySession } from "@/lib/auth";

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
      return NextResponse.json({ error: "Cannot delete admin account: Database is offline." }, { status: 500 });
    }

    const { usernameToDelete } = await request.json();

    if (!usernameToDelete) {
      return NextResponse.json({ error: "Username to delete is required." }, { status: 400 });
    }

    const normalizedTarget = usernameToDelete.trim().toLowerCase();

    // 1. Prevent deleting self
    if (normalizedTarget === requesterUsername.toLowerCase()) {
      return NextResponse.json({ error: "You cannot delete your own account while logged in." }, { status: 400 });
    }

    // 2. Prevent deleting the last admin account
    const adminsCount = await db.collection("admins").countDocuments({});
    if (adminsCount <= 1) {
      return NextResponse.json({ error: "Cannot delete the last remaining administrator account." }, { status: 400 });
    }

    // Delete target admin
    const result = await db.collection("admins").deleteOne({ username: normalizedTarget });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Admin account not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Admin account '${normalizedTarget}' deleted successfully.` });
  } catch (error) {
    console.error("Delete Admin API Error:", error);
    return NextResponse.json({ error: "Internal server error during admin deletion." }, { status: 500 });
  }
}
