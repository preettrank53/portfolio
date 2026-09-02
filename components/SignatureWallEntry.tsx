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
    <div className="border-b border-[var(--theme-border)] p-10 flex flex-col items-center justify-center text-center space-y-6 bg-[var(--theme-hover)] w-full">
      <h2 className="text-2xl font-bold text-[var(--theme-text)]">Leave your mark.</h2>
      {count !== null && (
        <p className="text-[var(--theme-muted)] font-mono text-sm">
          Join the {count} people who have signed the wall.
        </p>
      )}
      <div className="relative">
        
        <a
          href="/wall"
          onClick={handleClick}
          className="block border border-[var(--theme-border)] text-[var(--theme-muted)] px-6 py-2.5 hover:bg-[var(--theme-hover)] hover:text-[var(--theme-text)] transition-colors tracking-wide text-sm relative overflow-hidden"
        >
          <span className={`${isPending ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
            See the Wall
          </span>
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="animate-pulse">Loading...</span>
            </div>
          )}
        </a>
      </div>
    </div>
  );
}
