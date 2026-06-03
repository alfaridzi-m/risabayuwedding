"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";

type ProfileCardProps = {
  src: string;
  name: string;
  role: "bride" | "groom";
  parents: string;
  parentNames: string;
  delay?: "dl1" | "dl2" | "dl3";
};

function OrnamentalRule({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className ?? ""}`}
      aria-hidden
    >
      <span className="h-px w-[clamp(28px,10vw,48px)] bg-white/20" />
      <span className="font-display text-[0.55rem] tracking-[0.2em] text-white/30">
        ✦
      </span>
      <span className="h-px w-[clamp(28px,10vw,48px)] bg-white/20" />
    </div>
  );
}

function ProfileCard({
  src,
  name,
  role,
  parents,
  parentNames,
  delay,
}: ProfileCardProps) {
  const roleLabel = role === "bride" ? "The Bride" : "The Groom";

  return (
    <Reveal
      delay={delay}
      className="flex w-full max-w-[300px] flex-col items-center text-center"
    >
      <div className="relative mb-8 p-[5px]">
        <div
          className="pointer-events-none absolute inset-0 rounded-sm border border-white/12"
          aria-hidden
        />
        <div className="relative aspect-[3/4] w-[clamp(148px,44vw,192px)] overflow-hidden rounded-sm bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.18)]">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 640px) 44vw, 192px"
            className="object-cover"
          />
        </div>
      </div>

      <p className="mb-3 font-serif text-[clamp(0.68rem,2.8vw,0.76rem)] uppercase tracking-[0.38em] text-white/40">
        {roleLabel}
      </p>

      <h3 className="mb-5 max-w-[16em] font-display text-[clamp(1.55rem,5.8vw,1.9rem)] font-medium leading-[1.2] tracking-[0.04em] text-white">
        {name}
      </h3>

      <OrnamentalRule className="mb-5 w-full" />

      <div className="space-y-1.5">
        <p className="font-serif text-[clamp(0.78rem,3.1vw,0.86rem)] italic leading-[1.7] tracking-[0.03em] text-white/50">
          {parents}
        </p>
        <p className="font-display text-[clamp(0.95rem,3.8vw,1.05rem)] font-normal tracking-[0.02em] text-white/88">
          {parentNames}
        </p>
      </div>
    </Reveal>
  );
}

export function ProfilesSection() {
  return (
    <section
      id="profiles"
      className="relative flex w-full flex-col items-center overflow-hidden bg-[#3d3229] px-6 py-[clamp(64px,11vw,96px)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,248,235,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent"
        aria-hidden
      />

      <Reveal className="relative z-[1] mb-[clamp(48px,10vw,68px)] text-center">
        <p className="mb-4 font-serif text-[clamp(0.68rem,2.6vw,0.76rem)] uppercase tracking-[0.42em] text-white/38">
          Together with their families
        </p>
        <OrnamentalRule className="mb-5" />
        <h2 className="font-display text-[clamp(2rem,7.5vw,2.6rem)] font-medium leading-[1.15] tracking-[0.04em] text-white">
          Bride{" "}
          <span className="font-normal italic text-white/65">&amp;</span> Groom
        </h2>
      </Reveal>

      <div className="relative z-[1] flex w-full max-w-lg flex-col items-center gap-[clamp(56px,12vw,80px)]">
        <ProfileCard
          src={images.profileRisa}
          name="Risa Annisa Maryani"
          role="bride"
          parents="Youngest daughter of"
          parentNames="Muhidin and Mimi"
          delay="dl1"
        />

        <Reveal delay="dl2" className="text-center">
          <span className="font-display text-[clamp(1.6rem,6vw,2rem)] font-light italic text-white/25">
            &amp;
          </span>
        </Reveal>

        <ProfileCard
          src={images.profileBayu}
          name="Bayu Nugraha"
          role="groom"
          parents="Eldest son of"
          parentNames="Bambang Hermanto and Yunita Erminati"
          delay="dl3"
        />
      </div>
    </section>
  );
}
