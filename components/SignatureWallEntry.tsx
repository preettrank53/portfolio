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
    <div className="w-full mt-8 relative">
      {/* Handwritten Annotation */}
      <div className="flex flex-col w-full items-end sm:items-start px-2 mb-1 pointer-events-none text-[var(--accent)] font-handwritten text-sm sm:text-base opacity-80 -rotate-2">
        <div className="flex items-center gap-1 translate-y-1">
          <span>{getDynamicText()}</span>
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 translate-y-2 -translate-x-1 rotate-[30deg] sm:rotate-12" 
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
