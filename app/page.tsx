/**
 * SETUP: Copy .env.example to .env.local and fill in your credentials.
 * See README.md for full setup instructions.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import {
  Plus
} from "lucide-react";

import type { DevLogItem, GitHubPR } from "@/types/portfolio";

import { BackgroundDecorations } from "@/components/shared/BackgroundDecorations";
import { LightboxModal } from "@/components/shared/LightboxModal";
import { IdentityPane } from "@/components/identity/IdentityPane";
import { FeedShell } from "@/components/feed/FeedShell";
import { ExperienceCard } from "@/components/feed/ExperienceCard";
import { ProjectCard } from "@/components/feed/ProjectCard";
import { StackSection } from "@/components/feed/StackSection";
import { AdminEditorForm } from "@/components/admin/AdminEditorForm";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";



import { 
  ExperienceCardSkeleton, 
  ProjectCardSkeleton, 
  SkillsSkeleton, 
} from "@/components/ui/page-skeletons";

// ImageWithFallback, AdaptiveSingleImage ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ extracted to components/shared/ImageWithFallback.tsx

// AdaptiveSingleImage ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ extracted to components/shared/ImageWithFallback.tsx


// Icons, IconMapping, StackIconBox, social SVGs ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ extracted to components/shared/


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

// Types ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ imported from @/types/portfolio


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

  const [openCommandPalette, setOpenCommandPalette] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  
  // Mobile Sticky Fallback
  const [isMobileStuck, setIsMobileStuck] = useState<boolean>(false);
  const stickySentinelRef = useRef<HTMLDivElement>(null);

  // Theme Switching
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Appreciations and Github Stars
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);
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
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showIdentity, setShowIdentity] = useState<boolean>(false);
  const [swipeDirection, setSwipeDirection] = useState<number>(1);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (window.innerWidth < 768) {
        setShowIdentity(latest > 200);
      } else {
        setShowIdentity(false);
      }
    });
  }, [scrollY]);

  const tabLoadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const feedAnchorRef = useRef<HTMLDivElement>(null);
  const feedBodyRef = useRef<HTMLDivElement | null>(null);
  const lockedFeedHeightRef = useRef<number | null>(null);

  const handleTabSwitch = (newTabId: string, direction: number) => {
    if (newTabId === activeTab) return;
    
    const wasStuck = isMobileStuck; // capture BEFORE content swap
    const prevY = window.scrollY;

    // Lock feed height to prevent scroll jump before unmounting
    if (feedBodyRef.current) {
      lockedFeedHeightRef.current = feedBodyRef.current.offsetHeight;
    }

    setSwipeDirection(direction);
    setActiveTab(newTabId);
    setIsAddingNew(false);
    setEditingId(null);
    setIsTabLoading(true);

    if (tabLoadingTimeoutRef.current) clearTimeout(tabLoadingTimeoutRef.current);
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const anchorTop = feedAnchorRef.current?.offsetTop ?? 0;
        if (wasStuck && prevY > anchorTop - 8) {
          // User was past the nav ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â keep them anchored
          const anchor = feedAnchorRef.current;
          if (anchor) {
            const y = anchor.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: Math.max(y, 0), behavior: "instant" as ScrollBehavior });
          }
          setIsMobileStuck(true);
        } else {
          // User was still in profile area ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â keep their scrollY
          window.scrollTo({ top: prevY, behavior: "instant" as ScrollBehavior });
        }

        tabLoadingTimeoutRef.current = setTimeout(() => {
          setIsTabLoading(false);
          lockedFeedHeightRef.current = null;
        }, 300);
      });
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        const currentIndex = TABS.findIndex(t => t.id === activeTab);
        const nextIndex = (currentIndex + 1) % TABS.length;
        handleTabSwitch(TABS[nextIndex].id, 1);
      }
    },
    onSwipedRight: () => {
      if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        const currentIndex = TABS.findIndex(t => t.id === activeTab);
        const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
        handleTabSwitch(TABS[prevIndex].id, -1);
      }
    },
    trackMouse: false
  });

  // =========================================================
  // BOOTSTRAP & SHORTCUTS
  // =========================================================

  // Mobile Sticky Observer Fallback
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth < 768) {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setIsMobileStuck(true);
          } else {
            setIsMobileStuck(false);
          }
        }
      },
      { threshold: [1.0] }
    );

    if (stickySentinelRef.current) {
      observer.observe(stickySentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
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
      try {
        const staticData = STATIC_DATA[activeTab === "activity" ? "tweets" : activeTab] as DevLogItem[];
        const safeData = Array.isArray(staticData) ? staticData : [];
        setTabData(safeData);
        setLoading(false);
        
        // Fetch appreciations
        const slugs = safeData.map((d: DevLogItem) => d?.id).filter(Boolean) as string[];
        if (slugs.length > 0) {
          const counts = await getAppreciations(slugs);
          setAppreciations(prev => ({ ...prev, ...(counts || {}) }));
        }
      } catch {
        setTabData([]);
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

  // Admin login ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â sends password to /api/auth (server-side comparison, no client exposure)
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

  // Admin logout ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â hits DELETE /api/auth to clear HttpOnly cookies
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
      // Vercel read-only FS ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â state updated in-memory; user must export JSON
      setHasUnsavedChanges(true);
      toast("STATE UPDATED ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â EXPORT JSON TO COMMIT PERMANENTLY", {
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
      toast("DELETED IN MEMORY ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â EXPORT JSON TO COMMIT", {
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
      toast(willPin ? "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ PINNED TO TOP" : "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ UNPINNED", {
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

  // Initialize new entry ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â all fields empty so placeholders show correctly
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
      toast("STATE UPDATED ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â EXPORT JSON TO COMMIT PERMANENTLY", {
        className: "bg-canvas border border-amber-500 text-amber-400 rounded-none font-mono uppercase text-xs",
        duration: 6000,
      });
    } else {
      toast("WRITE ERROR", {
        className: "bg-canvas border border-charcoal text-red-500 rounded-none font-mono uppercase text-xs"
      });
    }
  };



  // Export JSON locally (Client-side) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â primary persistence mechanism on Vercel
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tabData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeTab}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setHasUnsavedChanges(false);
    toast("EXPORTED JSON CONFIG ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â COMMIT TO GITHUB TO DEPLOY", {
      className: "bg-canvas border border-charcoal text-purewhite rounded-none font-mono uppercase text-xs"
    });
  };

  return (
    <main className="min-h-[100dvh] bg-transparent text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500 relative z-10">
      <BackgroundDecorations theme={theme} scaleX={scaleX} />


      {/* Centered container flexbox grid */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row w-full relative z-10 md:h-screen md:overflow-hidden px-6 sm:px-8 md:px-0">
        <IdentityPane
          loading={loading}
          mounted={mounted}
          theme={theme}
          setTheme={setTheme}
          prs={prs}
          prsLoading={prsLoading}
          prsError={prsError}
          viewCount={viewCount}
          viewCountError={viewCountError}
        />

      {/* ==========================================
         RIGHT COLUMN: DEV LOGBOOK FEED (Scrollable window-level, standard px padding)
         ========================================== */}
      <ErrorBoundary title="LOGBOOK FEED">
        <FeedShell
          activeTab={activeTab}
          tabs={TABS}
          handleTabSwitch={handleTabSwitch}
          swipeHandlers={swipeHandlers}
          isMobileStuck={isMobileStuck}
          showIdentity={showIdentity}
          feedAnchorRef={feedAnchorRef}
          stickySentinelRef={stickySentinelRef}
          feedBodyRef={feedBodyRef}
          lockedFeedHeightRef={lockedFeedHeightRef}
          swipeDirection={swipeDirection}
        >
            
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

            {isAddingNew && editForm && (
              <AdminEditorForm
                editForm={editForm}
                setEditForm={setEditForm}
                activeTab={activeTab}
                isAddingNew={true}
                tagsInput={tagsInput}
                setTagsInput={setTagsInput}
                onSave={handleSaveNewEntry}
                onCancel={() => setIsAddingNew(false)}
              />
            )}

            {(loading || isTabLoading) ? (
              <div className="flex flex-col py-8 px-6 sm:px-8 md:px-0 w-full">
                {activeTab === "experience" && (
                  <>
                    <ExperienceCardSkeleton />
                    <ExperienceCardSkeleton />
                  </>
                )}
                {activeTab === "projects" && (
                  <>
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                  </>
                )}
                {activeTab === "stack" && (
                  <SkillsSkeleton />
                )}
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
                        <AdminEditorForm
                          key={post.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          activeTab={activeTab}
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

                    if (activeTab === "stack") {
                      return (
                        <StackSection
                          key={post.id}
                          post={post}
                          index={index}
                          adminMode={adminMode}
                          handleStartEdit={handleStartEdit}
                        />
                      );
                    }

                    if (activeTab === "experience") {
                      return (
                        <ExperienceCard
                          key={post.id}
                          post={post}
                          index={index}
                          adminMode={adminMode}
                          hasUserAppreciated={hasUserAppreciated}
                          appCount={appCount}
                          handleTogglePin={handleTogglePin}
                          handleStartEdit={handleStartEdit}
                          handleAppreciate={handleAppreciate}
                          setScreenshotList={setScreenshotList}
                          setScreenshotIndex={setScreenshotIndex}
                          setSelectedScreenshot={setSelectedScreenshot}
                        />
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
                        handleStartEdit={handleStartEdit}
                        handleAppreciate={handleAppreciate}
                        setScreenshotList={setScreenshotList}
                        setScreenshotIndex={setScreenshotIndex}
                        setSelectedScreenshot={setSelectedScreenshot}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
        </FeedShell>
      </ErrorBoundary>
      </div>

      <ScrollToTop />

      <ErrorBoundary title="SYSTEM UTILITIES">
      {/* ==========================================
         FLOATING ADMIN CONTROLS
         ========================================== */}
      {adminMode && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-40 flex flex-col gap-2 items-stretch md:items-end px-4 pb-4 md:p-0">
          {hasUnsavedChanges && (
            <div className="bg-amber-500/10 border border-amber-500 p-3 font-mono text-[9px] text-amber-400 tracking-widest uppercase select-none shadow-lg text-center md:text-left leading-relaxed">
              ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  CHANGES UNSAVED IN CLOUD<br />
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
            ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ADMIN MODE ACTIVE
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
          onSelectTab={(tab) => { setActiveTab(tab); setIsAddingNew(false); setEditingId(null); }}
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
