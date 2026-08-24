"use client";
import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function SpotlightOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    const overlay = overlayRef.current;
    if (!overlay) return;
    const parent = overlay.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = parent.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
      if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  let spotlightColor = "rgba(255, 255, 255, 0.06)";
  if (isMounted) {
    if (resolvedTheme === "light") {
      spotlightColor = "rgba(0, 0, 0, 0.04)";
    } else if (resolvedTheme === "lambo") {
      spotlightColor = "rgba(255, 192, 0, 0.08)";
    }
  }

  if (!isMounted) return null;

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 transition-opacity duration-200"
      style={{
        opacity,
        background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 100%)`,
        zIndex: 0
      }}
    />
  );
}
