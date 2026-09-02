"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DevLogItem } from "@/types/portfolio";
import { IconMapping } from "@/components/shared/icons";

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
      className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-5 border-b border-[var(--theme-border)] transition-colors group relative rounded-none items-start"
    >
      {adminMode && (
        <div className="absolute top-4 right-4 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-1 font-mono text-[9px] text-[var(--theme-text)] hover:bg-[var(--theme-hover)] transition-all duration-150 tracking-widest rounded-none min-h-[30px]"
          >
            Edit
          </button>
        </div>
      )}

      {/* Category title */}
      <div className="md:col-span-1">
        <h3 className="text-xs text-[var(--theme-muted)] font-mono leading-relaxed">
          {post.title}
        </h3>
      </div>

      {/* Minimal text pills */}
      <div className="md:col-span-3">
        <div className="flex flex-wrap items-center gap-2">
          {(post.tools || []).map((tool) => {
            const IconComponent =
              tool.iconName && tool.iconName !== "TextFallback"
                ? IconMapping[tool.iconName as keyof typeof IconMapping]
                : undefined;
            const iconColor =
              tool.color && tool.color.toUpperCase() === "#FFFFFF"
                ? "var(--theme-text)"
                : tool.color;
            return (
              <span
                key={tool.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[var(--theme-border)] text-[var(--theme-muted)] rounded-sm bg-transparent"
              >
                {IconComponent && (
                  <IconComponent
                    className="w-3 h-3 shrink-0"
                    style={{ color: iconColor || undefined }}
                  />
                )}
                {tool.name}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
