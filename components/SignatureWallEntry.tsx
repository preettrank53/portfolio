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

  return (
    <div className="border-b border-zinc-800 p-10 flex flex-col items-center justify-center text-center space-y-6 bg-zinc-900/10 w-full">
      <h2 className="text-2xl font-bold text-zinc-50">Leave your mark.</h2>
      {count !== null && (
        <p className="text-zinc-400 font-mono text-sm">
          Join the {count} people who have signed the wall.
        </p>
      )}
      <div className="relative">
        <div className="absolute -top-12 -right-12 hidden md:flex flex-col items-start pointer-events-none opacity-70 rotate-[6deg]">
          <span className="font-handwritten text-xl text-zinc-400">add yours</span>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 ml-2 mt-1">
            <path d="M19 5l-7 7-7-7"/>
          </svg>
        </div>
        <a
          href="/wall"
          onClick={handleClick}
          className="block border border-zinc-50 text-zinc-50 px-8 py-3 hover:bg-zinc-50 hover:text-zinc-950 transition-colors uppercase tracking-widest text-sm font-bold relative overflow-hidden"
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
    </div>
  );
}
