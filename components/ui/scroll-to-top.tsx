"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[60] w-10 h-10 bg-canvas border border-[var(--border)] flex items-center justify-center text-ash hover:text-accent hover:border-accent transition-all duration-200 shadow-xl"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}
