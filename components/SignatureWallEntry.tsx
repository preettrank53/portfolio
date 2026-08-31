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
      <div className="hidden lg:flex absolute right-full top-1/2 -translate-y-1/2 mr-4 items-center gap-2 pointer-events-none whitespace-nowrap z-10">
        <span className="font-handwritten font-semibold text-xl text-white/90 rotate-[-2deg]">
          {getDynamicText()}
        </span>
        <svg className="w-28 h-12 text-white/90 shrink-0" viewBox="0 0 120 50" style={{ overflow: 'visible' }}>
          <defs>
            <marker id="arrow-desktop-3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <polygon points="0,7 2,3.5 0,0 7,3.5" fill="currentColor"/>
            </marker>
          </defs>
          <path d="M 0,25 Q 50,55 115,25" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrow-desktop-3)"/>
        </svg>
      </div>

      {/* Mobile fallback: Standard Flow Above Target */}
      <div className="lg:hidden mb-2 pointer-events-none">
        <div className="flex items-end gap-2">
          <span className="font-handwritten font-semibold text-lg text-white/90 rotate-[-2deg]">
            {getDynamicText()}
          </span>
          <svg className="w-10 h-10 text-white/90 -mb-2" viewBox="0 0 50 50" style={{ overflow: 'visible' }}>
            <defs>
              <marker id="arrow-mobile-3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0,6 2,3 0,0 6,3" fill="currentColor"/>
              </marker>
            </defs>
            <path d="M 5,5 Q 40,-5 35,40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrow-mobile-3)"/>
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
