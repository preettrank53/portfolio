"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiX } from "react-icons/si";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTheme } from "next-themes";

export function FooterWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (isMobile || reducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let strokeColor = "rgba(255, 255, 255, 0.18)";
  
  if (isMounted) {
    if (resolvedTheme === "light") {
      strokeColor = "rgba(0, 0, 0, 0.18)";
    } else if (resolvedTheme === "lambo") {
      strokeColor = "rgba(255, 192, 0, 0.35)";
    }
  }

  const baseStyle = {
    WebkitTextStroke: `1px ${strokeColor}`,
    color: "transparent",
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.6 }}
      className="w-full border-t border-[var(--border)] pt-16 pb-8 md:pt-24 md:pb-12 px-6 sm:px-8 mt-0 bg-transparent overflow-hidden flex flex-col items-center justify-center select-none"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Micro Label */}
        <div className="text-[10px] tracking-[0.25em] text-[var(--muted)] uppercase text-center mb-6 font-mono">
          END OF TRANSMISSION // PREET RANK
        </div>

        {/* Wordmark Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full text-center group cursor-default"
          aria-label="Preet Rank"
        >
          {/* Base Stroke Text */}
          <h2 
            className="font-sans font-black uppercase tracking-tighter leading-[0.85] text-center whitespace-normal md:whitespace-nowrap"
            style={{ 
              fontSize: "clamp(4.5rem, 18vw, 14rem)",
              ...baseStyle
            }}
          >
            PREET RANK
          </h2>

          {/* Hover Top Layer (Water Ripple Masked by radial gradient) */}
          {!isMobile && !reducedMotion && (
            <>
              {/* SVG Filter Definition */}
              <svg width="0" height="0" className="absolute pointer-events-none">
                <filter id="water-ripple">
                  <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="noise">
                    <animate attributeName="baseFrequency" values="0.015 0.02;0.02 0.03;0.015 0.02" dur="5s" repeatCount="indefinite" />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </svg>

              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  maskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black 0%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black 0%, transparent 100%)`,
                  filter: 'url(#water-ripple)'
                }}
              >
                <h2 
                  className="font-sans font-black uppercase tracking-tighter leading-[0.85] text-center whitespace-normal md:whitespace-nowrap"
                  style={{ 
                    fontSize: "clamp(4.5rem, 18vw, 14rem)",
                    ...baseStyle
                  }}
                >
                  PREET RANK
                </h2>
              </div>
            </>
          )}
        </div>

        {/* Secondary Utility Row */}
        <div className="w-full mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest border-t border-[var(--border)] pt-8">
          <div>© 2026 PREET RANK</div>
          <div>BUILT WITH NEXT.JS</div>
          <div className="flex gap-4 items-center">
            <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a href="https://x.com/preettrank" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
              <SiX className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.linkedin.com/in/preetrank/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.instagram.com/preettrank/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
