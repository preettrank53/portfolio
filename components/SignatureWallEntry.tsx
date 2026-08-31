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
      {/* Unified Annotation: Right-Down Placement */}
      <div className="absolute top-full right-0 mt-2 md:mt-4 flex flex-col items-end pointer-events-none whitespace-nowrap z-10">
        <svg className="w-12 h-12 md:w-16 md:h-16 text-[var(--text)] opacity-75 -mt-6 md:-mt-8 mr-6 md:mr-8 shrink-0" viewBox="0 0 60 60" style={{ overflow: 'visible' }}>
          <defs>
            <marker id="arrow-3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0,6 2,3 0,0 6,3" fill="currentColor"/>
            </marker>
          </defs>
          <path d="M 50,45 Q 30,5 5,15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrow-3)"/>
        </svg>
        <div className="flex flex-col items-end rotate-[3deg] mr-2">
          <span className="font-handwritten font-semibold text-lg md:text-xl text-[var(--text)] opacity-75">
            {getDynamicText()}
          </span>
          <span className="font-handwritten font-medium text-sm md:text-base text-[var(--text)] opacity-50 mr-4">
            join them
          </span>
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
