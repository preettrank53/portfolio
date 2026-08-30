"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function SignatureWallEntry() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/signatures?limit=0")
      .then(res => res.json())
      .then(data => setCount(data.total || 0))
      .catch(() => setCount(0));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push("/wall");
    });
  };

  const getDynamicText = () => {
    if (count === null) return "...";
    if (count === 0) return "be the first to sign";
    if (count < 10) return `${count} people signed so far`;
    return `join ${count}+ who left their mark`;
  };

  return (
    <div className="w-full relative inline-block overflow-visible mt-8">
      {/* Desktop: True Left-Gutter Placement */}
      <div className="hidden lg:flex absolute right-full top-1/2 -translate-y-1/2 mr-6 items-center gap-2 pointer-events-none whitespace-nowrap z-10 opacity-0 animate-fade-in">
        <span className="font-handwritten font-semibold text-lg text-white/60 rotate-[-3deg]">
          {getDynamicText()}
        </span>
        <svg width="48" height="28" viewBox="0 0 48 28" className="text-white/60 shrink-0">
          <path d="M2 4 Q 20 0, 24 12 Q 28 22, 40 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M40 18 L 31 17 M40 18 L 36 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Mobile fallback: Standard Flow Above Target */}
      <div className="lg:hidden mb-2 opacity-0 animate-fade-in pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="font-handwritten font-semibold text-sm text-white/60 rotate-[-2deg]">
            {getDynamicText()}
          </span>
          <svg width="24" height="20" viewBox="0 0 24 20" className="text-white/60">
            <path d="M2 2 Q 12 2, 18 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
            <path d="M18 12 L 12 10 M18 12 L 15 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>
      
      <a
        href="/wall"
        onClick={handleClick}
        className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[48px] flex items-center justify-center relative overflow-hidden"
      >
        <span className={`${isPending ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
          SEE THE WALL
        </span>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-pulse">LOADING...</span>
          </div>
        )}
      </a>
    </div>
  );
}
