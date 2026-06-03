"use client";

import { useCallback, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useCountdown } from "@/hooks/useCountdown";
import { useTyping } from "@/hooks/useTyping";

function Caret({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="ml-px inline-block h-[1em] w-px animate-blink bg-current" />
  );
}

const countdownItems = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function CountdownSection() {
  const values = useCountdown();
  const [typingActive, setTypingActive] = useState(false);
  const onCountVisible = useCallback(() => setTypingActive(true), []);
  const { display, showCaret } = useTyping("the days...", typingActive, 140);

  return (
    <section
      id="countdown-sec"
      className="relative flex min-h-svh w-full flex-col items-center justify-start overflow-hidden px-6 pb-[calc(env(safe-area-inset-bottom)+40px)] pt-[6vh]"
    >
      <Reveal
        variant="reveal2-vline"
        className="h-[55svh] w-px bg-ink/25 transition-[transform] duration-[1.8s] ease-[cubic-bezier(0.25,1,0.5,1)]"
      >
        <span className="sr-only">divider</span>
      </Reveal>

      <Reveal
        id="counting-text"
        onVisible={onCountVisible}
        className="mt-10 text-center font-serif text-[clamp(0.68rem,2.5vw,0.78rem)] tracking-[0.16em] text-ink/90"
      >
        <span>Counting down </span>
        <span>{display}</span>
        <Caret show={showCaret} />
      </Reveal>

      <Reveal
        delay="dl1"
        className="mt-[45px] flex w-full max-w-[480px] items-center justify-center gap-[clamp(16px,5vw,32px)]"
      >
        {countdownItems.map(({ key, label }) => (
          <div
            key={key}
            className="flex min-w-[50px] flex-col items-center text-center"
          >
            <span className="font-display text-[clamp(1.8rem,7vw,2.5rem)] font-normal leading-none text-ink">
              {values[key]}
            </span>
            <span className="mt-[6px] font-serif text-[clamp(0.55rem,2.2vw,0.65rem)] uppercase tracking-[0.12em] text-ink/50">
              {label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
