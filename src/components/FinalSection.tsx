"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";

export function FinalSection() {
  return (
    <>
      <section id="final" className="relative w-full overflow-hidden p-0">
        <Reveal variant="reveal2-scale" className="w-full">
          <Image
            src={images.final}
            alt="Risa & Bayu"
            width={1200}
            height={800}
            className="block h-auto w-full"
          />
        </Reveal>
      </section>

      <p className="w-full px-5 py-[26px] pb-[calc(env(safe-area-inset-bottom)+26px)] text-center text-[0.58rem] uppercase tracking-[0.22em] text-ink/40">
        11 . 06 . 2026
      </p>
    </>
  );
}
