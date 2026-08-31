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
      className="border-b border-charcoal py-8 md:py-10 flex flex-col gap-4 rounded-none group relative"
    >
      {/* Inline Admin Edit Button */}
      {adminMode && (
        <div className="absolute top-8 right-0 hidden group-hover:flex items-center gap-1.5 z-10">
          <button
            onClick={() => handleStartEdit(post)}
            className="border border-accent bg-canvas px-3 py-1 font-mono text-[9px] text-purewhite hover:bg-accent hover:text-canvas transition-all duration-150 uppercase tracking-widest rounded-none min-h-[30px]"
          >
            EDIT
          </button>
        </div>
      )}

      <div>
        <h3 className="font-sans font-extrabold text-xl md:text-2xl text-purewhite uppercase tracking-tight mb-2">
          {post.title}
        </h3>
        <p className="text-[13px] sm:text-[14px] text-ash leading-relaxed font-sans font-medium">
          {post.description || post.body}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {(post.tools || []).map((tool) => (
          <StackIconBox 
            key={tool.name} 
            name={tool.name} 
            iconName={tool.iconName} 
            color={tool.color} 
          />
        ))}
      </div>
    </motion.div>
  );
}
