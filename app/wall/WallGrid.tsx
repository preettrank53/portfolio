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
    <div className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t-0">
        {signatures.map((sig) => (
          <div key={sig.id} className="border-b border-r border-[var(--theme-border)] p-6 flex flex-col aspect-square justify-between hover:bg-[var(--theme-hover)] transition-colors relative overflow-hidden group">
            <div className="w-full aspect-[16/7] relative overflow-hidden">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[var(--theme-text)] opacity-80 group-hover:opacity-100 transition-opacity">
                {sig.strokes.map(renderStroke)}
              </svg>
            </div>
            <div className="flex flex-col mt-4">
              <span className="font-sans font-medium text-xs text-[var(--theme-text)] truncate">
                {sig.name} {getFlagEmoji(sig.country)}
              </span>
              {sig.note && (
                <span className="font-mono text-[9px] text-[var(--theme-muted)] tracking-wide mt-2 line-clamp-2">
                  {sig.note}
                </span>
              )}
              <span className="font-mono text-[8px] tracking-wider text-[var(--theme-muted)]/60 mt-3 block">
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
          className="w-full text-center py-4 border-b border-[var(--theme-border)] text-[var(--theme-muted)] font-sans text-xs rounded-none hover:bg-[var(--theme-hover)] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
