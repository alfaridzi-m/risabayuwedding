"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";

type GalleryPhotoData = { src: string; alt: string };

function GalleryLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      className="mb-[clamp(10px,2.5vw,14px)] h-[clamp(28px,7vw,36px)] w-[clamp(28px,7vw,36px)] text-white"
    >
      <path
        d="M24 2 L46 24 L24 46 L2 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M24 10 L38 24 L24 38 L10 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M24 16 L32 24 L24 32 L16 24 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function GalleryPhoto({ src, alt, onClick }: GalleryPhotoData & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${alt}`}
      className="relative aspect-square overflow-hidden bg-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, 200px"
        className="object-cover transition-transform duration-300 hover:scale-[1.03]"
      />
    </button>
  );
}

function GalleryLightbox({ src, alt, onClose }: GalleryPhotoData & { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(16px,4vw,32px)]"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(20,18,14,0.88)] backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close gallery view"
      />

      <div className="relative z-[1] flex max-h-[90vh] w-full max-w-[min(900px,92vw)] flex-col items-end gap-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-ink/55 text-lg leading-none text-white backdrop-blur-md transition-colors hover:bg-ink/70"
        >
          ×
        </button>

        <div className="relative w-full overflow-hidden bg-ink/20 shadow-2xl">
          <Image
            src={src}
            alt={alt}
            width={900}
            height={900}
            className="mx-auto max-h-[calc(90vh-56px)] w-auto max-w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function BlessingTile() {
  return (
    <div className="flex aspect-square flex-col items-center justify-center bg-ivory px-[clamp(8px,2.5vw,14px)] py-[clamp(10px,2.5vw,16px)] text-center">
      <svg viewBox="0 0 120 32" aria-hidden className="mb-[clamp(6px,1.5vw,10px)] h-[clamp(14px,3.5vw,20px)] w-auto text-ink/75">
        <path
          d="M8 26 C18 8 28 8 38 26 M42 26 C52 8 62 8 72 26 M76 26 C86 8 96 8 106 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <p className="font-serif text-[clamp(0.42rem,1.55vw,0.58rem)] leading-[1.65] tracking-[0.01em] text-ink/85">
        May your next chapter be marriage. May it be easy, beautiful, and filled with blessings. May it be a
        union that brings you closer to Allah, a love that takes care of your heart and strengthen your faith.
      </p>
    </div>
  );
}

function ForeverTile() {
  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#ece9e4]">
      <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 h-full w-full text-ink/55">
        <path
          d="M58 118 C58 92 72 78 92 78 C104 78 112 84 118 94 C124 84 132 78 144 78 C164 78 178 92 178 118 C178 148 118 168 118 168 C118 168 58 148 58 118 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M42 118 C42 92 56 78 76 78 C88 78 96 84 102 94"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          transform="translate(-18 8) scale(0.72)"
        />
        <path
          d="M20 70 Q100 20 180 70"
          fill="none"
          stroke="#c0392b"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <ellipse cx="62" cy="132" rx="16" ry="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="138" cy="132" rx="16" ry="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="relative z-[1] font-script text-[clamp(1.4rem,5.5vw,2rem)] leading-none text-ink/80">
        Forever
      </span>
    </div>
  );
}

function QuoteTile() {
  return (
    <div className="flex aspect-square items-center justify-center bg-ivory px-[clamp(10px,2.8vw,16px)] py-[clamp(8px,2vw,12px)] text-center">
      <p className="font-script text-[clamp(0.95rem,3.8vw,1.35rem)] leading-[1.35] text-ink/85">
        And I&apos;d choose you in a hundred lifetimes, in a hundred worlds, in any version of reality —
        I&apos;d find you and I&apos;d choose you every time
        <span className="mt-1 block text-[0.72em] not-italic opacity-70">xo</span>
      </p>
    </div>
  );
}

export function GallerySection() {
  const [p1, p2, p3, p4, p5, p6] = images.galleryPhotos;
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoData | null>(null);

  const openPhoto = useCallback((photo: GalleryPhotoData) => {
    setSelectedPhoto(photo);
  }, []);

  const closePhoto = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const photos: GalleryPhotoData[] = [
    { src: p1, alt: "Risa & Bayu — moment 1" },
    { src: p2, alt: "Risa & Bayu — moment 2" },
    { src: p3, alt: "Risa & Bayu — moment 3" },
    { src: p4, alt: "Risa & Bayu — moment 4" },
    { src: p5, alt: "Risa & Bayu — moment 5" },
    { src: p6, alt: "Risa & Bayu — moment 6" },
  ];

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden bg-[#3d3229] px-[clamp(10px,2.8vw,20px)] py-[clamp(36px,8vw,56px)]"
    >
      <Reveal variant="reveal2-scale" className="mx-auto flex w-full max-w-[640px] flex-col items-center">
        <GalleryLogo />
        <h2 className="mb-[clamp(18px,4vw,28px)] font-sans text-[clamp(0.72rem,2.6vw,0.82rem)] font-semibold uppercase tracking-[0.42em] text-white">
          Gallery
        </h2>

        <div className="grid w-full grid-cols-3 gap-[3px]">
          <GalleryPhoto {...photos[0]} onClick={() => openPhoto(photos[0])} />
          <GalleryPhoto {...photos[1]} onClick={() => openPhoto(photos[1])} />
          <BlessingTile />

          <GalleryPhoto {...photos[2]} onClick={() => openPhoto(photos[2])} />
          <ForeverTile />
          <GalleryPhoto {...photos[3]} onClick={() => openPhoto(photos[3])} />

          <QuoteTile />
          <GalleryPhoto {...photos[4]} onClick={() => openPhoto(photos[4])} />
          <GalleryPhoto {...photos[5]} onClick={() => openPhoto(photos[5])} />
        </div>
      </Reveal>

      {selectedPhoto && (
        <GalleryLightbox src={selectedPhoto.src} alt={selectedPhoto.alt} onClose={closePhoto} />
      )}
    </section>
  );
}
