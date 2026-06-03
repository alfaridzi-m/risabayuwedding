"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { formatGuestNameFromSlug } from "@/lib/guest";
import { images } from "@/lib/images";

function CoverGuestGreeting() {
  const searchParams = useSearchParams();
  const guestName = formatGuestNameFromSlug(searchParams.get("to"));

  if (!guestName) return null;

  return (
    <p className="animate-rise-d1 mb-6 font-serif text-[clamp(0.9rem,3.8vw,1.05rem)] font-semibold not-italic tracking-[0.06em] text-[#f3ead8] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
      To&nbsp;: {guestName}
    </p>
  );
}

type CoverSectionProps = {
  onOpen: () => void;
  assetsReady: boolean;
};

export function CoverSection({ onOpen, assetsReady }: CoverSectionProps) {
  return (
    <section
      id="cover"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-ink text-center text-ivory"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={images.cover}
          alt=""
          fill
          priority
          className="object-cover animate-slow-zoom scale-[1.04]"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(20,18,14,0.72)] via-[rgba(20,18,14,0.56)] to-[rgba(20,18,14,0.88)]"
        aria-hidden
      />

      <div className="relative z-[2] flex max-w-[560px] flex-1 flex-col items-center justify-center px-[34px] pt-[calc(env(safe-area-inset-top)+64px)] pb-[calc(env(safe-area-inset-bottom)+64px)]">
        <Suspense fallback={null}>
          <CoverGuestGreeting />
        </Suspense>
        <p className="animate-rise-d1 max-w-[23em] font-serif text-[clamp(0.82rem,3.6vw,0.98rem)] italic leading-[1.85] tracking-[0.01em] text-[#f3ead8] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          You&apos;re invited to witness the moment where our shared blueprint
          begins to take shape
          <span className="mt-4 block font-serif text-[0.96em] font-semibold not-italic tracking-[0.02em] text-[#f3ead8]">
            From Sketch to Structure — It&apos;s time to Say&nbsp;&apos;I&nbsp;Do&apos;
          </span>
        </p>

        <div className="animate-rise-d2 my-[42px] flex items-center justify-center gap-[14px]">
          <span className="h-px w-[46px] bg-white/50" />
          <HeartIcon className="h-[18px] w-[18px] text-white" />
          <span className="h-px w-[46px] bg-white/50" />
        </div>

        <h1 className="animate-rise-d3 font-script text-[clamp(3.4rem,15vw,5.4rem)] font-bold leading-[0.95] text-white [text-shadow:0_2px_22px_rgba(0,0,0,0.6)]">
          Risa{" "}
          <span className="inline-block translate-y-[-0.18em] align-middle font-display text-[0.32em] font-normal italic text-[#f3ead8]">
            &amp;
          </span>{" "}
          Bayu
        </h1>
      </div>

      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+22px)] left-1/2 z-[2] -translate-x-1/2">
        <button
          type="button"
          onClick={onOpen}
          disabled={!assetsReady}
          aria-label={assetsReady ? "Buka Undangan" : "Menyiapkan undangan"}
          aria-busy={!assetsReady}
          className="animate-rise-d5 group flex flex-col items-center gap-[10px] border-none bg-transparent font-serif text-white transition-opacity disabled:pointer-events-none disabled:opacity-45"
        >
          <span className="relative pb-[6px] text-[0.7rem] uppercase tracking-[0.32em] text-[#f3ead8] transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-white after:transition-[width] after:duration-500 group-enabled:hover:after:w-full">
            {assetsReady ? "Buka Undangan" : "Menyiapkan…"}
          </span>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/50 transition-[background,border-color] group-hover:border-white group-hover:bg-white/10">
            <svg
              className="h-[13px] w-[13px] transition-transform group-hover:translate-y-[3px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
