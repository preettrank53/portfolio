"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { ProjectCard } from "@/components/feed/ProjectCard";
import type { DevLogItem, Screenshot } from "@/types/portfolio";
import projectsData from "../../data/projects.json";
import { PRLogo } from "@/components/identity/PRLogo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandTrigger, CommandFloatingButton, CommandMenu } from "@/components/shared/CommandMenu";

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

  const [openCommandPalette, setOpenCommandPalette] = useState(false);

  return (
    <main className="min-h-screen w-full max-w-4xl mx-auto border-x border-[var(--theme-border)] flex flex-col pb-24 text-[var(--theme-text)] bg-[var(--theme-bg)] transition-colors duration-500 relative z-10">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
        {/* Left */}
        <Link href="/" className="flex items-center gap-3 focus-visible:ring-[3px] focus-visible:ring-[var(--theme-border)] outline-none rounded-sm">
          <PRLogo className="w-8 h-auto text-[var(--theme-text)]" />
        </Link>
        
        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex gap-4 text-sm font-light text-[var(--theme-text)] items-center">
            <Link href="/#experience" className="hover:underline underline-offset-[5px]">Experience</Link>
            <Link href="/projects" className="underline underline-offset-[5px]">Projects</Link>
            <Link href="/#skills" className="hover:underline underline-offset-[5px]">Skills</Link>
            <CommandTrigger onClick={() => setOpenCommandPalette(true)} />
          </nav>
          
          <span className="bg-[var(--theme-border)] hidden h-4 w-px md:block" aria-hidden />

          <div className="flex h-8 items-center gap-0.5 rounded-full bg-[var(--theme-hover)] p-0.5 border border-[var(--theme-border)]">
            <ThemeToggle className="w-7 h-7" />
          </div>

          <div className="border-[var(--theme-border)] border-l pl-2 md:hidden flex items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-transparent hover:bg-[var(--theme-hover)] text-[var(--theme-text)]" aria-label="Open menu">
                  <Menu className="w-[18px] h-[18px]" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-48 bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-md shadow-lg p-1">
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <Link href="/#experience">Experience</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors bg-[var(--theme-hover)]">
                  <Link href="/projects">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <Link href="/#skills">Skills</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <button onClick={() => setOpenCommandPalette(true)} className="w-full text-left">Search (⌘K)</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
      <CommandFloatingButton onClick={() => setOpenCommandPalette(true)} />
      <CommandMenu open={openCommandPalette} onOpenChange={setOpenCommandPalette} />

      <Footer />
    </main>
  );
}
