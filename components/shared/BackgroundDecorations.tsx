"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";

interface BackgroundDecorationsProps {
  theme: string | undefined;
  scaleX: MotionValue<number>;
}

export function BackgroundDecorations({ theme, scaleX }: BackgroundDecorationsProps) {
  return (
    <>
      {/* AMBIENT GLOWS */}
      <div className="fixed bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none z-[-2] dark:opacity-100 opacity-50" />
      <div className="fixed top-[20%] left-[-10%] w-[30vw] h-[30vw] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none z-[-2] dark:opacity-100 opacity-50" />

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* BACKGROUND DECORATIONS: Grid + Plus Symbols */}
      <div className="fixed inset-0 z-[-3] pointer-events-none overflow-hidden select-none">
        <div 
          className="absolute inset-0 transition-opacity duration-500" 
          style={{
            backgroundImage: theme === "light" 
              ? "linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            backgroundPosition: "40px 40px",
          }}
        />
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: theme === "light"
              ? `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 36v8M36 40h8' stroke='%23000000' stroke-width='1' opacity='0.05' fill='none'/%3E%3C/svg%3E")`
              : `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 36v8M36 40h8' stroke='%23ffffff' stroke-width='1' opacity='0.05' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            backgroundPosition: "40px 40px",
          }}
        />
      </div>

      {/* Cyber-Organic Shape 1 (Bottom Right) */}
      <div className="fixed bottom-10 -right-16 w-64 h-64 pointer-events-none z-[-5] hidden lg:block transition-all duration-500 opacity-40 dark:opacity-60 blur-[0.5px]">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="organicGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
            <filter id="blurFilterRight" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <g filter="url(#blurFilterRight)">
            <path d="M190,190 C140,160 90,110 80,50 C75,20 85,5 90,0 C80,10 65,30 70,60 C80,115 130,165 190,190 Z" fill="url(#organicGradRight)" />
            <path d="M140,130 C110,110 85,80 85,50 C85,35 90,25 95,20 C85,22 75,35 75,50 C75,85 105,115 140,130 Z" fill="url(#organicGradRight)" opacity="0.8" />
            <path d="M170,160 C150,140 130,130 120,110 C115,100 120,90 125,85 C115,90 110,100 115,115 C125,135 145,145 170,160 Z" fill="url(#organicGradRight)" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Cyber-Organic Shape 2 (Middle Left) */}
      <div className="fixed top-[30%] -left-16 w-56 h-56 pointer-events-none z-[-5] hidden lg:block transition-all duration-500 opacity-25 dark:opacity-40 rotate-[15deg] blur-[0.5px]">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="organicGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
            <filter id="blurFilterLeft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <g filter="url(#blurFilterLeft)">
            <path d="M10,190 C60,160 110,110 120,50 C125,20 115,5 110,0 C120,10 135,30 130,60 C120,115 70,165 10,190 Z" fill="url(#organicGradLeft)" />
            <path d="M60,130 C90,110 115,80 115,50 C115,35 110,25 105,20 C115,22 125,35 125,50 C125,85 95,115 60,130 Z" fill="url(#organicGradLeft)" opacity="0.8" />
            <path d="M30,160 C50,140 70,130 80,110 C85,100 80,90 75,85 C85,90 90,100 85,115 C75,135 55,145 30,160 Z" fill="url(#organicGradLeft)" opacity="0.6" />
          </g>
        </svg>
      </div>
    </>
  );
}
