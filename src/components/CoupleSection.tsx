"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useTyping } from "@/hooks/useTyping";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

function Caret({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="ml-px inline-block h-[1em] w-px animate-blink bg-current" />
  );
}

export function CoupleSection() {
  const [typingActive, setTypingActive] = useState(false);
  const onMarriedVisible = useCallback(() => setTypingActive(true), []);
  const { display, showCaret } = useTyping("tting married!", typingActive, 130);

  return (
    <section
      id="next"
      className="relative flex min-h-svh w-full flex-col items-center overflow-hidden px-0 pb-[calc(env(safe-area-inset-bottom)+30px)] pt-[5vh]"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-start">
        <div className="flex w-full items-center justify-center gap-0 px-8">
          <Reveal variant="reveal2-left" className="flex flex-1 flex-col items-end pr-[clamp(20px,7vw,40px)] text-right font-serif text-[clamp(1.05rem,4.6vw,1.4rem)] leading-[1.4] tracking-[0.02em] text-ink">
            <span className="block">Bayu</span>
            <span className="block">Nugraha</span>
          </Reveal>

          <Reveal
            variant="reveal2-vline"
            className="min-h-[clamp(240px,60vw,300px)] w-px shrink-0 bg-ink/55"
          >
            <span className="sr-only">divider</span>
          </Reveal>

          <Reveal variant="reveal2-right" className="flex flex-1 flex-col items-start pl-[clamp(20px,7vw,40px)] text-left font-serif text-[clamp(1.05rem,4.6vw,1.4rem)] leading-[1.4] tracking-[0.02em] text-ink">
            <span className="block">Risa Annisa</span>
            <span className="block">Maryani</span>
          </Reveal>
        </div>

        <Reveal variant="reveal2-scale" className="mb-[5vh] mt-auto w-screen max-w-full">
          <Image
            src={images.lineart}
            alt=""
            width={1200}
            height={200}
            className="block h-auto w-full object-cover"
          />
        </Reveal>
      </div>

      <Reveal
        id="married"
        onVisible={onMarriedVisible}
        className={cn(
          "pb-[1vh] text-center font-serif text-[clamp(0.6rem,2.3vw,0.7rem)] leading-none tracking-[0.16em] text-ink",
        )}
      >
        <span>We&apos;re ge</span>
        <span>{display}</span>
        <Caret show={showCaret} />
      </Reveal>
    </section>
  );
}
