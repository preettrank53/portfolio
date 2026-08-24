"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

const DATA_DIR = path.join(process.cwd(), "data");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// ─── Auth helpers ──────────────────────────────────────────────────────────

/** Check admin status via the HttpOnly session cookie (server-side only). */
export async function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get("admin_session")?.value === "true";
}

/**
 * loginAdmin — kept for backwards compatibility but now delegates to the
 * /api/auth route. Call the API route directly from the client instead.
 * @deprecated Use fetch('/api/auth', { method: 'POST', body: JSON.stringify({ password }) })
 */
export async function loginAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "Preet@3753";
  if (password !== expected) {
    return { success: false, error: "INCORRECT PASSWORD" };
  }
  const cookieStore = cookies();
  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  cookieStore.set("admin_session_flag", "true", {
    httpOnly: false,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return { success: true };
}

/** Clears both session cookies. */
export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete("admin_session");
  cookieStore.delete("admin_session_flag");
  return { success: true };
}

// ─── Data helpers ──────────────────────────────────────────────────────────

/** Get data for a tab from the bundled /data JSON files. */
export async function getDevData(tab: string) {
  const filePath = path.join(
    DATA_DIR,
    `${tab === "activity" ? "tweets" : tab}.json`
  );
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

/**
 * Save data for a tab.
 *
 * • Development: writes to /data/*.json (standard local convenience).
 * • Production : writing to the filesystem is a no-op on Vercel (read-only FS).
 *   Returns { success: false, isProductionFS: true } so the client can show
 *   the "Export JSON to commit" prompt instead.
 */
export async function saveDevData(tab: string, data: unknown) {
  const adminActive = await isAdmin();
  if (!adminActive) {
    throw new Error("UNAUTHORIZED");
  }

  // In production the Vercel filesystem is read-only — signal to the client.
  if (IS_PRODUCTION) {
    return { success: false, isProductionFS: true };
  }

  const filePath = path.join(
    DATA_DIR,
    `${tab === "activity" ? "tweets" : tab}.json`
  );
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return { success: true };
  } catch {
    return { success: false, error: "FAILED TO WRITE DATA" };
  }
}

// ─── Redis / Appreciation helpers ─────────────────────────────────────────

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

export async function getAppreciations(slugs: string[]) {
  const redis = getRedis();
  const result: Record<string, number> = {};

  if (redis) {
    try {
      const pipeline = redis.pipeline();
      slugs.forEach((slug) => {
        pipeline.get(`project:${slug}:appreciations`);
      });
      const counts = await pipeline.exec();
      slugs.forEach((slug, i) => {
        result[slug] = Number(counts[i]) || 0;
      });
      return result;
    } catch {
      // Fall through to local fallback
    }
  }

  // Fallback: local json file (dev only — not reliable in production)
  const localFile = path.join(DATA_DIR, "appreciations.json");
  let localData: Record<string, number> = {};
  if (fs.existsSync(localFile)) {
    try {
      localData = JSON.parse(fs.readFileSync(localFile, "utf-8"));
    } catch {
      // ignore
    }
  }
  slugs.forEach((slug) => {
    result[slug] = localData[slug] || 0;
  });
  return result;
}

export async function incrementAppreciation(slug: string) {
  const redis = getRedis();
  if (redis) {
    try {
      const count = await redis.incr(`project:${slug}:appreciations`);
      return { success: true, count: Number(count) };
    } catch {
      // Fall through to local fallback
    }
  }

  // Fallback: local json file (dev only)
  const localFile = path.join(DATA_DIR, "appreciations.json");
  let localData: Record<string, number> = {};
  if (fs.existsSync(localFile)) {
    try {
      localData = JSON.parse(fs.readFileSync(localFile, "utf-8"));
    } catch {
      // ignore
    }
  }
  const newCount = (localData[slug] || 0) + 1;
  localData[slug] = newCount;
  try {
    fs.writeFileSync(localFile, JSON.stringify(localData, null, 2), "utf-8");
    return { success: true, count: newCount };
  } catch {
    return { success: false, error: "FAILED TO WRITE LOCAL APPRECIATION" };
  }
}
