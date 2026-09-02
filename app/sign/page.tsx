"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignatureCanvas, { SignatureCanvasRef } from "@/components/SignatureCanvas";

import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function SignPage() {
  const router = useRouter();
  const canvasRef = useRef<SignatureCanvasRef>(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClear = () => {
    canvasRef.current?.clear();
    setError("");
  };

  const handleSubmit = async () => {
    if (!canvasRef.current) return;
    
    if (!canvasRef.current.hasStrokes()) {
      setError("Please draw a signature first.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const strokes = canvasRef.current.getStrokes();
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strokes, name, note }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit signature");
      }

      // Success! 
      router.push("/wall");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto border-x border-[var(--theme-border)] min-h-screen flex flex-col pb-24 text-[var(--theme-text)] selection:bg-zinc-50 selection:text-zinc-950 transition-colors duration-500 relative z-10 bg-[var(--theme-bg)]">
      
      <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
        {/* Left */}
        <Link href="/" className="flex items-center gap-2 text-xs font-mono text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">
          ← Back to home
        </Link>
        
        {/* Center */}
        <nav className="hidden md:flex gap-6 text-sm font-mono text-[var(--theme-muted)]">
          <Link href="/#experience" className="hover:text-[var(--theme-text)] transition-colors">Experience</Link>
          <Link href="/#projects" className="hover:text-[var(--theme-text)] transition-colors">Projects</Link>
          <Link href="/#skills" className="hover:text-[var(--theme-text)] transition-colors">Skills</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/wall" className="text-xs font-mono text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-colors">← Back to wall</Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Page Title */}
      <div className="border-b border-[var(--theme-border)] p-6 md:p-10 flex flex-col gap-4">
        <h1 className="font-mono text-sm tracking-widest text-[var(--theme-muted)]">
          02 // Sign The Wall
        </h1>
        <p className="font-sans text-xl md:text-3xl font-extrabold tracking-tighter text-[var(--theme-text)]">
          Leave your mark.
        </p>
      </div>

      <div className="p-6 md:p-10 flex flex-col gap-8">
        
        <div className="max-w-xl mx-auto w-full h-56">
          <SignatureCanvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border border-[var(--theme-border)] p-4 text-[var(--theme-text)] placeholder-[var(--theme-muted)] focus:outline-none focus:border-[var(--theme-text)] transition-colors rounded-none"
          />
          <input
            type="text"
            placeholder="Leave a short note (optional)"
            maxLength={80}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-transparent border border-[var(--theme-border)] p-4 text-[var(--theme-text)] placeholder-[var(--theme-muted)] focus:outline-none focus:border-[var(--theme-text)] transition-colors rounded-none"
          />
        </div>

        {error && (
          <div className="font-mono text-[10px] tracking-wider text-red-500 bg-red-500/10 p-4 border border-red-500/20 rounded-none">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={handleClear}
            disabled={isSubmitting}
            className="w-full sm:w-1/3 px-6 py-2 border border-[var(--theme-border)] text-[var(--theme-text)] font-medium text-sm rounded-md hover:bg-[var(--theme-hover)] transition-colors inline-flex justify-center items-center disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-2/3 px-6 py-2 border border-[var(--theme-border)] text-[var(--theme-text)] font-medium text-sm rounded-md hover:bg-[var(--theme-hover)] transition-colors inline-flex justify-center items-center disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Signature"}
          </button>
        </div>

      </div>
    </main>
  );
}
