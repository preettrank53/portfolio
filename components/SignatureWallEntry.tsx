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
    <div className="w-full mt-9 relative inline-block overflow-visible">
      {/* Handwritten Annotation - absolutely positioned, centered in the gap */}
      <div className="absolute -top-8 left-0 flex items-center gap-1.5 opacity-0 animate-fade-in pointer-events-none">
        <span className="font-handwritten font-semibold text-sm sm:text-base text-white/60 whitespace-nowrap rotate-[-3deg]">
          {getDynamicText()}
        </span>
        <svg width="22" height="22" viewBox="0 0 22 22" className="text-white/60">
          <path d="M4 3 Q 12 5, 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M15 16 L 11 12 M15 16 L 10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
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
