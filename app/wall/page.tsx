import React from "react";
import Link from "next/link";
import { Redis } from "@upstash/redis";
import WallGrid from "./WallGrid";
import type { Signature } from "@/types/signature";

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
    <main className="min-h-screen bg-[var(--bg)] text-purewhite p-6 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        
        {/* Header Section */}
        <div className="w-full flex justify-between items-center mb-12">
          <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b949e] hover:text-purewhite transition-colors duration-300 shrink-0 mr-4">
            ← BACK TO HOME
          </Link>
          
          <div className="relative inline-block overflow-visible z-10 flex-shrink-0 mt-2 md:mt-0">
            {/* Desktop: Middle Gap (left gutter relative to button) */}
            <div className="hidden lg:flex absolute right-full top-1/2 -translate-y-1/2 mr-6 items-center gap-2 pointer-events-none whitespace-nowrap z-10 opacity-0 animate-fade-in">
              <span className="font-handwritten font-semibold text-lg text-white/60 rotate-[-2deg]">
                {total === 0 ? "be the first" : `add yours to the ${total}`}
              </span>
              <svg width="44" height="44" viewBox="0 0 44 44" className="text-white/60 shrink-0">
                <path d="M8 34 Q 20 18, 34 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M34 8 L 24 10 M34 8 L 32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            {/* Mobile fallback: Standard Flow Above Target */}
            <div className="lg:hidden mb-2 opacity-0 animate-fade-in pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="font-handwritten font-semibold text-sm text-white/60 rotate-[-2deg]">
                  {total === 0 ? "be the first" : `add yours to the ${total}`}
                </span>
                <svg width="24" height="20" viewBox="0 0 24 20" className="text-white/60">
                  <path d="M2 2 Q 12 2, 18 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
                  <path d="M18 12 L 12 10 M18 12 L 15 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>

            <Link href="/sign" className="bg-[var(--text)] border border-[var(--text)] text-[var(--bg)] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-transparent hover:text-[var(--text)] transition-colors duration-300 rounded-none inline-block w-auto relative z-20">
              ADD YOUR SIGNATURE
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="font-sans font-extrabold tracking-tighter uppercase text-purewhite text-4xl md:text-6xl mb-4">
            THE WALL
          </h1>
          <span className="font-mono text-xs md:text-sm text-ash tracking-wide uppercase">
            {total.toLocaleString()} people have left their mark
          </span>
        </div>

        {/* The Grid */}
        <WallGrid initialSignatures={signatures} initialTotal={total} />

      </div>
    </main>
  );
}
