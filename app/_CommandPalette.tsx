"use client";

/**
 * _CommandPalette.tsx
 * Lazy-loaded wrapper around the `cmdk` Command component.
 * Imported via next/dynamic in page.tsx — NOT in the initial bundle.
 */

import { Command } from "cmdk";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onCopyEmail: () => void;
  onOpenAdmin: () => void;
}

export default function CommandPalette({
  open,
  onClose,
  onSelectTab,
  onCopyEmail,
  onOpenAdmin,
}: CommandPaletteProps) {
  const itemCls =
    "flex justify-between items-center px-3 py-3 md:py-2.5 hover:bg-darkiron/50 cursor-pointer font-mono text-[11px] text-purewhite uppercase tracking-wider transition-colors duration-150 rounded-none aria-selected:bg-darkiron min-h-[44px]";
  const hintCls = "text-[9px] text-ash/60 font-mono";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      label="Global Command Palette"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-canvas/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-[95vw] md:max-w-[500px] bg-canvas border border-charcoal rounded-none overflow-hidden flex flex-col shadow-2xl">
        <Command.Input
          placeholder="SEARCH OR JUMP TO..."
          className="w-full bg-canvas text-purewhite border-b border-charcoal px-4 py-4 font-mono text-base md:text-xs focus:outline-none uppercase tracking-[0.2em] placeholder:text-ash/40"
        />
        <Command.List className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
          <Command.Empty className="p-4 font-mono text-[10px] text-ash uppercase tracking-widest text-center">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="NAVIGATION"
            className="font-mono text-[9px] text-ash/50 uppercase tracking-[0.2em] px-3 pt-3 pb-1"
          >
            <Command.Item onSelect={() => { onSelectTab("projects"); onClose(); }} className={itemCls}>
              <span>PROJECTS</span>
              <span className={hintCls}>ALT+1</span>
            </Command.Item>
            <Command.Item onSelect={() => { onSelectTab("experience"); onClose(); }} className={itemCls}>
              <span>EXPERIENCE</span>
              <span className={hintCls}>ALT+2</span>
            </Command.Item>
            <Command.Item onSelect={() => { onSelectTab("stack"); onClose(); }} className={itemCls}>
              <span>STACK</span>
              <span className={hintCls}>ALT+3</span>
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="SYSTEM ACTIONS"
            className="font-mono text-[9px] text-ash/50 uppercase tracking-[0.2em] px-3 pt-3 pb-1 border-t border-charcoal/30 mt-2"
          >
            <Command.Item onSelect={() => { onCopyEmail(); onClose(); }} className={itemCls}>
              <span>COPY EMAIL</span>
              <span className={hintCls}>CTRL+K</span>
            </Command.Item>
            <Command.Item onSelect={() => { onOpenAdmin(); onClose(); }} className={itemCls}>
              <span>ADMIN ACCESS GATE</span>
              <span className={hintCls}>CTRL+SHIFT+E</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
