"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/feed/ProjectCard";
import type { DevLogItem, Screenshot } from "@/types/portfolio";
import projectsData from "../../data/projects.json";
import { PRLogo } from "@/components/identity/PRLogo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function ProjectsPage() {
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [userAppreciated] = useState<Record<string, boolean>>({});
  const [appreciations] = useState<Record<string, number>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const [, setScreenshotList] = useState<Screenshot[]>([]);
  const [, setScreenshotIndex] = useState<number>(0);
  const [, setSelectedScreenshot] = useState<Screenshot | null>(null);

  useEffect(() => {
    // Check admin status
    const isLoggedIn = document.cookie
      .split("; ")
      .some((c) => c.trim() === "admin_session_flag=true");
    setAdminMode(isLoggedIn);
  }, []);

  return (
    <main className="min-h-screen w-full max-w-4xl mx-auto border-x border-[var(--theme-border)] flex flex-col pb-24 text-[var(--theme-text)] bg-[var(--theme-bg)] transition-colors duration-500 relative z-10">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors flex items-center justify-center p-2 border border-[var(--theme-border)] rounded-md">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/" className="flex items-center gap-3 hover:text-zinc-400 transition-colors">
            <PRLogo className="w-8 h-auto text-[var(--theme-text)]" />
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <div className="w-full relative z-10 flex flex-col">
        <div className="p-6 md:p-10 border-b border-[var(--theme-border)]">
          <h1 className="font-sans font-extrabold tracking-tighter text-[var(--theme-text)] text-3xl md:text-4xl mb-4">
            All Projects
          </h1>
          <p className="text-sm text-[var(--theme-muted)] font-medium max-w-xl">
            A comprehensive list of backend systems, AI agents, and full-stack applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
          {(projectsData as DevLogItem[]).map((post, index) => {
            const hasAppreciated = userAppreciated[post.id] || false;
            const appCount = appreciations[post.id] ?? 0;
            const isExpanded = expandedCards[post.id] || false;
            const bodyText = post.body || "";
            const shouldTruncate = bodyText.split("\n").length > 4 || bodyText.length > 300;

            return (
              <ProjectCard
                key={post.id}
                post={post}
                index={index}
                adminMode={adminMode}
                hasUserAppreciated={hasAppreciated}
                appCount={appCount}
                isExpanded={isExpanded}
                shouldTruncate={shouldTruncate}
                setExpandedCards={setExpandedCards}
                handleTogglePin={() => {}}
                handleStartEdit={() => {}}
                handleAppreciate={() => {}}
                setScreenshotList={setScreenshotList}
                setScreenshotIndex={setScreenshotIndex}
                setSelectedScreenshot={setSelectedScreenshot}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
