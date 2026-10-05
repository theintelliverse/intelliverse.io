import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand ISR Revalidation Route
 * Usage:
 *   POST /api/revalidate?secret=YOUR_SECRET&path=/blog
 *   GET  /api/revalidate?secret=YOUR_SECRET&path=/blog
 */
export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/";

  const expectedSecret = process.env.REVALIDATION_SECRET || "intelliverse_secure_revalidate_2026";

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { success: false, message: "Invalid revalidation secret token" },
      { status: 401 }
    );
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}
