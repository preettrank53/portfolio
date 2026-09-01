"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignatureCanvas, { SignatureCanvasRef } from "@/components/SignatureCanvas";

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
    <main className="min-h-screen bg-[var(--theme-bg)] text-purewhite flex items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-2xl border border-[var(--theme-border)] bg-[var(--surface)] p-6 md:p-10 relative overflow-hidden backdrop-blur-md">
        
        {/* Header Links */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b949e] hover:text-purewhite transition-colors duration-300">
            ← BACK TO HOME
          </Link>
          <Link href="/wall" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b949e] hover:text-purewhite transition-colors duration-300">
            VIEW THE WALL →
          </Link>
        </div>

        <div className="flex flex-col mb-8">
          <h1 className="font-sans font-extrabold tracking-tighter uppercase text-purewhite whitespace-nowrap text-3xl md:text-4xl mb-2">
            SIGN THE WALL
          </h1>
          <span className="font-mono text-xs text-ash tracking-wide uppercase">
            Leave your mark - visible to everyone who visits.
          </span>
        </div>

        <div className="mb-6">
          <SignatureCanvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Your name (optional)"
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border border-[var(--theme-border)] text-purewhite font-sans text-sm p-3 focus:outline-none focus:border-accent transition-colors duration-300"
          />
          <input
            type="text"
            placeholder="Leave a short note (optional)"
            maxLength={80}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-transparent border border-[var(--theme-border)] text-purewhite font-sans text-sm p-3 focus:outline-none focus:border-accent transition-colors duration-300"
          />
        </div>

        {error && (
          <div className="mb-6 font-mono text-[10px] uppercase tracking-wider text-red-500 bg-red-500/10 p-3 border border-red-500/20">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={handleClear}
            disabled={isSubmitting}
            className="w-full sm:w-1/3 text-center py-4 md:py-3 bg-transparent border border-[var(--theme-border)] text-ash font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-[var(--theme-border)] hover:text-purewhite transition-all duration-300 disabled:opacity-50"
          >
            CLEAR
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-2/3 text-center py-4 md:py-3 bg-transparent border border-accent text-purewhite font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-none hover:bg-accent hover:text-canvas transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT SIGNATURE"}
          </button>
        </div>

      </div>
    </main>
  );
}
