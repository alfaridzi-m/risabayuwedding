"use client";

import { cn } from "@/lib/utils";

type ToastProps = {
  message: string;
  show: boolean;
};

export function Toast({ message, show }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom)+28px)] left-1/2 z-[80]",
        "-translate-x-1/2 rounded-sm bg-ink px-[22px] py-[11px]",
        "text-[0.7rem] uppercase tracking-[0.12em] text-ivory shadow-lg",
        "transition-all duration-400",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0",
      )}
    >
      {message}
    </div>
  );
}
