import crypto from "crypto";

// Returns the SHA-256 hash of a string
export function getExpectedHash(text) {
  if (!text) return "";
  return crypto.createHash("sha256").update(text).digest("hex");
}

// Ensures at least one admin account exists in the database (seeds admin / admin123 if empty)
export async function ensureDefaultAdmin(db) {
  if (!db) return;
  try {
    const count = await db.collection("admins").countDocuments({});
    if (count === 0) {
      await db.collection("admins").insertOne({
        username: "admin",
        passwordHash: getExpectedHash("admin123"),
        createdAt: new Date(),
        isDefault: true
      });
      console.log("Seeded default admin account (username: 'admin', password: 'admin123')");
    }
  } catch (err) {
    console.error("Error seeding default admin:", err);
  }
}

// Validates the admin session cookie. Returns the authenticated username or null.
export async function verifySession(sessionCookie, db) {
  if (!sessionCookie) return null;

  const parts = sessionCookie.split(":");
  if (parts.length < 2) return null;

  const username = parts[0];
  const passwordHash = parts[1];
  const normalizedUsername = username.trim().toLowerCase();

  try {
    if (db) {
      await ensureDefaultAdmin(db);
      const admin = await db.collection("admins").findOne({ username: normalizedUsername });
      if (admin && admin.passwordHash === passwordHash) {
        return normalizedUsername;
      }
      return null;
    }
    
    // Offline / local mock fallback credentials (no database connection)
    if (normalizedUsername === "admin" && passwordHash === getExpectedHash("admin123")) {
      return "admin";
    }
  } catch (error) {
    console.error("Error verifying admin session:", error);
  }
  return null;
}
