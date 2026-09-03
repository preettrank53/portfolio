"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pin, Heart } from "lucide-react";
import type { DevLogItem, Screenshot } from "@/types/portfolio";
import { ImageWithFallback, AdaptiveSingleImage } from "@/components/shared/ImageWithFallback";
import { SpotlightOverlay } from "@/components/ui/spotlight-overlay";

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
  return (
    <motion.article 
      key={post.id} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col gap-4 p-4 border border-[var(--theme-border)] hover:bg-[var(--theme-hover)] transition-colors group relative overflow-hidden rounded-md bg-[var(--theme-bg)]"
    >
      <SpotlightOverlay />
      
      {/* Inline Admin Edit & Pin Buttons */}
      {adminMode && (
        <div className="absolute top-4 right-4 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleTogglePin(post)}
            className={`border px-2.5 py-1 transition-all duration-150 rounded-none flex items-center justify-center min-h-[30px] ${
              post.isPinned 
                ? "border-zinc-50 bg-zinc-50 text-zinc-950" 
                : "border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-muted)] hover:border-zinc-50 hover:text-[var(--theme-text)]"
            }`}
            title={post.isPinned ? "Unpin item" : "Pin item to top"}
          >
            <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
          </button>
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-zinc-50 bg-[var(--theme-bg)] px-3 py-1 font-mono text-[9px] text-[var(--theme-text)] hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-150 tracking-widest rounded-none min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--theme-muted)] font-mono tracking-wider">
            {post.date}
          </span>
          <span className="font-mono text-[10px] text-[var(--theme-text)] border border-[var(--theme-border)] px-2 py-0.5 rounded-sm tracking-widest uppercase">
            {post.category}
          </span>
        </div>
        <h3 className="font-sans font-bold text-lg md:text-xl text-[var(--theme-text)] tracking-tight leading-tight mt-2 line-clamp-1">
          {post.title || "Untitled"}
        </h3>
      </div>

      {/* Description */}
      <div className="relative flex-1">
        <p className={`text-sm text-[var(--theme-muted)] leading-relaxed mb-1 whitespace-pre-line font-sans font-medium ${
          isExpanded ? "" : "line-clamp-3"
        }`}>
          {post.body || "No description provided"}
        </p>
          {shouldTruncate && (
            <button
              onClick={() => setExpandedCards(prev => ({ ...prev, [post.id]: !isExpanded }))}
              className="relative z-10 text-[9px] font-mono text-[var(--theme-text)]0 hover:text-[var(--theme-text)] tracking-widest mt-1 mb-3 block min-h-[24px] transition-colors"
            >
              {isExpanded ? "Read Less ▲" : "Read More ▼"}
            </button>
          )}
        </div>

      {/* Screenshots or Fallback block */}
      <div className="w-full">
        {post.screenshots && post.screenshots.length > 0 ? (
          <div className="overflow-hidden select-none border border-[var(--theme-border)] rounded-md opacity-90 hover:opacity-100 transition-opacity">
            {post.screenshots.length === 1 ? (
              <AdaptiveSingleImage
                src={post.screenshots[0].src}
                alt={post.screenshots[0].alt}
                onClick={() => {
                  setScreenshotList(post.screenshots || []);
                  setScreenshotIndex(0);
                  setSelectedScreenshot(post.screenshots![0]);
                }}
              />
            ) : post.screenshots.length === 2 ? (
              <div className="grid grid-cols-2 gap-1 bg-[var(--theme-border)]">
                {post.screenshots.map((img, idx) => (
                  <div 
                    key={img.src}
                    onClick={() => {
                      setScreenshotList(post.screenshots || []);
                      setScreenshotIndex(idx);
                      setSelectedScreenshot(img);
                    }}
                    className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden bg-[var(--theme-bg)]"
                  >
                    <ImageWithFallback 
                      src={img.src} 
                      alt={img.alt} 
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-350 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1 bg-[var(--theme-border)]">
                {post.screenshots.map((img, idx) => (
                  <div 
                    key={img.src}
                    onClick={() => {
                      setScreenshotList(post.screenshots || []);
                      setScreenshotIndex(idx);
                      setSelectedScreenshot(img);
                    }}
                    className="relative flex-none w-[80%] aspect-video snap-center cursor-zoom-in group overflow-hidden bg-[var(--theme-bg)]"
                  >
                    <ImageWithFallback 
                      src={img.src} 
                      alt={img.alt} 
                      fill
                      loading="lazy"
                      className="object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-[16/9] border border-[var(--theme-border)] rounded-md flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[var(--theme-bg)] to-[var(--theme-hover)] text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--theme-text)] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none"></div>
            <span className="font-mono text-xs tracking-widest text-[var(--theme-muted)] mb-2 uppercase">Core Engineering</span>
            <span className="font-bold text-[var(--theme-text)] text-lg line-clamp-2 leading-tight">Backend Architecture</span>
          </div>
        )}
      </div>

        {/* Embedded Code Snippet */}
        {post.codeSnippet && post.codeSnippet.content && post.codeSnippet.content.trim() !== "" && (
          <div className="border border-[var(--theme-border)] bg-[var(--theme-bg)] rounded-sm mb-4 overflow-hidden font-mono text-[11px] transition-colors duration-150">
            <div className="border-b border-[var(--theme-border)] bg-zinc-900 px-3 py-1.5 flex justify-between items-center text-[9px] text-[var(--theme-muted)] tracking-wider">
              <span>{post.codeSnippet.title}</span>
              <span>{post.codeSnippet.lang}</span>
            </div>
            <pre className="p-3 overflow-x-auto"><code className="text-[var(--theme-text)]">{post.codeSnippet.content}</code></pre>
          </div>
        )}

        {/* Tags Row (Micro Labels) */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 py-1 select-none">
            {post.tags.slice(0, 4).map(tag => (
              <span 
                key={tag} 
                className="flex-none font-mono text-[10px] tracking-wider border border-[var(--theme-border)] px-2 py-1 text-[var(--theme-muted)] rounded-md bg-[var(--theme-bg)]"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="flex-none font-mono text-[10px] tracking-wider border border-[var(--theme-border)] px-2 py-1 text-[var(--theme-muted)] rounded-md bg-[var(--theme-bg)]">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer Links & Stars */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-[var(--theme-border)]">
          <div className="flex gap-2">
            {post.liveUrl && post.liveUrl.trim() !== "" && (
              <a 
                href={post.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-10 flex items-center justify-center px-4 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text)] font-medium text-xs rounded-md hover:bg-[var(--theme-hover)] transition-colors"
              >
                <span>Live →</span>
              </a>
            )}
            {post.codeUrl && post.codeUrl.trim() !== "" && (
              <a 
                href={post.codeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-10 flex items-center justify-center px-4 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text)] font-medium text-xs rounded-md hover:bg-[var(--theme-hover)] transition-colors"
              >
                <span>Code ↗</span>
              </a>
            )}
          </div>

          {/* Interactions row */}
          <div className="flex items-center gap-4">
            {/* Appreciation Like Button */}
            <button 
              onClick={() => handleAppreciate(post.id)}
              disabled={hasUserAppreciated}
              className={`relative z-10 flex items-center gap-1.5 font-medium text-xs transition-all duration-150 hover:scale-105 min-h-[30px] ${
                hasUserAppreciated ? "text-[var(--theme-text)] cursor-not-allowed" : "text-[var(--theme-muted)] hover:text-[var(--theme-text)]"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasUserAppreciated ? "fill-current" : ""}`} strokeWidth={1.5} />
              <span>{appCount}</span>
            </button>
          </div>
        </div>
    </motion.article>
  );
}
