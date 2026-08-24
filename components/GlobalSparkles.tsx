"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GlobalSparkles() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    
    // Check mobile
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileQuery.matches);
    
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const mobileListener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    motionQuery.addEventListener('change', motionListener);
    mobileQuery.addEventListener('change', mobileListener);
    
    return () => {
      motionQuery.removeEventListener('change', motionListener);
      mobileQuery.removeEventListener('change', mobileListener);
    };
  }, []);

  if (!mounted || reducedMotion) return null;

  // Adaptive particle color based on theme
  let particleColor = "#FFFFFF"; // default dark
  let density = 60;
  let wrapperOpacity = "opacity-40"; // lowered brightness in dark theme

  if (resolvedTheme === "light") {
    particleColor = "#94a3b8"; // soft slate instead of harsh black
    density = 30;
    wrapperOpacity = "opacity-30"; // subtle in light theme
  } else if (resolvedTheme === "lambo") {
    particleColor = "#FFC000";
    density = 50;
    wrapperOpacity = "opacity-40";
  }

  if (isMobile) {
    density = Math.floor(density / 2);
  }

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-[-1] ${wrapperOpacity} transition-opacity duration-700`}>
      <SparklesCore
        id="global-sparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1.0}
        particleDensity={density}
        className="w-full h-full"
        particleColor={particleColor}
        speed={0.6}
      />
    </div>
  );
}
