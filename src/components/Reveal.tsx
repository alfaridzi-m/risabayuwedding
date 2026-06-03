"use client";

import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: "dl1" | "dl2" | "dl3";
  variant?: "default" | "reveal2-left" | "reveal2-right" | "reveal2-vline" | "reveal2-scale";
  onVisible?: () => void;
  id?: string;
};

const delayClass = {
  dl1: "delay-[120ms]",
  dl2: "delay-[260ms]",
  dl3: "delay-[400ms]",
};

const variantHidden: Record<NonNullable<RevealProps["variant"]>, string> = {
  default: "translate-y-[30px]",
  "reveal2-left": "-translate-x-[50px] -translate-y-[22px]",
  "reveal2-right": "translate-x-[50px] translate-y-[22px]",
  "reveal2-vline": "scale-y-0 origin-top",
  "reveal2-scale": "translate-y-[35px]",
};

const variantVisible: Record<NonNullable<RevealProps["variant"]>, string> = {
  default: "translate-y-0",
  "reveal2-left": "translate-x-0 -translate-y-[22px]",
  "reveal2-right": "translate-x-0 translate-y-[22px]",
  "reveal2-vline": "scale-y-100",
  "reveal2-scale": "translate-y-0",
};

export function Reveal({
  children,
  className,
  delay,
  variant = "default",
  onVisible,
  id,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (visible && onVisible) onVisible();
  }, [visible, onVisible]);

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "transition-all duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        visible ? "opacity-100" : "opacity-0",
        visible ? variantVisible[variant] : variantHidden[variant],
        delay && delayClass[delay],
        className,
      )}
    >
      {children}
    </div>
  );
}
