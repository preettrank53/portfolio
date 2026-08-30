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
        <div className="w-full flex justify-between items-start mb-12">
          <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b949e] hover:text-purewhite transition-colors duration-300">
            ← BACK TO HOME
          </Link>
          <div className="relative">
            {/* Handwritten Annotation */}
            <div className="absolute -bottom-8 right-2 rotate-3 pointer-events-none hidden sm:flex items-center text-[var(--accent)] font-handwritten text-sm opacity-80 whitespace-nowrap">
              <span>yours could be here too</span>
              <svg className="w-4 h-4 ml-1 mt-1 -rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 5s3 2 4.5 5c1.5 3 1.5 8 1.5 8" />
                <path d="M11 18l5 0-1-5" />
              </svg>
            </div>
            <Link href="/sign" className="bg-[var(--accent)] border border-[var(--accent)] text-[var(--bg)] px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-transparent hover:text-[var(--text)] transition-colors duration-300 rounded-none inline-block">
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
