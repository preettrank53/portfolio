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
      <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
        {/* Left */}
        <Link href="/" className="flex items-center gap-3 hover:text-zinc-400 transition-colors">
          <PRLogo className="w-8 h-auto text-[var(--theme-text)]" />
        </Link>
        
        {/* Center */}
        <nav className="hidden md:flex gap-6 text-sm font-mono text-[var(--theme-muted)]">
          <Link href="/#experience" className="hover:text-[var(--theme-text)] transition-colors">Experience</Link>
          <Link href="/#projects" className="hover:text-[var(--theme-text)] transition-colors">Projects</Link>
          <Link href="/#skills" className="hover:text-[var(--theme-text)] transition-colors">Skills</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/preettrank53/portfolio.git" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
          </a>
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
