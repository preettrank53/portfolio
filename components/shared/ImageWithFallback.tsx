"use client";

import React, { useState } from "react";
import Image from "next/image";

/** next/image wrapper with graceful error fallback and skeleton loading */
export const ImageWithFallback = ({ src, alt, ...props }: React.ComponentProps<typeof Image>) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  if (error || !src) {
    return (
      <div className="w-full h-full bg-darkiron border border-charcoal flex flex-col items-center justify-center font-mono text-[9px] text-ash select-none p-4 text-center">
        <span>IMAGE UNAVAILABLE</span>
      </div>
    );
  }

  const isDataUrl = typeof src === "string" && src.startsWith("data:");

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 skeleton z-0 rounded-none" />
      )}
      <Image
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        unoptimized={isDataUrl}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${props.className || ""}`}
        {...props}
      />
    </>
  );
};

/** Single image display with zoom-in cursor for lightbox trigger */
export const AdaptiveSingleImage = ({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) => {
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
