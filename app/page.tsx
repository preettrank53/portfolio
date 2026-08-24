/**
 * SETUP CHECKLIST:
 * 1. Packages installed: @upstash/redis, cmdk, sonner, next-themes
 * 2. Setup your .env.local file with these variables:
 *    - ADMIN_PASSWORD=Preet@3753  (server-only — never use NEXT_PUBLIC_ prefix)
 *    - UPSTASH_REDIS_REST_URL=https://...
 *    - UPSTASH_REDIS_REST_TOKEN=...
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Pin,
  Plus,
  Heart,
  Upload
} from "lucide-react";

import Image from "next/image";

// Inline brand icon SVGs to avoid dependency versions issues with brand icons
// ImageWithFallback — wraps next/image with error handling.
// Uses `unoptimized` for base64 data: URLs (from drag-and-drop editor)
// so Next.js image optimization pipeline doesn't reject them.
const ImageWithFallback = ({ src, alt, ...props }: React.ComponentProps<typeof Image>) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className="w-full h-full bg-darkiron border border-charcoal flex flex-col items-center justify-center font-mono text-[9px] text-ash select-none p-4 text-center">
        <span>IMAGE UNAVAILABLE</span>
      </div>
    );
  }

  // Detect base64 data URLs — bypass Next.js optimizer for them
  const isDataUrl = typeof src === "string" && src.startsWith("data:");

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      unoptimized={isDataUrl}
      {...props}
    />
  );
};

const AdaptiveSingleImage = ({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-black/20 flex items-center justify-center rounded-none"
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full h-auto max-h-[320px] md:max-h-[520px] object-contain transition-all duration-300 group-hover:brightness-110"
      />
    </div>
  );
};

import {
  SiJavascript,
  SiTypescript,
  SiRust,
  SiPython,
  SiGo,
  SiReact,
  SiTailwindcss,
  SiVercel,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiX,
  SiMysql,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiScipy,
  SiLangchain,
  SiFastapi,
  SiFlask,
  SiRedis,
  SiGithub,
  SiStreamlit,
  SiJupyter,
  SiGooglecolab
} from "react-icons/si";

import { FaAws, FaJava } from "react-icons/fa";
import { FaHexagonNodes } from "react-icons/fa6";

const LangGraphIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    className={className} 
    style={{ ...style, flex: 'none', lineHeight: 1 }} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>LangGraph</title>
    <path 
      clipRule="evenodd" 
      d="M6.099 6H17.9C21.264 6 24 8.692 24 12s-2.736 6-6.099 6H6.1C2.736 18 0 15.308 0 12s2.736-6 6.099-6zm5.419 9.3c.148.154.367.146.561.106l.002.001c.09-.072-.038-.163-.16-.25-.074-.052-.145-.102-.166-.147.068-.08-.133-.265-.289-.408a1.52 1.52 0 01-.15-.148c-.11-.119-.155-.268-.2-.418-.03-.1-.06-.2-.11-.292-.304-.694-.653-1.383-1.143-1.97-.315-.39-.674-.74-1.033-1.09a19.384 19.384 0 01-.683-.688c-.226-.229-.362-.511-.499-.794-.114-.236-.228-.473-.396-.68-.507-.735-2.107-.936-2.342.104 0 .032-.01.052-.039.073-.13.094-.245.2-.342.327-.238.326-.274.877.022 1.17l.001-.019c.01-.147.02-.286.139-.391.228.193.576.262.841.117.32.45.422.995.525 1.54.085.456.17.912.382 1.316l.014.022c.124.203.25.41.41.587.059.089.178.184.297.279.157.125.314.25.329.359v.143c-.001.285-.002.58.184.813.103.205-.15.41-.352.385-.112.015-.233-.014-.354-.042-.165-.04-.329-.078-.462-.003-.038.04-.091.04-.145.042-.064.002-.129.004-.167.07-.008.019-.026.04-.045.063-.042.05-.087.105-.033.146l.015-.01c.082-.062.16-.12.27-.084-.014.08.039.102.092.123l.027.012a.344.344 0 01-.008.056c-.009.045-.017.088.018.127a.598.598 0 00.046-.054c.037-.046.073-.092.139-.11.144.19.289.111.471.013.206-.111.459-.248.81-.055-.135-.006-.255.01-.345.12-.023.024-.042.052-.002.084.207-.132.294-.085.375-.04.06.032.115.063.212.024l.07-.036c.155-.083.314-.166.499-.137-.139.039-.188.125-.242.218-.026.047-.054.095-.094.14-.021.021-.03.046-.007.08.29-.023.4-.095.548-.192.07-.046.15-.099.261-.154.124-.075.248-.027.368.02.13.05.255.098.371-.014.037-.033.083-.034.129-.034.016 0 .033 0 .05-.002-.037-.19-.24-.188-.448-.186-.24.003-.483.006-.475-.289.222-.149.224-.407.226-.651 0-.06 0-.117.005-.173.163.09.336.16.508.229.162.065.323.13.474.21.158.25.404.58.732.558.008-.026.016-.047.026-.073.019.004.039.008.059.014.086.02.178.044.223-.056zm6.429-2.829c.19.186.447.29.716.29.269 0 .526-.104.716-.29a.98.98 0 00.297-.7.98.98 0 00-.297-.7 1.024 1.024 0 00-1.08-.224l-.58-.831-.405.272.583.835a.978.978 0 00.05 1.348zm-1.817-2.69a1.03 1.03 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.028 1.028 0 00-1.298.14.987.987 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm0 5.752a1.032 1.032 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.027 1.027 0 00-1.298.14.986.986 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm.93-3.516v-.492h-1.55a.977.977 0 00-.217-.404l.584-.847-.425-.276-.583.847a1.023 1.023 0 00-1.047.23.973.973 0 00-.296.696c0 .261.107.512.296.696a1.023 1.023 0 001.047.23l.583.847.42-.276-.579-.847a.977.977 0 00.217-.404h1.55z" 
      fill="#1C3C3C" 
      fillRule="evenodd"
    />
  </svg>
);

const CrewAIIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    className={className} 
    style={{ ...style, flex: 'none', lineHeight: 1 }} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>CrewAI</title>
    <path 
      d="M19.41 10.783a2.753 2.753 0 012.471 1.355c.483.806.622 1.772.385 2.68l-.136.522a9.994 9.994 0 01-3.156 5.058c-.605.517-1.283 1.062-2.083 1.524l-.028.017c-.402.232-.884.511-1.398.756-1.19.602-2.475.997-3.798 1.167-.854.111-1.716.155-2.577.132H9.072a8.588 8.588 0 01-5.046-1.87l-.012-.01-.012-.01A8.024 8.024 0 011.22 17.42a10.916 10.916 0 01-.102-3.779A15.622 15.622 0 012.88 8.4a21.758 21.758 0 012.432-3.678 15.44 15.44 0 013.56-3.182A9.958 9.958 0 0112.44.104h.004l.003-.002c2.057-.384 3.743.374 5.024 1.26a8.28 8.28 0 012.395 2.513l.024.04.023.042a5.474 5.474 0 01.508 4.012c-.239.97-.577 1.914-1.01 2.814z" 
      fill="#461816"
    />
    <path 
      d="M18.861 13.165a.748.748 0 011.256.031c.199.332.256.73.159 1.103l-.137.522a7.936 7.936 0 01-2.504 4.014c-.572.49-1.138.939-1.774 1.306-.427.247-.857.496-1.303.707a9.628 9.628 0 01-3.155.973 14.33 14.33 0 01-2.257.116 6.531 6.531 0 01-3.837-1.422 5.967 5.967 0 01-2.071-3.494 8.859 8.859 0 01-.085-3.08 13.56 13.56 0 011.54-4.568 19.701 19.701 0 012.212-3.348 13.382 13.382 0 013.088-2.76 7.9 7.9 0 012.832-1.14c1.307-.245 2.434.207 3.481.933a6.222 6.222 0 011.806 1.892c.423.767.536 1.668.314 2.515a12.394 12.394 0 01-.99 2.67l-.223.497c-.321.713-.642 1.426-.97 2.137a.762.762 0 01-.97.467 3.39 3.39 0 01-2.283-2.49c-.095-.83.04-1.669.39-2.426.288-.746.61-1.477.933-2.208l.248-.563a.53.53 0 00-.204-.742 2.35 2.35 0 00-1.2.702 25.291 25.291 0 00-1.614 1.767 21.561 21.561 0 00-2.619 4.184 7.59 7.59 0 00-.816 2.753 7.042 7.042 0 00.07 2.219 2.055 2.055 0 001.934 1.715c1.801.1 3.59-.363 5.116-1.328.582-.4 1.141-.831 1.675-1.294.752-.71 1.376-1.519 1.958-2.36z" 
      fill="#fff"
    />
  </svg>
);

const RagIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={{ ...style, fill: "currentColor" }} id="Rag--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
    <desc>RAG Streamline Icon</desc>
    <path d="M6 14h-1c-1.92995 0 -3.5 -1.57005 -3.5 -3.5v-1h1v1c0 1.3784 1.1216 2.5 2.5 2.5h1v1Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M14 9.5h-4.5c-0.552 0.0007 -0.9993 0.448 -1 1v2.5c0 0.5523 0.4477 1 1 1h1.5v-1h-1.5v-2.5h4.5v2.5h-1.2676l-1.29685 1.9453L12.2676 15.5l1 -1.5H14c0.5523 0 1 -0.4477 1 -1v-2.5c-0.0007 -0.552 -0.448 -0.9993 -1 -1Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M14.5 7.5v-2c0 -1.92995 -1.57005 -3.5 -3.5 -3.5h-1.5v1h1.5c1.3784 0 2.5 1.1216 2.5 2.5v2h1Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M3 5h1.5v1H3Z" strokeWidth="0.5" fill="currentColor"></path>
    <path d="M6.303 3.21775 5.04045 1.375C4.8494 1.1367 4.56485 1 4.2597 1H2.00005c-0.5514 0 -1 0.44875 -1 1v5c0 0.55125 0.4486 1 1 1h3.5c0.5514 0 1 -0.44875 1 -1V3.8125c0 -0.2263 -0.0779 -0.44825 -0.197 -0.59475ZM2 7V2h2v1.5c0 0.2761 0.2239 0.5 0.5 0.5h1v3H2Z" strokeWidth="0.5" fill="currentColor"></path>
    <path id="_Transparent_Rectangle_" d="M0 0h16v16H0Z" strokeWidth="0.5" fill="none"></path>
  </svg>
);

const McpIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={{ ...style, fill: "currentColor" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
    <path d="m19.97,11.84c.66-.66,1.02-1.53,1.02-2.46s-.36-1.8-1.02-2.46l-.04-.04c-.66-.66-1.53-1.02-2.46-1.02-.17,0-.34.03-.51.05.02-.17.05-.33.05-.51,0-.93-.36-1.8-1.02-2.46-.66-.66-1.53-1.02-2.46-1.02s-1.8.36-2.46,1.02l-7.87,7.87c-.27.27-.27.71,0,.98s.71.27.98,0l7.87-7.87c.39-.39.92-.61,1.47-.61s1.08.22,1.47.61c.39.39.61.92.61,1.48s-.22,1.08-.61,1.48l-5.86,5.86-.08.08c-.27.27-.27.71,0,.98.14.14.31.2.49.2s.36-.07.49-.2l5.94-5.94c.39-.39.92-.61,1.48-.61s1.08.22,1.47.61l.04.04c.39.39.61.92.61,1.47s-.22,1.08-.61,1.48l-7.11,7.11c-.63.63-.63,1.66,0,2.29l1.46,1.46c.14.14.31.2.49.2s.36-.07.49-.2c.27-.27.27-.71,0-.98l-1.46-1.46c-.09-.09-.09-.24,0-.33l7.11-7.11Z"/><path d="m17.96,9.83c.27-.27.27-.71,0-.98-.27-.27-.71-.27-.98,0l-5.82,5.82c-.81.81-2.14.81-2.95,0-.81-.81-.81-2.14,0-2.95l5.82-5.82c.27-.27.27-.71,0-.98-.27-.27-.71-.27-.98,0l-5.82,5.82c-1.36,1.36-1.36,3.56,0,4.92.68.68,1.57,1.02,2.46,1.02s1.78-.34,2.46-1.02l5.82-5.82Z"/>
  </svg>
);

const OopsIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconMapping: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  SiJavascript,
  SiTypescript,
  SiRust,
  SiPython,
  SiGo,
  SiReact,
  SiTailwindcss,
  SiVercel,
  SiNodedotjs,
  SiDocker,
  SiAmazonwebservices: FaAws,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiJava: FaJava,
  SiMysql,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiScipy,
  SiLangchain,
  SiFastapi,
  SiFlask,
  SiRedis,
  SiGithub,
  SiStreamlit,
  SiJupyter,
  SiGooglecolab,
  SiLanggraph: LangGraphIcon,
  SiCrewai: CrewAIIcon,
  SiRag: RagIcon,
  SiMcp: McpIcon,
  SiDsa: FaHexagonNodes,
  SiOop: OopsIcon,
  SiOops: OopsIcon
};

const StackIconBox = ({ name, iconName, color }: { name: string; iconName: string; color: string }) => {
  const IconComponent = iconName !== "TextFallback" ? IconMapping[iconName] : undefined;
  const [clickedExpanded, setClickedExpanded] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hoverQuery = window.matchMedia("(hover: hover)");
      setHasHover(hoverQuery.matches);
      const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
      hoverQuery.addEventListener("change", handler);
      return () => hoverQuery.removeEventListener("change", handler);
    }
  }, []);

  if (!IconComponent) {
    return (
      <div 
        onClick={() => !hasHover && setClickedExpanded(!clickedExpanded)}
        className={`flex h-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text)] transition-colors duration-300 rounded-none cursor-pointer select-none px-1 text-center min-w-[44px] min-h-[44px] ${
          clickedExpanded && !hasHover ? "w-auto max-w-[200px] px-3" : "w-11"
        }`}
      >
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest truncate" style={{ color: color || "var(--text)" }}>
          {clickedExpanded && !hasHover ? name : (name.length > 3 ? name.slice(0, 3) : name)}
        </span>
      </div>
    );
  }

  return (
    <div 
      onClick={() => !hasHover && setClickedExpanded(!clickedExpanded)}
      className={`group relative flex h-11 items-center overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text)] rounded-none cursor-pointer z-10 hover:z-20 select-none min-w-[44px] min-h-[44px] ${
        hasHover 
          ? "w-11 md:w-auto max-w-[44px] md:max-w-[56px] md:hover:max-w-[200px] transition-[max-width] duration-300 ease-out md:h-14"
          : clickedExpanded 
            ? "w-auto px-2"
            : "w-11"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center md:h-14 md:w-14">
        <IconComponent className="text-xl md:text-3xl transition-transform duration-300 group-hover:scale-105" style={{ color }} />
      </div>
      {hasHover ? (
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[var(--text)] opacity-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[120px] ml-0 group-hover:ml-1 pr-0 group-hover:pr-3">
          {name}
        </span>
      ) : (
        clickedExpanded && (
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[var(--text)] ml-1 pr-2">
            {name}
          </span>
        )
      )}
    </div>
  );
};


const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// cmdk is heavy (~30KB gzipped). Lazy load it so it doesn't block initial render.
// We use a wrapper component because cmdk exports as a namespace (Command.Dialog etc.)
const CommandPalette = dynamic(
  () => import("./_CommandPalette"),
  { ssr: false }
);

import { 
  getDevData, 
  saveDevData, 
  getAppreciations, 
  incrementAppreciation 
} from "./actions";
import { ErrorBoundary } from "./ErrorBoundary";
import { ScreenshotEditor } from "./ScreenshotEditor";
import { GitHubActivity } from "./GitHubActivity";

// =========================================================
// TYPES
// =========================================================

interface DevLogItem {
  id: string;
  isPinned?: boolean;
  date: string;
  category: string;
  title: string;
  body: string;
  description?: string | string[];
  logoUrl?: string;
  company?: string;
  type?: string;
  duration?: string;
  location?: string;
  tools?: {
    name: string;
    iconName: string;
    color: string;
  }[];
  codeSnippet?: {
    title: string;
    lang: string;
    content: string;
  } | null;
  tags?: string[];
  liveUrl?: string | null;
  codeUrl?: string | null;
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

interface GitHubPR {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
}

function LogoUploader({
  logoUrl,
  onChange
}: {
  logoUrl?: string;
  onChange: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = async (file: File) => {
    const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
    const MAX_SIZE = 5 * 1024 * 1024;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast("Unsupported image format", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
      return;
    }
    if (file.size > MAX_SIZE) {
      toast("File size exceeds 5MB limit", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block font-mono text-[9px] text-ash uppercase tracking-widest">COMPANY LOGO</label>
      <div className="w-full">
        {logoUrl ? (
          <div className="w-full max-w-[200px] h-32 bg-white border border-[var(--border)] rounded-none relative flex items-center justify-center p-1 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={logoUrl} 
              alt="Logo Preview" 
              className="w-full h-full object-contain bg-white"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow hover:bg-red-700 transition-colors"
              title="Remove logo"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full min-h-[140px] border border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors duration-150 select-none bg-canvas/30 rounded-none gap-2 p-4
              ${dragging ? "border-accent bg-canvas/60" : "border-[var(--border)] hover:border-accent"}`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/webp"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) processFile(file);
              }}
              className="hidden"
            />
            <Upload className="w-6 h-6 text-ash" strokeWidth={1.2} />
            <span className="font-mono text-[9px] text-purewhite font-bold tracking-widest text-center uppercase">DROP LOGO</span>
            <span className="font-mono text-[7px] text-ash/40 mt-0.5 uppercase text-center">OR CLICK TO UPLOAD</span>
          </div>
        )}
      </div>
    </div>
  );
}

const TABS = [
  { id: "experience", label: "EXPERIENCE" },
  { id: "stack", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" }
];

export default function PortfolioSplitPane() {
  const [activeTab, setActiveTab] = useState<string>("experience");
  const [tabData, setTabData] = useState<DevLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [openCommandPalette, setOpenCommandPalette] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  
  // Theme Switching
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Appreciations and Github Stars
  const [appreciations, setAppreciations] = useState<Record<string, number>>({});
  const [userAppreciated, setUserAppreciated] = useState<Record<string, boolean>>({});

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<DevLogItem | null>(null);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Open Source PRs State
  const [prs, setPrs] = useState<GitHubPR[]>([]);
  const [prsLoading, setPrsLoading] = useState<boolean>(true);
  const [prsError, setPrsError] = useState<boolean>(false);

  // View Counter State
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [viewCountError, setViewCountError] = useState<boolean>(false);

  // Screenshot Lightbox State
  const [selectedScreenshot, setSelectedScreenshot] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [screenshotIndex, setScreenshotIndex] = useState<number>(0);
  const [screenshotList, setScreenshotList] = useState<{ src: string; alt: string; caption?: string }[]>([]);

  // Expanded Cards for Long text description truncation
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Framer motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // =========================================================
  // BOOTSTRAP & SHORTCUTS
  // =========================================================

  useEffect(() => {
    setMounted(true);

    // Check admin status via non-httpOnly flag cookie (readable by JS)
    const checkAdmin = () => {
      const isLoggedIn = document.cookie
        .split("; ")
        .some((c) => c.trim() === "admin_session_flag=true");
      setAdminMode(isLoggedIn);
    };
    checkAdmin();

    // Setup shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + E -> Admin login
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setShowAdminModal(prev => !prev);
      }
      // Cmd/Ctrl + K -> Command palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenCommandPalette(prev => !prev);
      }
      // Quick tabs jumps
      if (e.altKey) {
        if (e.key === "1") { setActiveTab("experience"); e.preventDefault(); }
        if (e.key === "2") { setActiveTab("stack"); e.preventDefault(); }
        if (e.key === "3") { setActiveTab("projects"); e.preventDefault(); }
      }
      // Escape closes open modals
      if (e.key === "Escape") {
        setShowAdminModal(false);
        setOpenCommandPalette(false);
        setSelectedScreenshot(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch Open Source PRs on mount
  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const res = await fetch("https://api.github.com/search/issues?q=type:pr+is:merged+author:preettrank53+-user:preettrank53&sort=created&order=desc&per_page=3");
        if (!res.ok) throw new Error("GitHub search API rate limit or error");
        const json = await res.json();
        if (json && Array.isArray(json.items)) {
          setPrs(json.items);
        } else {
          setPrsError(true);
        }
      } catch {
        setPrsError(true);
      } finally {
        setPrsLoading(false);
      }
    };
    fetchPRs();
  }, []);

  // Fetch View Count on mount
  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("has_visited_portfolio");
        const url = hasVisited 
          ? "https://countapi.mileshilliard.com/api/v1/get/preetrank_portfolio_visits" 
          : "https://countapi.mileshilliard.com/api/v1/hit/preetrank_portfolio_visits";

        let res = await fetch(url);
        if (url.includes("/get/") && res.status === 404) {
          // If the key doesn't exist, hit it to initialize/increment it
          res = await fetch("https://countapi.mileshilliard.com/api/v1/hit/preetrank_portfolio_visits");
        }
        if (!res.ok) throw new Error("Counter API error");
        const data = await res.json();
        if (typeof data.value === "number") {
          setViewCount(data.value);
          if (!hasVisited) {
            sessionStorage.setItem("has_visited_portfolio", "true");
          }
        } else {
          setViewCountError(true);
        }
      } catch {
        setViewCountError(true);
      }
    };
    fetchViewCount();
  }, []);

  // Separate listener for Lightbox navigation
  useEffect(() => {
    if (!selectedScreenshot) return;
    const handleLightboxKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setScreenshotIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : screenshotList.length - 1;
          setSelectedScreenshot(screenshotList[nextIndex]);
          return nextIndex;
        });
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setScreenshotIndex(prev => {
          const nextIndex = prev < screenshotList.length - 1 ? prev + 1 : 0;
          setSelectedScreenshot(screenshotList[nextIndex]);
          return nextIndex;
        });
      }
      if (e.key === "Escape") {
        setSelectedScreenshot(null);
      }
    };
    window.addEventListener("keydown", handleLightboxKey);
    return () => window.removeEventListener("keydown", handleLightboxKey);
  }, [selectedScreenshot, screenshotList]);

  // Load local appreciates from localStorage on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const localAppreciated: Record<string, boolean> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("appreciated_")) {
        const slug = key.replace("appreciated_", "");
        localAppreciated[slug] = true;
      }
    }
    setUserAppreciated(localAppreciated);
  }, []);

  // Fetch data when active tab changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data: DevLogItem[] = await getDevData(activeTab);
        const safeData = Array.isArray(data) ? data : [];
        setTabData(safeData);
        
        // Fetch appreciations
        const slugs = safeData.map((d: DevLogItem) => d?.id).filter(Boolean) as string[];
        if (slugs.length > 0) {
          const counts = await getAppreciations(slugs);
          setAppreciations(prev => ({ ...prev, ...(counts || {}) }));
        }
      } catch {
        setTabData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeTab]);

  // =========================================================
  // ACTIONS & HANDLERS
  // =========================================================

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("preetrank53@gmail.com");
    toast("EMAIL COPIED TO CLIPBOARD", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs tracking-wider"
    });
  };

  const handleAppreciate = async (id: string) => {
    if (userAppreciated[id]) return;
    
    // Optimistic update
    setAppreciations(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setUserAppreciated(prev => ({ ...prev, [id]: true }));
    localStorage.setItem(`appreciated_${id}`, "true");

    const res = await incrementAppreciation(id);
    if (res.success && res.count !== undefined) {
      setAppreciations(prev => ({ ...prev, [id]: res.count }));
    }
  };

  // Admin login — sends password to /api/auth (server-side comparison, no client exposure)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setAdminMode(true);
        setShowAdminModal(false);
        setAdminPassword("");
        toast("ADMIN LOGIN GRANTED", {
          className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
        });
      } else {
        toast("ACCESS DENIED", {
          className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
        });
      }
    } catch {
      toast("AUTH ERROR", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
    }
  };

  // Admin logout — hits DELETE /api/auth to clear HttpOnly cookies
  const handleAdminLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAdminMode(false);
    setHasUnsavedChanges(false);
    setShowAdminModal(false);
    toast("ADMIN DISCONNECTED", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
    });
  };

  // Inline edit initialize
  const handleStartEdit = (item: DevLogItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
    setTagsInput(item.tags ? item.tags.join(", ") : "");
    setConfirmDeleteId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
    setConfirmDeleteId(null);
  };

  // Inline edit save
  const handleSaveEdit = async () => {
    if (!editForm) return;

    const finalForm = { ...editForm };
    if (activeTab === "experience" && Array.isArray(finalForm.description)) {
      finalForm.description = finalForm.description
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    if (activeTab === "projects") {
      finalForm.tags = tagsInput
        .split(",")
        .map(t => t.trim().toUpperCase())
        .filter(Boolean);
      finalForm.liveUrl = finalForm.liveUrl && finalForm.liveUrl.trim() !== "" ? finalForm.liveUrl : null;
      finalForm.codeUrl = finalForm.codeUrl && finalForm.codeUrl.trim() !== "" ? finalForm.codeUrl : null;
      finalForm.codeSnippet = finalForm.codeSnippet && finalForm.codeSnippet.content && finalForm.codeSnippet.content.trim() !== "" ? finalForm.codeSnippet : null;
    }

    // Ensure single pin constraint
    const updated = tabData.map(item => {
      if (item.id === editingId) {
        return finalForm;
      }
      if (finalForm.isPinned && item.isPinned) {
        return { ...item, isPinned: false };
      }
      return item;
    });

    setTabData(updated);
    setEditingId(null);
    setEditForm(null);
    
    const res = await saveDevData(activeTab, updated);
    if (res.success) {
      toast("CHANGES COMMITTED SUCCESSFULLY", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      // Vercel read-only FS — state updated in-memory; user must export JSON
      setHasUnsavedChanges(true);
      toast("STATE UPDATED — EXPORT JSON TO COMMIT PERMANENTLY", {
        className: "bg-canvas border border-amber-500 text-amber-400 rounded-none font-mono uppercase text-xs",
        duration: 6000,
      });
    } else {
      toast("WRITE ERROR", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
    }
  };

  const handleDeleteEntry = async (id: string) => {
    const updatedList = tabData.filter(d => d.id !== id);
    setTabData(updatedList);
    setEditingId(null);
    setEditForm(null);
    setConfirmDeleteId(null);
    const res = await saveDevData(activeTab, updatedList);
    if (res.success) {
      toast("ENTRY DELETED", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs tracking-wider"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      setHasUnsavedChanges(true);
      toast("DELETED IN MEMORY — EXPORT JSON TO COMMIT", {
        className: "bg-canvas border border-amber-500 text-amber-400 rounded-none font-mono uppercase text-xs",
        duration: 6000,
      });
    } else {
      toast("FAILED TO DELETE ENTRY", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs tracking-wider"
      });
    }
  };

  const handleTogglePin = async (item: DevLogItem) => {
    const willPin = !item.isPinned;
    const updatedList = tabData.map(d => {
      if (d.id === item.id) {
        return { ...d, isPinned: willPin };
      }
      if (willPin && d.isPinned) {
        return { ...d, isPinned: false };
      }
      return d;
    });

    setTabData(updatedList);
    const res = await saveDevData(activeTab, updatedList);
    if (res.success) {
      toast(willPin ? "📌 PINNED TO TOP" : "📌 UNPINNED", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs tracking-wider"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      setHasUnsavedChanges(true);
    } else {
      toast("FAILED TO SAVE PIN STATUS", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs tracking-wider"
      });
    }
  };

  // Initialize new entry — all fields empty so placeholders show correctly
  const handleStartNewEntry = () => {
    setIsAddingNew(true);
    setEditForm({
      id: `${activeTab.slice(0, 4)}-${Date.now()}`,
      isPinned: false,
      date: "",
      category: "",
      title: "",
      body: "",
      tags: [],
      screenshots: [],
      codeSnippet: null,
      liveUrl: "",
      codeUrl: "",
      ...(activeTab === "experience" ? {
        company: "",
        type: "",
        duration: "",
        location: "",
        logoUrl: "",
        description: []
      } : activeTab === "stack" ? {
        description: "",
        tools: []
      } : {})
    });
    setTagsInput("");
    setConfirmDeleteId(null);
  };

  const handleSaveNewEntry = async () => {
    if (!editForm) return;

    const finalForm = { ...editForm };
    if (activeTab === "experience" && Array.isArray(finalForm.description)) {
      finalForm.description = finalForm.description
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    if (activeTab === "projects") {
      finalForm.tags = tagsInput
        .split(",")
        .map(t => t.trim().toUpperCase())
        .filter(Boolean);
      finalForm.liveUrl = finalForm.liveUrl && finalForm.liveUrl.trim() !== "" ? finalForm.liveUrl : null;
      finalForm.codeUrl = finalForm.codeUrl && finalForm.codeUrl.trim() !== "" ? finalForm.codeUrl : null;
      finalForm.codeSnippet = finalForm.codeSnippet && finalForm.codeSnippet.content && finalForm.codeSnippet.content.trim() !== "" ? finalForm.codeSnippet : null;
    }

    // Ensure single pin constraint
    const updated = [finalForm, ...tabData].map(item => {
      if (item.id === finalForm.id) {
        return finalForm;
      }
      if (finalForm.isPinned && item.isPinned) {
        return { ...item, isPinned: false };
      }
      return item;
    });

    setTabData(updated);
    setIsAddingNew(false);
    setEditForm(null);

    const res = await saveDevData(activeTab, updated);
    if (res.success) {
      toast("NEW RECORD DEPLOYED", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      setHasUnsavedChanges(true);
      toast("STATE UPDATED — EXPORT JSON TO COMMIT PERMANENTLY", {
        className: "bg-canvas border border-amber-500 text-amber-400 rounded-none font-mono uppercase text-xs",
        duration: 6000,
      });
    } else {
      toast("WRITE ERROR", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
    }
  };

  const handleUpdateTool = (index: number, field: string, value: string) => {
    if (!editForm) return;
    const updatedTools = [...(editForm.tools || [])];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    setEditForm({ ...editForm, tools: updatedTools });
  };

  const handleRemoveTool = (index: number) => {
    if (!editForm) return;
    const updatedTools = (editForm.tools || []).filter((_, i) => i !== index);
    setEditForm({ ...editForm, tools: updatedTools });
  };

  const handleAddTool = () => {
    if (!editForm) return;
    const updatedTools = [...(editForm.tools || []), { name: "", iconName: "TextFallback", color: "#FFFFFF" }];
    setEditForm({ ...editForm, tools: updatedTools });
  };

  // Export JSON locally (Client-side) — primary persistence mechanism on Vercel
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tabData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeTab}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setHasUnsavedChanges(false);
    toast("EXPORTED JSON CONFIG — COMMIT TO GITHUB TO DEPLOY", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
    });
  };

  return (
    <main className="min-h-[100dvh] bg-canvas text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500 relative z-0">
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* ==========================================
         BACKGROUND DECORATIONS: Grid + Ethereal Leaves
         ========================================== */}
      <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden select-none">
        {/* CSS Blueprint Grid */}
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
        
        {/* Plus symbols at grid intersections */}
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
        <svg 
          className="w-full h-full"
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
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
            <path 
              d="M190,190 C140,160 90,110 80,50 C75,20 85,5 90,0 C80,10 65,30 70,60 C80,115 130,165 190,190 Z" 
              fill="url(#organicGradRight)" 
            />
            <path 
              d="M140,130 C110,110 85,80 85,50 C85,35 90,25 95,20 C85,22 75,35 75,50 C75,85 105,115 140,130 Z" 
              fill="url(#organicGradRight)" 
              opacity="0.8"
            />
            <path 
              d="M170,160 C150,140 130,130 120,110 C115,100 120,90 125,85 C115,90 110,100 115,115 C125,135 145,145 170,160 Z" 
              fill="url(#organicGradRight)" 
              opacity="0.6"
            />
          </g>
        </svg>
      </div>

      {/* Cyber-Organic Shape 2 (Middle Left) */}
      <div className="fixed top-[30%] -left-16 w-56 h-56 pointer-events-none z-[-5] hidden lg:block transition-all duration-500 opacity-25 dark:opacity-40 rotate-[15deg] blur-[0.5px]">
        <svg 
          className="w-full h-full"
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
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
            <path 
              d="M10,190 C60,160 110,110 120,50 C125,20 115,5 110,0 C120,10 135,30 130,60 C120,115 70,165 10,190 Z" 
              fill="url(#organicGradLeft)" 
            />
            <path 
              d="M60,130 C90,110 115,80 115,50 C115,35 110,25 105,20 C115,22 125,35 125,50 C125,85 95,115 60,130 Z" 
              fill="url(#organicGradLeft)" 
              opacity="0.8"
            />
            <path 
              d="M30,160 C50,140 70,130 80,110 C85,100 80,90 75,85 C85,90 90,100 85,115 C75,135 55,145 30,160 Z" 
              fill="url(#organicGradLeft)" 
              opacity="0.6"
            />
          </g>
        </svg>
      </div>

      {/* Centered container flexbox grid */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row w-full relative z-10 md:h-screen md:overflow-hidden">
        
        {/* ==========================================
           LEFT COLUMN: IDENTITY PANE (Sticky screen height on desktop, block on mobile)
           ========================================== */}
        <ErrorBoundary title="IDENTITY PANE">
          <aside className="relative w-full px-5 py-8 border-b border-[var(--border)] md:sticky md:top-0 md:h-screen md:w-[35%] md:py-12 md:pr-12 md:px-0 flex flex-col justify-between md:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:border-b-0 md:border-r border-charcoal select-none">
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Avatar icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 border border-[var(--border)] bg-[var(--surface)] rounded-[18px] md:rounded-2xl p-1 flex-shrink-0 select-none overflow-hidden">
              <img
                src="/profile.png"
                alt="PREET RANK"
                className="w-full h-full object-cover rounded-[14px] md:rounded-xl border border-white/10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith(".png")) {
                     target.src = "/profile.jpg";
                  }
                }}
              />
            </div>

            {/* Display Name — fluid clamp size */}
            <div className="flex flex-col">
              <h1 className="font-sans font-extrabold tracking-tighter uppercase text-purewhite whitespace-nowrap text-3xl md:text-3xl">
                PREET RANK
              </h1>
              <span className="font-mono text-xs text-ash uppercase tracking-widest mt-1">
                @preettrank
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm leading-relaxed text-ash font-sans font-medium">
              21, figuring out code, AI/ML & LLMs.<br />
              currently learning LLM inference, looking for an internship.
            </p>

            {/* CTA Buttons — full width, touch-friendly */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href="mailto:preetrank53@gmail.com"
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[48px] flex items-center justify-center"
              >
                EMAIL ME
              </a>
              <a
                href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[48px] flex items-center justify-center"
              >
                VIEW RESUME
              </a>
            </div>

            {/* Social Media Icons — larger on mobile for tapping */}
            <div className="flex gap-6 items-center">
              <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Github className="w-6 h-6 md:w-5 md:h-5" />
              </a>
              <a href="https://x.com/preettrank" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <SiX className="w-5 h-5 md:w-[18px] md:h-[18px]" />
              </a>
              <a href="https://www.linkedin.com/in/preetrank/" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Linkedin className="w-6 h-6 md:w-5 md:h-5" />
              </a>
              <a href="https://www.instagram.com/preettrank/" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Instagram className="w-6 h-6 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* GitHub Activity Chart */}
          <div className="mt-6">
            <GitHubActivity />
          </div>

          {/* Recent Open Source PRs */}
          {!prsError && (prsLoading || prs.length > 0) && (
            <div className="mt-8">
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8b949e] dark:text-ash/70 transition-colors duration-400">
                RECENT OPEN SOURCE PRs
              </span>
              {prsLoading ? (
                <div className="flex flex-col gap-2 mt-2 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border border-charcoal/30 p-2.5 bg-canvas/30">
                      <div className="h-2 bg-charcoal w-24 mb-1.5" />
                      <div className="h-3 bg-charcoal w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  {prs.map(pr => {
                    const repoName = pr.repository_url.replace("https://api.github.com/repos/", "").toUpperCase();
                    return (
                      <a
                        key={pr.id}
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block border border-charcoal/30 p-2.5 transition-colors duration-150 hover:border-accent bg-canvas/30 hover:bg-canvas/50"
                      >
                        <div className="text-[10px] text-ash font-mono uppercase tracking-wider group-hover:text-accent transition-colors duration-150">
                          {repoName}
                        </div>
                        <div className="text-xs text-purewhite font-sans font-medium line-clamp-1 mt-0.5 group-hover:text-purewhite transition-colors duration-150">
                          {pr.title}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Theme Switcher + Recruiting Status */}
          <div className="mt-8 flex flex-col gap-6">
            {mounted && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-ash uppercase tracking-widest">ACTIVE ENGINE THEME</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 font-mono text-[9px] uppercase tracking-widest border px-3 py-2.5 transition-all rounded-none min-h-[44px] ${
                      theme === "dark" ? "border-accent text-accent bg-accent/5 font-bold" : "border-charcoal text-ash hover:border-accent hover:text-accent"
                    }`}
                  >
                    DARK
                  </button>
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 font-mono text-[9px] uppercase tracking-widest border px-3 py-2.5 transition-all rounded-none min-h-[44px] ${
                      theme === "light" ? "border-accent text-accent bg-accent/5 font-bold" : "border-charcoal text-ash hover:border-accent hover:text-accent"
                    }`}
                  >
                    LIGHT
                  </button>
                </div>
              </div>
            )}

            {/* View Counter */}
            {!viewCountError && (
              <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest flex items-center gap-2 mt-8 transition-colors duration-400">
                <span>[👁 TOTAL VISITS: {viewCount !== null ? viewCount : "---"}]</span>
              </div>
            )}
          </div>
        </aside>
      </ErrorBoundary>

      {/* ==========================================
         RIGHT COLUMN: DEV LOGBOOK FEED (Scrollable window-level, standard px padding)
         ========================================== */}
      <ErrorBoundary title="LOGBOOK FEED">
        <section className="w-full md:w-[65%] md:h-screen flex flex-col relative px-0 md:px-8 md:overflow-hidden">
          
          {/* Sticky Header (Flush to Top pixel 0) */}
          <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur border-b border-charcoal py-3 px-5 md:pt-8 md:pb-4 md:px-0 flex justify-between items-center select-none transition-colors duration-500">
            <h2 className="hidden sm:block font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-ash uppercase flex-shrink-0">
              CHANGELOG // {activeTab}
            </h2>
            
            <div className="flex gap-6 font-mono text-sm tracking-widest text-ash uppercase overflow-x-auto hide-scrollbar ml-auto flex-shrink-0 whitespace-nowrap scroll-smooth">
              {TABS.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsAddingNew(false);
                      setEditingId(null);
                    }}
                    className={`hover:text-accent transition-colors duration-150 py-1 relative ${
                      isActive ? "text-purewhite font-bold" : ""
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicatorLine"
                        className="absolute bottom-[-13px] md:bottom-[-17px] left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </header>

          {/* Dev Logbook Feed Content */}
          <div className="flex flex-col md:flex-1 md:overflow-y-auto pr-2 pb-12">
            
            {/* New Entry Button for Admin */}
            {adminMode && !isAddingNew && !editingId && (
              <div className="pt-6">
                <button 
                  onClick={handleStartNewEntry}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] uppercase tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD NEW {activeTab.slice(0, -1).toUpperCase()} ENTRY</span>
                </button>
              </div>
            )}

            {/* Form for Adding New Record inline */}
            {isAddingNew && editForm && (
              <div className="py-0 border-b-0 md:py-8 md:border-b md:border-charcoal">
                <div className="fixed inset-0 w-full h-[100dvh] z-[100] bg-canvas overflow-y-auto p-5 pb-24 md:relative md:inset-auto md:w-auto md:h-auto md:bg-transparent md:p-6 md:pb-6 flex flex-col gap-4 border border-charcoal bg-darkiron/20">
                  <span className="block font-mono text-[10px] text-purewhite tracking-wider border-b border-charcoal pb-2">
                    DEPLOY NEW ENTRY
                  </span>
                  
                  {activeTab === "experience" && (
                    <LogoUploader 
                      logoUrl={editForm.logoUrl}
                      onChange={url => setEditForm({ ...editForm, logoUrl: url })}
                    />
                  )}

                  {activeTab === "stack" ? (
                    <>
                      {/* Top-level Title input */}
                      <div>
                        <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                        <input 
                          type="text" 
                          placeholder="PROGRAMMING & DATABASES"
                          value={editForm.title || ""} 
                          onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                        />
                      </div>

                      {/* Description textarea */}
                      <div>
                        <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION</label>
                        <textarea 
                          placeholder="Core languages and relational datastores."
                          value={editForm.description || ""} 
                          onChange={e => setEditForm({ ...editForm, description: e.target.value, body: e.target.value })}
                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-20 focus:outline-none focus:border-accent font-sans resize-y"
                        />
                      </div>

                      {/* Dynamic Tools array editor */}
                      <div className="border border-charcoal p-4 bg-canvas/30">
                        <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">
                          TOOLS & ICONS
                        </span>
                        <div className="flex flex-col gap-2">
                          {(editForm.tools || []).map((tool, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-3 items-center border border-charcoal p-3 bg-canvas/10 mb-2">
                              {/* Tool Name */}
                              <div className="flex-1 w-full">
                                <label className="block font-mono text-[8px] text-ash mb-0.5">TOOL NAME</label>
                                <input
                                  type="text"
                                  placeholder="E.g., PYTHON"
                                  value={tool.name || ""}
                                  onChange={e => handleUpdateTool(idx, "name", e.target.value.toUpperCase())}
                                  className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-sans"
                                />
                              </div>
                              {/* Icon Name */}
                              <div className="flex-1 w-full">
                                <label className="block font-mono text-[8px] text-ash mb-0.5">ICON CLASS (OR TextFallback)</label>
                                <input
                                  type="text"
                                  placeholder="E.g., SiPython"
                                  value={tool.iconName || ""}
                                  onChange={e => handleUpdateTool(idx, "iconName", e.target.value)}
                                  className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                                />
                              </div>
                              {/* Color */}
                              <div className="w-full md:w-32 flex gap-1 items-end">
                                <div className="flex-1">
                                  <label className="block font-mono text-[8px] text-ash mb-0.5">COLOR (HEX)</label>
                                  <input
                                    type="text"
                                    placeholder="#FFFFFF"
                                    value={tool.color || ""}
                                    onChange={e => handleUpdateTool(idx, "color", e.target.value)}
                                    className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                                  />
                                </div>
                                <input
                                  type="color"
                                  value={tool.color && tool.color.startsWith("#") ? tool.color : "#FFFFFF"}
                                  onChange={e => handleUpdateTool(idx, "color", e.target.value.toUpperCase())}
                                  className="w-12 h-[48px] border border-charcoal cursor-pointer bg-transparent p-0 rounded-none shrink-0"
                                />
                              </div>
                              {/* Remove Button */}
                              <div className="w-full md:w-auto self-end md:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTool(idx)}
                                  className="w-full md:w-auto px-4 py-3 border border-charcoal hover:border-red-500 hover:text-red-500 font-mono text-xs text-ash transition-colors rounded-none min-h-[48px] flex items-center justify-center"
                                >
                                  [X]
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={handleAddTool}
                          className="mt-3 w-full py-3.5 border border-dashed border-charcoal hover:border-accent hover:text-accent font-mono text-xs text-ash transition-colors rounded-none min-h-[48px] flex items-center justify-center"
                        >
                          [+ ADD TOOL]
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                          <input 
                            type="text" 
                            placeholder={activeTab === "experience" ? "Open Source Contributor" : "PROJECT ALPHA V2"}
                            value={editForm.title || ""} 
                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                          />
                        </div>
                        <div className="w-full sm:w-32">
                          <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                          <input 
                            type="text" 
                            placeholder={activeTab === "experience" ? "Jun 2026 - Aug 2026" : "JUL 2025"}
                            value={editForm.date || ""} 
                            onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                          <input 
                            type="text" 
                            placeholder={activeTab === "experience" ? "git, github" : "rust, wasm, compiler"}
                            value={tagsInput} 
                            onChange={e => setTagsInput(e.target.value)}
                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                          />
                        </div>
                      </div>

                      {activeTab === "experience" ? (
                        <>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">COMPANY</label>
                              <input 
                                type="text" 
                                placeholder="Elite Coders"
                                value={editForm.company || ""} 
                                onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">JOB TYPE</label>
                              <input 
                                type="text" 
                                placeholder="Apprenticeship"
                                value={editForm.type || ""} 
                                onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">DURATION</label>
                              <input 
                                type="text" 
                                placeholder="3 mos"
                                value={editForm.duration || ""} 
                                onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">LOCATION</label>
                              <input 
                                type="text" 
                                placeholder="Bengaluru, Karnataka, India"
                                value={editForm.location || ""} 
                                onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION (ONE BULLET PER LINE)</label>
                            <textarea 
                              placeholder="Selected as a Contributor...&#10;Contributing to production-grade software..."
                              value={Array.isArray(editForm.description) ? editForm.description.join("\n") : (editForm.description || "")} 
                              onChange={e => {
                                const lines = e.target.value.split("\n");
                                setEditForm({ ...editForm, description: lines });
                              }}
                              className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">CATEGORY</label>
                              <input 
                                type="text" 
                                placeholder="@SYSTEMS"
                                value={editForm.category || ""} 
                                onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                              />
                            </div>
                            <div className="flex items-end pb-1.5">
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  id="newIsPinned"
                                  checked={!!editForm.isPinned}
                                  onChange={e => setEditForm({ ...editForm, isPinned: e.target.checked })}
                                  className="accent-accent"
                                />
                                <label htmlFor="newIsPinned" className="font-mono text-[9px] text-ash cursor-pointer uppercase select-none">
                                  📌 PINNED FLAGSHIP
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block font-mono text-[9px] text-ash mb-1">BODY TEXT</label>
                            <textarea 
                              placeholder="Describe what you built, the problem it solves, and what you learned..."
                              value={editForm.body || ""} 
                              onChange={e => setEditForm({ ...editForm, body: e.target.value })}
                              className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                            />
                          </div>

                          <div className="border border-charcoal p-4 bg-canvas/50">
                            <div className="flex items-center gap-2 mb-3">
                              <input 
                                type="checkbox" 
                                id="newIncludeSnippet"
                                checked={!!(editForm.codeSnippet && editForm.codeSnippet.content)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setEditForm({
                                      ...editForm,
                                      codeSnippet: { title: "", lang: "", content: "" }
                                    });
                                  } else {
                                    setEditForm({
                                      ...editForm,
                                      codeSnippet: undefined
                                    });
                                  }
                                }}
                                className="accent-accent"
                              />
                              <label htmlFor="newIncludeSnippet" className="font-mono text-[9px] text-ash cursor-pointer uppercase select-none">
                                EXPOSE EMBEDDED CODE SNIPPET
                              </label>
                            </div>

                            {editForm.codeSnippet && (
                              <div className="flex flex-col gap-3 pl-4 border-l border-charcoal/55 mt-2">
                                <div className="flex gap-4">
                                  <div className="flex-1">
                                    <label className="block font-mono text-[8px] text-ash mb-1">FILE NAME</label>
                                    <input 
                                      type="text" 
                                      placeholder="File name (e.g. main.rs)"
                                      value={editForm.codeSnippet.title || ""} 
                                      onChange={e => {
                                        if (!editForm || !editForm.codeSnippet) return;
                                        setEditForm({ 
                                          ...editForm, 
                                          codeSnippet: {
                                            ...editForm.codeSnippet,
                                            title: e.target.value
                                          }
                                        });
                                      }}
                                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                    />
                                  </div>
                                  <div className="w-32">
                                    <label className="block font-mono text-[8px] text-ash mb-1">LANGUAGE</label>
                                    <input 
                                      type="text" 
                                      placeholder="Language"
                                      value={editForm.codeSnippet.lang || ""} 
                                      onChange={e => {
                                        if (!editForm || !editForm.codeSnippet) return;
                                        setEditForm({ 
                                          ...editForm, 
                                          codeSnippet: {
                                            ...editForm.codeSnippet,
                                            lang: e.target.value.toUpperCase()
                                          }
                                        });
                                      }}
                                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block font-mono text-[8px] text-ash mb-1">CODE CONTENT</label>
                                  <textarea 
                                    placeholder="Code content"
                                    value={editForm.codeSnippet.content || ""} 
                                    onChange={e => {
                                       if (!editForm || !editForm.codeSnippet) return;
                                       setEditForm({ 
                                         ...editForm, 
                                         codeSnippet: {
                                           ...editForm.codeSnippet,
                                           content: e.target.value
                                         }
                                       });
                                    }}
                                    className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none h-20 focus:outline-none font-mono resize-y"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">LIVE LINK</label>
                              <input 
                                type="text" 
                                placeholder="https://your-project.vercel.app"
                                value={editForm.liveUrl || ""} 
                                onChange={e => setEditForm({ ...editForm, liveUrl: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none font-sans"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">CODE LINK</label>
                              <input 
                                type="text" 
                                placeholder="https://github.com/you/repo"
                                value={editForm.codeUrl || ""} 
                                onChange={e => setEditForm({ ...editForm, codeUrl: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Screenshots Section (Both share it!) */}
                  {activeTab !== "stack" && (
                    <div className="border-t border-charcoal/30 pt-4 mt-2">
                      <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">SCREENSHOTS</span>
                      <ScreenshotEditor
                        screenshots={editForm.screenshots ?? []}
                        onChange={(shots) => setEditForm({ ...editForm, screenshots: shots })}
                      />
                    </div>
                  )}

                  <div className="fixed bottom-0 left-0 right-0 border-t border-charcoal bg-canvas p-4 flex gap-3 justify-between items-center w-full z-10 pb-[calc(16px+env(safe-area-inset-bottom))] md:relative md:bottom-auto md:left-auto md:right-auto md:border-t-0 md:bg-transparent md:p-0 md:pb-0 md:justify-end">
                    <button 
                      onClick={() => setIsAddingNew(false)}
                      className="flex-1 md:flex-none px-4 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
                    >
                      CANCEL
                    </button>
                    <button 
                      onClick={handleSaveNewEntry}
                      className="flex-1 md:flex-none px-4 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
                    >
                      SAVE NEW ENTRY
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col gap-4 py-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="border-b border-charcoal py-8 flex flex-col md:flex-row gap-4 md:gap-8 animate-pulse select-none">
                    <div className="md:w-32 flex-shrink-0">
                      <div className="h-4 bg-charcoal/40 w-16 mb-2"></div>
                      <div className="h-3 bg-charcoal/40 w-24"></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="h-5 bg-charcoal/40 w-2/3"></div>
                      <div className="h-4 bg-charcoal/40 w-full"></div>
                      <div className="h-4 bg-charcoal/40 w-5/6"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="h-3 bg-charcoal/40 w-12"></div>
                        <div className="h-3 bg-charcoal/40 w-16"></div>
                        <div className="h-3 bg-charcoal/40 w-10"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (!tabData || tabData.length === 0) ? (
              <div className="border border-charcoal p-12 text-center select-none font-mono flex flex-col items-center justify-center gap-4 my-8">
                <span className="text-[10px] text-ash uppercase tracking-[0.2em]">NO ENTRIES YET</span>
                {adminMode && (
                  <button
                    onClick={handleStartNewEntry}
                    className="px-4 py-2 border border-charcoal text-[9px] text-purewhite uppercase tracking-widest hover:border-accent hover:text-accent bg-transparent transition-all duration-150 active:scale-95 min-h-[44px]"
                  >
                    + CREATE FIRST ENTRY
                  </button>
                )}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex flex-col"
                >
                  {[...tabData].sort((a, b) => {
                    if (a.isPinned && !b.isPinned) return -1;
                    if (!a.isPinned && b.isPinned) return 1;
                    return 0;
                  }).map((post, index) => {
                    const isEditing = editingId === post.id;
                    const hasUserAppreciated = userAppreciated[post.id] || false;
                    const appCount = appreciations[post.id] ?? 0;

                    if (isEditing && editForm) {
                      return (
                        <div key={post.id} className="py-0 border-b-0 md:py-10 md:border-b md:border-charcoal">
                          <div className="fixed inset-0 w-full h-[100dvh] z-[100] bg-canvas overflow-y-auto p-5 pb-28 md:relative md:inset-auto md:w-auto md:h-auto md:bg-transparent md:p-6 md:pb-6 flex flex-col gap-4 border border-charcoal bg-darkiron/20">
                            <span className="block font-mono text-[10px] text-purewhite tracking-wider border-b border-charcoal pb-2">
                              EDIT ENTRY: {post.title}
                            </span>
                            
                            {activeTab === "experience" && (
                              <LogoUploader 
                                logoUrl={editForm.logoUrl}
                                onChange={url => setEditForm({ ...editForm, logoUrl: url })}
                              />
                            )}

                            {activeTab === "stack" ? (
                              <>
                                {/* Top-level Title input */}
                                <div>
                                  <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                                  <input 
                                    type="text" 
                                    value={editForm.title || ""} 
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                  />
                                </div>

                                {/* Description textarea */}
                                <div>
                                  <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION</label>
                                  <textarea 
                                    placeholder="Core languages and relational datastores."
                                    value={editForm.description || ""} 
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value, body: e.target.value })}
                                    className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-20 focus:outline-none focus:border-accent font-sans resize-y"
                                  />
                                </div>

                                {/* Dynamic Tools array editor */}
                                <div className="border border-charcoal p-4 bg-canvas/30">
                                  <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">
                                    TOOLS & ICONS
                                  </span>
                                  <div className="flex flex-col gap-2">
                                    {(editForm.tools || []).map((tool, idx) => (
                                      <div key={idx} className="flex flex-col md:flex-row gap-3 items-center border border-charcoal p-3 bg-canvas/10 mb-2">
                                        {/* Tool Name */}
                                        <div className="flex-1 w-full">
                                          <label className="block font-mono text-[8px] text-ash mb-0.5">TOOL NAME</label>
                                          <input
                                            type="text"
                                            placeholder="E.g., PYTHON"
                                            value={tool.name || ""}
                                            onChange={e => handleUpdateTool(idx, "name", e.target.value.toUpperCase())}
                                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-sans"
                                          />
                                        </div>
                                        {/* Icon Name */}
                                        <div className="flex-1 w-full">
                                          <label className="block font-mono text-[8px] text-ash mb-0.5">ICON CLASS (OR TextFallback)</label>
                                          <input
                                            type="text"
                                            placeholder="E.g., SiPython"
                                            value={tool.iconName || ""}
                                            onChange={e => handleUpdateTool(idx, "iconName", e.target.value)}
                                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                                          />
                                        </div>
                                        {/* Color */}
                                        <div className="w-full md:w-32 flex gap-1 items-end">
                                          <div className="flex-1">
                                            <label className="block font-mono text-[8px] text-ash mb-0.5">COLOR (HEX)</label>
                                            <input
                                              type="text"
                                              placeholder="#FFFFFF"
                                              value={tool.color || ""}
                                              onChange={e => handleUpdateTool(idx, "color", e.target.value)}
                                              className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                                            />
                                          </div>
                                          <input
                                            type="color"
                                            value={tool.color && tool.color.startsWith("#") ? tool.color : "#FFFFFF"}
                                            onChange={e => handleUpdateTool(idx, "color", e.target.value.toUpperCase())}
                                            className="w-12 h-[48px] border border-charcoal cursor-pointer bg-transparent p-0 rounded-none shrink-0"
                                          />
                                        </div>
                                        {/* Remove Button */}
                                        <div className="w-full md:w-auto self-end md:self-center">
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveTool(idx)}
                                            className="w-full md:w-auto px-4 py-3 border border-charcoal hover:border-red-500 hover:text-red-500 font-mono text-xs text-ash transition-colors rounded-none min-h-[48px] flex items-center justify-center"
                                          >
                                            [X]
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleAddTool}
                                    className="mt-3 w-full py-3.5 border border-dashed border-charcoal hover:border-accent hover:text-accent font-mono text-xs text-ash transition-colors rounded-none min-h-[48px] flex items-center justify-center"
                                  >
                                    [+ ADD TOOL]
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex flex-col sm:flex-row gap-4">
                                  <div className="flex-1">
                                    <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                                    <input 
                                      type="text" 
                                      value={editForm.title || ""} 
                                      onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                    />
                                  </div>
                                  <div className="w-full sm:w-32">
                                    <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                                    <input 
                                      type="text" 
                                      value={editForm.date || ""} 
                                      onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                                    <input 
                                      type="text" 
                                      value={tagsInput} 
                                      onChange={e => setTagsInput(e.target.value)}
                                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                    />
                                  </div>
                                </div>

                                {activeTab === "experience" ? (
                                  <>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">COMPANY</label>
                                        <input 
                                          type="text" 
                                          placeholder="Elite Coders"
                                          value={editForm.company || ""} 
                                          onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">JOB TYPE</label>
                                        <input 
                                          type="text" 
                                          placeholder="Apprenticeship"
                                          value={editForm.type || ""} 
                                          onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">DURATION</label>
                                        <input 
                                          type="text" 
                                          placeholder="3 mos"
                                          value={editForm.duration || ""} 
                                          onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">LOCATION</label>
                                        <input 
                                          type="text" 
                                          placeholder="Bengaluru, Karnataka, India"
                                          value={editForm.location || ""} 
                                          onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION (ONE BULLET PER LINE)</label>
                                      <textarea 
                                        placeholder="Selected as a Contributor...&#10;Contributing to production-grade software..."
                                        value={Array.isArray(editForm.description) ? editForm.description.join("\n") : (editForm.description || "")} 
                                        onChange={e => {
                                          const lines = e.target.value.split("\n");
                                          setEditForm({ ...editForm, description: lines });
                                        }}
                                        className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">CATEGORY</label>
                                        <input 
                                          type="text" 
                                          value={editForm.category || ""} 
                                          onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                        />
                                      </div>
                                      <div className="flex items-end pb-1.5">
                                        <div className="flex items-center gap-2">
                                          <input 
                                            type="checkbox" 
                                            id="editIsPinned"
                                            checked={!!editForm.isPinned}
                                            onChange={e => setEditForm({ ...editForm, isPinned: e.target.checked })}
                                            className="accent-accent"
                                          />
                                          <label htmlFor="editIsPinned" className="font-mono text-[9px] text-ash cursor-pointer uppercase select-none">
                                            📌 PINNED FLAGSHIP
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block font-mono text-[9px] text-ash mb-1">BODY TEXT</label>
                                      <textarea 
                                        placeholder="Describe what you built, the problem it solves, and what you learned..."
                                        value={editForm.body || ""} 
                                        onChange={e => setEditForm({ ...editForm, body: e.target.value })}
                                        className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                                      />
                                    </div>

                                    <div className="border border-charcoal p-4 bg-canvas/50">
                                      <div className="flex items-center gap-2 mb-3">
                                        <input 
                                          type="checkbox" 
                                          id="editIncludeSnippet"
                                          checked={!!(editForm.codeSnippet && editForm.codeSnippet.content)}
                                          onChange={e => {
                                            if (e.target.checked) {
                                              setEditForm({
                                                ...editForm,
                                                codeSnippet: { title: "", lang: "", content: "" }
                                              });
                                            } else {
                                              setEditForm({
                                                ...editForm,
                                                codeSnippet: undefined
                                              });
                                            }
                                          }}
                                          className="accent-accent"
                                        />
                                        <label htmlFor="editIncludeSnippet" className="font-mono text-[9px] text-ash cursor-pointer uppercase select-none">
                                          EXPOSE EMBEDDED CODE SNIPPET
                                        </label>
                                      </div>

                                      {editForm.codeSnippet && (
                                        <div className="flex flex-col gap-3 pl-4 border-l border-charcoal/55 mt-2">
                                          <div className="flex gap-4">
                                            <div className="flex-1">
                                              <label className="block font-mono text-[8px] text-ash mb-1">FILE NAME</label>
                                              <input 
                                                type="text" 
                                                placeholder="File name (e.g. main.rs)"
                                                value={editForm.codeSnippet.title || ""} 
                                                onChange={e => {
                                                  if (!editForm || !editForm.codeSnippet) return;
                                                  setEditForm({ 
                                                    ...editForm, 
                                                    codeSnippet: {
                                                      ...editForm.codeSnippet,
                                                      title: e.target.value
                                                    }
                                                  });
                                                }}
                                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                              />
                                            </div>
                                            <div className="w-32">
                                              <label className="block font-mono text-[8px] text-ash mb-1">LANGUAGE</label>
                                              <input 
                                                type="text" 
                                                placeholder="Language"
                                                value={editForm.codeSnippet.lang || ""} 
                                                onChange={e => {
                                                  if (!editForm || !editForm.codeSnippet) return;
                                                  setEditForm({ 
                                                    ...editForm, 
                                                    codeSnippet: {
                                                      ...editForm.codeSnippet,
                                                      lang: e.target.value.toUpperCase()
                                                    }
                                                  });
                                                }}
                                                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <label className="block font-mono text-[8px] text-ash mb-1">CODE CONTENT</label>
                                            <textarea 
                                              placeholder="Code content"
                                              value={editForm.codeSnippet.content || ""} 
                                              onChange={e => {
                                                 if (!editForm || !editForm.codeSnippet) return;
                                                 setEditForm({ 
                                                   ...editForm, 
                                                   codeSnippet: {
                                                     ...editForm.codeSnippet,
                                                     content: e.target.value
                                                   }
                                                 });
                                              }}
                                              className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none h-20 focus:outline-none font-mono resize-y"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">LIVE LINK</label>
                                        <input 
                                          type="text" 
                                          value={editForm.liveUrl || ""} 
                                          onChange={e => setEditForm({ ...editForm, liveUrl: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-sans"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">CODE LINK</label>
                                        <input 
                                          type="text" 
                                          value={editForm.codeUrl || ""} 
                                          onChange={e => setEditForm({ ...editForm, codeUrl: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}

                            {/* Screenshots Section (Both share it!) */}
                            {activeTab !== "stack" && (
                              <div className="border-t border-charcoal/30 pt-4 mt-2">
                                <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">SCREENSHOTS</span>
                                <ScreenshotEditor
                                  screenshots={editForm.screenshots ?? []}
                                  onChange={(shots) => setEditForm({ ...editForm, screenshots: shots })}
                                />
                              </div>
                            )}

                            <div className="fixed bottom-0 left-0 right-0 border-t border-charcoal bg-canvas p-4 flex flex-col sm:flex-row gap-3 justify-between items-center w-full z-10 pb-[calc(16px+env(safe-area-inset-bottom))] md:relative md:bottom-auto md:left-auto md:right-auto md:border-t-0 md:bg-transparent md:p-0 md:pb-0">
                              <div className="w-full sm:w-auto">
                                {confirmDeleteId === post.id ? (
                                  <div className="flex items-center justify-between sm:justify-start gap-2 border border-red-500/50 bg-red-500/10 p-2 w-full sm:w-auto">
                                    <span className="font-mono text-[9px] text-red-500 uppercase tracking-wider">DELETE ENTRY?</span>
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => handleDeleteEntry(post.id)}
                                        className="px-3 py-1.5 bg-red-500 text-canvas font-mono font-bold text-[9px] hover:bg-red-600 transition-colors rounded-none min-h-[36px]"
                                      >
                                        YES
                                      </button>
                                      <button 
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-3 py-1.5 border border-charcoal font-mono text-[9px] text-ash hover:text-purewhite transition-colors rounded-none min-h-[36px]"
                                      >
                                        CANCEL
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => setConfirmDeleteId(post.id)}
                                    className="w-full sm:w-auto px-4 py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-canvas font-mono text-xs transition-colors rounded-none min-h-[48px]"
                                  >
                                    DELETE ENTRY
                                  </button>
                                )}
                              </div>
                              <div className="flex gap-3 w-full sm:w-auto justify-end">
                                <button 
                                  onClick={handleCancelEdit}
                                  className="flex-1 sm:flex-none px-4 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
                                >
                                  CANCEL
                                </button>
                                <button 
                                  onClick={handleSaveEdit}
                                  className="flex-1 sm:flex-none px-4 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
                                >
                                  SAVE CHANGES
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (activeTab === "stack") {
                      return (
                        <motion.div
                          key={post.id} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="border-b border-charcoal py-8 md:py-10 flex flex-col gap-4 rounded-none group relative"
                        >
                          {/* Inline Admin Edit Button */}
                          {adminMode && (
                            <div className="absolute top-8 right-0 hidden group-hover:flex items-center gap-1.5 z-10">
                              <button
                                onClick={() => handleStartEdit(post)}
                                className="border border-accent bg-canvas px-3 py-1 font-mono text-[9px] text-purewhite hover:bg-accent hover:text-canvas transition-all duration-150 uppercase tracking-widest rounded-none min-h-[30px]"
                              >
                                EDIT
                              </button>
                            </div>
                          )}

                          <div>
                            <h3 className="font-sans font-extrabold text-xl md:text-2xl text-purewhite uppercase tracking-tight mb-2">
                              {post.title}
                            </h3>
                            <p className="text-[13px] sm:text-[14px] text-ash leading-relaxed font-sans font-medium">
                              {post.description || post.body}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-4">
                            {(post.tools || []).map((tool) => (
                              <StackIconBox 
                                key={tool.name} 
                                name={tool.name} 
                                iconName={tool.iconName} 
                                color={tool.color} 
                              />
                            ))}
                          </div>
                        </motion.div>
                      );
                    }

                    if (activeTab === "experience") {
                      const hasUserAppreciated = userAppreciated[post.id] || false;
                      const appCount = appreciations[post.id] ?? 0;

                      return (
                        <motion.article 
                          key={post.id} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="border-b border-charcoal py-6 md:py-10 hover:bg-darkiron/20 transition-all duration-150 flex flex-col rounded-none group relative"
                        >
                          {/* Inline Admin Edit & Pin Buttons */}
                          {adminMode && (
                            <div className="absolute top-8 right-0 hidden group-hover:flex items-center gap-1.5 z-10">
                              <button
                                onClick={() => handleTogglePin(post)}
                                className={`border px-2.5 py-1 transition-all duration-150 rounded-none flex items-center justify-center min-h-[30px] ${
                                  post.isPinned 
                                    ? "border-accent bg-accent text-canvas" 
                                    : "border-charcoal bg-canvas text-ash hover:border-accent hover:text-accent"
                                }`}
                                title={post.isPinned ? "Unpin item" : "Pin item to top"}
                              >
                                <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
                              </button>
                              <button
                                onClick={() => handleStartEdit(post)}
                                className="border border-accent bg-canvas px-3 py-1 font-mono text-[9px] text-purewhite hover:bg-accent hover:text-canvas transition-all duration-150 uppercase tracking-widest rounded-none min-h-[30px]"
                              >
                                EDIT
                              </button>
                            </div>
                          )}

                          {/* Pinned Flag */}
                          {post.isPinned && (
                            <div className="flex items-center gap-1.5 text-ash font-mono text-[9px] uppercase tracking-widest mb-3">
                              <Pin className="w-3 h-3 text-accent fill-current rotate-[45deg]" />
                              <span>PINNED FLAGSHIP</span>
                            </div>
                          )}

                          {/* CARD HEADER LAYOUT */}
                          <div className="flex flex-row gap-4 items-start mb-2">
                            {/* LEFT: Company Logo box */}
                            <div className="w-12 h-12 md:w-14 md:h-14 border border-[var(--border)] rounded-md overflow-hidden bg-white flex-shrink-0 relative">
                              {post.logoUrl ? (
                                <Image 
                                  src={post.logoUrl} 
                                  alt={`${post.company || "Company"} logo`}
                                  fill
                                  sizes="(max-width: 768px) 48px, 56px"
                                  className="object-contain p-1 bg-white"
                                />
                              ) : (
                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center font-bold text-ash text-lg uppercase font-sans">
                                  {post.company?.charAt(0) || "E"}
                                </div>
                              )}
                            </div>

                            {/* RIGHT: Job Details (stack vertically) */}
                            <div className="flex-1 flex flex-col min-w-0">
                              <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text)] leading-snug">
                                {post.title}
                              </h3>
                              <div className="text-sm text-[var(--muted)] mt-0.5">
                                {post.company}{post.type ? ` · ${post.type}` : ""}
                              </div>
                              <div className="text-xs font-mono text-[var(--muted)] mt-1 uppercase">
                                {post.date}{post.duration ? ` · ${post.duration}` : ""}
                              </div>
                              {post.location && (
                                <div className="text-xs font-mono text-[var(--muted)] mt-0.5">
                                  {post.location}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* CARD BODY */}
                          {post.description && Array.isArray(post.description) && (
                            <ul className="list-disc list-outside pl-4 space-y-2 mt-4 mb-4">
                              {post.description.map((bullet, idx) => (
                                <li key={idx} className="text-sm text-[var(--muted)] leading-relaxed font-sans font-medium">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Screenshots Section */}
                          {post.screenshots && post.screenshots.length > 0 && (
                            <div className="mt-4 mb-4 overflow-hidden select-none">
                              {post.screenshots.length === 1 ? (
                                <AdaptiveSingleImage
                                  src={post.screenshots[0].src}
                                  alt={post.screenshots[0].alt}
                                  onClick={() => {
                                    setScreenshotList(post.screenshots || []);
                                    setScreenshotIndex(0);
                                    setSelectedScreenshot(post.screenshots![0]);
                                  }}
                                />
                              ) : post.screenshots.length === 2 ? (
                                <div className="grid grid-cols-2 gap-1">
                                  {post.screenshots.map((img, idx) => (
                                    <div 
                                      key={img.src}
                                      onClick={() => {
                                        setScreenshotList(post.screenshots || []);
                                        setScreenshotIndex(idx);
                                        setSelectedScreenshot(img);
                                      }}
                                      className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                                    >
                                      <ImageWithFallback 
                                        src={img.src} 
                                        alt={img.alt} 
                                        fill
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-350 group-hover:scale-105"
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1">
                                  {post.screenshots.map((img, idx) => (
                                    <div 
                                      key={img.src}
                                      onClick={() => {
                                        setScreenshotList(post.screenshots || []);
                                        setScreenshotIndex(idx);
                                        setSelectedScreenshot(img);
                                      }}
                                      className="relative flex-none w-[80%] md:w-[70%] aspect-video snap-center cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                                    >
                                      <ImageWithFallback 
                                        src={img.src} 
                                        alt={img.alt} 
                                        fill
                                        loading="lazy"
                                        className="object-cover group-hover:brightness-110 transition-all duration-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              {post.screenshots.length === 1 && post.screenshots[0].caption && (
                                <div className="border-t border-charcoal/40 bg-darkiron/10 px-3 py-1.5 font-mono text-[9px] text-ash">
                                  {post.screenshots[0].caption}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Tags Row */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-2 mb-4 select-none">
                              {post.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="flex-none font-mono text-[10px] tracking-wider uppercase border border-charcoal px-2 py-1 text-ash rounded-none bg-canvas hover:border-accent hover:text-accent transition-colors duration-150"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer with Like Button only */}
                          <div className="flex items-center justify-end border-t border-charcoal/30 pt-4 mt-1 text-ash">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => handleAppreciate(post.id)}
                                disabled={hasUserAppreciated}
                                className={`flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-150 hover:scale-105 min-h-[44px] ${
                                  hasUserAppreciated ? "text-accent cursor-not-allowed" : "text-ash hover:text-accent"
                                }`}
                              >
                                <Heart className={`w-3.5 h-3.5 ${hasUserAppreciated ? "fill-current" : ""}`} strokeWidth={1.5} />
                                <span>{appCount}</span>
                              </button>
                            </div>
                          </div>
                        </motion.article>
                      );
                    }

                    const isExpanded = expandedCards[post.id] || false;
                    const bodyText = post.body || "";
                    const shouldTruncate = bodyText.split("\n").length > 4 || bodyText.length > 300;

                    return (
                      <motion.article 
                        key={post.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="border-b border-charcoal py-6 md:py-10 hover:bg-darkiron/20 transition-all duration-150 flex flex-col md:flex-row gap-2 md:gap-8 rounded-none group relative"
                      >
                        {/* Inline Admin Edit & Pin Buttons */}
                        {adminMode && (
                          <div className="absolute top-8 right-0 hidden group-hover:flex items-center gap-1.5 z-10">
                            <button
                              onClick={() => handleTogglePin(post)}
                              className={`border px-2.5 py-1 transition-all duration-150 rounded-none flex items-center justify-center min-h-[30px] ${
                                post.isPinned 
                                  ? "border-accent bg-accent text-canvas" 
                                  : "border-charcoal bg-canvas text-ash hover:border-accent hover:text-accent"
                              }`}
                              title={post.isPinned ? "Unpin item" : "Pin item to top"}
                            >
                              <Pin className={`w-3 h-3 ${post.isPinned ? "fill-current" : ""} rotate-[45deg]`} />
                            </button>
                            <button
                              onClick={() => handleStartEdit(post)}
                              className="border border-accent bg-canvas px-3 py-1 font-mono text-[9px] text-purewhite hover:bg-accent hover:text-canvas transition-all duration-150 uppercase tracking-widest rounded-none min-h-[30px]"
                            >
                              EDIT
                            </button>
                          </div>
                        )}

                        {/* Top: Monospace timestamp — inline on mobile, left column on desktop */}
                        <div className="font-mono text-[10px] text-ash uppercase tracking-widest md:w-24 md:flex-shrink-0 md:pt-1 mb-1 md:mb-0">
                          {post.date}
                        </div>

                        {/* Right side: Content */}
                        <div className="flex-1 flex flex-col min-w-0">
                          
                          {/* Pinned Flag */}
                          {post.isPinned && (
                            <div className="flex items-center gap-1.5 text-ash font-mono text-[9px] uppercase tracking-widest mb-2">
                              <Pin className="w-3 h-3 text-accent fill-current rotate-[45deg]" />
                              <span>PINNED FLAGSHIP</span>
                            </div>
                          )}

                          {/* Title & Category Row */}
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                            <h3 
                              className="font-sans font-extrabold text-xl md:text-2xl text-purewhite uppercase tracking-tight leading-tight line-clamp-2"
                              title={post.title || "UNTITLED"}
                            >
                              {post.title || "UNTITLED"}
                            </h3>
                            <span className="font-mono text-[10px] text-ash uppercase tracking-widest">
                              {post.category}
                            </span>
                          </div>

                          {/* Description */}
                          <div className="relative">
                            <p className={`text-[13px] sm:text-[14px] text-ash leading-relaxed mb-1 whitespace-pre-line font-sans font-medium ${
                              isExpanded ? "" : "line-clamp-4"
                            }`}>
                              {post.body || "NO DESCRIPTION PROVIDED"}
                            </p>
                            {shouldTruncate && (
                              <button
                                onClick={() => setExpandedCards(prev => ({ ...prev, [post.id]: !isExpanded }))}
                                className="text-[9px] font-mono text-accent hover:underline uppercase tracking-widest mt-1 mb-3 block min-h-[24px]"
                              >
                                {isExpanded ? "READ LESS ▲" : "READ MORE ▼"}
                              </button>
                            )}
                          </div>

                          {/* Screenshots grid / carousel */}
                          {post.screenshots && post.screenshots.length > 0 && (
                            <div className="mt-4 mb-4 overflow-hidden select-none">
                              {post.screenshots.length === 1 ? (
                                <AdaptiveSingleImage
                                  src={post.screenshots[0].src}
                                  alt={post.screenshots[0].alt}
                                  onClick={() => {
                                    setScreenshotList(post.screenshots || []);
                                    setScreenshotIndex(0);
                                    setSelectedScreenshot(post.screenshots![0]);
                                  }}
                                />
                              ) : post.screenshots.length === 2 ? (
                                <div className="grid grid-cols-2 gap-1">
                                  {post.screenshots.map((img, idx) => (
                                    <div 
                                      key={img.src}
                                      onClick={() => {
                                        setScreenshotList(post.screenshots || []);
                                        setScreenshotIndex(idx);
                                        setSelectedScreenshot(img);
                                      }}
                                      className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                                    >
                                      <ImageWithFallback 
                                        src={img.src} 
                                        alt={img.alt} 
                                        fill
                                        loading="lazy"
                                        className="object-cover group-hover:brightness-110 transition-all duration-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-1">
                                  {post.screenshots.map((img, idx) => (
                                    <div 
                                      key={img.src}
                                      onClick={() => {
                                        setScreenshotList(post.screenshots || []);
                                        setScreenshotIndex(idx);
                                        setSelectedScreenshot(img);
                                      }}
                                      className="relative flex-none w-[80%] md:w-[70%] aspect-video snap-center cursor-zoom-in group overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                                    >
                                      <ImageWithFallback 
                                        src={img.src} 
                                        alt={img.alt} 
                                        fill
                                        loading="lazy"
                                        className="object-cover group-hover:brightness-110 transition-all duration-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              {post.screenshots.length === 1 && post.screenshots[0].caption && (
                                <div className="border-t border-charcoal/40 bg-darkiron/10 px-3 py-1.5 font-mono text-[9px] text-ash">
                                  {post.screenshots[0].caption}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Embedded Code Snippet */}
                          {post.codeSnippet && post.codeSnippet.content && post.codeSnippet.content.trim() !== "" && (
                            <div className="border border-charcoal bg-canvas rounded-none mb-4 overflow-hidden font-mono text-[11px] transition-colors duration-150">
                              <div className="border-b border-charcoal bg-darkiron px-3 py-1.5 flex justify-between items-center text-[9px] text-ash uppercase tracking-wider">
                                <span>{post.codeSnippet.title}</span>
                                <span>{post.codeSnippet.lang}</span>
                              </div>
                              <pre className="p-3 overflow-x-auto"><code className="text-purewhite">{post.codeSnippet.content}</code></pre>
                            </div>
                          )}

                          {/* Tags Row (Micro Labels) */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-4 py-1 select-none">
                              {post.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="flex-none font-mono text-[10px] tracking-wider uppercase border border-charcoal px-2 py-1 text-ash rounded-none bg-canvas hover:border-accent hover:text-accent transition-colors duration-150"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer Links & Stars */}
                          <div className="flex items-center justify-between border-t border-charcoal/30 pt-4 mt-1 text-ash">
                            <div className="flex gap-4">
                              {post.liveUrl && post.liveUrl.trim() !== "" && (
                                <a 
                                  href={post.liveUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center gap-1 text-[11px] font-mono hover:text-accent transition-colors duration-150 uppercase tracking-widest min-h-[44px]"
                                >
                                  <span>Live ↗</span>
                                </a>
                              )}
                              {post.codeUrl && post.codeUrl.trim() !== "" && (
                                <a 
                                  href={post.codeUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center gap-1 text-[11px] font-mono hover:text-accent transition-colors duration-150 uppercase tracking-widest min-h-[44px]"
                                >
                                  <span>Code ⌘</span>
                                </a>
                              )}
                            </div>

                            {/* Interactions row */}
                            <div className="flex items-center gap-4">
                              {/* Appreciation Like Button */}
                              {activeTab !== "stack" && (
                                <button 
                                  onClick={() => handleAppreciate(post.id)}
                                  disabled={hasUserAppreciated}
                                  className={`flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-150 hover:scale-105 min-h-[44px] ${
                                    hasUserAppreciated ? "text-accent cursor-not-allowed" : "text-ash hover:text-accent"
                                  }`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${hasUserAppreciated ? "fill-current" : ""}`} strokeWidth={1.5} />
                                  <span>{appCount}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      </ErrorBoundary>
      </div>

      <ErrorBoundary title="SYSTEM UTILITIES">
      {/* ==========================================
         FLOATING ADMIN CONTROLS
         ========================================== */}
      {adminMode && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-40 flex flex-col gap-2 items-stretch md:items-end px-4 pb-4 md:p-0">
          {hasUnsavedChanges && (
            <div className="bg-amber-500/10 border border-amber-500 p-3 font-mono text-[9px] text-amber-400 tracking-widest uppercase select-none shadow-lg text-center md:text-left leading-relaxed">
              ⚠ CHANGES UNSAVED IN CLOUD<br />
              <span className="text-amber-300">CLICK EXPORT JSON TO COMMIT</span>
            </div>
          )}
          <button
            onClick={handleExportJSON}
            className={`border px-4 py-3 font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-150 shadow-lg rounded-none min-h-[44px] ${
              hasUnsavedChanges
                ? "bg-amber-500 text-canvas border-amber-500 hover:bg-amber-400"
                : "bg-purewhite text-canvas border-purewhite hover:bg-accent hover:text-canvas"
            }`}
          >
            EXPORT {activeTab.toUpperCase()} JSON
          </button>
          <div className="bg-canvas border border-purewhite p-3 font-mono text-[10px] text-purewhite tracking-widest uppercase select-none shadow-lg text-center md:text-left">
            ● ADMIN MODE ACTIVE
          </div>
        </div>
      )}

      {/* ==========================================
         ADMIN MODAL (Ctrl + Shift + E)
         ========================================== */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-canvas/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="w-full max-w-[360px] bg-canvas border border-charcoal p-6 rounded-none flex flex-col gap-6"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] text-ash uppercase tracking-widest">SYSTEM SECURITY</span>
                <h3 className="font-sans font-extrabold text-2xl uppercase tracking-tight">
                  {adminMode ? "DISCONNECT ADMIN" : "ADMIN GATEWAY"}
                </h3>
              </div>

              {adminMode ? (
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-xs text-ash leading-relaxed">
                    You are authenticated. Deactivating will lock writing permissions to JSON config files.
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowAdminModal(false)}
                      className="flex-1 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
                    >
                      CLOSE
                    </button>
                    <button 
                      onClick={handleAdminLogout}
                      className="flex-1 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
                    >
                      LOGOUT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-ash uppercase tracking-widest">ACCESS KEY</label>
                    <input 
                      type="password"
                      placeholder="ENTER KEY..."
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      className="w-full bg-canvas border border-charcoal p-3 text-base md:text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono uppercase tracking-widest placeholder:text-ash/30 min-h-[48px]"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowAdminModal(false)}
                      className="flex-1 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
                    >
                      AUTHORIZE
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
         COMMAND PALETTE (⌘K / Ctrl+K) — lazy loaded
         ========================================== */}
      {openCommandPalette && (
        <CommandPalette
          open={openCommandPalette}
          onClose={() => setOpenCommandPalette(false)}
          onSelectTab={(tab) => { setActiveTab(tab); setIsAddingNew(false); setEditingId(null); }}
          onCopyEmail={handleCopyEmail}
          onOpenAdmin={() => setShowAdminModal(true)}
        />
      )}

      {/* ==========================================
         LIGHTBOX MODAL
         ========================================== */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScreenshot(null)}
            className="fixed inset-0 z-[200] bg-black/97 flex flex-col items-center justify-center select-none"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as HTMLElement).dataset.touchStartX = String(touch.clientX);
            }}
            onTouchEnd={(e) => {
              const startX = Number((e.currentTarget as HTMLElement).dataset.touchStartX);
              const endX = e.changedTouches[0].clientX;
              const delta = endX - startX;
              if (Math.abs(delta) < 40) return; // too small, ignore
              if (delta < 0) {
                // Swipe left → next
                setScreenshotIndex(prev => {
                  const nextIndex = prev < screenshotList.length - 1 ? prev + 1 : 0;
                  setSelectedScreenshot(screenshotList[nextIndex]);
                  return nextIndex;
                });
              } else {
                // Swipe right → prev
                setScreenshotIndex(prev => {
                  const nextIndex = prev > 0 ? prev - 1 : screenshotList.length - 1;
                  setSelectedScreenshot(screenshotList[nextIndex]);
                  return nextIndex;
                });
              }
            }}
          >
            {/* Close button — always visible top-right */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedScreenshot(null); }}
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
                      setScreenshotIndex(prev => {
                        const nextIndex = prev > 0 ? prev - 1 : screenshotList.length - 1;
                        setSelectedScreenshot(screenshotList[nextIndex]);
                        return nextIndex;
                      });
                    }}
                    className="hover:text-accent p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ◀ PREV
                  </button>
                  <span className="text-ash">{screenshotIndex + 1} / {screenshotList.length}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setScreenshotIndex(prev => {
                        const nextIndex = prev < screenshotList.length - 1 ? prev + 1 : 0;
                        setSelectedScreenshot(screenshotList[nextIndex]);
                        return nextIndex;
                      });
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
      </ErrorBoundary>

      {/* Global Toast Provider */}
      <Toaster position="bottom-center" />
    </main>
  );
}
