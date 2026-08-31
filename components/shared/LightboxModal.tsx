"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./ImageWithFallback";

interface ScreenshotItem {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxModalProps {
  selectedScreenshot: ScreenshotItem | null;
  screenshotIndex: number;
  screenshotList: ScreenshotItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  selectedScreenshot,
  screenshotIndex,
  screenshotList,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  return (
    <AnimatePresence>
      {selectedScreenshot && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/97 flex flex-col items-center justify-center select-none"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            (e.currentTarget as HTMLElement).dataset.touchStartX = String(touch.clientX);
          }}
          onTouchEnd={(e) => {
            const startX = Number((e.currentTarget as HTMLElement).dataset.touchStartX);
            const endX = e.changedTouches[0].clientX;
            const delta = endX - startX;
            if (Math.abs(delta) < 40) return;
            if (delta < 0) {
              const nextIndex = screenshotIndex < screenshotList.length - 1 ? screenshotIndex + 1 : 0;
              onNavigate(nextIndex);
            } else {
              const nextIndex = screenshotIndex > 0 ? screenshotIndex - 1 : screenshotList.length - 1;
              onNavigate(nextIndex);
            }
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center border border-charcoal text-ash hover:text-purewhite hover:border-purewhite transition-colors font-mono text-lg"
          >
            ✕
          </button>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="relative w-[95vw] md:w-[80vw] max-h-[80vh] aspect-video flex flex-col items-center"
          >
            <div className="relative w-full h-full">
              <ImageWithFallback
                src={selectedScreenshot.src}
                alt={selectedScreenshot.alt}
                fill
                className="object-contain"
              />
            </div>
            {selectedScreenshot.caption && (
              <p className="mt-3 font-mono text-[10px] text-ash tracking-wider uppercase text-center max-w-xl">
                {selectedScreenshot.caption}
              </p>
            )}
            {screenshotList.length > 1 && (
              <div className="mt-4 flex justify-center items-center gap-6 text-purewhite font-mono text-[10px] tracking-widest">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextIndex = screenshotIndex > 0 ? screenshotIndex - 1 : screenshotList.length - 1;
                    onNavigate(nextIndex);
                  }}
                  className="hover:text-accent p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  ◀ PREV
                </button>
                <span className="text-ash">{screenshotIndex + 1} / {screenshotList.length}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextIndex = screenshotIndex < screenshotList.length - 1 ? screenshotIndex + 1 : 0;
                    onNavigate(nextIndex);
                  }}
                  className="hover:text-accent p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  NEXT ▶
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
