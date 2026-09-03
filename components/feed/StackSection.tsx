"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DevLogItem } from "@/types/portfolio";

interface StackSectionProps {
  post: DevLogItem;
  index: number;
  adminMode: boolean;
  handleStartEdit: (post: DevLogItem) => void;
}

export function StackSection({
  post,
  index,
  adminMode,
  handleStartEdit,
}: StackSectionProps) {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-[var(--theme-border)] transition-colors group relative rounded-none items-start"
    >
      {adminMode && (
        <div className="absolute top-4 right-4 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-1 font-mono text-[9px] text-[var(--theme-text)] hover:bg-[var(--theme-hover)] transition-all duration-150 tracking-widest rounded-md min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* Category title */}
      <div className="md:col-span-1">
        <h3 className="text-sm text-[var(--theme-muted)] font-medium leading-relaxed">
          {post.title}
        </h3>
      </div>

      {/* Minimal text pills */}
      <div className="md:col-span-3">
        <div className="flex flex-wrap items-center gap-2">
          {(post.tools || []).map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium border border-[var(--theme-border)] text-[var(--theme-text)] rounded-md bg-transparent hover:bg-[var(--theme-hover)] transition-colors"
            >
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
