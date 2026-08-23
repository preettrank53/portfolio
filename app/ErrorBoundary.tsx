"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="border border-charcoal p-6 bg-darkiron/40 text-center select-none font-mono transition-all duration-300">
          <h2 className="text-[11px] font-bold text-red-500 tracking-[0.2em] uppercase mb-2">
            SYSTEM ERROR // {this.props.title ?? "GENERIC"}
          </h2>
          <p className="text-[9px] text-ash mb-4 break-all uppercase leading-relaxed max-w-md mx-auto">
            {this.state.error?.message || "An unexpected rendering error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 border border-charcoal text-[9px] text-purewhite uppercase tracking-widest hover:border-accent hover:text-accent bg-transparent transition-all duration-150 active:scale-95"
            style={{ minHeight: "44px" }}
          >
            RELOAD SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
