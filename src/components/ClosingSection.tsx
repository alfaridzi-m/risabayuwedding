"use client";

import { HeartIcon } from "@/components/icons/HeartIcon";
import { Reveal } from "@/components/Reveal";

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="relative flex w-full flex-col items-center px-[30px] pb-[clamp(40px,9vw,58px)] pt-[clamp(5px,3vw,20px)] text-center"
    >
      <Reveal className="mb-[14px] font-display text-[clamp(3.4rem,16vw,5rem)] leading-[0.6] text-ink/22">
        &ldquo;
      </Reveal>

      <Reveal delay="dl1" className="mx-auto max-w-[16em] font-display text-[clamp(1.5rem,6.6vw,2.2rem)] font-normal italic leading-[1.45] text-ink">
        Love is composed of a single soul inhabiting two bodies.
      </Reveal>

      <Reveal delay="dl2" className="my-[clamp(28px,6vw,38px)] flex items-center justify-center gap-[14px]">
        <span className="h-px w-[44px] bg-ink/30" />
        <HeartIcon className="h-[17px] w-[17px] text-ink/50" />
        <span className="h-px w-[44px] bg-ink/30" />
      </Reveal>

      <Reveal delay="dl3" className="mt-5 text-[clamp(0.68rem,2.8vw,0.78rem)] uppercase tracking-[0.24em] text-ink/55">
        With love &amp; gratitude
      </Reveal>

      <Reveal delay="dl3" className="mt-3 font-display text-[clamp(1.9rem,9vw,2.8rem)] font-medium leading-[1.1] tracking-[0.02em] text-ink">
        Risa{" "}
        <span className="mx-[0.12em] font-normal italic text-ink/70">&amp;</span>{" "}
        Bayu
      </Reveal>
    </section>
  );
}
