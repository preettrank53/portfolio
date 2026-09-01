import React from "react";
import Link from "next/link";
import { Redis } from "@upstash/redis";
import WallGrid from "./WallGrid";
import type { Signature } from "@/types/signature";
import { PRLogo } from "@/components/identity/PRLogo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export const revalidate = 0; // Dynamic rendering to always show fresh signatures

async function getInitialSignatures() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return { signatures: [], total: 0 };
  }

  const redis = new Redis({ url, token });

  try {
    const rawSignatures = await redis.zrange("signatures", 0, 49, { rev: true });
    const count = await redis.get<number>("signatures:count") || 0;

    const signatures: Signature[] = rawSignatures.map(sig => {
      if (typeof sig === "string") {
        try { return JSON.parse(sig); } catch { return null; }
      }
      return sig;
    }).filter(Boolean);

    return { signatures, total: count };
  } catch (error) {
    console.error("Failed to fetch initial signatures:", error);
    return { signatures: [], total: 0 };
  }
}

export default async function WallPage() {
  const { signatures, total } = await getInitialSignatures();

  return (
    <main className="max-w-4xl mx-auto border-x border-[var(--theme-border)] min-h-screen flex flex-col pb-24 text-[var(--theme-text)] selection:bg-zinc-50 selection:text-zinc-950 transition-colors duration-500 relative z-10 bg-[var(--theme-bg)]">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[var(--theme-bg)] border-b border-[var(--theme-border)] h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Left (Identity) */}
        <Link href="/" className="flex items-center gap-3 hover:text-zinc-400 transition-colors">
          <PRLogo className="w-8 h-auto text-[var(--theme-text)]" />
        </Link>
        
        {/* Center (Empty) */}
        <div className="flex-1"></div>

        {/* Right (Utilities) */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Page Title */}
      <div className="border-b border-[var(--theme-border)] p-6 md:p-10 flex flex-col gap-4">
        <h1 className="font-mono text-sm tracking-widest text-[var(--theme-muted)]">
          01 // Signature Logbook
        </h1>
        <p className="font-sans text-xl md:text-3xl font-extrabold tracking-tighter text-[var(--theme-text)]">
          A permanent record of visitors. ({total.toLocaleString()})
        </p>
      </div>

      {/* The Grid */}
      <div className="w-full flex flex-col">
        <WallGrid initialSignatures={signatures} initialTotal={total} />
      </div>

    </main>
  );
}
