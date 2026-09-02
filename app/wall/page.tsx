import React from "react";
import Link from "next/link";
import { Redis } from "@upstash/redis";
import WallGrid from "./WallGrid";
import type { Signature } from "@/types/signature";

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
      <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
        {/* Left */}
        <Link href="/" className="flex items-center gap-2 text-xs font-mono text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
          &larr; Back to home
        </Link>
        
        {/* Center */}
        <nav className="hidden md:flex gap-6 text-sm font-mono text-[var(--theme-muted)]">
          <Link href="/#experience" className="hover:text-[var(--theme-text)] transition-colors">Experience</Link>
          <Link href="/#projects" className="hover:text-[var(--theme-text)] transition-colors">Projects</Link>
          <Link href="/#skills" className="hover:text-[var(--theme-text)] transition-colors">Skills</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/sign" className="border border-[var(--theme-border)] px-4 py-2 text-xs font-bold hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors">ADD YOUR SIGN</Link>
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
