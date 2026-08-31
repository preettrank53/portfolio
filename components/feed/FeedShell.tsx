"use client";

import React, { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SwipeableHandlers } from "react-swipeable";

interface Tab {
  id: string;
  label: string;
}

interface FeedShellProps {
  children: React.ReactNode;
  activeTab: string;
  tabs: Tab[];
  handleTabSwitch: (tabId: string, direction: number) => void;
  swipeHandlers: SwipeableHandlers;
  isMobileStuck: boolean;
  showIdentity: boolean;
  feedAnchorRef: RefObject<HTMLDivElement>;
  stickySentinelRef: RefObject<HTMLDivElement>;
  feedBodyRef: React.MutableRefObject<HTMLDivElement | null>;
  lockedFeedHeightRef: RefObject<number | null>;
  swipeDirection: number;
}

export function FeedShell({
  children,
  activeTab,
  tabs,
  handleTabSwitch,
  swipeHandlers,
  isMobileStuck,
  showIdentity,
  feedAnchorRef,
  stickySentinelRef,
  feedBodyRef,
  lockedFeedHeightRef,
  swipeDirection,
}: FeedShellProps) {
  return (
    <section className="w-full md:w-[65%] md:h-screen flex flex-col relative px-0 md:px-8 md:overflow-hidden">
      {/* FEED ANCHOR FOR SCROLL PRESERVATION */}
      <div ref={feedAnchorRef} id="feed-anchor" className="h-0 w-0" />

      {/* MOBILE STICKY SENTINEL */}
      <div ref={stickySentinelRef} id="nav-sentinel" className="h-0 w-0" />

      {/* MOBILE PLACEHOLDER FOR FIXED NAV JUMP */}
      {isMobileStuck && <div className="h-[80px] w-full block md:hidden" aria-hidden="true" />}

      {/* STICKY TAB BAR */}
      <div
        className={`
          w-full bg-[var(--bg)]/95 supports-[backdrop-filter]:bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)] transition-none
          ${isMobileStuck 
            ? "fixed top-0 left-0 right-0 shadow-md md:sticky md:top-0 md:shadow-none z-[100]" 
            : "sticky top-0 z-[60]"}
        `}
      >
        <div className="w-full pt-[max(0.75rem,env(safe-area-inset-top))] pb-0 md:pb-3 px-6 sm:px-8 md:px-0 flex flex-col justify-end min-h-[80px] md:min-h-[44px]">
          <div className="flex flex-col w-full">
            {/* Identity Row (Mobile only) */}
            <div className="relative w-full h-[28px] mb-2 md:hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showIdentity ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 w-full flex justify-between items-end pb-2 border-b border-[var(--border)]"
              >
                <span className="text-sm font-bold uppercase tracking-tight text-[var(--text)]">PREET RANK</span>
                <span className="text-[10px] font-mono uppercase text-[var(--muted)]">AI/ML ENGINEER</span>
              </motion.div>
            </div>

            <div className="flex items-center w-full">
              {/* CHANGELOG hidden on mobile */}
              <div className="hidden md:block shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] mr-auto pr-6">
                CHANGELOG // {activeTab}
              </div>
              
              {/* TABS */}
              <nav
                className="flex w-full md:w-auto min-w-0 items-center justify-between md:justify-end gap-0 md:gap-6 overflow-x-auto overscroll-x-contain touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Sections"
              >
                {tabs.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button 
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        const currentIndex = tabs.findIndex(t => t.id === activeTab);
                        const newIndex = tabs.findIndex(t => t.id === tab.id);
                        handleTabSwitch(tab.id, newIndex > currentIndex ? 1 : -1);
                      }}
                      className={`flex-1 md:flex-none text-center shrink-0 whitespace-nowrap min-h-[44px] py-3 md:py-1 px-1 font-mono text-sm tracking-widest uppercase transition-colors duration-150 relative ${
                        isActive ? "text-[var(--text)] font-bold" : "text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicatorLine"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text)]"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* SWIPE CONTAINER */}
      <div 
        {...swipeHandlers} 
        ref={(el) => {
          if (swipeHandlers.ref) {
            swipeHandlers.ref(el);
          }
          feedBodyRef.current = el;
        }}
        style={{ minHeight: lockedFeedHeightRef.current ?? undefined }}
        className="w-full h-full flex flex-col md:flex-1 md:overflow-hidden relative overflow-x-hidden"
      >
        <AnimatePresence initial={false} custom={swipeDirection} mode="popLayout">
          <motion.div
            key={activeTab}
            custom={swipeDirection}
            initial={{ opacity: 0, x: swipeDirection * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: swipeDirection * -20 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            id="right-scroll-container"
            className="flex flex-col md:flex-1 md:overflow-y-auto pb-12 w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
