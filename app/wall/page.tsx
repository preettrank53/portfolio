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
          
          <div className="relative inline-block overflow-visible z-10 flex-shrink-0">
            <Link href="/sign" className="bg-[var(--text)] border border-[var(--text)] text-[var(--bg)] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-transparent hover:text-[var(--text)] transition-colors duration-300 rounded-none inline-block w-auto relative z-10">
              ADD YOUR SIGNATURE
            </Link>

            {/* Positioned in the dead space to the RIGHT and slightly below the button */}
            <div className="hidden sm:block absolute top-full right-0 mt-3 pointer-events-none opacity-0 animate-fade-in z-20">
              <svg width="30" height="30" viewBox="0 0 30 30" className="text-white/55 mb-1">
                {/* arrow curving UP-LEFT into the button's bottom-right corner */}
                <path d="M24 4 Q 14 8, 6 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
                <path d="M6 20 L 9 12 M6 20 L 16 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
              </svg>
              <span className="font-handwritten font-semibold text-lg text-white/55 rotate-[-2deg] whitespace-nowrap block">
                {total === 0 ? "be the first" : `add yours to the ${total}`}
              </span>
            </div>

            {/* Positioned above the button on mobile */}
            <div className="sm:hidden absolute -top-6 right-0 flex items-end gap-1 rotate-[-3deg] origin-bottom-right opacity-0 animate-fade-in pointer-events-none z-20">
              <span className="font-handwritten font-semibold text-sm text-white/55 whitespace-nowrap">
                {total === 0 ? "be the first" : `add yours to the ${total}`}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-white/55 -mb-1">
                <path d="M16 4 Q 10 6, 6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M6 16 L 8 10 M6 16 L 12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
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
