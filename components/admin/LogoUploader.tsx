"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function LogoUploader({
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
              ✕
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
