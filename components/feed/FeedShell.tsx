"use client";

import React from "react";

interface FeedShellProps {
  children: React.ReactNode;
}

export function FeedShell({ children }: FeedShellProps) {
  return (
    <section className="w-full flex flex-col relative">
      <div className="w-full flex flex-col w-full pb-12">
        {children}
      </div>
    </section>
  );
}
