"use client";

import React, { useState } from "react";
import type { Signature, SignaturePoint } from "@/types/signature";

interface WallGridProps {
  initialSignatures: Signature[];
  initialTotal: number;
}

const formatRelativeTime = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const daysDifference = Math.round((timestamp - Date.now()) / (1000 * 60 * 60 * 24));
  if (Math.abs(daysDifference) > 0) return rtf.format(daysDifference, "day");
  
  const hoursDifference = Math.round((timestamp - Date.now()) / (1000 * 60 * 60));
  if (Math.abs(hoursDifference) > 0) return rtf.format(hoursDifference, "hour");
  
  const minutesDifference = Math.round((timestamp - Date.now()) / (1000 * 60));
  if (Math.abs(minutesDifference) > 0) return rtf.format(minutesDifference, "minute");
  
  return "just now";
};

const getFlagEmoji = (countryCode: string | null) => {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function WallGrid({ initialSignatures, initialTotal }: WallGridProps) {
  const [signatures, setSignatures] = useState<Signature[]>(initialSignatures);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(initialSignatures.length);

  const handleLoadMore = async () => {
    if (isLoading || signatures.length >= total) return;
    setIsLoading(true);
    
    try {
      const res = await fetch(`/api/signatures?limit=50&offset=${offset}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      setSignatures(prev => [...prev, ...data.signatures]);
      setOffset(prev => prev + data.signatures.length);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStroke = (stroke: SignaturePoint[], index: number) => {
    if (stroke.length === 0) return null;
    let d = `M ${stroke[0].x * 100},${stroke[0].y * 100}`;
    for (let i = 1; i < stroke.length; i++) {
      d += ` L ${stroke[i].x * 100},${stroke[i].y * 100}`;
    }
    return <path key={index} d={d} stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {signatures.map((sig) => (
          <div key={sig.id} className="border border-[var(--border)] bg-[var(--surface)] p-4 flex flex-col gap-3 group relative overflow-hidden backdrop-blur-sm">
            <div className="w-full aspect-[16/7] relative overflow-hidden border border-white/5">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[var(--text)] opacity-80">
                {sig.strokes.map(renderStroke)}
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-purewhite truncate">
                {sig.name} {getFlagEmoji(sig.country)}
              </span>
              {sig.note && (
                <span className="font-mono text-[9px] text-ash tracking-wide mt-1 line-clamp-2">
                  {sig.note}
                </span>
              )}
              <span className="font-mono text-[8px] uppercase tracking-widest text-ash/50 mt-2 block">
                {formatRelativeTime(sig.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {signatures.length < total && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="w-full max-w-sm text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? "LOADING..." : "LOAD MORE"}
        </button>
      )}
    </div>
  );
}
