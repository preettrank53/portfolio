/**
 * SETUP: Copy .env.example to .env.local and fill in your credentials.
 * See README.md for full setup instructions.
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Plus
} from "lucide-react";

import type { DevLogItem, GitHubPR } from "@/types/portfolio";
import Link from "next/link";
import { LightboxModal } from "@/components/shared/LightboxModal";


import { GitHubActivity } from "@/app/GitHubActivity";

import { IdentityPane } from "@/components/identity/IdentityPane";
import { FeedShell } from "@/components/feed/FeedShell";
import { ExperienceCard } from "@/components/feed/ExperienceCard";
import { ProjectCard } from "@/components/feed/ProjectCard";
import { StackSection } from "@/components/feed/StackSection";
import { AdminEditorForm } from "@/components/admin/AdminEditorForm";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { PRLogo } from "@/components/identity/PRLogo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Footer } from "@/components/shared/Footer";
import { CommandTrigger, CommandFloatingButton, CommandMenu } from "@/components/shared/CommandMenu";



import { 
  ExperienceCardSkeleton, 
  ProjectCardSkeleton, 
  SkillsSkeleton, 
  PrListSkeleton,
} from "@/components/ui/page-skeletons";

// ImageWithFallback, AdaptiveSingleImage extracted to components/shared/ImageWithFallback.tsx

// AdaptiveSingleImage extracted to components/shared/ImageWithFallback.tsx


// Icons, IconMapping, StackIconBox, social SVGs extracted to components/shared/


import { Toaster, toast } from "sonner";
import dynamic from "next/dynamic";

// cmdk is heavy (~30KB gzipped). Lazy load it so it doesn't block initial render.
// We use a wrapper component because cmdk exports as a namespace (Command.Dialog etc.)
const CommandPalette = dynamic(
  () => import("./_CommandPalette"),
  { ssr: false }
);

import { 
  saveDevData, 
  getAppreciations, 
  incrementAppreciation 
} from "./actions";
import { ErrorBoundary } from "./ErrorBoundary";

import { ScrollToTop } from "@/components/ui/scroll-to-top";

import experienceData from "../data/experience.json";
import stackData from "../data/stack.json";
import projectsData from "../data/projects.json";

const STATIC_DATA: Record<string, unknown[]> = {
  experience: experienceData,
  stack: stackData,
  projects: projectsData,
};

// Types imported from @/types/portfolio



export default function PortfolioSplitPane() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [experienceDataState, setExperienceDataState] = useState<DevLogItem[]>([]);
  const [projectsDataState, setProjectsDataState] = useState<DevLogItem[]>([]);
  const [stackDataState, setStackDataState] = useState<DevLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  const [openCommandPalette, setOpenCommandPalette] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  
  // Mobile Sticky Fallback
  
  // Theme Switching
    
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



  // Screenshot Lightbox State
  const [selectedScreenshot, setSelectedScreenshot] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [screenshotIndex, setScreenshotIndex] = useState<number>(0);
  const [screenshotList, setScreenshotList] = useState<{ src: string; alt: string; caption?: string }[]>([]);

  // Expanded Cards for Long text description truncation
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Framer motion scroll progress
    
  
  
  // =========================================================
  // BOOTSTRAP & SHORTCUTS
  // =========================================================

  
  useEffect(() => {
        if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

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

  
  useEffect(() => {
    const loadData = async () => {
      try {
        setExperienceDataState(Array.isArray(STATIC_DATA.experience) ? STATIC_DATA.experience as DevLogItem[] : []);
        setProjectsDataState(Array.isArray(STATIC_DATA.projects) ? STATIC_DATA.projects as DevLogItem[] : []);
        setStackDataState(Array.isArray(STATIC_DATA.stack) ? STATIC_DATA.stack as DevLogItem[] : []);
        setLoading(false);
        
        // Fetch appreciations for all items
        const allItems = [...(STATIC_DATA.experience as DevLogItem[]), ...(STATIC_DATA.projects as DevLogItem[])];
        const slugs = allItems.map((d: DevLogItem) => d?.id).filter(Boolean) as string[];
        if (slugs.length > 0) {
          const counts = await getAppreciations(slugs);
          setAppreciations(prev => ({ ...prev, ...(counts || {}) }));
        }
      } catch {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  // Admin login sends password to /api/auth (server-side comparison, no client exposure)
  const handleAdminLogin = async (password: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setAdminMode(true);
        setShowAdminModal(false);
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

  // Admin logout hits DELETE /api/auth to clear HttpOnly cookies
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
    if (editingSection === "experience" && Array.isArray(finalForm.description)) {
      finalForm.description = finalForm.description
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    if (editingSection === "projects") {
      finalForm.tags = tagsInput
        .split(",")
        .map(t => t.trim().toUpperCase())
        .filter(Boolean);
      finalForm.liveUrl = finalForm.liveUrl && finalForm.liveUrl.trim() !== "" ? finalForm.liveUrl : null;
      finalForm.codeUrl = finalForm.codeUrl && finalForm.codeUrl.trim() !== "" ? finalForm.codeUrl : null;
      finalForm.codeSnippet = finalForm.codeSnippet && finalForm.codeSnippet.content && finalForm.codeSnippet.content.trim() !== "" ? finalForm.codeSnippet : null;
    }

    // Ensure single pin constraint
    const updated = (editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState).map(item => {
      if (item.id === editingId) {
        return finalForm;
      }
      if (finalForm.isPinned && item.isPinned) {
        return { ...item, isPinned: false };
      }
      return item;
    });

    if (editingSection === "experience") setExperienceDataState(updated);
    else if (editingSection === "projects") setProjectsDataState(updated);
    else setStackDataState(updated);
    setEditingId(null);
    setEditForm(null);
    
    const res = await saveDevData(editingSection || "experience", updated);
    if (res.success) {
      toast("CHANGES COMMITTED SUCCESSFULLY", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      // Vercel read-only FS state updated in-memory; user must export JSON
      setHasUnsavedChanges(true);
      toast("STATE UPDATED EXPORT JSON TO COMMIT PERMANENTLY", {
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
    const targetList = editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState;
    const updatedList = targetList.filter(d => d.id !== id);
    if (editingSection === "experience") setExperienceDataState(updatedList);
    else if (editingSection === "projects") setProjectsDataState(updatedList);
    else setStackDataState(updatedList);
    setEditingId(null);
    setEditForm(null);
    setConfirmDeleteId(null);
    const res = await saveDevData(editingSection || "experience", updatedList);
    if (res.success) {
      toast("ENTRY DELETED", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs tracking-wider"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      setHasUnsavedChanges(true);
      toast("DELETED IN MEMORY EXPORT JSON TO COMMIT", {
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
    const targetList = editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState;
    const updatedList = targetList.map(d => {
      if (d.id === item.id) {
        return { ...d, isPinned: willPin };
      }
      if (willPin && d.isPinned) {
        return { ...d, isPinned: false };
      }
      return d;
    });

    if (editingSection === "experience") setExperienceDataState(updatedList);
    else if (editingSection === "projects") setProjectsDataState(updatedList);
    else setStackDataState(updatedList);
    const res = await saveDevData(editingSection || "experience", updatedList);
    if (res.success) {
      toast(willPin ? "PINNED TO TOP" : "UNPINNED", {
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

  // Initialize new entry all fields empty so placeholders show correctly
  const handleStartNewEntry = (section: string) => {
    setEditingSection(section);
    setIsAddingNew(true);
    setEditForm({
      id: `${section.slice(0, 4)}-${Date.now()}`,
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
      ...(section === "experience" ? {
        company: "",
        type: "",
        duration: "",
        location: "",
        logoUrl: "",
        description: []
      } : section === "stack" ? {
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
    if (editingSection === "experience" && Array.isArray(finalForm.description)) {
      finalForm.description = finalForm.description
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    if (editingSection === "projects") {
      finalForm.tags = tagsInput
        .split(",")
        .map(t => t.trim().toUpperCase())
        .filter(Boolean);
      finalForm.liveUrl = finalForm.liveUrl && finalForm.liveUrl.trim() !== "" ? finalForm.liveUrl : null;
      finalForm.codeUrl = finalForm.codeUrl && finalForm.codeUrl.trim() !== "" ? finalForm.codeUrl : null;
      finalForm.codeSnippet = finalForm.codeSnippet && finalForm.codeSnippet.content && finalForm.codeSnippet.content.trim() !== "" ? finalForm.codeSnippet : null;
    }

    // Ensure single pin constraint
    const targetList = editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState;
    const updated = [finalForm, ...targetList].map(item => {
      if (item.id === finalForm.id) {
        return finalForm;
      }
      if (finalForm.isPinned && item.isPinned) {
        return { ...item, isPinned: false };
      }
      return item;
    });

    if (editingSection === "experience") setExperienceDataState(updated);
    else if (editingSection === "projects") setProjectsDataState(updated);
    else setStackDataState(updated);
    setIsAddingNew(false);
    setEditForm(null);

    const res = await saveDevData(editingSection || "experience", updated);
    if (res.success) {
      toast("NEW RECORD DEPLOYED", {
        className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
      });
    } else if ((res as { isProductionFS?: boolean }).isProductionFS) {
      setHasUnsavedChanges(true);
      toast("STATE UPDATED EXPORT JSON TO COMMIT PERMANENTLY", {
        className: "bg-canvas border border-amber-500 text-amber-400 rounded-none font-mono uppercase text-xs",
        duration: 6000,
      });
    } else {
      toast("WRITE ERROR", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
    }
  };



  // Export JSON locally (Client-side) primary persistence mechanism on Vercel
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${editingSection || "export"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setHasUnsavedChanges(false);
    toast("EXPORTED JSON CONFIG COMMIT TO GITHUB TO DEPLOY", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
    });
  };

  return (
    <main className="min-h-screen w-full max-w-4xl mx-auto border-x border-[var(--theme-border)] flex flex-col pb-24 text-[var(--theme-text)] selection:bg-zinc-50 selection:text-zinc-950 transition-colors duration-500 relative z-10">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
        {/* Left */}
        <Link href="/" className="flex items-center gap-3 focus-visible:ring-[3px] focus-visible:ring-[var(--theme-border)] outline-none rounded-sm">
          <PRLogo className="w-8 h-auto text-[var(--theme-text)]" />
        </Link>
        
        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex gap-4 text-sm font-light text-[var(--theme-text)] items-center">
            <Link href="/#experience" className="hover:underline underline-offset-[5px]">Experience</Link>
            <Link href="/projects" className="hover:underline underline-offset-[5px]">Projects</Link>
            <Link href="/#skills" className="hover:underline underline-offset-[5px]">Skills</Link>
            <CommandTrigger onClick={() => setOpenCommandPalette(true)} />
          </nav>
          
          <span className="bg-[var(--theme-border)] hidden h-4 w-px md:block" aria-hidden />

          <div className="flex h-8 items-center gap-0.5 rounded-full bg-[var(--theme-hover)] p-0.5 border border-[var(--theme-border)]">
            <ThemeToggle className="w-7 h-7" />
          </div>

          <div className="border-[var(--theme-border)] border-l pl-2 md:hidden flex items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-transparent hover:bg-[var(--theme-hover)] text-[var(--theme-text)]" aria-label="Open menu">
                  <Menu className="w-[18px] h-[18px]" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-48 bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-md shadow-lg p-1">
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <Link href="/#experience">Experience</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <Link href="/projects">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <Link href="/#skills">Skills</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 text-sm rounded-sm hover:bg-[var(--theme-hover)] cursor-pointer outline-none transition-colors">
                  <button onClick={() => setOpenCommandPalette(true)} className="w-full text-left">Search (⌘K)</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Centered container flexbox grid */}
      <div className="w-full relative z-10 flex flex-col">
        
        <IdentityPane loading={loading} />

        <CommandFloatingButton onClick={() => setOpenCommandPalette(true)} />
        <CommandMenu open={openCommandPalette} onOpenChange={setOpenCommandPalette} />

        {/* PROOF STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--theme-border)]">
          
          {/* GitHub Activity */}
          <div className="px-4 md:px-6 py-6 border-b border-[var(--theme-border)] md:border-b-0 md:border-r">
            <GitHubActivity />
          </div>

          {/* Open Source PRs */}
          <div className="px-4 md:px-6 py-6">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-[var(--theme-text)]0 mb-1">
              Featured Open Source Contributions
            </span>
            <p className="text-xs text-[var(--theme-muted)] mb-4 mt-1">
              Selected architectural implementations and workflow automations.
            </p>
            {!prsError && (prsLoading || prs.length > 0) && (
              prsLoading ? (
                <PrListSkeleton />
              ) : (
                <div className="flex flex-col">
                  {prs.map(pr => {
                    const repoName = pr.repository_url.replace("https://api.github.com/repos/", "");
                    return (
                      <a
                        key={pr.id}
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-1 border-b border-[var(--theme-border)] pb-4 mb-4 last:mb-0 hover:bg-[var(--theme-hover)] transition-colors px-2 -mx-2 rounded"
                      >
                        <div className="text-[10px] text-[var(--theme-muted)] font-mono tracking-wider group-hover:text-[var(--theme-text)] transition-colors duration-150">
                          {repoName}
                        </div>
                        <div className="text-xs text-[var(--theme-text)] font-sans font-medium line-clamp-1 transition-colors duration-150">
                          {pr.title}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>


      {/* ==========================================
         RIGHT COLUMN: DEV LOGBOOK FEED (Scrollable window-level, standard px padding)
         ========================================== */}
      <ErrorBoundary title="LOGBOOK FEED">
        <FeedShell>
            
            {/* New Entry Button for Admin */}
            {adminMode && !isAddingNew && !editingId && (
              <div className="pt-6 flex gap-2">
                <button 
                  onClick={() => handleStartNewEntry("experience")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
                <button 
                  onClick={() => handleStartNewEntry("projects")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
                <button 
                  onClick={() => handleStartNewEntry("stack")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>
            )}

            {isAddingNew && editForm && (
              <AdminEditorForm
                editForm={editForm}
                setEditForm={setEditForm}
                activeTab={editingSection || "experience"}
                isAddingNew={true}
                tagsInput={tagsInput}
                setTagsInput={setTagsInput}
                onSave={handleSaveNewEntry}
                onCancel={() => setIsAddingNew(false)}
              />
            )}

            {loading ? (
              <div className="flex flex-col py-8 px-6 sm:px-8 md:px-0 w-full">
                <ExperienceCardSkeleton />
                <ProjectCardSkeleton />
                <SkillsSkeleton />
              </div>
            ) : (
              <div className="flex flex-col gap-12 mt-12">
                
                {/* EXPERIENCE SECTION */}
                <div id="experience" className="flex flex-col scroll-mt-[112px]">
                  <h2 className="sticky top-16 z-40 w-full border-b border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 md:px-6 py-3 text-sm font-mono text-[var(--theme-text)]">Experience</h2>
                  {experienceDataState.map((post, index) => {
                    const isEditing = editingId === post.id;
                    const hasUserAppreciated = userAppreciated[post.id] || false;
                    const appCount = appreciations[post.id] ?? 0;

                    if (isEditing && editForm) {
                      return (
                        <AdminEditorForm
                          key={post.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          activeTab="experience"
                          isAddingNew={false}
                          tagsInput={tagsInput}
                          setTagsInput={setTagsInput}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          onDelete={() => handleDeleteEntry(post.id)}
                          confirmDeleteId={confirmDeleteId}
                          setConfirmDeleteId={setConfirmDeleteId}
                        />
                      );
                    }

                    return (
                      <ExperienceCard
                        key={post.id}
                        post={post}
                        index={index}
                        adminMode={adminMode}
                        hasUserAppreciated={hasUserAppreciated}
                        appCount={appCount}
                        handleTogglePin={handleTogglePin}
                        handleStartEdit={(item) => { setEditingSection("experience"); handleStartEdit(item); }}
                        handleAppreciate={handleAppreciate}
                      />
                    );
                  })}
                </div>

                {/* PROJECTS SECTION */}
                <div id="projects" className="flex flex-col scroll-mt-[112px]">
                  <h2 className="sticky top-16 z-40 w-full border-b border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 md:px-6 py-3 text-sm font-mono text-[var(--theme-text)]">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 border-b border-[var(--theme-border)]">
                    {projectsDataState.slice(0, 2).map((post, index) => {
                      const isEditing = editingId === post.id;
                      const hasUserAppreciated = userAppreciated[post.id] || false;
                      const appCount = appreciations[post.id] ?? 0;

                      if (isEditing && editForm) {
                        return (
                          <div key={post.id} className="md:col-span-2">
                            <AdminEditorForm
                              editForm={editForm}
                              setEditForm={setEditForm}
                              activeTab="projects"
                              isAddingNew={false}
                              tagsInput={tagsInput}
                              setTagsInput={setTagsInput}
                              onSave={handleSaveEdit}
                              onCancel={handleCancelEdit}
                              onDelete={() => handleDeleteEntry(post.id)}
                              confirmDeleteId={confirmDeleteId}
                              setConfirmDeleteId={setConfirmDeleteId}
                            />
                          </div>
                        );
                      }

                      const isExpanded = expandedCards[post.id] || false;
                      const bodyText = post.body || "";
                      const shouldTruncate = bodyText.split("\n").length > 4 || bodyText.length > 300;

                      return (
                        <ProjectCard
                          key={post.id}
                          post={post}
                          index={index}
                          adminMode={adminMode}
                          hasUserAppreciated={hasUserAppreciated}
                          appCount={appCount}
                          isExpanded={isExpanded}
                          shouldTruncate={shouldTruncate}
                          setExpandedCards={setExpandedCards}
                          handleTogglePin={handleTogglePin}
                          handleStartEdit={(item) => { setEditingSection("projects"); handleStartEdit(item); }}
                          handleAppreciate={handleAppreciate}
                          setScreenshotList={setScreenshotList}
                          setScreenshotIndex={setScreenshotIndex}
                          setSelectedScreenshot={setSelectedScreenshot}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-center p-6 border-b border-[var(--theme-border)]">
                    <Link href="/projects" className="px-4 py-2 border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-hover)] text-sm font-medium rounded-md transition-all duration-200 inline-flex items-center justify-center gap-2 relative z-10">
                      See all projects &rarr;
                    </Link>
                  </div>
                </div>

                {/* SKILLS SECTION */}
                <div id="skills" className="flex flex-col scroll-mt-[112px]">
                  <div className="sticky top-16 z-40 w-full border-b border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 md:px-6 py-3">
                    <h2 className="text-sm font-mono text-[var(--theme-text)]">Skills</h2>
                  </div>
                  {stackDataState.map((post, index) => {
                    const isEditing = editingId === post.id;

                    if (isEditing && editForm) {
                      return (
                        <AdminEditorForm
                          key={post.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          activeTab="stack"
                          isAddingNew={false}
                          tagsInput={tagsInput}
                          setTagsInput={setTagsInput}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          onDelete={() => handleDeleteEntry(post.id)}
                          confirmDeleteId={confirmDeleteId}
                          setConfirmDeleteId={setConfirmDeleteId}
                        />
                      );
                    }

                    return (
                      <StackSection
                        key={post.id}
                        post={post}
                        index={index}
                        adminMode={adminMode}
                        handleStartEdit={(item) => { setEditingSection("stack"); handleStartEdit(item); }}
                      />
                    );
                  })}
                </div>

              </div>
            )}
        </FeedShell>
      </ErrorBoundary>
      </div>

      

      
      <Footer />
      <ScrollToTop />

      <ErrorBoundary title="SYSTEM UTILITIES">
      {/* ==========================================
         FLOATING ADMIN CONTROLS
         ========================================== */}
      {adminMode && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-40 flex flex-col gap-2 items-stretch md:items-end px-4 pb-4 md:p-0">
          {hasUnsavedChanges && (
            <div className="bg-amber-500/10 border border-amber-500 p-3 font-mono text-[9px] text-amber-400 tracking-widest uppercase select-none shadow-lg text-center md:text-left leading-relaxed">
              ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  Changes Unsaved In Cloud<br />
              <span className="text-amber-300">Click Export JSON to commit</span>
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
            Export {editingSection ? editingSection : "Data"} JSON
          </button>
          <div className="bg-canvas border border-purewhite p-3 font-mono text-[10px] text-purewhite tracking-widest select-none shadow-lg text-center md:text-left">
            ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Admin Mode Active
          </div>
        </div>
      )}

      {/* ==========================================
         ADMIN MODAL (Ctrl + Shift + E)
         ========================================== */}
      <AdminLoginModal
        show={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        adminMode={adminMode}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
      />

      {/* ==========================================
         COMMAND PALETTE (ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“K / Ctrl+K) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â lazy loaded
         ========================================== */}
      {openCommandPalette && (
        <CommandPalette
          open={openCommandPalette}
          onClose={() => setOpenCommandPalette(false)}
          onSelectTab={(tab) => { setEditingSection(tab); setIsAddingNew(false); setEditingId(null); }}
          onCopyEmail={handleCopyEmail}
          onOpenAdmin={() => setShowAdminModal(true)}
        />
      )}

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        selectedScreenshot={selectedScreenshot}
        screenshotIndex={screenshotIndex}
        screenshotList={screenshotList}
        onClose={() => setSelectedScreenshot(null)}
        onNavigate={(index) => {
          setScreenshotIndex(index);
          setSelectedScreenshot(screenshotList[index]);
        }}
      />
      </ErrorBoundary>

      {/* Global Toast Provider */}
      <Toaster position="bottom-center" />
    </main>
  );
}
