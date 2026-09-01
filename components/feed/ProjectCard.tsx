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
      className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-zinc-800 hover:bg-zinc-900/20 transition-colors group relative overflow-hidden rounded-none"
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
                : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-50 hover:text-zinc-50"
            }`}
            title={post.isPinned ? "Unpin item" : "Pin item to top"}
          >
            <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
          </button>
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-zinc-50 bg-zinc-950 px-3 py-1 font-mono text-[9px] text-zinc-50 hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-150 tracking-widest rounded-none min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* LEFT COLUMN: Metadata (Date) */}
      <div className="md:col-span-1">
        <span className="text-xs text-zinc-500 font-mono tracking-wider block mt-1">
          {post.date}
        </span>
        {post.isPinned && (
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[9px] tracking-widest mt-2">
            <Pin className="w-3 h-3 text-zinc-50 fill-current rotate-[45deg]" />
            <span>Pinned Flagship</span>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="md:col-span-3 flex flex-col min-w-0">
        
        {/* Title & Category Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h3 
            className="font-sans font-extrabold text-xl md:text-2xl text-zinc-50 tracking-tight leading-tight line-clamp-2"
            title={post.title || "Untitled"}
          >
            {post.title || "Untitled"}
          </h3>
          <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
            {post.category}
          </span>
        </div>

        {/* Description */}
        <div className="relative">
          <p className={`text-[13px] sm:text-[14px] text-zinc-400 leading-relaxed mb-1 whitespace-pre-line font-sans font-medium ${
            isExpanded ? "" : "line-clamp-4"
          }`}>
            {post.body || "No description provided"}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setExpandedCards(prev => ({ ...prev, [post.id]: !isExpanded }))}
              className="text-[9px] font-mono text-zinc-500 hover:text-zinc-50 tracking-widest mt-1 mb-3 block min-h-[24px] transition-colors"
            >
              {isExpanded ? "Read Less ▲" : "Read More ▼"}
            </button>
          )}
        </div>

        {/* Screenshots grid / carousel */}
        {post.screenshots && post.screenshots.length > 0 && (
          <div className="mt-4 mb-4 overflow-hidden select-none border border-zinc-800 rounded-sm opacity-90 hover:opacity-100 transition-opacity">
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
              <div className="grid grid-cols-2 gap-1 bg-zinc-800">
                {post.screenshots.map((img, idx) => (
                  <div 
                    key={img.src}
                    onClick={() => {
                      setScreenshotList(post.screenshots || []);
                      setScreenshotIndex(idx);
                      setSelectedScreenshot(img);
                    }}
                    className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden bg-zinc-950"
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
              <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1 bg-zinc-800">
                {post.screenshots.map((img, idx) => (
                  <div 
                    key={img.src}
                    onClick={() => {
                      setScreenshotList(post.screenshots || []);
                      setScreenshotIndex(idx);
                      setSelectedScreenshot(img);
                    }}
                    className="relative flex-none w-[80%] md:w-[70%] aspect-video snap-center cursor-zoom-in group overflow-hidden bg-zinc-950"
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
              <div className="border-t border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-[9px] text-zinc-400">
                {post.screenshots[0].caption}
              </div>
            )}
          </div>
        )}

        {/* Embedded Code Snippet */}
        {post.codeSnippet && post.codeSnippet.content && post.codeSnippet.content.trim() !== "" && (
          <div className="border border-zinc-800 bg-zinc-950 rounded-sm mb-4 overflow-hidden font-mono text-[11px] transition-colors duration-150">
            <div className="border-b border-zinc-800 bg-zinc-900 px-3 py-1.5 flex justify-between items-center text-[9px] text-zinc-400 tracking-wider">
              <span>{post.codeSnippet.title}</span>
              <span>{post.codeSnippet.lang}</span>
            </div>
            <pre className="p-3 overflow-x-auto"><code className="text-zinc-50">{post.codeSnippet.content}</code></pre>
          </div>
        )}

        {/* Tags Row (Micro Labels) */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-4 py-1 select-none">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="flex-none font-mono text-[10px] tracking-wider border border-zinc-800 px-2 py-1 text-zinc-400 rounded-sm bg-transparent hover:border-zinc-500 hover:text-zinc-50 transition-colors duration-150"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Links & Stars */}
        <div className="flex items-center justify-between pt-2 text-zinc-400">
          <div className="flex gap-4">
            {post.liveUrl && post.liveUrl.trim() !== "" && (
              <a 
                href={post.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-[11px] font-mono hover:text-zinc-50 transition-colors duration-150 tracking-widest min-h-[30px]"
              >
                <span>Live →</span>
              </a>
            )}
            {post.codeUrl && post.codeUrl.trim() !== "" && (
              <a 
                href={post.codeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-[11px] font-mono hover:text-zinc-50 transition-colors duration-150 tracking-widest min-h-[30px]"
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
              className={`flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-150 hover:scale-105 min-h-[30px] ${
                hasUserAppreciated ? "text-zinc-50 cursor-not-allowed" : "text-zinc-400 hover:text-zinc-50"
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
