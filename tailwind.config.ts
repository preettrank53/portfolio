import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg)",
        charcoal: "var(--border)",
        darkiron: "var(--surface)",
        purewhite: "var(--text)",
        smoke: "var(--text)",
        ash: "var(--muted)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
        handwritten: ["var(--font-caveat)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
