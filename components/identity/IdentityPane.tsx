"use client";

import React from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon, SiX, SiMedium } from "@/components/shared/icons";
import { SignatureWallEntry } from "@/components/SignatureWallEntry";
import { GitHubActivity } from "@/app/GitHubActivity";
import { SidebarSkeleton, PrListSkeleton, ViewCounterSkeleton } from "@/components/ui/page-skeletons";
import { ErrorBoundary } from "@/app/ErrorBoundary";

interface GitHubPR {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
}

interface IdentityPaneProps {
  loading: boolean;
  mounted: boolean;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  // PR data
  prs: GitHubPR[];
  prsLoading: boolean;
  prsError: boolean;
  // View counter
  viewCount: number | null;
  viewCountError: boolean;
}

export function IdentityPane({
  loading,
  mounted,
  theme,
  setTheme,
  prs,
  prsLoading,
  prsError,
  viewCount,
  viewCountError,
}: IdentityPaneProps) {
  return (
    <ErrorBoundary title="IDENTITY PANE">
      <aside id="left-scroll-container" className="relative w-full py-6 border-b border-[var(--border)] md:sticky md:top-0 md:h-screen md:w-[35%] md:py-12 md:pr-12 md:px-0 flex flex-col md:justify-between md:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:border-b-0 md:border-r border-charcoal select-none">
        {/* Box 1: Profile + Buttons */}
        {loading ? (
          <SidebarSkeleton />
        ) : (
          <div className="border border-[var(--border)] md:border-none p-6 md:p-0 mb-4 md:mb-0 flex flex-col gap-6 md:gap-8 bg-[var(--surface)]/30 md:bg-transparent">
            {/* Avatar */}
            <div className="w-20 h-20 md:w-24 md:h-24 border border-[var(--border)] bg-[var(--surface)] rounded-[18px] md:rounded-2xl p-1 flex-shrink-0 select-none overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.png"
                alt="PREET RANK"
                className="w-full h-full object-cover rounded-[14px] md:rounded-xl border border-white/10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith(".png")) {
                    target.src = "/profile.jpg";
                  }
                }}
              />
            </div>

            {/* Display Name */}
            <div className="flex flex-col">
              <h1 className="font-sans font-extrabold tracking-tighter uppercase text-purewhite whitespace-nowrap text-3xl md:text-3xl">
                PREET RANK
              </h1>
              <span className="font-mono text-xs text-ash uppercase tracking-widest mt-1">
                @preettrank
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm leading-relaxed text-ash font-sans font-medium">
              21, figuring out code, AI/ML &amp; LLMs.<br />
              currently learning LLM inference, looking for an internship.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col w-full">
              <a
                href="mailto:preetrank53@gmail.com"
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[48px] flex items-center justify-center relative z-20"
              >
                EMAIL ME
              </a>

              <a
                href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[48px] flex items-center justify-center mt-3"
              >
                VIEW RESUME
              </a>
            </div>

            {/* Social Icons */}
            <div className="w-full mt-6">
              <span className="font-handwritten font-semibold text-base text-[var(--text)] opacity-50 block mb-2 select-none">
                stalk me here
              </span>
              <div className="flex justify-between w-full">
                <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <GithubIcon className="w-full h-full" />
                </a>
                <a href="https://x.com/preettrank" target="_blank" rel="noopener noreferrer" className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <SiX className="w-full h-full" />
                </a>
                <a href="https://www.linkedin.com/in/preetrank/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <LinkedinIcon className="w-full h-full" />
                </a>
                <a href="https://www.instagram.com/preettrank/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <InstagramIcon className="w-full h-full" />
                </a>
                <a href="https://medium.com/@preetrank53" target="_blank" rel="noopener noreferrer" className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <SiMedium className="w-full h-full" />
                </a>
              </div>
            </div>

            <SignatureWallEntry />
          </div>
        )}

        {/* GitHub Activity Chart */}
        <div className="border border-[var(--border)] md:border-none p-4 md:p-0 mb-4 md:mb-0 mt-4 md:mt-6 bg-[var(--surface)]/30 md:bg-transparent">
          <GitHubActivity />
        </div>

        {/* Recent Open Source PRs */}
        {!prsError && (prsLoading || prs.length > 0) && (
          <div className="border border-[var(--border)] md:border-none p-4 md:p-0 mb-4 md:mb-0 mt-4 md:mt-8 bg-[var(--surface)]/30 md:bg-transparent">
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8b949e] dark:text-ash/70 transition-colors duration-400">
              RECENT OPEN SOURCE PRs
            </span>
            {prsLoading ? (
              <PrListSkeleton />
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                {prs.map(pr => {
                  const repoName = pr.repository_url.replace("https://api.github.com/repos/", "").toUpperCase();
                  return (
                    <a
                      key={pr.id}
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border border-charcoal/30 p-2.5 transition-colors duration-150 hover:border-accent bg-canvas/30 hover:bg-canvas/50"
                    >
                      <div className="text-[10px] text-ash font-mono uppercase tracking-wider group-hover:text-accent transition-colors duration-150">
                        {repoName}
                      </div>
                      <div className="text-xs text-purewhite font-sans font-medium line-clamp-1 mt-0.5 group-hover:text-purewhite transition-colors duration-150">
                        {pr.title}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Theme Switcher + View Counter */}
        <div className="border border-[var(--border)] md:border-none p-4 md:p-0 mb-4 md:mb-0 mt-4 md:mt-8 flex flex-col gap-6 bg-[var(--surface)]/30 md:bg-transparent">
          {mounted && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[8px] text-ash uppercase tracking-widest">ACTIVE ENGINE THEME</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 font-mono text-[9px] uppercase tracking-widest border px-3 py-2.5 transition-all rounded-none min-h-[44px] ${
                    theme === "dark" ? "border-accent text-accent bg-accent/5 font-bold" : "border-charcoal text-ash hover:border-accent hover:text-accent"
                  }`}
                >
                  DARK
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 font-mono text-[9px] uppercase tracking-widest border px-3 py-2.5 transition-all rounded-none min-h-[44px] ${
                    theme === "light" ? "border-accent text-accent bg-accent/5 font-bold" : "border-charcoal text-ash hover:border-accent hover:text-accent"
                  }`}
                >
                  LIGHT
                </button>
              </div>
            </div>
          )}

          {!viewCountError && (
            viewCount !== null ? (
              <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center gap-2 mt-8 transition-colors duration-400">
                <span>[👁 TOTAL VISITS: {viewCount}]</span>
              </div>
            ) : (
              <ViewCounterSkeleton />
            )
          )}
        </div>
      </aside>
    </ErrorBoundary>
  );
}
