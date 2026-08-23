/**
 * SETUP CHECKLIST:
 * 1. Packages installed: @upstash/redis, cmdk, sonner, js-cookie, next-themes
 * 2. Setup your .env.local file with these variables:
 *    - NEXT_PUBLIC_ADMIN_PASSWORD=yourpassword (defaults to "admin123" if empty)
 *    - UPSTASH_REDIS_REST_URL=https://...
 *    - UPSTASH_REDIS_REST_TOKEN=...
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Link2, 
  Pin,
  Plus,
  Heart
} from "lucide-react";

import Image from "next/image";

// Inline brand icon SVGs to avoid dependency versions issues with brand icons
const ImageWithFallback = ({ src, alt, ...props }: React.ComponentProps<typeof Image>) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className="w-full h-full bg-darkiron border border-charcoal flex flex-col items-center justify-center font-mono text-[9px] text-ash select-none p-4 text-center">
        <span>IMAGE UNAVAILABLE</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
import { Command } from "cmdk";
import { useTheme } from "next-themes";

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

const TABS = [
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "stack", label: "STACK" }
];

export default function PortfolioSplitPane() {
  const [activeTab, setActiveTab] = useState<string>("projects");
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
        if (e.key === "1") { setActiveTab("projects"); e.preventDefault(); }
        if (e.key === "2") { setActiveTab("experience"); e.preventDefault(); }
        if (e.key === "3") { setActiveTab("stack"); e.preventDefault(); }
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
    navigator.clipboard.writeText("john.doe@johndoe.dev");
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
    const updated = tabData.map(item => item.id === editingId ? editForm : item);
    setTabData(updated);
    setEditingId(null);
    
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
      screenshots: []
    });
  };

  const handleSaveNewEntry = async () => {
    if (!editForm) return;
    const updated = [editForm, ...tabData];
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
            <div className="w-16 h-16 md:w-24 md:h-24 border border-charcoal bg-darkiron rounded-none flex items-center justify-center select-none flex-shrink-0 group">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12 text-ash group-hover:text-accent transition-colors duration-300">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="4"/>
                <polygon points="50,22 80,38 80,62 50,78 20,62 20,38" fill="currentColor"/>
              </svg>
            </div>

            {/* Display Name — fluid clamp size */}
            <div className="flex flex-col">
              <h1 className="hero-name font-sans font-extrabold tracking-tighter uppercase text-purewhite">
                JOHN DOE
              </h1>
              <span className="font-mono text-xs text-ash uppercase tracking-widest mt-1">
                @johndoe
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-base text-ash leading-relaxed font-sans font-medium">
              Systems developer interested in high-performance compilers, custom memory runtimes, and speculative inference serving layers. Wielding compilers like tools, breaking hardware limits.
            </p>

            {/* CTA Buttons — full width, touch-friendly */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleCopyEmail}
                className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[44px]"
              >
                EMAIL ME
              </button>
              <button className="w-full text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 min-h-[44px]">
                VIEW RESUME
              </button>
            </div>

            {/* Social Media Icons — larger on mobile for tapping */}
            <div className="flex gap-6 items-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Meta Links */}
            <div className="flex flex-col gap-3 font-mono text-[10px] text-ash uppercase tracking-widest">
              <div className="flex items-center gap-2 py-1">
                <MapPin className="w-3.5 h-3.5 text-charcoal flex-shrink-0" strokeWidth={1.5} />
                <span>SAN FRANCISCO, CA</span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <GraduationCap className="w-3.5 h-3.5 text-charcoal flex-shrink-0" strokeWidth={1.5} />
                <span>STANFORD UNIVERSITY</span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <Calendar className="w-3.5 h-3.5 text-charcoal flex-shrink-0" strokeWidth={1.5} />
                <span>JOINED OCT 2023</span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <Link2 className="w-3.5 h-3.5 text-charcoal flex-shrink-0" strokeWidth={1.5} />
                <span
                  className="text-purewhite hover:underline cursor-pointer normal-case transition-colors duration-150"
                  onClick={handleCopyEmail}
                >
                  john.doe@johndoe.dev
                </span>
              </div>
            </div>
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

            <div className="bg-darkiron border border-charcoal p-4 md:p-5 rounded-none flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-accent animate-pulse"></div>
                <span className="font-mono text-[9px] text-ash uppercase tracking-widest">RECRUITING STATUS</span>
              </div>
              <p className="font-sans text-xs text-ash leading-relaxed">
                Open to Software Engineering internships and full-time systems roles.
              </p>
            </div>
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
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                      <input 
                        type="text" 
                        placeholder="PROJECT ALPHA V2"
                        value={editForm.title || ""} 
                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                      />
                    </div>
                    <div className="w-full sm:w-32">
                      <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                      <input 
                        type="text" 
                        placeholder="JUL 2025"
                        value={editForm.date || ""} 
                        onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>

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
                    <div className="flex-1">
                      <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                      <input 
                        type="text" 
                        placeholder="rust, wasm, compiler"
                        value={editForm.tags ? editForm.tags.join(", ") : ""} 
                        onChange={e => setEditForm({ ...editForm, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
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

                  {/* Screenshots Section — drag-and-drop */}
                  <div className="border-t border-charcoal/30 pt-4 mt-2">
                    <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">SCREENSHOTS</span>
                    <ScreenshotEditor
                      screenshots={editForm.screenshots ?? []}
                      onChange={(shots) => setEditForm({ ...editForm, screenshots: shots })}
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
                            
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                                <input 
                                  type="text" 
                                  value={editForm.title || ""} 
                                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                  className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                                />
                              </div>
                              <div className="w-32">
                                <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                                <input 
                                  type="text" 
                                  value={editForm.date || ""} 
                                  onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                  className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                />
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block font-mono text-[9px] text-ash mb-1">CATEGORY</label>
                                <input 
                                  type="text" 
                                  value={editForm.category || ""} 
                                  onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                  className="w-full bg-canvas border border-charcoal p-2 text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                                <input 
                                  type="text" 
                                  value={editForm.tags ? editForm.tags.join(", ") : ""} 
                                  onChange={e => setEditForm({ ...editForm, tags: e.target.value.split(",").map(t => t.trim()) })}
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

                            {/* Screenshots Section — drag-and-drop */}
                            <div className="border-t border-charcoal/30 pt-4 mt-2">
                              <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">SCREENSHOTS</span>
                              <ScreenshotEditor
                                screenshots={editForm.screenshots ?? []}
                                onChange={(shots) => setEditForm({ ...editForm, screenshots: shots })}
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
                            <div className="mt-4 mb-4 border border-charcoal overflow-hidden select-none">
                              {post.screenshots.length === 1 ? (
                                <div 
                                  onClick={() => {
                                    setScreenshotList(post.screenshots || []);
                                    setScreenshotIndex(0);
                                    setSelectedScreenshot(post.screenshots![0]);
                                  }}
                                  className="relative w-full aspect-video cursor-zoom-in group overflow-hidden"
                                >
                                  <ImageWithFallback 
                                    src={post.screenshots[0].src} 
                                    alt={post.screenshots[0].alt} 
                                    fill
                                    loading="lazy"
                                    className="object-cover group-hover:brightness-110 transition-all duration-300"
                                  />
                                </div>
                              ) : post.screenshots.length === 2 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-charcoal">
                                  {post.screenshots.map((img, idx) => (
                                    <div 
                                      key={img.src}
                                      onClick={() => {
                                        setScreenshotList(post.screenshots || []);
                                        setScreenshotIndex(idx);
                                        setSelectedScreenshot(img);
                                      }}
                                      className="relative aspect-video cursor-zoom-in group overflow-hidden"
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
                                <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-charcoal gap-[1px]">
                                  {post.screenshots.map((img, idx) => (
                                    <div 
                                      key={img.src}
                                      onClick={() => {
                                        setScreenshotList(post.screenshots || []);
                                        setScreenshotIndex(idx);
                                        setSelectedScreenshot(img);
                                      }}
                                      className="relative flex-none w-[80%] md:w-[70%] aspect-video snap-center cursor-zoom-in group overflow-hidden border-r border-charcoal/50 last:border-r-0"
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
         COMMAND PALETTE (⌘K / Ctrl+K)
         ========================================== */}
      <Command.Dialog
        open={openCommandPalette}
        onOpenChange={setOpenCommandPalette}
        label="Global Command Palette"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-canvas/80 backdrop-blur-sm"
      >
        <div className="w-full max-w-[95vw] md:max-w-[500px] bg-canvas border border-charcoal rounded-none overflow-hidden flex flex-col shadow-2xl">
          <Command.Input
            placeholder="SEARCH OR JUMP TO..."
            className="w-full bg-canvas text-purewhite border-b border-charcoal px-4 py-4 font-mono text-base md:text-xs focus:outline-none uppercase tracking-[0.2em] placeholder:text-ash/40"
          />
          <Command.List className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
            <Command.Empty className="p-4 font-mono text-[10px] text-ash uppercase tracking-widest text-center">No results found.</Command.Empty>
            
            <Command.Group heading="NAVIGATION" className="font-mono text-[9px] text-ash/50 uppercase tracking-[0.2em] px-3 pt-3 pb-1">
              <Command.Item onSelect={() => { setActiveTab("projects"); setOpenCommandPalette(false); }} className="flex justify-between items-center px-3 py-2.5 hover:bg-darkiron/50 cursor-pointer font-mono text-[11px] text-purewhite uppercase tracking-wider transition-colors duration-150 rounded-none aria-selected:bg-darkiron">
                <span>PROJECTS</span>
                <span className="text-[9px] text-ash/60 font-mono">ALT+1</span>
              </Command.Item>
              <Command.Item onSelect={() => { setActiveTab("experience"); setOpenCommandPalette(false); }} className="flex justify-between items-center px-3 py-2.5 hover:bg-darkiron/50 cursor-pointer font-mono text-[11px] text-purewhite uppercase tracking-wider transition-colors duration-150 rounded-none aria-selected:bg-darkiron">
                <span>EXPERIENCE</span>
                <span className="text-[9px] text-ash/60 font-mono">ALT+2</span>
              </Command.Item>
              <Command.Item onSelect={() => { setActiveTab("stack"); setOpenCommandPalette(false); }} className="flex justify-between items-center px-3 py-2.5 hover:bg-darkiron/50 cursor-pointer font-mono text-[11px] text-purewhite uppercase tracking-wider transition-colors duration-150 rounded-none aria-selected:bg-darkiron">
                <span>STACK</span>
                <span className="text-[9px] text-ash/60 font-mono">ALT+3</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="SYSTEM ACTIONS" className="font-mono text-[9px] text-ash/50 uppercase tracking-[0.2em] px-3 pt-3 pb-1 border-t border-charcoal/30 mt-2">
              <Command.Item onSelect={() => { handleCopyEmail(); setOpenCommandPalette(false); }} className="flex justify-between items-center px-3 py-2.5 hover:bg-darkiron/50 cursor-pointer font-mono text-[11px] text-purewhite uppercase tracking-wider transition-colors duration-150 rounded-none aria-selected:bg-darkiron">
                <span>COPY EMAIL</span>
                <span className="text-[9px] text-ash/60 font-mono">CTRL+K</span>
              </Command.Item>
              <Command.Item onSelect={() => { setShowAdminModal(true); setOpenCommandPalette(false); }} className="flex justify-between items-center px-3 py-2.5 hover:bg-darkiron/50 cursor-pointer font-mono text-[11px] text-purewhite uppercase tracking-wider transition-colors duration-150 rounded-none aria-selected:bg-darkiron">
                <span>ADMIN ACCESS GATE</span>
                <span className="text-[9px] text-ash/60 font-mono">CTRL+SHIFT+E</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>

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
