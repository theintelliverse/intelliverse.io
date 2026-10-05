import { notFound } from "next/navigation";
import CursorLabClient from "@/components/cursor/CursorLabClient";

export const metadata = {
  title: "Cursor Lab — The Intelliverse Dev Environment",
  description: "Interactive testing sandbox for the 'Overlapping Minds' custom cursor system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CursorLabPage() {
  // Hide in production unless explicitly permitted
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEV_LABS !== "true") {
    notFound();
  }

  return <CursorLabClient />;
}
