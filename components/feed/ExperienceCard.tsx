"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pin, Heart } from "lucide-react";
import type { DevLogItem } from "@/types/portfolio";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SpotlightOverlay } from "@/components/ui/spotlight-overlay";

interface ExperienceCardProps {
  post: DevLogItem;
  index: number;
  adminMode: boolean;
  hasUserAppreciated: boolean;
  appCount: number;
  handleTogglePin: (post: DevLogItem) => void;
  handleStartEdit: (post: DevLogItem) => void;
  handleAppreciate: (id: string) => void;
}

export function ExperienceCard({
  post,
  index,
  adminMode,
  hasUserAppreciated,
  appCount,
  handleTogglePin,
  handleStartEdit,
  handleAppreciate,
}: ExperienceCardProps) {
  return (
    <motion.article 
      key={post.id} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center gap-4 px-4 md:px-6 py-5 border-b border-[var(--theme-border)] hover:bg-[var(--theme-hover)] transition-colors group relative overflow-hidden"
    >
      <SpotlightOverlay />
      
      {/* Inline Admin Edit & Pin Buttons */}
      {adminMode && (
        <div className="absolute top-4 right-4 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleTogglePin(post)}
            className={`border px-2.5 py-1 transition-all duration-150 rounded-md flex items-center justify-center min-h-[30px] ${
              post.isPinned 
                ? "border-zinc-50 bg-zinc-50 text-zinc-950" 
                : "border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-muted)] hover:border-[var(--theme-text)] hover:text-[var(--theme-text)]"
            }`}
            title={post.isPinned ? "Unpin item" : "Pin item to top"}
          >
            <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
          </button>
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-1 font-medium text-[9px] text-[var(--theme-text)] hover:bg-[var(--theme-hover)] transition-all duration-150 tracking-widest rounded-md min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* Logo */}
      <span className="flex w-10 h-10 md:w-12 md:h-12 shrink-0 items-center justify-center select-none bg-[var(--theme-hover)] rounded-md border border-[var(--theme-border)] overflow-hidden">
        {post.logoUrl ? (
          <ImageWithFallback 
            src={post.logoUrl} 
            alt={`${post.company || "Company"} logo`}
            fill
            sizes="(max-width: 768px) 40px, 48px"
            className="object-cover"
          />
        ) : (
          <span className="text-[var(--theme-muted)] font-semibold text-lg">{post.company?.charAt(0) || "E"}</span>
        )}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-1 md:gap-3">
          <h3 className="text-[var(--theme-text)] min-w-0 truncate text-sm md:text-[15px] leading-snug font-semibold">
            {post.company}
          </h3>
          <p className="text-[var(--theme-muted)] shrink-0 text-xs tabular-nums font-mono order-first md:order-last">
            {post.date} {post.duration ? `- ${post.duration}` : ""}
          </p>
        </div>

        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[var(--theme-muted)] truncate text-xs md:text-[13px] leading-snug">
            {post.title} {post.location && <><span aria-hidden>•</span> {post.location}</>}
          </p>
          
          <button 
            onClick={() => handleAppreciate(post.id)}
            disabled={hasUserAppreciated}
            className={`relative z-10 flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-150 hover:scale-105 shrink-0 ${
              hasUserAppreciated ? "text-[var(--theme-text)] cursor-not-allowed" : "text-[var(--theme-muted)] hover:text-[var(--theme-text)]"
            }`}
            aria-label="Appreciate"
          >
            <Heart className={`w-3.5 h-3.5 ${hasUserAppreciated ? "fill-current" : ""}`} strokeWidth={1.5} />
            <span>{appCount}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
