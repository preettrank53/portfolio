"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const leftContainer = document.getElementById("left-scroll-container");
      const rightContainer = document.getElementById("right-scroll-container");
      
      const windowScrolled = window.scrollY > 400;
      const leftScrolled = leftContainer ? leftContainer.scrollTop > 400 : false;
      const rightScrolled = rightContainer ? rightContainer.scrollTop > 400 : false;

      setVisible(windowScrolled || leftScrolled || rightScrolled);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    
    // We use setTimeout to ensure elements are mounted in the DOM
    let leftContainer: HTMLElement | null = null;
    let rightContainer: HTMLElement | null = null;

    const attachListeners = () => {
      leftContainer = document.getElementById("left-scroll-container");
      rightContainer = document.getElementById("right-scroll-container");
      
      if (leftContainer) leftContainer.addEventListener("scroll", checkScroll, { passive: true });
      if (rightContainer) rightContainer.addEventListener("scroll", checkScroll, { passive: true });
    };
    
    // Small delay to allow main page to paint
    setTimeout(attachListeners, 100);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      if (leftContainer) leftContainer.removeEventListener("scroll", checkScroll);
      if (rightContainer) rightContainer.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll main window (Mobile view where container scroll doesn't apply)
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Scroll both independent containers (Desktop split-pane view)
    const leftContainer = document.getElementById("left-scroll-container");
    if (leftContainer) leftContainer.scrollTo({ top: 0, behavior: "smooth" });
    
    const rightContainer = document.getElementById("right-scroll-container");
    if (rightContainer) rightContainer.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[60] w-10 h-10 bg-canvas border border-[var(--theme-border)] flex items-center justify-center text-ash hover:text-accent hover:border-accent transition-all duration-200 shadow-xl"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}
