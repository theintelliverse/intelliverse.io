import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";

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

    // Send emails using Nodemailer (Dual Confirmation)
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        // 1. Send confirmation to user
        const userMailOptions = {
          from: `"The Intelliverse" <${smtpUser}>`,
          to: email,
          subject: "Thank you for contacting The Intelliverse",
          text: `Hi ${name},\n\nThank you for reaching out to The Intelliverse!\n\nWe have received your message:\n"${message}"\n\nOur team will review your project requirements and get back to you within 24 hours.\n\nBest regards,\nThe Intelliverse Team\nhttps://intelliverse.io`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #3b82f6;">The Intelliverse</h2>
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to us. We have successfully received your inquiry:</p>
              <blockquote style="background-color: #f3f4f6; border-left: 4px solid #3b82f6; padding: 12px; margin: 16px 0; font-style: italic;">
                ${message.replace(/\n/g, "<br>")}
              </blockquote>
              <p>Our team will review your details and contact you within 24 hours to discuss your requirements.</p>
              <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="font-size: 12px; color: #6b7280;">This is an automated receipt confirmation from The Intelliverse. Please do not reply directly to this email.</p>
            </div>
          `
        };

        // 2. Send lead alert to team
        const teamMailOptions = {
          from: `"Intelliverse Lead Alert" <${smtpUser}>`,
          to: "theintelliverse@gmail.com",
          subject: `New CRM Lead: ${name} (${email})`,
          text: `New Lead Captured!\n\nName: ${name}\nEmail: ${email}\nIP: ${ip}\nTime: ${new Date().toLocaleString()}\n\nMessage:\n"${message}"`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #4f46e5;">New Lead Submission Captured</h2>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                  <td><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">IP Address:</td>
                  <td>${ip}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Time:</td>
                  <td>${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">Message Detail:</h3>
              <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #f3f4f6;">${message}</p>
            </div>
          `
        };

        // Send in parallel
        await Promise.all([
          transporter.sendMail(userMailOptions),
          transporter.sendMail(teamMailOptions)
        ]);
        console.log(`[SMTP] Success: Confirmation sent to ${email} & lead alert sent to theintelliverse@gmail.com`);
      } catch (mailErr) {
        console.error("[SMTP] Failed to send nodemailer emails:", mailErr);
      }
    } else {
      // SMTP variables not set. Output clean simulated logs to console.
      console.log(`
=========================================
[SMTP EMAIL SIMULATION (NO SMTP CONFIG)]
=========================================
1. TO USER: ${email}
   FROM: The Intelliverse <theintelliverse@gmail.com>
   SUBJECT: Thank you for contacting The Intelliverse
   BODY: Hi ${name}, we received your message: "${message}". We will reach out shortly!
   
2. TO TEAM: theintelliverse@gmail.com
   FROM: Intelliverse Lead Alert <theintelliverse@gmail.com>
   SUBJECT: New CRM Lead: ${name} (${email})
   BODY: Captured lead from IP ${ip}. Message: "${message}"
=========================================
      `);
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
