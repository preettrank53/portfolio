"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const toggleTheme = (e: React.MouseEvent) => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (typeof document.startViewTransition !== "function") {
      setTheme(newTheme);
      return;
    }

    const button = e.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);
      document.documentElement.style.setProperty("--r", `${endRadius}px`);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2 hover:bg-[var(--theme-hover)] rounded-sm transition-colors text-[var(--theme-muted)] hover:text-[var(--theme-text)] ${className || ""}`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
