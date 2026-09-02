"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pin, Heart } from "lucide-react";
import type { DevLogItem, Screenshot } from "@/types/portfolio";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

interface ProjectCardProps {
  post: DevLogItem;
  index: number;
  adminMode: boolean;
  hasUserAppreciated: boolean;
  appCount: number;
  isExpanded: boolean;
  shouldTruncate: boolean;
  setExpandedCards: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  handleTogglePin: (post: DevLogItem) => void;
  handleStartEdit: (post: DevLogItem) => void;
  handleAppreciate: (id: string) => void;
  setScreenshotList: (list: Screenshot[]) => void;
  setScreenshotIndex: (index: number) => void;
  setSelectedScreenshot: (item: Screenshot) => void;
}

export function ProjectCard({
  post,
  index,
  adminMode,
  hasUserAppreciated,
  appCount,
  isExpanded,
  shouldTruncate,
  setExpandedCards,
  handleTogglePin,
  handleStartEdit,
  handleAppreciate,
  setScreenshotList,
  setScreenshotIndex,
  setSelectedScreenshot,
}: ProjectCardProps) {
  const primaryImage = post.screenshots && post.screenshots.length > 0 ? post.screenshots[0] : null;

  return (
    <motion.article 
      key={post.id} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col justify-between p-5 border border-[var(--theme-border)] rounded-md hover:bg-[var(--theme-hover)] transition-colors group relative bg-transparent"
    >
      {/* Admin Controls */}
      {adminMode && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleTogglePin(post)}
            className={`border px-2 py-0.5 rounded-md flex items-center justify-center text-xs ${
              post.isPinned 
                ? "border-zinc-50 bg-zinc-50 text-zinc-950" 
                : "border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-muted)]"
            }`}
          >
            <Pin className="w-3 h-3 rotate-45" />
          </button>
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2.5 py-0.5 font-mono text-[9px] text-[var(--theme-text)] rounded-md"
          >
            Edit
          </button>
        </div>
      )}

      <div>
        {/* Optional Thumbnail */}
        {primaryImage && (
          <div 
            className="w-full h-48 overflow-hidden rounded-md border border-[var(--theme-border)] mb-4 cursor-pointer relative"
            onClick={() => {
              setScreenshotList(post.screenshots || []);
              setScreenshotIndex(0);
              setSelectedScreenshot(primaryImage);
            }}
          >
            <ImageWithFallback 
              src={primaryImage.src} 
              alt={primaryImage.alt || post.title} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Date & Pinned Tag */}
        <div className="flex items-center justify-between text-xs text-[var(--theme-muted)] font-mono mb-2">
          <span>{post.date}</span>
          {post.isPinned && (
            <span className="flex items-center gap-1 text-[10px] text-[var(--theme-text)]">
              <Pin className="w-3 h-3 fill-current rotate-45" />
              Pinned
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-sans font-medium text-lg md:text-xl text-[var(--theme-text)] tracking-tight mb-2 line-clamp-1">
          {post.title || "Untitled Project"}
        </h3>

        {/* Description */}
        <p className={`text-xs text-[var(--theme-muted)] leading-relaxed mb-4 font-normal ${isExpanded ? "" : "line-clamp-3"}`}>
          {post.body || "No description provided."}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setExpandedCards(prev => ({ ...prev, [post.id]: !isExpanded }))}
            className="text-[10px] font-mono text-[var(--theme-muted)] hover:text-[var(--theme-text)] mb-3 block"
          >
            {isExpanded ? "Show Less ▲" : "Read More ▼"}
          </button>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="font-mono text-[10px] border border-[var(--theme-border)] px-2 py-0.5 text-[var(--theme-muted)] rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA & Appreciation */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--theme-border)] text-xs font-mono text-[var(--theme-muted)]">
        <div className="flex gap-3">
          {post.liveUrl && (
            <a 
              href={post.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--theme-text)] transition-colors"
            >
              Live &rarr;
            </a>
          )}
          {post.codeUrl && (
            <a 
              href={post.codeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--theme-text)] transition-colors"
            >
              Code &nearr;
            </a>
          )}
        </div>

        <button 
          onClick={() => handleAppreciate(post.id)}
          disabled={hasUserAppreciated}
          className={`flex items-center gap-1.5 transition-colors ${
            hasUserAppreciated ? "text-[var(--theme-text)]" : "hover:text-[var(--theme-text)]"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${hasUserAppreciated ? "fill-current" : ""}`} />
          <span>{appCount}</span>
        </button>
      </div>
    </motion.article>
  );
}
