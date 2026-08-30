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
    <div className="w-full relative inline-block overflow-visible mt-10 md:mt-8">
      {/* Desktop: True Left-Gutter Placement */}
      <div className="hidden md:flex absolute right-full top-1/2 -translate-y-1/2 mr-4 items-center gap-2 pointer-events-none whitespace-nowrap z-10 opacity-0 animate-fade-in">
        <span className="font-handwritten font-semibold text-lg text-white/60 rotate-[-3deg]">
          {getDynamicText()}
        </span>
        <svg width="34" height="34" viewBox="0 0 34 34" className="text-white/60 shrink-0">
          <path d="M4 4 Q 22 6, 18 16 Q 14 24, 28 26" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M28 26 L 20 24 M28 26 L 25 32" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Mobile fallback: Top Right Corner */}
      <div className="md:hidden absolute -top-7 right-0 flex items-end gap-1 pointer-events-none z-10 opacity-0 animate-fade-in">
        <span className="font-handwritten font-semibold text-base text-white/60 rotate-[-3deg]">
          {getDynamicText()}
        </span>
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-white/60 -mb-1">
          <path d="M4 4 Q 12 4, 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M16 16 L 12 12 M16 16 L 18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
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
