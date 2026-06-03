"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { images, toGalleryItem, type GalleryItem } from "@/lib/images";
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

const LIGHTBOX_EXIT_MS = 280;

function LightboxNavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const label = direction === "prev" ? "Previous image" : "Next image";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/55 text-white backdrop-blur-md transition-colors hover:bg-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 max-sm:h-9 max-sm:w-9"
      style={direction === "prev" ? { left: "clamp(8px, 2vw, 16px)" } : { right: "clamp(8px, 2vw, 16px)" }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-5 w-5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
      >
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const item = items[index];
  const { src, alt, width, height } = item;
  const [isClosing, setIsClosing] = useState(false);
  const hasMultiple = items.length > 1;

  const requestClose = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(onClose, LIGHTBOX_EXIT_MS);
  }, [onClose]);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }
      if (!hasMultiple) return;
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [requestClose, goPrev, goNext, hasMultiple]);

  const backdropAnim = isClosing
    ? "animate-lightbox-backdrop-out"
    : "animate-lightbox-backdrop-in";
  const panelAnim = isClosing
    ? "animate-lightbox-panel-out"
    : "animate-lightbox-panel-in";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(16px,4vw,32px)]"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery — ${alt}`}
    >
      <button
        type="button"
        className={cn(
          "lightbox-backdrop absolute inset-0 bg-[rgba(20,18,14,0.88)] backdrop-blur-sm motion-reduce:opacity-100",
          backdropAnim,
        )}
        onClick={requestClose}
        aria-label="Close gallery view"
      />

      <div
        className={cn(
          "lightbox-panel relative z-[1] flex max-h-[90vh] w-full max-w-[min(900px,92vw)] flex-col items-end gap-3 motion-reduce:opacity-100",
          panelAnim,
        )}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-ink/55 text-lg leading-none text-white backdrop-blur-md transition-colors hover:bg-ink/70"
        >
          ×
        </button>

        <div className="relative w-full overflow-hidden bg-ink/20 shadow-2xl">
          {hasMultiple && (
            <>
              <LightboxNavButton direction="prev" onClick={goPrev} />
              <LightboxNavButton direction="next" onClick={goNext} />
            </>
          )}

          <div key={src} className="animate-lightbox-image-in motion-reduce:animate-none">
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

        {hasMultiple && (
          <p
            className="w-full text-center font-sans text-[0.7rem] tracking-[0.2em] text-white/70"
            aria-live="polite"
          >
            {index + 1} / {items.length}
          </p>
        )}
      </div>
    </div>
  );
}

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openPhoto = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closePhoto = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const galleryItems: GalleryItem[] = images.galleryItems.map((item, index) =>
    toGalleryItem(item, `Risa & Bayu — moment ${index + 1}`),
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
          {galleryItems.map((item, index) => (
            <GalleryPhoto
              key={item.src}
              item={item}
              objectFit={item.objectFit}
              tileBg={item.tileBg}
              onClick={() => openPhoto(index)}
            />
          ))}
        </div>
      </Reveal>

      {selectedIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          index={selectedIndex}
          onClose={closePhoto}
          onNavigate={setSelectedIndex}
        />
      )}
    </section>
  );
}
