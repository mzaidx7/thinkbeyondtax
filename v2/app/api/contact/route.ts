import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

const allowedTopics = new Set([
  "Bookkeeping",
  "Accounting",
  "VAT",
  "Corporate Tax",
  "E-Invoicing readiness",
  "EmaraTax support",
  "Not sure yet",
]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    requestsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestsByIp.set(ip, recent);

  if (requestsByIp.size > 500) {
    for (const [key, timestamps] of requestsByIp) {
      if (timestamps.every((time) => now - time >= WINDOW_MS)) {
        requestsByIp.delete(key);
      }
    }
  }

  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many enquiries were submitted. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  if (clean(body.botcheck)) {
    return NextResponse.json({
      message: "Thank you, we'll get back to you within one working day.",
    });
  }

  const name = clean(body.name);
  const company = clean(body.company);
  const email = clean(body.email).toLowerCase();
  const topic = clean(body.topic);
  const message = clean(body.message);

  if (
    name.length < 2 ||
    name.length > 120 ||
    company.length > 160 ||
    !isEmail(email) ||
    !allowedTopics.has(topic) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { message: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_TO?.trim() || user;

  if (!host || !Number.isInteger(port) || !user || !password || !recipient) {
    console.error("Contact form SMTP environment variables are incomplete.");
    return NextResponse.json(
      { message: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass: password,
    },
  });

  const safeName = cleanHeader(name);
  const safeTopic = cleanHeader(topic);
  const safeCompany = company || "Not provided";

  try {
    await transporter.sendMail({
      from: `Think Beyond Tax Website <${user}>`,
      to: recipient,
      replyTo: `${safeName} <${email}>`,
      subject: `Website enquiry: ${safeTopic}`,
      text: [
        "New website enquiry",
        "",
        `Name: ${safeName}`,
        `Company: ${safeCompany}`,
        `Email: ${email}`,
        `Topic: ${safeTopic}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { message: "We could not send your enquiry right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thank you, we'll get back to you within one working day.",
  });
}
