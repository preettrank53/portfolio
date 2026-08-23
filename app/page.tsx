/**
 * SETUP CHECKLIST:
 * 1. Packages installed: @upstash/redis, cmdk, sonner, js-cookie, next-themes
 * 2. Setup your .env.local file with these variables:
 *    - NEXT_PUBLIC_ADMIN_PASSWORD=yourpassword (defaults to "admin123" if empty)
 *    - UPSTASH_REDIS_REST_URL=https://...
 *    - UPSTASH_REDIS_REST_TOKEN=...
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Pin,
  Plus,
  Heart
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
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const objectFitClass =
    aspectRatio && aspectRatio >= 1.3 && aspectRatio <= 1.8
      ? "object-cover"
      : "object-contain";

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
        onLoadingComplete={(img) => {
          if (img.naturalWidth && img.naturalHeight) {
            setAspectRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
        className={`w-full h-auto max-h-[380px] md:max-h-[520px] transition-all duration-300 group-hover:brightness-110 ${objectFitClass}`}
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
  SiGooglecolab
};

const StackIconBox = ({ name, iconName, color }: { name: string; iconName: string; color: string }) => {
  const IconComponent = iconName !== "TextFallback" ? IconMapping[iconName] : undefined;

  return (
    <div className="group relative flex h-12 w-12 md:h-14 md:w-auto max-w-[48px] md:max-w-[56px] md:hover:max-w-[200px] items-center overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text)] transition-[max-width] duration-300 ease-out rounded-none cursor-pointer z-10 hover:z-20 select-none">
      <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center">
        {IconComponent ? (
          <IconComponent className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-105" style={{ color }} />
        ) : (
          <span className="font-mono text-sm font-bold text-[var(--text)] uppercase">
            {name.slice(0, 3)}
          </span>
        )}
      </div>
      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[var(--text)] opacity-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[120px] ml-0 group-hover:ml-1 pr-0 group-hover:pr-3">
        {name}
      </span>
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
  loginAdmin, 
  logoutAdmin, 
  isAdmin, 
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
  };
  tags?: string[];
  liveUrl?: string;
  codeUrl?: string;
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
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
    <div className="flex flex-col gap-2">
      <label className="block font-mono text-[9px] text-ash uppercase tracking-widest">COMPANY LOGO</label>
      <div className="flex items-center gap-4">
        {logoUrl ? (
          <div className="w-24 h-24 bg-white border border-[var(--border)] rounded-none relative flex items-center justify-center p-1 group">
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
            className={`w-24 h-24 border border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors duration-150 select-none bg-canvas/30
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
            <span className="font-mono text-[9px] text-ash font-bold tracking-widest text-center">DROP LOGO</span>
            <span className="font-mono text-[7px] text-ash/40 mt-1 uppercase text-center">OR CLICK</span>
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
  
  // Theme Switching
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Appreciations and Github Stars
  const [appreciations, setAppreciations] = useState<Record<string, number>>({});
  const [userAppreciated, setUserAppreciated] = useState<Record<string, boolean>>({});

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<DevLogItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

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

    // Check if admin is already logged in
    const checkAdmin = async () => {
      const active = await isAdmin();
      setAdminMode(active);
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
      } catch (error) {
        console.error("Failed to load dev data:", error);
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

  // Admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginAdmin(adminPassword);
    if (res.success) {
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
  };

  // Admin logout
  const handleAdminLogout = async () => {
    await logoutAdmin();
    setAdminMode(false);
    setShowAdminModal(false);
    toast("ADMIN DISCONNECTED", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
    });
  };

  // Inline edit initialize
  const handleStartEdit = (item: DevLogItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
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

    const updated = tabData.map(item => item.id === editingId ? finalForm : item);
    setTabData(updated);
    setEditingId(null);
    setEditForm(null);
    
    const res = await saveDevData(activeTab, updated);
    if (res.success) {
      toast("CHANGES COMMITTED SUCCESSFULLY", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
      });
    } else {
      toast("WRITE ERROR", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
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
      date: "",
      category: "",
      title: "",
      body: "",
      tags: [],
      screenshots: [],
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
  };

  const handleSaveNewEntry = async () => {
    if (!editForm) return;

    const finalForm = { ...editForm };
    if (activeTab === "experience" && Array.isArray(finalForm.description)) {
      finalForm.description = finalForm.description
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    const updated = [finalForm, ...tabData];
    setTabData(updated);
    setIsAddingNew(false);
    setEditForm(null);

    const res = await saveDevData(activeTab, updated);
    if (res.success) {
      toast("NEW RECORD DEPLOYED", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
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

  // Export JSON locally (Client-side)
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tabData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeTab}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast("EXPORTED JSON CONFIG", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
    });
  };

  return (
    <main className="min-h-screen bg-canvas text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500">
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Centered container flexbox grid */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row w-full relative">
        
        {/* ==========================================
           LEFT COLUMN: IDENTITY PANE (Sticky screen height on desktop, block on mobile)
           ========================================== */}
        <ErrorBoundary title="IDENTITY PANE">
          <aside className="w-full md:w-[35%] md:sticky md:top-0 md:h-screen flex flex-col justify-between py-8 md:py-12 px-6 md:pr-12 md:px-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b md:border-b-0 md:border-r border-charcoal select-none">
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
              <h1 className="font-sans font-extrabold tracking-tighter uppercase text-purewhite whitespace-nowrap text-2xl sm:text-3xl lg:text-3xl">
                PREET RANK
              </h1>
              <span className="font-mono text-xs text-ash uppercase tracking-widest mt-1">
                @preettrank
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-base text-ash leading-relaxed font-sans font-medium">
              21, figuring out code, AI/ML & LLMs.<br />
              currently learning LLM inference, looking for an internship.
            </p>

            {/* CTA Buttons — full width, touch-friendly */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href="mailto:preetrank53@gmail.com"
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                EMAIL ME
              </a>
              <a
                href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                VIEW RESUME
              </a>
            </div>

            {/* Social Media Icons — larger on mobile for tapping */}
            <div className="flex gap-6 items-center">
              <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/preettrank" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <SiX className="w-[18px] h-[18px]" />
              </a>
              <a href="https://www.linkedin.com/in/preetrank/" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/preettrank/" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* GitHub Activity Chart */}
          <div className="mt-6">
            <GitHubActivity />
          </div>

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


          </div>
        </aside>
      </ErrorBoundary>

      {/* ==========================================
         RIGHT COLUMN: DEV LOGBOOK FEED (Scrollable window-level, standard px padding)
         ========================================== */}
      <ErrorBoundary title="LOGBOOK FEED">
        <section className="w-full md:w-[65%] min-h-screen flex flex-col relative px-4 md:px-8">
          
          {/* Sticky Header (Flush to Top pixel 0) */}
          <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur border-b border-charcoal pt-5 pb-3 md:pt-8 md:pb-4 flex justify-between items-center select-none transition-colors duration-500">
            <h2 className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-ash uppercase flex-shrink-0">
              CHANGELOG // {activeTab}
            </h2>
            
            <div className="flex gap-4 md:gap-6 font-mono text-xs md:text-sm tracking-widest text-ash uppercase overflow-x-auto hide-scrollbar ml-4 flex-shrink-0">
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
                        className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </header>

          {/* Dev Logbook Feed Content */}
          <div className="flex flex-col">
            
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
              <div className="py-8 border-b border-charcoal">
                <div className="border border-charcoal p-6 flex flex-col gap-4 bg-darkiron/20">
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
                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                        />
                      </div>

                      {/* Description textarea */}
                      <div>
                        <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION</label>
                        <textarea 
                          placeholder="Core languages and relational datastores."
                          value={editForm.description || ""} 
                          onChange={e => setEditForm({ ...editForm, description: e.target.value, body: e.target.value })}
                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none h-20 focus:outline-none focus:border-accent font-sans resize-y"
                        />
                      </div>

                      {/* Dynamic Tools array editor */}
                      <div className="border border-charcoal p-4 bg-canvas/30">
                        <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">
                          TOOLS & ICONS
                        </span>
                        <div className="flex flex-col gap-2">
                          {(editForm.tools || []).map((tool, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-2 items-center border border-charcoal/50 p-2 bg-canvas/10">
                              {/* Tool Name */}
                              <div className="flex-1 w-full">
                                <label className="block font-mono text-[8px] text-ash mb-0.5">TOOL NAME</label>
                                <input
                                  type="text"
                                  placeholder="E.g., PYTHON"
                                  value={tool.name || ""}
                                  onChange={e => handleUpdateTool(idx, "name", e.target.value.toUpperCase())}
                                  className="w-full bg-canvas border border-charcoal p-1.5 text-xs text-purewhite rounded-none focus:outline-none font-sans"
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
                                  className="w-full bg-canvas border border-charcoal p-1.5 text-xs text-purewhite rounded-none focus:outline-none font-mono"
                                />
                              </div>
                              {/* Color */}
                              <div className="w-full sm:w-28 flex gap-1 items-end">
                                <div className="flex-1">
                                  <label className="block font-mono text-[8px] text-ash mb-0.5">COLOR (HEX)</label>
                                  <input
                                    type="text"
                                    placeholder="#FFFFFF"
                                    value={tool.color || ""}
                                    onChange={e => handleUpdateTool(idx, "color", e.target.value)}
                                    className="w-full bg-canvas border border-charcoal p-1.5 text-xs text-purewhite rounded-none focus:outline-none font-mono"
                                  />
                                </div>
                                <input
                                  type="color"
                                  value={tool.color && tool.color.startsWith("#") ? tool.color : "#FFFFFF"}
                                  onChange={e => handleUpdateTool(idx, "color", e.target.value.toUpperCase())}
                                  className="w-8 h-[29px] border border-charcoal cursor-pointer bg-transparent p-0 rounded-none shrink-0"
                                />
                              </div>
                              {/* Remove Button */}
                              <div className="w-full sm:w-auto self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTool(idx)}
                                  className="w-full sm:w-auto px-2 py-1.5 border border-charcoal hover:border-red-500 hover:text-red-500 font-mono text-[10px] text-ash transition-colors rounded-none min-h-[30px]"
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
                          className="mt-3 w-full py-2 border border-dashed border-charcoal hover:border-accent hover:text-accent font-mono text-[10px] text-ash transition-colors rounded-none min-h-[36px]"
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
                            className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                          />
                        </div>
                        <div className="w-full sm:w-32">
                          <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                          <input 
                            type="text" 
                            placeholder={activeTab === "experience" ? "Jun 2026 - Aug 2026" : "JUL 2025"}
                            value={editForm.date || ""} 
                            onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                            className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                          <input 
                            type="text" 
                            placeholder={activeTab === "experience" ? "git, github" : "rust, wasm, compiler"}
                            value={editForm.tags ? editForm.tags.join(", ") : ""} 
                            onChange={e => setEditForm({ ...editForm, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                            className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
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
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">JOB TYPE</label>
                              <input 
                                type="text" 
                                placeholder="Apprenticeship"
                                value={editForm.type || ""} 
                                onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
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
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">LOCATION</label>
                              <input 
                                type="text" 
                                placeholder="Bengaluru, Karnataka, India"
                                value={editForm.location || ""} 
                                onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
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
                              className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
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
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-mono text-[9px] text-ash mb-1">BODY TEXT</label>
                            <textarea 
                              placeholder="Describe what you built, the problem it solves, and what you learned..."
                              value={editForm.body || ""} 
                              onChange={e => setEditForm({ ...editForm, body: e.target.value })}
                              className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                            />
                          </div>

                          <div className="border border-charcoal p-4 bg-canvas/50">
                            <span className="block font-mono text-[9px] text-ash mb-2">CODE SNIPPET (OPTIONAL)</span>
                            <div className="flex gap-4 mb-2">
                              <div className="flex-1">
                                <input 
                                  type="text" 
                                  placeholder="File name (e.g. main.rs)"
                                  value={editForm.codeSnippet?.title || ""} 
                                  onChange={e => {
                                    if (!editForm) return;
                                    setEditForm({ 
                                      ...editForm, 
                                      codeSnippet: {
                                        title: e.target.value,
                                        lang: editForm.codeSnippet?.lang || "",
                                        content: editForm.codeSnippet?.content || ""
                                      }
                                    });
                                  }}
                                  className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite rounded-none focus:outline-none"
                                />
                              </div>
                              <div className="w-32">
                                <input 
                                  type="text" 
                                  placeholder="Language"
                                  value={editForm.codeSnippet?.lang || ""} 
                                  onChange={e => {
                                    if (!editForm) return;
                                    setEditForm({ 
                                      ...editForm, 
                                      codeSnippet: {
                                        title: editForm.codeSnippet?.title || "",
                                        lang: e.target.value,
                                        content: editForm.codeSnippet?.content || ""
                                      }
                                    });
                                  }}
                                  className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite rounded-none focus:outline-none"
                                />
                              </div>
                            </div>
                            <textarea 
                              placeholder="Code content"
                              value={editForm.codeSnippet?.content || ""} 
                              onChange={e => {
                                 if (!editForm) return;
                                 setEditForm({ 
                                   ...editForm, 
                                   codeSnippet: {
                                     title: editForm.codeSnippet?.title || "",
                                     lang: editForm.codeSnippet?.lang || "",
                                     content: e.target.value
                                   }
                                 });
                              }}
                              className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite rounded-none h-20 focus:outline-none font-mono"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">LIVE LINK</label>
                              <input 
                                type="text" 
                                placeholder="https://your-project.vercel.app"
                                value={editForm.liveUrl || ""} 
                                onChange={e => setEditForm({ ...editForm, liveUrl: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none font-sans"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block font-mono text-[9px] text-ash mb-1">CODE LINK</label>
                              <input 
                                type="text" 
                                placeholder="https://github.com/you/repo"
                                value={editForm.codeUrl || ""} 
                                onChange={e => setEditForm({ ...editForm, codeUrl: e.target.value })}
                                className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none font-mono"
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

                  <div className="flex gap-3 justify-end pt-2">
                    <button 
                      onClick={() => setIsAddingNew(false)}
                      className="px-4 py-2 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[44px]"
                    >
                      CANCEL
                    </button>
                    <button 
                      onClick={handleSaveNewEntry}
                      className="px-4 py-2 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[44px]"
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
                        <div key={post.id} className="border-b border-charcoal py-10">
                          <div className="border border-charcoal p-6 flex flex-col gap-4 bg-darkiron/20">
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
                                    className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                  />
                                </div>

                                {/* Description textarea */}
                                <div>
                                  <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION</label>
                                  <textarea 
                                    placeholder="Core languages and relational datastores."
                                    value={editForm.description || ""} 
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value, body: e.target.value })}
                                    className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none h-20 focus:outline-none focus:border-accent font-sans resize-y"
                                  />
                                </div>

                                {/* Dynamic Tools array editor */}
                                <div className="border border-charcoal p-4 bg-canvas/30">
                                  <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">
                                    TOOLS & ICONS
                                  </span>
                                  <div className="flex flex-col gap-2">
                                    {(editForm.tools || []).map((tool, idx) => (
                                      <div key={idx} className="flex flex-col sm:flex-row gap-2 items-center border border-charcoal/50 p-2 bg-canvas/10">
                                        {/* Tool Name */}
                                        <div className="flex-1 w-full">
                                          <label className="block font-mono text-[8px] text-ash mb-0.5">TOOL NAME</label>
                                          <input
                                            type="text"
                                            placeholder="E.g., PYTHON"
                                            value={tool.name || ""}
                                            onChange={e => handleUpdateTool(idx, "name", e.target.value.toUpperCase())}
                                            className="w-full bg-canvas border border-charcoal p-1.5 text-xs text-purewhite rounded-none focus:outline-none font-sans"
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
                                            className="w-full bg-canvas border border-charcoal p-1.5 text-xs text-purewhite rounded-none focus:outline-none font-mono"
                                          />
                                        </div>
                                        {/* Color */}
                                        <div className="w-full sm:w-28 flex gap-1 items-end">
                                          <div className="flex-1">
                                            <label className="block font-mono text-[8px] text-ash mb-0.5">COLOR (HEX)</label>
                                            <input
                                              type="text"
                                              placeholder="#FFFFFF"
                                              value={tool.color || ""}
                                              onChange={e => handleUpdateTool(idx, "color", e.target.value)}
                                              className="w-full bg-canvas border border-charcoal p-1.5 text-xs text-purewhite rounded-none focus:outline-none font-mono"
                                            />
                                          </div>
                                          <input
                                            type="color"
                                            value={tool.color && tool.color.startsWith("#") ? tool.color : "#FFFFFF"}
                                            onChange={e => handleUpdateTool(idx, "color", e.target.value.toUpperCase())}
                                            className="w-8 h-[29px] border border-charcoal cursor-pointer bg-transparent p-0 rounded-none shrink-0"
                                          />
                                        </div>
                                        {/* Remove Button */}
                                        <div className="w-full sm:w-auto self-end sm:self-center">
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveTool(idx)}
                                            className="w-full sm:w-auto px-2 py-1.5 border border-charcoal hover:border-red-500 hover:text-red-500 font-mono text-[10px] text-ash transition-colors rounded-none min-h-[30px]"
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
                                    className="mt-3 w-full py-2 border border-dashed border-charcoal hover:border-accent hover:text-accent font-mono text-[10px] text-ash transition-colors rounded-none min-h-[36px]"
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
                                      className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                    />
                                  </div>
                                  <div className="w-full sm:w-32">
                                    <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                                    <input 
                                      type="text" 
                                      value={editForm.date || ""} 
                                      onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                      className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                                    <input 
                                      type="text" 
                                      value={editForm.tags ? editForm.tags.join(", ") : ""} 
                                      onChange={e => setEditForm({ ...editForm, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                                      className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
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
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">JOB TYPE</label>
                                        <input 
                                          type="text" 
                                          placeholder="Apprenticeship"
                                          value={editForm.type || ""} 
                                          onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
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
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">LOCATION</label>
                                        <input 
                                          type="text" 
                                          placeholder="Bengaluru, Karnataka, India"
                                          value={editForm.location || ""} 
                                          onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
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
                                        className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
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
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block font-mono text-[9px] text-ash mb-1">BODY TEXT</label>
                                      <textarea 
                                        placeholder="Describe what you built, the problem it solves, and what you learned..."
                                        value={editForm.body || ""} 
                                        onChange={e => setEditForm({ ...editForm, body: e.target.value })}
                                        className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                                      />
                                    </div>

                                    <div className="border border-charcoal p-4 bg-canvas/50">
                                      <span className="block font-mono text-[9px] text-ash mb-2">CODE SNIPPET (OPTIONAL)</span>
                                      <div className="flex gap-4 mb-2">
                                        <div className="flex-1">
                                          <input 
                                            type="text" 
                                            placeholder="File name (e.g. main.rs)"
                                            value={editForm.codeSnippet?.title || ""} 
                                            onChange={e => {
                                              if (!editForm) return;
                                              setEditForm({ 
                                                ...editForm, 
                                                codeSnippet: {
                                                  title: e.target.value,
                                                  lang: editForm.codeSnippet?.lang || "",
                                                  content: editForm.codeSnippet?.content || ""
                                                }
                                              });
                                            }}
                                            className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite rounded-none focus:outline-none"
                                          />
                                        </div>
                                        <div className="w-32">
                                          <input 
                                            type="text" 
                                            placeholder="Language"
                                            value={editForm.codeSnippet?.lang || ""} 
                                            onChange={e => {
                                              if (!editForm) return;
                                              setEditForm({ 
                                                ...editForm, 
                                                codeSnippet: {
                                                  title: editForm.codeSnippet?.title || "",
                                                  lang: e.target.value,
                                                  content: editForm.codeSnippet?.content || ""
                                                }
                                              });
                                            }}
                                            className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite rounded-none focus:outline-none"
                                          />
                                        </div>
                                      </div>
                                      <textarea 
                                        placeholder="Code content"
                                        value={editForm.codeSnippet?.content || ""} 
                                        onChange={e => {
                                          if (!editForm) return;
                                          setEditForm({ 
                                            ...editForm, 
                                            codeSnippet: {
                                              title: editForm.codeSnippet?.title || "",
                                              lang: editForm.codeSnippet?.lang || "",
                                              content: e.target.value
                                            }
                                          });
                                        }}
                                        className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite rounded-none h-20 focus:outline-none font-mono"
                                      />
                                    </div>

                                    <div className="flex gap-4">
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">LIVE LINK</label>
                                        <input 
                                          type="text" 
                                          value={editForm.liveUrl || ""} 
                                          onChange={e => setEditForm({ ...editForm, liveUrl: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none font-sans"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block font-mono text-[9px] text-ash mb-1">CODE LINK</label>
                                        <input 
                                          type="text" 
                                          value={editForm.codeUrl || ""} 
                                          onChange={e => setEditForm({ ...editForm, codeUrl: e.target.value })}
                                          className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none font-mono"
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

                            <div className="flex gap-3 justify-end pt-2">
                              <button 
                                onClick={handleCancelEdit}
                                className="px-4 py-2 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[44px]"
                              >
                                CANCEL
                              </button>
                              <button 
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[44px]"
                              >
                                SAVE CHANGES
                              </button>
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
                          {post.codeSnippet && (
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
                              {post.liveUrl && (
                                <a 
                                  href={post.liveUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center gap-1 text-[11px] font-mono hover:text-accent transition-colors duration-150 uppercase tracking-widest min-h-[44px]"
                                >
                                  <span>Live ↗</span>
                                </a>
                              )}
                              {post.codeUrl && (
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
          <button
            onClick={handleExportJSON}
            className="bg-purewhite text-canvas border border-purewhite px-4 py-3 font-mono text-[10px] text-canvas font-bold tracking-widest uppercase hover:bg-accent hover:text-canvas transition-all duration-150 shadow-lg rounded-none min-h-[44px]"
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
                      className="flex-1 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none"
                    >
                      CLOSE
                    </button>
                    <button 
                      onClick={handleAdminLogout}
                      className="flex-1 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none"
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
                      className="w-full bg-canvas border border-charcoal p-3 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono uppercase tracking-widest placeholder:text-ash/30"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowAdminModal(false)}
                      className="flex-1 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none"
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
