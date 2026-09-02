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
      className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-[var(--theme-border)] px-4 md:px-6 relative items-start"
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

      {/* Category Title (Left Column: md:col-span-4) */}
      <div className="md:col-span-4 text-sm font-medium text-[var(--theme-muted)]">
        {post.title}
      </div>

      {/* Text-Only Skill Pills (Right Column: md:col-span-8) */}
      <div className="md:col-span-8 flex flex-wrap gap-2">
        {(post.tools || []).map((tool) => (
          <span
            key={tool.name}
            className="px-3 py-1.5 border border-[var(--theme-border)] rounded-md text-xs font-medium text-[var(--theme-text)] bg-transparent"
          >
            {tool.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
