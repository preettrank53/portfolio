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
      className="border-b border-[var(--border)] py-6 md:py-10 transition-all duration-150 flex flex-col rounded-none group relative overflow-hidden"
    >
      <SpotlightOverlay />
      {/* Inline Admin Edit & Pin Buttons */}
      {adminMode && (
        <div className="absolute top-8 right-0 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleTogglePin(post)}
            className={`border px-2.5 py-1 transition-all duration-150 rounded-none flex items-center justify-center min-h-[30px] ${
              post.isPinned 
                ? "border-accent bg-accent text-canvas" 
                : "border-charcoal bg-canvas text-ash hover:border-accent hover:text-accent"
            }`}
            title={post.isPinned ? "Unpin item" : "Pin item to top"}
          >
            <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
          </button>
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-accent bg-canvas px-3 py-1 font-mono text-[9px] text-purewhite hover:bg-accent hover:text-canvas transition-all duration-150 uppercase tracking-widest rounded-none min-h-[30px]"
          >
            EDIT
          </button>
        </div>
      )}

      <span className="font-mono text-[10px] text-[var(--muted)] mb-2 uppercase block">
        {post.date}
      </span>

      {/* Right side: Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Pinned Flag */}
        {post.isPinned && (
          <div className="flex items-center gap-1.5 text-ash font-mono text-[9px] uppercase tracking-widest mb-2">
            <Pin className="w-3 h-3 text-accent fill-current rotate-[45deg]" />
            <span>PINNED FLAGSHIP</span>
          </div>
        )}

        {/* Title & Category Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h3 
            className="font-sans font-extrabold text-xl md:text-2xl text-purewhite uppercase tracking-tight leading-tight line-clamp-2"
            title={post.title || "UNTITLED"}
          >
            {post.title || "UNTITLED"}
          </h3>
          <span className="font-mono text-[10px] text-ash uppercase tracking-widest">
            {post.category}
          </span>
        </div>

        {/* Description */}
        <div className="relative">
          <p className={`text-[13px] sm:text-[14px] text-ash leading-relaxed mb-1 whitespace-pre-line font-sans font-medium ${
            isExpanded ? "" : "line-clamp-4"
          }`}>
            {post.body || "NO DESCRIPTION PROVIDED"}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setExpandedCards(prev => ({ ...prev, [post.id]: !isExpanded }))}
              className="text-[9px] font-mono text-accent hover:underline uppercase tracking-widest mt-1 mb-3 block min-h-[24px]"
            >
              {isExpanded ? "READ LESS ▲" : "READ MORE ▼"}
            </button>
          )}
        </div>

        {/* Screenshots grid / carousel */}
        {post.screenshots && post.screenshots.length > 0 && (
          <div className="mt-4 mb-4 overflow-hidden select-none">
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
              <div className="grid grid-cols-2 gap-1">
                {post.screenshots.map((img, idx) => (
                  <div 
                    key={img.src}
                    onClick={() => {
                      setScreenshotList(post.screenshots || []);
                      setScreenshotIndex(idx);
                      setSelectedScreenshot(img);
                    }}
                    className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <ImageWithFallback 
                      src={img.src} 
                      alt={img.alt} 
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-350 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1">
                {post.screenshots.map((img, idx) => (
                  <div 
                    key={img.src}
                    onClick={() => {
                      setScreenshotList(post.screenshots || []);
                      setScreenshotIndex(idx);
                      setSelectedScreenshot(img);
                    }}
                    className="relative flex-none w-[80%] md:w-[70%] aspect-video snap-center cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
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
            {post.screenshots.length === 1 && post.screenshots[0].caption && (
              <div className="border-t border-charcoal/40 bg-darkiron/10 px-3 py-1.5 font-mono text-[9px] text-ash">
                {post.screenshots[0].caption}
              </div>
            )}
          </div>
        )}

        {/* Embedded Code Snippet */}
        {post.codeSnippet && post.codeSnippet.content && post.codeSnippet.content.trim() !== "" && (
          <div className="border border-charcoal bg-canvas rounded-none mb-4 overflow-hidden font-mono text-[11px] transition-colors duration-150">
            <div className="border-b border-charcoal bg-darkiron px-3 py-1.5 flex justify-between items-center text-[9px] text-ash uppercase tracking-wider">
              <span>{post.codeSnippet.title}</span>
              <span>{post.codeSnippet.lang}</span>
            </div>
            <pre className="p-3 overflow-x-auto"><code className="text-purewhite">{post.codeSnippet.content}</code></pre>
          </div>
        )}

        {/* Tags Row (Micro Labels) */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-4 py-1 select-none">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="flex-none font-mono text-[10px] tracking-wider uppercase border border-charcoal px-2 py-1 text-ash rounded-none bg-canvas hover:border-accent hover:text-accent transition-colors duration-150"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Links & Stars */}
        <div className="flex items-center justify-between border-t border-charcoal/30 pt-4 mt-1 text-ash">
          <div className="flex gap-4">
            {post.liveUrl && post.liveUrl.trim() !== "" && (
              <a 
                href={post.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-[11px] font-mono hover:text-accent transition-colors duration-150 uppercase tracking-widest min-h-[44px]"
              >
                <span>Live →</span>
              </a>
            )}
            {post.codeUrl && post.codeUrl.trim() !== "" && (
              <a 
                href={post.codeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-[11px] font-mono hover:text-accent transition-colors duration-150 uppercase tracking-widest min-h-[44px]"
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
              className={`flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-150 hover:scale-105 min-h-[44px] ${
                hasUserAppreciated ? "text-accent cursor-not-allowed" : "text-ash hover:text-accent"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasUserAppreciated ? "fill-current" : ""}`} strokeWidth={1.5} />
              <span>{appCount}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
