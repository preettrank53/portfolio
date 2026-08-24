import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "preettrank53";

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 0 } // bypass Next.js cache
    });

    if (!res.ok) {
      throw new Error(`GitHub contributions fetch failed: ${res.status}`);
    }

    const html = await res.text();
    const tooltipRegexMap = new Map<string, string>();

    // Parse tooltip contents robustly
    const tooltipRegex = /<tool-tip\s+([^>]*for="[^"]+"[^>]*)>([\s\S]*?)<\/tool-tip>/g;
    let tooltipMatch;
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      const attrs = tooltipMatch[1];
      const content = tooltipMatch[2].trim();
      const forMatch = attrs.match(/for="([^"]+)"/);
      if (forMatch) {
        tooltipRegexMap.set(forMatch[1], content);
      }
    }

    // Parse days robustly
    const tdRegex = /<td\s+([^>]*data-date="[^"]+"[^>]*)>/g;
    const contributions: ContributionDay[] = [];
    let tdMatch;
    while ((tdMatch = tdRegex.exec(html)) !== null) {
      const attrs = tdMatch[1];
      const dateMatch = attrs.match(/data-date="([^"]+)"/);
      const levelMatch = attrs.match(/data-level="([^"]+)"/);
      const idMatch = attrs.match(/id="([^"]+)"/);

      if (dateMatch && levelMatch) {
        const date = dateMatch[1];
        const level = parseInt(levelMatch[1], 10);
        const id = idMatch ? idMatch[1] : "";

        const tooltipText = tooltipRegexMap.get(id) || "";
        let count = 0;

        if (tooltipText) {
          const countMatch = tooltipText.match(/^([0-9,]+)\s+contribution/i);
          if (countMatch) {
            count = parseInt(countMatch[1].replace(/,/g, ""), 10);
          } else if (tooltipText.toLowerCase().startsWith("no contribution")) {
            count = 0;
          } else {
            count = level > 0 ? level * 2 : 0; // Fallback estimate
          }
        } else {
          count = level > 0 ? level * 2 : 0; // Fallback estimate
        }

        contributions.push({
          date,
          count,
          level
        });
      }
    }

    // Calculate annual contribution totals
    const total: Record<string, number> = {};
    contributions.forEach((c) => {
      const year = c.date.split("-")[0];
      if (year) {
        total[year] = (total[year] || 0) + c.count;
      }
    });

    return NextResponse.json({
      total,
      contributions
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
