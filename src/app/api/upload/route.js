import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create public/uploads directory if it doesn't exist in workspace public path
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate clean unique filename using timestamp
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filename = `${Date.now()}-${cleanName}`;
    const filepath = path.join(uploadDir, filename);

    // Write file to disk
    await fs.writeFile(filepath, buffer);
    const url = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Image upload API route error:", error);
    return NextResponse.json({ error: "Failed to upload file to server." }, { status: 500 });
  }
}
