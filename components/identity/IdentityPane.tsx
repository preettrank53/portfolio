"use client";

import React from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon, SiX, SiMedium } from "@/components/shared/icons";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { SidebarSkeleton } from "@/components/ui/page-skeletons";

export function IdentityPane({ loading }: { loading: boolean }) {
  return (
    <ErrorBoundary title="HERO PANE">
      <section className="w-full border-b border-[var(--theme-border)] bg-transparent">
        {loading ? (
          <div className="p-6 md:p-10">
            <SidebarSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Profile & Bio */}
            <div className="p-6 md:p-10 md:border-r border-[var(--theme-border)] flex flex-col gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 border border-[var(--theme-border)] bg-[var(--theme-hover)] p-1 flex-shrink-0 select-none overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png"
                  alt="PREET RANK"
                  className="w-full h-full object-cover border border-white/5"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith(".png")) {
                      target.src = "/profile.jpg";
                    }
                  }}
                />
              </div>

              <div className="flex flex-col">
                <h1 className="font-sans font-extrabold tracking-tighter text-[var(--theme-text)] whitespace-nowrap text-3xl md:text-3xl">
                  Preet Rank
                </h1>
                <span className="font-mono text-xs text-[var(--theme-muted)] tracking-widest mt-1">
                  @preetrank
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[var(--theme-muted)] font-sans font-medium max-w-sm">
                AI/ML Engineer focused on LLM inference and agentic workflows.
              </p>
            </div>

            {/* Right Column: Actions & Links */}
            <div className="p-6 md:p-10 flex flex-col justify-between gap-8 border-t border-[var(--theme-border)] md:border-t-0">
              <div className="flex flex-col gap-3 mb-8">
                <a
                  href="mailto:preetrank53@gmail.com"
                  className="w-full px-4 py-2 border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-hover)] text-sm font-medium rounded-md transition-all duration-200 inline-flex items-center justify-center gap-2 relative z-10"
                >
                  Email Me
                </a>

                <div className="relative w-full">
                
                <a
                  href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2 border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-hover)] text-sm font-medium rounded-md transition-all duration-200 inline-flex items-center justify-center gap-2 relative z-10"
                >
                  View Resume
                </a>
              </div>
              </div>

              <div className="w-full">
                
                <div className="flex justify-between w-full items-center">
                  <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
                    <GithubIcon className="w-full h-full" />
                  </a>
                  <a href="https://x.com/preettrank" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
                    <SiX className="w-full h-full" />
                  </a>
                  <a href="https://www.linkedin.com/in/preetrank/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
                    <LinkedinIcon className="w-full h-full" />
                  </a>
                  <a href="https://www.instagram.com/preettrank/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
                    <InstagramIcon className="w-full h-full" />
                  </a>
                  <a href="https://medium.com/@preetrank53" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
                    <SiMedium className="w-full h-full" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </ErrorBoundary>
  );
}
