import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

// Initialize Redis client
const getRedis = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
};

// Simple hashing for IP
const hashIp = (ip: string) => {
  return crypto.createHash("sha256").update(ip).digest("hex");
};

export async function POST(req: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: "Redis not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { strokes, name, note } = body;

    // Validation
    if (!strokes || !Array.isArray(strokes) || strokes.length === 0) {
      return NextResponse.json({ error: "Invalid signature strokes" }, { status: 400 });
    }

    const hasValidStroke = strokes.some(stroke => Array.isArray(stroke) && stroke.length > 0);
    if (!hasValidStroke) {
      return NextResponse.json({ error: "Signature must have at least one valid stroke" }, { status: 400 });
    }

    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (ip !== "unknown") {
      const ipHash = hashIp(ip);
      const rateLimitKey = `sig:limit:${ipHash}`;
      
      const isSet = await redis.set(rateLimitKey, "1", { nx: true, ex: 86400 });
      if (!isSet) {
        return NextResponse.json({ error: "You've already signed recently." }, { status: 429 });
      }
    }

    // Geolocation (Vercel provides this)
    const country = req.geo?.country || null;

    // Sanitize inputs
    const sanitize = (str: string | undefined, max: number) => {
      if (!str) return null;
      return str.replace(/<[^>]*>?/gm, "").trim().substring(0, max);
    };

    const sanitizedName = sanitize(name, 40) || "Anonymous";
    const sanitizedNote = sanitize(note, 80);

    const signatureObj = {
      id: crypto.randomUUID(),
      strokes,
      name: sanitizedName,
      note: sanitizedNote,
      country,
      createdAt: Date.now()
    };

    // Store in Redis
    await redis.zadd("signatures", {
      score: signatureObj.createdAt,
      member: JSON.stringify(signatureObj)
    });
    
    // Increment total count
    await redis.incr("signatures:count");

    return NextResponse.json({ success: true, id: signatureObj.id }, { status: 201 });
  } catch (error) {
    console.error("Signature POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: "Redis not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Fetch from sorted set (most recent first)
    const rawSignatures = await redis.zrange("signatures", offset, offset + limit - 1, { rev: true });
    
    // Fetch total count
    const count = await redis.get<number>("signatures:count") || 0;

    // Upstash returns zrange items parsed if they are JSON, but we stringified them.
    // However, depending on config, it might auto-parse. Let's handle both.
    const signatures = rawSignatures.map(sig => {
      if (typeof sig === "string") {
        try { return JSON.parse(sig); } catch { return null; }
      }
      return sig;
    }).filter(Boolean);

    return NextResponse.json({ signatures, total: count });
  } catch (error) {
    console.error("Signature GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
