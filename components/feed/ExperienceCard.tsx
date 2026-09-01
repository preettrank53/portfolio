"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pin, Heart } from "lucide-react";
import type { DevLogItem, Screenshot } from "@/types/portfolio";
import { ImageWithFallback, AdaptiveSingleImage } from "@/components/shared/ImageWithFallback";
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
  setScreenshotList: (list: Screenshot[]) => void;
  setScreenshotIndex: (index: number) => void;
  setSelectedScreenshot: (item: Screenshot) => void;
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
  setScreenshotList,
  setScreenshotIndex,
  setSelectedScreenshot,
}: ExperienceCardProps) {
  return (
    <motion.article 
      key={post.id} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-[var(--border)] hover:bg-zinc-900/20 transition-colors group relative overflow-hidden rounded-none"
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
                : "border-zinc-700 bg-[var(--background)] text-[var(--muted)] hover:border-zinc-50 hover:text-[var(--foreground)]"
            }`}
            title={post.isPinned ? "Unpin item" : "Pin item to top"}
          >
            <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
          </button>
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-zinc-50 bg-[var(--background)] px-3 py-1 font-mono text-[9px] text-[var(--foreground)] hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-150 tracking-widest rounded-none min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* LEFT COLUMN: Metadata (Dates) */}
      <div className="md:col-span-1">
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-xs text-[var(--muted)] font-mono tracking-wider block">
            {post.date}
          </span>
          {post.duration && (
            <span className="text-xs text-zinc-600 font-mono tracking-wider block">
              {post.duration}
            </span>
          )}
        </div>
        {post.isPinned && (
          <div className="flex items-center gap-1.5 text-[var(--foreground)]0 font-mono text-[9px] tracking-widest mt-2">
            <Pin className="w-3 h-3 text-[var(--foreground)] fill-current rotate-[45deg]" />
            <span>Pinned Flagship</span>
          </div>
        )}
      </div>
      
      {/* RIGHT COLUMN: Content */}
      <div className="md:col-span-3 flex flex-col min-w-0">
        
        {/* CARD HEADER LAYOUT */}
        <div className="flex flex-row gap-4 items-start mb-2">
          {/* Company Logo box */}
          <div className="w-12 h-12 md:w-14 md:h-14 border border-[var(--border)] rounded-sm overflow-hidden bg-white flex-shrink-0 relative">
            {post.logoUrl ? (
              <ImageWithFallback 
                src={post.logoUrl} 
                alt={`${post.company || "Company"} logo`}
                fill
                sizes="(max-width: 768px) 48px, 56px"
                className="object-contain p-1 bg-white"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center font-bold text-[var(--foreground)]0 text-lg font-sans">
                {post.company?.charAt(0) || "E"}
              </div>
            )}
          </div>

          {/* Job Details */}
          <div className="flex-1 flex flex-col min-w-0">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--foreground)] leading-snug">
              {post.title}
            </h3>
            <div className="text-sm text-[var(--muted)] mt-0.5">
              {post.company}{post.type ? ` · ${post.type}` : ""}
            </div>
            {post.location && (
              <div className="text-xs font-mono text-[var(--foreground)]0 mt-0.5">
                {post.location}
              </div>
            )}
          </div>
        </div>

        {/* CARD BODY */}
        {post.description && Array.isArray(post.description) && (
          <ul className="list-disc list-outside pl-4 space-y-2 mt-4 mb-4">
            {post.description.map((bullet, idx) => (
              <li key={idx} className="text-sm text-[var(--muted)] leading-relaxed font-sans font-medium">
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {/* Screenshots Section */}
        {post.screenshots && post.screenshots.length > 0 && (
          <div className="mt-4 mb-4 overflow-hidden select-none border border-[var(--border)] rounded-sm opacity-90 hover:opacity-100 transition-opacity">
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
                    className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden bg-[var(--background)]"
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
                    className="relative flex-none w-[80%] md:w-[70%] aspect-video snap-center cursor-zoom-in group overflow-hidden bg-[var(--background)]"
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
              <div className="border-t border-[var(--border)] bg-[var(--background)] px-3 py-1.5 font-mono text-[9px] text-[var(--muted)]">
                {post.screenshots[0].caption}
              </div>
            )}
          </div>
        )}

        {/* Tags Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-2 mb-4 select-none">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="flex-none font-mono text-[10px] tracking-wider border border-[var(--border)] px-2 py-1 text-[var(--muted)] rounded-sm bg-transparent hover:border-zinc-500 hover:text-[var(--foreground)] transition-colors duration-150"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer with Like Button only */}
        <div className="flex items-center justify-end pt-2 text-[var(--muted)]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleAppreciate(post.id)}
              disabled={hasUserAppreciated}
              className={`flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-150 hover:scale-105 min-h-[44px] ${
                hasUserAppreciated ? "text-[var(--foreground)] cursor-not-allowed" : "text-[var(--muted)] hover:text-[var(--foreground)]"
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
