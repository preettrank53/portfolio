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
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
            {/* Handwritten Annotation */}
            <div className="flex items-center text-[var(--accent)] font-handwritten text-sm sm:text-base opacity-80 whitespace-nowrap pointer-events-none">
              <span>{total === 0 ? "be the first" : `add yours to the ${total}`}</span>
              
              {/* Desktop Arrow (points sideways into the left edge of the button) */}
              <svg 
                className="w-7 h-7 ml-2 hidden sm:block translate-y-2 translate-x-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M2 10 C 10 4 15 10 19 15" />
                <path d="M13 15 L 19 15 L 19 9" />
              </svg>

              {/* Mobile Arrow (points down into the top of the button) */}
              <svg 
                className="w-6 h-6 block sm:hidden ml-2 translate-y-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 4 C 15 10 15 15 12 20" />
                <path d="M7 16 L 12 21 L 17 16" />
              </svg>
            </div>
            
            <Link href="/sign" className="bg-[var(--text)] border border-[var(--text)] text-[var(--bg)] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-transparent hover:text-[var(--text)] transition-colors duration-300 rounded-none inline-block w-auto shrink-0">
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
