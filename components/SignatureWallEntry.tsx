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
    <div className="w-full mt-8 relative inline-block overflow-visible">
      {/* Handwritten Annotation - absolutely positioned, zero impact on layout */}
      <div className="absolute -top-6 left-0 flex items-end gap-1 rotate-[-3deg] origin-bottom-left opacity-0 animate-fade-in pointer-events-none">
        <span className="font-handwritten font-semibold text-base sm:text-lg text-white/55 whitespace-nowrap leading-tight">
          {getDynamicText()}
        </span>
        <svg width="28" height="28" viewBox="0 0 28 28" className="text-white/55 -mb-1">
          <path d="M22 4 Q 12 8, 8 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M8 20 L 11 13 M8 20 L 15 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
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
