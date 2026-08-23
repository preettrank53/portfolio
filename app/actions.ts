"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

const DATA_DIR = path.join(process.cwd(), "data");

// Helper to check admin mode
export async function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get("admin_mode")?.value === "true";
}

// Set admin cookie
export async function loginAdmin(password: string) {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "lambo";
  if (password === adminPassword) {
    const cookieStore = cookies();
    cookieStore.set("admin_mode", "true", { maxAge: 60 * 60 * 24, path: "/" }); // 24 hours
    return { success: true };
  }
  return { success: false, error: "INCORRECT PASSWORD" };
}

// Clear admin cookie
export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete("admin_mode");
  return { success: true };
}

// Get data for a tab
export async function getDevData(tab: string) {
  const filePath = path.join(DATA_DIR, `${tab === "activity" ? "tweets" : tab}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading dev data:", error);
    return [];
  }
}

// Save data for a tab (Admin only)
export async function saveDevData(tab: string, data: unknown) {
  const adminActive = await isAdmin();
  if (!adminActive) {
    throw new Error("UNAUTHORIZED");
  }

  const filePath = path.join(DATA_DIR, `${tab === "activity" ? "tweets" : tab}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Error writing dev data:", error);
    return { success: false, error: "FAILED TO WRITE DATA" };
  }
}

// Redis initialization helper
function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

// Get appreciation counts
export async function getAppreciations(slugs: string[]) {
  const redis = getRedis();
  const result: Record<string, number> = {};

  if (redis) {
    try {
      const pipeline = redis.pipeline();
      slugs.forEach(slug => {
        pipeline.get(`project:${slug}:appreciations`);
      });
      const counts = await pipeline.exec();
      slugs.forEach((slug, i) => {
        result[slug] = Number(counts[i]) || 0;
      });
      return result;
    } catch (e) {
      console.error("Upstash Redis error:", e);
    }
  }

  // Fallback to local json file
  const localFile = path.join(DATA_DIR, "appreciations.json");
  let localData: Record<string, number> = {};
  if (fs.existsSync(localFile)) {
    try {
      localData = JSON.parse(fs.readFileSync(localFile, "utf-8"));
    } catch {
      // ignore
    }
  }
  slugs.forEach(slug => {
    result[slug] = localData[slug] || 0;
  });
  return result;
}

// Increment appreciation
export async function incrementAppreciation(slug: string) {
  const redis = getRedis();
  if (redis) {
    try {
      const count = await redis.incr(`project:${slug}:appreciations`);
      return { success: true, count: Number(count) };
    } catch (e) {
      console.error("Upstash Redis incr error:", e);
    }
  }

  // Fallback to local json file
  const localFile = path.join(DATA_DIR, "appreciations.json");
  let localData: Record<string, number> = {};
  if (fs.existsSync(localFile)) {
    try {
      localData = JSON.parse(fs.readFileSync(localFile, "utf-8"));
    } catch {
      // ignore
    }
  }
  const currentCount = localData[slug] || 0;
  const newCount = currentCount + 1;
  localData[slug] = newCount;
  try {
    fs.writeFileSync(localFile, JSON.stringify(localData, null, 2), "utf-8");
    return { success: true, count: newCount };
  } catch {
    return { success: false, error: "FAILED TO WRITE LOCAL APPRECIATION" };
  }
}
