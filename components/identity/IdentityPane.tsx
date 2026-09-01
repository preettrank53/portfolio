"use client";

import React from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon, SiX, SiMedium } from "@/components/shared/icons";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { SidebarSkeleton } from "@/components/ui/page-skeletons";

export function IdentityPane({ loading }: { loading: boolean }) {
  return (
    <ErrorBoundary title="HERO PANE">
      <section className="w-full border-b border-zinc-800 bg-zinc-950">
        {loading ? (
          <div className="p-6 md:p-10">
            <SidebarSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Profile & Bio */}
            <div className="p-6 md:p-10 md:border-r border-zinc-800 flex flex-col gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 border border-zinc-800 bg-zinc-900 p-1 flex-shrink-0 select-none overflow-hidden">
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
                <h1 className="font-sans font-extrabold tracking-tighter text-zinc-50 whitespace-nowrap text-3xl md:text-3xl">
                  Preet Rank
                </h1>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
                  @preettrank
                </span>
              </div>

              <p className="text-sm leading-relaxed text-zinc-400 font-sans font-medium max-w-sm">
                AI/ML Engineer focused on LLM inference and agentic workflows.
              </p>
            </div>

            {/* Right Column: Actions & Links */}
            <div className="p-6 md:p-10 flex flex-col justify-between gap-8 border-t border-zinc-800 md:border-t-0">
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:preetrank53@gmail.com"
                  className="w-full text-center py-4 bg-transparent border border-zinc-700 text-zinc-50 font-sans font-bold text-xs uppercase tracking-[0.15em] hover:bg-zinc-900 transition-colors duration-200 flex items-center justify-center relative z-20"
                >
                  EMAIL ME
                </a>

                <div className="relative w-full">
                
                <a
                  href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 bg-transparent border border-zinc-700 text-zinc-50 font-sans font-bold text-xs uppercase tracking-[0.15em] hover:bg-zinc-900 transition-colors duration-200 flex items-center justify-center"
                >
                  VIEW RESUME
                </a>
              </div>
              </div>

              <div className="w-full">
                
                <div className="flex justify-between w-full max-w-xs">
                  <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-zinc-500 hover:text-zinc-50 transition-colors">
                    <GithubIcon className="w-full h-full" />
                  </a>
                  <a href="https://x.com/preettrank" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-zinc-500 hover:text-zinc-50 transition-colors">
                    <SiX className="w-full h-full" />
                  </a>
                  <a href="https://www.linkedin.com/in/preetrank/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-zinc-500 hover:text-zinc-50 transition-colors">
                    <LinkedinIcon className="w-full h-full" />
                  </a>
                  <a href="https://www.instagram.com/preettrank/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-zinc-500 hover:text-zinc-50 transition-colors">
                    <InstagramIcon className="w-full h-full" />
                  </a>
                  <a href="https://medium.com/@preetrank53" target="_blank" rel="noopener noreferrer" className="w-5 h-5 shrink-0 flex items-center justify-center text-zinc-500 hover:text-zinc-50 transition-colors">
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
