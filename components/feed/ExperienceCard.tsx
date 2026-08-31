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
      className="border-b border-charcoal py-6 md:py-10 transition-all duration-150 flex flex-col rounded-none group relative overflow-hidden"
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

      {/* Pinned Flag */}
      {post.isPinned && (
        <div className="flex items-center gap-1.5 text-ash font-mono text-[9px] uppercase tracking-widest mb-3">
          <Pin className="w-3 h-3 text-accent fill-current rotate-[45deg]" />
          <span>PINNED FLAGSHIP</span>
        </div>
      )}

      <span className="font-mono text-[10px] text-[var(--muted)] mb-2 uppercase block">
        {post.date}{post.duration ? ` · ${post.duration}` : ""}
      </span>
      
      {/* CARD HEADER LAYOUT */}
      <div className="flex flex-row gap-4 items-start mb-2">
        {/* LEFT: Company Logo box */}
        <div className="w-12 h-12 md:w-14 md:h-14 border border-[var(--border)] rounded-md overflow-hidden bg-white flex-shrink-0 relative">
          {post.logoUrl ? (
            <ImageWithFallback 
              src={post.logoUrl} 
              alt={`${post.company || "Company"} logo`}
              fill
              sizes="(max-width: 768px) 48px, 56px"
              className="object-contain p-1 bg-white"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center font-bold text-ash text-lg uppercase font-sans">
              {post.company?.charAt(0) || "E"}
            </div>
          )}
        </div>

        {/* RIGHT: Job Details (stack vertically) */}
        <div className="flex-1 flex flex-col min-w-0">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[var(--text)] leading-snug">
            {post.title}
          </h3>
          <div className="text-sm text-[var(--muted)] mt-0.5">
            {post.company}{post.type ? ` · ${post.type}` : ""}
          </div>
          {post.location && (
            <div className="text-xs font-mono text-[var(--muted)] mt-0.5">
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
                    sizes="(max-width: 768px) 50vw, 33vw"
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

      {/* Tags Row */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-2 mb-4 select-none">
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

      {/* Footer with Like Button only */}
      <div className="flex items-center justify-end border-t border-charcoal/30 pt-4 mt-1 text-ash">
        <div className="flex items-center gap-4">
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
    </motion.article>
  );
}
