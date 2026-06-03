"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import {
  images,
  toGalleryGraphic,
  toGalleryPhoto,
  type GalleryItem,
} from "@/lib/images";
import { cn } from "@/lib/utils";

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

function GalleryPhoto({
  item,
  onClick,
  objectFit = "cover",
  tileBg,
}: {
  item: GalleryItem;
  onClick: () => void;
  objectFit?: "cover" | "contain";
  tileBg?: string;
}) {
  const { src, alt } = item;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${alt}`}
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
        tileBg ?? (objectFit === "contain" ? "bg-ivory" : "bg-ink/20"),
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, 200px"
        className={cn(
          "transition-transform duration-300 hover:scale-[1.03]",
          objectFit === "contain" ? "object-contain" : "object-cover",
        )}
      />
    </button>
  );
}

function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  const { src, alt, width, height } = item;

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
            width={width}
            height={height}
            className="mx-auto max-h-[calc(90vh-56px)] w-auto max-w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const openPhoto = useCallback((item: GalleryItem) => {
    setSelectedPhoto(item);
  }, []);

  const closePhoto = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const blessingTile = toGalleryGraphic(
    images.galleryBlessing,
    "Blessing — doa untuk pernikahan",
  );
  const foreverTile = toGalleryGraphic(
    images.galleryForever,
    "Forever — ilustrasi",
  );
  const quoteTile = toGalleryGraphic(images.galleryQuote, "Quote — kutipan");

  const photos: GalleryItem[] = images.galleryPhotos.map((src, index) =>
    toGalleryPhoto(src, `Risa & Bayu — moment ${index + 1}`),
  );

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
          <GalleryPhoto item={photos[0]} onClick={() => openPhoto(photos[0])} />
          <GalleryPhoto item={photos[1]} onClick={() => openPhoto(photos[1])} />
          <GalleryPhoto
            item={blessingTile}
            objectFit="contain"
            onClick={() => openPhoto(blessingTile)}
          />

          <GalleryPhoto item={photos[2]} onClick={() => openPhoto(photos[2])} />
          <GalleryPhoto
            item={foreverTile}
            objectFit="contain"
            tileBg="bg-[#ece9e4]"
            onClick={() => openPhoto(foreverTile)}
          />
          <GalleryPhoto item={photos[3]} onClick={() => openPhoto(photos[3])} />

          <GalleryPhoto
            item={quoteTile}
            objectFit="contain"
            onClick={() => openPhoto(quoteTile)}
          />
          <GalleryPhoto item={photos[4]} onClick={() => openPhoto(photos[4])} />
          <GalleryPhoto item={photos[5]} onClick={() => openPhoto(photos[5])} />
        </div>
      </Reveal>

      {selectedPhoto && (
        <GalleryLightbox item={selectedPhoto} onClose={closePhoto} />
      )}
    </section>
  );
}
