"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface DayData {
  date: string;
  count: number;
  level: number;
  label: string;
}

interface WeekData {
  days: DayData[];
  monthLabel?: string;
}

// Module-level cache to prevent re-fetching on mount/unmount/theme changes
let globalContributionsCache: ApiResponse | null = null;

export function GitHubActivity() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponse | null>(globalContributionsCache);
  const [loading, setLoading] = useState<boolean>(!globalContributionsCache);
  const [error, setError] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "preettrank53";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (globalContributionsCache) {
      setData(globalContributionsCache);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchActivity() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json: ApiResponse = await res.json();
        
        if (isMounted) {
          globalContributionsCache = json;
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        console.error("GitHub activity fetch error:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchActivity();

    return () => {
      isMounted = false;
    };
  }, [username]);

  // Scroll to the far right (most recent months/contributions) once data loads
  useEffect(() => {
    if (data && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      requestAnimationFrame(() => {
        container.scrollLeft = container.scrollWidth;
      });
    }
  }, [data]);

  // Compute levels based strictly on commit counts
  const getCommitLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 8) return 2;
    if (count <= 15) return 3;
    return 4;
  };

  // Dynamic Theme Styling (Keeping exact greens but adapting 0-commits, container, border, text)
  const isLight = mounted && theme === "light";
  const containerBg = isLight ? "bg-transparent" : "bg-[#0d1117]";
  const containerBorder = isLight ? "border-[var(--border)]" : "border-[#30363d]";
  const gridContainerBg = isLight ? "bg-transparent" : "bg-[#090d16]";
  const gridContainerBorder = isLight ? "border-[var(--border)]" : "border-[#30363d]";
  const textMuted = isLight ? "text-ash/70" : "text-[#8b949e]";
  const tooltipBg = isLight ? "bg-white" : "bg-[#161b22]";
  const tooltipBorder = isLight ? "border-[var(--border)]" : "border-[#30363d]";
  const tooltipText = isLight ? "text-black" : "text-white font-medium";

  const getCellBgColor = (level: number) => {
    if (level === 0) {
      return isLight ? "#ebedf0" : "#161b22"; // Light grey on white theme, dark grey on dark theme
    }
    switch (level) {
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: default: return "#39d353";
    }
  };

  const getCellTextColor = (level: number) => {
    if (level >= 3) return "#0d1117"; // Dark text on bright cells (level 3 & 4)
    return "#ffffff"; // White text on dark cells (level 1 & 2)
  };

  const renderGrid = () => {
    if (!data) return null;

    // Index daily contributions by date
    const contributionMap = new Map<string, ContributionDay>();
    data.contributions.forEach((day) => {
      contributionMap.set(day.date, day);
    });

    const weeks: WeekData[] = [];

    // Standard GitHub layout starts 53 weeks ago on Sunday
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 364); // ~52 weeks ago
    const startSunday = new Date(start);
    startSunday.setDate(startSunday.getDate() - startSunday.getDay()); // Align to Sunday

    let totalYearContributions = 0;
    let lastMonth = -1;

    for (let col = 0; col < 53; col++) {
      const weekDays: DayData[] = [];
      
      const colSunday = new Date(startSunday);
      colSunday.setDate(colSunday.getDate() + col * 7);
      
      const m = colSunday.getMonth();
      let monthLabel: string | undefined = undefined;
      if (m !== lastMonth) {
        monthLabel = colSunday.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
        lastMonth = m;
      }

      for (let row = 0; row < 7; row++) {
        const d = new Date(startSunday);
        d.setDate(d.getDate() + col * 7 + row);

        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const dayData = contributionMap.get(dateStr) || { date: dateStr, count: 0, level: 0 };
        
        // Sum contributions if it is in the last 365 days
        if (d <= today && d >= start) {
          totalYearContributions += dayData.count;
        }

        const computedLevel = getCommitLevel(dayData.count);

        weekDays.push({
          date: dateStr,
          count: dayData.count,
          level: computedLevel,
          label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        });
      }

      weeks.push({
        days: weekDays,
        monthLabel
      });
    }

    return (
      <div className="flex flex-col gap-2">
        {/* ONE shared horizontal scroll container */}
        <div 
          ref={scrollContainerRef}
          className={`w-full overflow-x-auto hide-scrollbar select-none border p-2 transition-colors duration-400 ${gridContainerBorder} ${gridContainerBg}`}
        >
          <div className="inline-block min-w-max">
            {/* MONTH ROW: aligned perfectly with week columns */}
            <div className="relative h-4 mb-1 select-none">
              {weeks.map((week, i) => {
                if (!week.monthLabel) return null;
                return (
                  <div
                    key={i}
                    className={`absolute text-[9px] font-mono uppercase whitespace-nowrap ${textMuted}`}
                    style={{ left: `${23 + i * 15}px` }}
                  >
                    {week.monthLabel}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-[3px]">
              {/* Day labels column aligned row-by-row */}
              <div className={`flex flex-col gap-[3px] select-none w-[20px] pr-1 text-[8px] font-mono uppercase transition-colors duration-400 ${textMuted}`}>
                <div className="h-[12px] flex items-center"></div>
                <div className="h-[12px] flex items-center">MON</div>
                <div className="h-[12px] flex items-center"></div>
                <div className="h-[12px] flex items-center">WED</div>
                <div className="h-[12px] flex items-center"></div>
                <div className="h-[12px] flex items-center">FRI</div>
                <div className="h-[12px] flex items-center"></div>
              </div>

              {/* WEEKS GRID */}
              <div className="flex gap-[3px]">
                {weeks.map((week, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-[3px] flex-shrink-0">
                    {week.days.map((day, rowIdx) => (
                      <div
                        key={rowIdx}
                        className="w-[12px] h-[12px] flex items-center justify-center font-mono text-[7px] font-medium relative group"
                        style={{
                          backgroundColor: getCellBgColor(day.level),
                          color: getCellTextColor(day.level)
                        }}
                      >
                        {day.count > 0 ? day.count : ""}

                        {/* Tooltip on hover */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-[100] border text-[8px] font-mono uppercase py-1 px-1.5 rounded-none whitespace-nowrap shadow-xl pointer-events-none ${tooltipBg} ${tooltipBorder} ${tooltipText}`}>
                          {day.count} COMMITS · {day.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footers & Info */}
        <div className={`flex justify-between items-center text-[9px] font-mono mt-2 uppercase tracking-wider select-none transition-colors duration-400 ${textMuted}`}>
          <span>{totalYearContributions.toLocaleString()} COMMITS IN LAST YEAR</span>
          <div className="flex items-center gap-1">
            <span>LESS</span>
            <div className="w-[12px] h-[12px]" style={{ backgroundColor: getCellBgColor(0) }} />
            <div className="w-[12px] h-[12px]" style={{ backgroundColor: getCellBgColor(1) }} />
            <div className="w-[12px] h-[12px]" style={{ backgroundColor: getCellBgColor(2) }} />
            <div className="w-[12px] h-[12px]" style={{ backgroundColor: getCellBgColor(3) }} />
            <div className="w-[12px] h-[12px]" style={{ backgroundColor: getCellBgColor(4) }} />
            <span>MORE</span>
          </div>
        </div>
      </div>
    );
  };

  // Loading indicator matching theme styles
  if (loading) {
    return (
      <div className={`border p-3 animate-pulse transition-colors duration-400 ${containerBorder} ${containerBg}`}>
        <span className={`block font-mono text-[9px] uppercase tracking-[0.2em] mb-3 transition-colors duration-400 ${textMuted}`}>
          FETCHING CONTRIBUTIONS...
        </span>
        <div className={`h-[82px] border border-dashed flex items-center justify-center ${containerBorder}`}>
          <div className="flex gap-[3px]">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="w-[12px] h-[12px]" style={{ backgroundColor: getCellBgColor(0) }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border p-3 transition-colors duration-400 ${containerBorder} ${containerBg}`}>
        <span className={`block font-mono text-[9px] uppercase tracking-[0.2em] mb-1 transition-colors duration-400 ${textMuted}`}>
          GITHUB ACTIVITY
        </span>
        <div className={`h-[82px] border border-dashed flex items-center justify-center ${containerBorder}`}>
          <span className="font-mono text-[9px] text-red-500/70 uppercase tracking-widest">
            ACTIVITY UNAVAILABLE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`border p-3 transition-colors duration-400 ${containerBorder} ${containerBg}`}>
      <span className={`block font-mono text-[9px] uppercase tracking-[0.2em] mb-1 transition-colors duration-400 ${textMuted}`}>
        GITHUB ACTIVITY
      </span>
      {renderGrid()}
    </div>
  );
}
