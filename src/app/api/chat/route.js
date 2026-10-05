import { NextResponse } from "next/server";
import { clientPromise, localMockDb } from "@/lib/db";

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please enter a question or message." }, { status: 400 });
    }

    const query = message.toLowerCase().trim();

    // 1. Load knowledge base from MongoDB or fallback
    let knowledgeBase = [];
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("intelliverse");
        knowledgeBase = await db.collection("chatbot_knowledge").find({}).toArray();
      } catch (err) {
        console.error("Chatbot DB error:", err);
      }
    }

    if (!knowledgeBase || knowledgeBase.length === 0) {
      knowledgeBase = localMockDb?.chatbotKnowledge || [];
    }

    // 2. Keyword match score
    let bestMatch = null;
    let highestScore = 0;

    for (const item of knowledgeBase) {
      if (!item.keywords || !item.response) continue;
      const keywords = item.keywords.toLowerCase().split(",").map((k) => k.trim()).filter(Boolean);
      let score = 0;

      for (const kw of keywords) {
        if (query === kw) {
          score += 10;
        } else if (query.includes(kw)) {
          score += 3 + kw.length / 10;
        } else {
          // Check word-by-word
          const kwWords = kw.split(/\s+/);
          const matchedWords = kwWords.filter((w) => query.includes(w) && w.length > 2);
          if (matchedWords.length === kwWords.length) {
            score += 2;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return NextResponse.json({ reply: bestMatch.response });
    }

    // Default intelligent fallback
    return NextResponse.json({
      reply:
        "I'm here to help with questions about The Intelliverse's software architecture, custom SaaS platforms, Appointory, Vrix, and project consultations.\n\nYou can also contact our founders directly at theintelliverse@gmail.com or scroll to our Contact section to send an inquiry!",
    });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { reply: "Something went wrong while processing your request. Please reach out to us at theintelliverse@gmail.com." },
      { status: 500 }
    );
  }
}
