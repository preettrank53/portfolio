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
          
          <div className="relative inline-block overflow-visible z-10 flex-shrink-0 mt-8 md:mt-0">
            {/* Unified Annotation: Right-Down Placement */}
            <div className="absolute top-full -right-2 md:-right-6 mt-2 md:mt-4 flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-[var(--text)] opacity-75 -mt-2 mr-8 md:mr-12 shrink-0" viewBox="0 0 60 60" style={{ overflow: 'visible' }}>
                <defs>
                  <marker id="arrow-4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0,6 2,3 0,0 6,3" fill="currentColor"/>
                  </marker>
                </defs>
                <path d="M 45,50 Q 30,15 5,0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrow-4)"/>
              </svg>
              <div className="flex flex-col items-center rotate-[-3deg]">
                <span className="font-handwritten font-semibold text-lg md:text-xl text-[var(--text)] opacity-75">
                  {total === 0 ? "be the first" : `add yours to the ${total}`}
                </span>
                <span className="font-handwritten font-medium text-sm md:text-base text-[var(--text)] opacity-50 ml-4">
                  right here
                </span>
              </div>
            </div>

            <Link href="/sign" className="bg-[var(--text)] border border-[var(--text)] text-[var(--bg)] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-transparent hover:text-[var(--text)] transition-colors duration-300 rounded-none inline-block w-auto relative z-20">
              ADD YOUR SIGN
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
