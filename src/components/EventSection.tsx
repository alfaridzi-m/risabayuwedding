"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { MAPS_URL } from "@/lib/constants";
import { images } from "@/lib/images";

export function EventSection() {
  return (
    <section
      id="event"
      className="relative z-[2] mx-[clamp(22px,7vw,48px)] my-[clamp(40px,8vw,60px)] flex h-[914px] flex-col items-center overflow-visible rounded-none border border-ink/35 bg-ivory px-[clamp(20px,5vw,36px)] py-[clamp(60px,13vw,100px)] shadow-[0_4px_28px_rgba(46,42,35,0.07)]"
    >
      <div className="relative z-[1] flex w-full max-w-full flex-col items-center">
        <Reveal className="mb-[clamp(46px,10vw,70px)] text-center">
          <div className="mb-0.5 text-[clamp(0.68rem,2.8vw,0.76rem)] uppercase tracking-[0.32em] text-ink/55">
            Thursday
          </div>
          <div className="font-['Apple_Color_Emoji'] text-[clamp(2.6rem,15vw,4rem)] font-medium leading-none text-ink">
            11
          </div>
          <div className="mt-[6px] font-display text-[clamp(0.98rem,4.6vw,1.28rem)] italic tracking-[0.04em] text-ink/80">
            June 2026
          </div>
        </Reveal>

        <div className="mb-[clamp(50px,11vw,76px)] flex w-full items-stretch justify-center gap-[clamp(16px,4vw,32px)]">
          <Reveal delay="dl1" className="flex flex-1 flex-col items-center justify-start gap-[clamp(12px,3vw,20px)] px-[clamp(8px,3vw,18px)] py-[clamp(8px,3vw,18px)] text-center">
            <div className="font-display text-[clamp(1.3rem,6vw,1.8rem)] font-medium tracking-[0.03em] text-ink">
              The Ceremony
            </div>
            <div className="text-[clamp(0.88rem,3.8vw,1.02rem)] leading-[1.6] tracking-[0.06em] text-ink/85">
              08.30
              <br />—<br />
              10.00
            </div>
          </Reveal>

          <Reveal
            delay="dl1"
            variant="reveal2-vline"
            className="w-px shrink-0 self-stretch bg-ink/28"
          >
            <span className="sr-only">divider</span>
          </Reveal>

          <Reveal delay="dl2" className="flex flex-1 flex-col items-center justify-start gap-[clamp(12px,3vw,20px)] px-[clamp(8px,3vw,18px)] py-[clamp(8px,3vw,18px)] text-center">
            <div className="font-display text-[clamp(1.3rem,6vw,1.8rem)] font-medium tracking-[0.03em] text-ink">
              The Reception
            </div>
            <div className="text-[clamp(0.88rem,3.8vw,1.02rem)] leading-[1.6] tracking-[0.06em] text-ink/85">
              10.00
              <br />—<br />
              19.00
            </div>
          </Reveal>
        </div>

        <Reveal delay="dl3" className="mb-[clamp(24px,5vw,34px)] max-w-[28em] text-center text-[clamp(0.72rem,3vw,0.82rem)] leading-[1.75] text-ink/80">
          Let&apos;s celebrate love, laughter, and the start of our new chapter
          together. Join us for a joyful day filled with stories, smiles and
          shared moments.
        </Reveal>

        <Reveal
          delay="dl3"
          className="relative flex w-full flex-col items-center text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-12px] bottom-[-8px] top-[-20px] -z-[1] rounded-sm bg-ivory/90 shadow-[0_0_24px_12px_rgba(253,250,244,0.85)]"
          />
          <svg
            className="my-[clamp(4px,2vw,8px)] mb-[clamp(12px,3vw,18px)] h-5 w-5 text-ink/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className="mb-[clamp(14px,3.5vw,20px)] max-w-[24em] text-[clamp(0.9rem,4vw,1.05rem)] leading-[1.7] text-ink">
            Kp. Cilukut RT 010/003, Cimangeunteung,
            <br />
            Rangkasbitung
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-ink/65 px-5 py-2 font-serif text-[clamp(0.56rem,2.4vw,0.64rem)] uppercase tracking-[0.16em] text-white transition-[background,transform] hover:-translate-y-px hover:bg-ink/85"
          >
            See Location
          </a>
        </Reveal>
      </div>

      <Image
        src={images.venueDeco}
        alt=""
        width={340}
        height={280}
        aria-hidden
        className="pointer-events-none absolute bottom-[clamp(-61px,-8vw,-26px)] left-[clamp(-52px,-8vw,-26px)] z-10 h-auto w-[clamp(210px,54vw,340px)] select-none opacity-90"
      />
    </section>
  );
}
