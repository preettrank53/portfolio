"use client";

import React, { useState, useEffect } from "react";
import { IconMapping } from "./icons";

export const StackIconBox = ({ name, iconName, color }: { name: string; iconName: string; color: string }) => {
  const IconComponent = iconName !== "TextFallback" ? IconMapping[iconName] : undefined;
  const [clickedExpanded, setClickedExpanded] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hoverQuery = window.matchMedia("(hover: hover)");
      setHasHover(hoverQuery.matches);
      const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
      hoverQuery.addEventListener("change", handler);
      return () => hoverQuery.removeEventListener("change", handler);
    }
  }, []);

  const isWhite = color && color.toUpperCase() === "#FFFFFF";
  const displayColor = isWhite ? "var(--text)" : color;

  if (!IconComponent) {
    return (
      <div 
        className="flex w-12 h-12 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--surface)] rounded-none select-none text-center"
      >
        <span className="text-[11px] font-mono font-bold text-[var(--text)] tracking-wider" style={{ color: displayColor }}>
          {name.substring(0, 3).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div 
      onClick={() => !hasHover && setClickedExpanded(!clickedExpanded)}
      className={`group relative flex h-11 items-center overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text)] rounded-none cursor-pointer z-10 hover:z-20 select-none min-w-[44px] min-h-[44px] ${
        hasHover 
          ? "w-11 md:w-auto max-w-[44px] md:max-w-[56px] md:hover:max-w-[200px] transition-[max-width] duration-300 ease-out md:h-14"
          : clickedExpanded 
            ? "w-auto px-2"
            : "w-11"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center md:h-14 md:w-14">
        <IconComponent className="text-xl md:text-3xl transition-transform duration-300 group-hover:scale-105" style={{ color: displayColor }} />
      </div>
      {hasHover ? (
        <span className="whitespace-nowrap font-mono text-[10px] tracking-widest text-[var(--text)] opacity-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[120px] ml-0 group-hover:ml-1 pr-0 group-hover:pr-3">
          {name}
        </span>
      ) : (
        clickedExpanded && (
          <span className="whitespace-nowrap font-mono text-[10px] tracking-widest text-[var(--text)] ml-1 pr-2">
            {name}
          </span>
        )
      )}
    </div>
  );
};
