"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

interface ScreenshotEditorProps {
  screenshots: Screenshot[];
  onChange: (screenshots: Screenshot[]) => void;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function processFiles(
  files: FileList | File[],
  onAdd: (imgs: Screenshot[]) => void
) {
  const fileArr = Array.from(files);
  const toasts: string[] = [];
  const results: Screenshot[] = [];

  for (const file of fileArr) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toasts.push(`${file.name}: unsupported format`);
      continue;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toasts.push(`${file.name}: exceeds 5MB limit`);
      continue;
    }
    const base64 = await fileToBase64(file);
    results.push({ src: base64, alt: file.name.replace(/\.[^.]+$/, ""), caption: "" });
  }

  if (toasts.length > 0) {
    toast(toasts.join(" · "), {
      className:
        "bg-canvas border border-charcoal text-red-400 rounded-none font-mono uppercase text-[10px]",
    });
  }
  if (results.length > 0) onAdd(results);
}

/** Drop-zone for a single slot (replace mode) */
function DropZoneSlot({
  onFiles,
  compact = false,
}: {
  onFiles: (files: File[]) => void;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        ACCEPTED_TYPES.includes(f.type)
      );
      if (files.length) onFiles(files);
    },
    [onFiles]
  );

  return (
    <div
      className={`dropzone-base flex flex-col items-center justify-center gap-3 cursor-pointer rounded-none select-none
        ${compact ? "min-h-[120px] p-4" : "min-h-[180px] p-6 md:min-h-[200px]"}
        ${dragging ? "dropzone-dragover" : "hover:dropzone-hover"}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files));
          e.target.value = "";
        }}
      />
      <Upload className="w-8 h-8 text-ash" strokeWidth={1.2} />
      <span className="font-mono text-[9px] text-purewhite uppercase tracking-widest text-center">
        {compact ? "REPLACE IMAGE" : "DROP IMAGE HERE OR CLICK TO BROWSE"}
      </span>
      <span className="font-mono text-[8px] text-ash/60 uppercase tracking-wider text-center">
        PNG · JPG · WEBP · MAX 5MB
      </span>
    </div>
  );
}

/** A single screenshot card with preview / controls */
function ScreenshotCard({
  img,
  idx,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  img: Screenshot;
  idx: number;
  total: number;
  onUpdate: (updated: Partial<Screenshot>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [replacing, setReplacing] = useState(false);

  const handleReplace = useCallback(
    async (files: File[]) => {
      await processFiles(files, (imgs) => {
        if (imgs[0]) onUpdate({ src: imgs[0].src });
      });
      setReplacing(false);
    },
    [onUpdate]
  );

  const hasImage = Boolean(img.src);

  return (
    <div className="border border-charcoal/60 bg-canvas flex flex-col gap-0 rounded-none overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-charcoal/40 bg-darkiron/30">
        <span className="font-mono text-[9px] text-ash uppercase tracking-widest">
          IMAGE #{idx + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={idx === 0}
            onClick={onMoveUp}
            title="Move up"
            className="px-2 py-1 border border-charcoal text-[8px] text-ash hover:text-purewhite disabled:opacity-25 rounded-none min-h-[28px]"
          >
            ▲
          </button>
          <button
            type="button"
            disabled={idx === total - 1}
            onClick={onMoveDown}
            title="Move down"
            className="px-2 py-1 border border-charcoal text-[8px] text-ash hover:text-purewhite disabled:opacity-25 rounded-none min-h-[28px]"
          >
            ▼
          </button>
          {hasImage && (
            <button
              type="button"
              onClick={() => setReplacing((r) => !r)}
              title="Replace image"
              className="px-2 py-1 border border-charcoal text-[8px] text-ash hover:text-accent rounded-none min-h-[28px] flex items-center gap-1"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>REPLACE</span>
            </button>
          )}
          <button
            type="button"
            onClick={onRemove}
            title="Remove screenshot"
            className="px-2 py-1 border border-red-500/40 text-red-400 text-[8px] hover:bg-red-500/10 rounded-none min-h-[28px] flex items-center gap-1"
          >
            <X className="w-2.5 h-2.5" />
            <span>REMOVE</span>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="p-3 flex flex-col gap-3">
        {replacing || !hasImage ? (
          <DropZoneSlot onFiles={handleReplace} compact={hasImage} />
        ) : (
          <div className="relative w-full aspect-video border border-charcoal/40 overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt || "Screenshot"}
              className="w-full h-full object-contain bg-darkiron/20"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Alt text */}
        <div>
          <label className="block font-mono text-[8px] text-ash mb-1 uppercase tracking-widest">
            ALT TEXT
          </label>
          <input
            type="text"
            placeholder="Describe the image for accessibility..."
            value={img.alt}
            onChange={(e) => onUpdate({ alt: e.target.value })}
            className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
          />
        </div>

        {/* Caption */}
        <div>
          <label className="block font-mono text-[8px] text-ash mb-1 uppercase tracking-widest">
            CAPTION <span className="text-ash/40">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Short description shown below the image..."
            value={img.caption ?? ""}
            onChange={(e) => onUpdate({ caption: e.target.value })}
            className="w-full bg-canvas border border-charcoal p-2 text-xs text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
          />
        </div>
      </div>
    </div>
  );
}

/** Main exported component */
export function ScreenshotEditor({ screenshots, onChange }: ScreenshotEditorProps) {
  const handleAddFiles = useCallback(
    async (files: File[]) => {
      await processFiles(files, (newImgs) => {
        onChange([...screenshots, ...newImgs]);
      });
    },
    [screenshots, onChange]
  );

  const handleUpdate = (idx: number, updated: Partial<Screenshot>) => {
    const list = [...screenshots];
    list[idx] = { ...list[idx], ...updated };
    onChange(list);
  };

  const handleRemove = (idx: number) => {
    onChange(screenshots.filter((_, i) => i !== idx));
  };

  const handleMove = (idx: number, direction: "up" | "down") => {
    const list = [...screenshots];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    [list[idx], list[targetIdx]] = [list[targetIdx], list[idx]];
    onChange(list);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Existing screenshots */}
      {screenshots.map((img, idx) => (
        <ScreenshotCard
          key={idx}
          img={img}
          idx={idx}
          total={screenshots.length}
          onUpdate={(updated) => handleUpdate(idx, updated)}
          onRemove={() => handleRemove(idx)}
          onMoveUp={() => handleMove(idx, "up")}
          onMoveDown={() => handleMove(idx, "down")}
        />
      ))}

      {/* Add new screenshots drop zone */}
      <DropZoneSlot onFiles={handleAddFiles} />
      <p className="font-mono text-[8px] text-ash/50 uppercase tracking-widest text-center -mt-2">
        DROP MULTIPLE FILES TO ADD THEM ALL AT ONCE
      </p>
    </div>
  );
}
