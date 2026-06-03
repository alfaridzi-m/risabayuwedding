"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";

type ProfileCardProps = {
  src: string;
  name: string;
  role: string;
  parents: string;
  parentNames: string;
  delay?: "dl1" | "dl2" | "dl3";
};

function ProfileCard({ src, name, role, parents, parentNames, delay }: ProfileCardProps) {
  return (
    <Reveal delay={delay} className="mb-[50px] flex flex-col items-center last:mb-0">
      <div className="relative mb-6 size-[200px] rounded-2xl border border-[#c9a85c] p-[6px] before:absolute before:inset-[-6px] before:rounded-[22px] before:border before:border-dashed before:border-[rgba(201,168,92,0.6)]">
        <Image
          src={src}
          alt={name}
          fill
          sizes="200px"
          className="rounded-xl object-cover"
        />
      </div>
      <h3 className="mb-[6px] font-display text-[clamp(1.6rem,7vw,2rem)] font-medium text-[#f3ead8]">
        {name}
      </h3>
      <p className="font-serif text-[clamp(0.75rem,3.5vw,0.9rem)] italic leading-[1.5] text-[rgba(243,234,216,0.7)]">
        {parents} <br />
        <strong className="block font-normal not-italic text-[rgba(243,234,216,0.9)]">
          {parentNames}
        </strong>
      </p>
    </Reveal>
  );
}

export function ProfilesSection() {
  return (
    <section
      id="profiles"
      className="relative flex w-full flex-col items-center overflow-hidden bg-ink px-6 py-[clamp(60px,10vw,80px)] text-center"
    >
      {/* Corner decorations */}
      {(["tl", "tr", "bl", "br"] as const).map((pos) => (
        <span
          key={pos}
          className="absolute h-[40px] w-[40px] border-[#c9a85c] opacity-40"
          style={{
            top: pos.startsWith("t") ? 15 : "auto",
            bottom: pos.startsWith("b") ? 15 : "auto",
            left: pos.endsWith("l") ? 15 : "auto",
            right: pos.endsWith("r") ? 15 : "auto",
            borderTopWidth: pos.startsWith("t") ? 1 : 0,
            borderBottomWidth: pos.startsWith("b") ? 1 : 0,
            borderLeftWidth: pos.endsWith("l") ? 1 : 0,
            borderRightWidth: pos.endsWith("r") ? 1 : 0,
            borderTopLeftRadius: pos === "tl" ? 15 : 0,
            borderTopRightRadius: pos === "tr" ? 15 : 0,
            borderBottomLeftRadius: pos === "bl" ? 15 : 0,
            borderBottomRightRadius: pos === "br" ? 15 : 0,
          }}
          aria-hidden
        />
      ))}

      <Reveal className="relative z-[2] mb-[50px] leading-[0.8]">
        <h2 className="font-script text-[clamp(3.5rem,12vw,4.5rem)] text-[#c9a85c] [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
          Bride &amp;
          <span className="mt-[5px] block font-display text-[0.35em] font-normal uppercase not-italic tracking-[0.3em]">
            GROOM
          </span>
        </h2>
      </Reveal>

      <ProfileCard
        src={images.profileRisa}
        name="Risa Annisa Maryani"
        role="bride"
        parents="Youngest daughter of"
        parentNames="Muhidin and Mimi"
        delay="dl1"
      />

      <ProfileCard
        src={images.profileBayu}
        name="Bayu Nugraha"
        role="groom"
        parents="Eldest son of"
        parentNames="Bambang Hermanto and Yunita Erminati"
        delay="dl2"
      />
    </section>
  );
}
