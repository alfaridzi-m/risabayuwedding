"use client";

import { cn } from "@/lib/utils";

type MusicToggleProps = {
  playing: boolean;
  onToggle: () => void;
};

export function MusicToggle({ playing, onToggle }: MusicToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Putar / jeda musik"
      className={cn(
        "fixed top-[calc(env(safe-area-inset-top)+16px)] right-4 z-[90]",
        "flex h-[30px] w-[30px] items-center justify-center rounded-full",
        "border border-white/25 bg-ink/55 text-white backdrop-blur-md",
        "transition-[background,transform] duration-300 hover:bg-ink/80 hover:scale-105",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute inset-[-1px] rounded-full border border-white/35",
          playing && "animate-music-pulse",
        )}
      />
      <svg
        className={cn("h-[18px] w-[18px]", playing && "hidden")}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M8 5v14l11-7z" />
      </svg>
      <svg
        className={cn("h-[18px] w-[18px]", !playing && "hidden")}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
      </svg>
    </button>
  );
}
