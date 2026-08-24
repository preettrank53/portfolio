import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple in-memory rate limiter: max 10 attempts per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "TOO MANY REQUESTS" },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "INVALID REQUEST BODY" },
      { status: 400 }
    );
  }

  const { password } = body;
  const expected = process.env.ADMIN_PASSWORD ?? "Preet@3753";

  if (!password || password !== expected) {
    return NextResponse.json(
      { success: false, error: "INCORRECT PASSWORD" },
      { status: 401 }
    );
  }

  // Set HttpOnly session cookie (not readable by JS)
  const cookieStore = cookies();
  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  // Also set a non-httpOnly flag so the client can detect login status
  cookieStore.set("admin_session_flag", "true", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete("admin_session");
  cookieStore.delete("admin_session_flag");
  return NextResponse.json({ success: true });
}
