import Link from "next/link";
import { Plus } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full relative z-10 border-t border-[var(--theme-border)] bg-[var(--theme-bg)] flex flex-col items-center">
      <div className="flex w-full flex-col items-center px-5 py-12 md:py-16">
        <p className="mb-6 text-center text-sm text-[var(--theme-muted)] md:text-base max-w-sm">
          Still reading? That means something clicked. Let&apos;s talk.
        </p>

        <Link
          href="mailto:hello@example.com"
          className="group inline-flex items-center rounded-md border border-[var(--theme-border)] bg-[var(--theme-hover)] px-3 py-1.5 text-sm text-[var(--theme-text)] shadow-sm outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--theme-border)] transition-all hover:border-[var(--theme-text)] hover:shadow-md"
        >
          <span className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--theme-text)] text-[var(--theme-bg)]">
              <Plus className="w-3 h-3" />
            </span>
            <span className="font-bold">Book a free call</span>
          </span>
        </Link>
      </div>
      
      <div className="w-full border-t border-[var(--theme-border)] py-6 flex flex-col items-center justify-center">
        <p className="text-[var(--theme-muted)] text-center text-xs">
          © {new Date().getFullYear()} Preet Rank. All systems operational.
        </p>
      </div>
    </footer>
  );
}
