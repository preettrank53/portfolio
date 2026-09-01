"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DevLogItem } from "@/types/portfolio";
import { StackIconBox } from "@/components/shared/StackIconBox";

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
      className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-[var(--theme-border)] hover:bg-[var(--theme-hover)] transition-colors group relative rounded-none items-center"
    >
      {/* Inline Admin Edit Button */}
      {adminMode && (
        <div className="absolute top-4 right-4 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-zinc-50 bg-[var(--theme-bg)] px-3 py-1 font-mono text-[9px] text-[var(--theme-text)] hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-150 tracking-widest rounded-none min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* LEFT COLUMN: Category Title */}
      <div className="md:col-span-1">
        <h3 className="text-sm text-[var(--theme-muted)] font-mono mt-1">
          <span className="opacity-50 mr-2">0{index + 1}</span>
          {post.title}
        </h3>
      </div>

      {/* RIGHT COLUMN: Stack Icons */}
      <div className="md:col-span-3">
        <div className="flex flex-wrap items-center gap-3">
          {(post.tools || []).map((tool) => (
            <StackIconBox 
              key={tool.name} 
              name={tool.name} 
              iconName={tool.iconName} 
              color={tool.color} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
