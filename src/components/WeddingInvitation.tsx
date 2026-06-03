"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClosingSection } from "@/components/ClosingSection";
import { CountdownSection } from "@/components/CountdownSection";
import { CoupleSection } from "@/components/CoupleSection";
import { CoverSection } from "@/components/CoverSection";
import { InvitationAssetPreloader } from "@/components/InvitationAssetPreloader";
import { EventSection } from "@/components/EventSection";
import { FinalSection } from "@/components/FinalSection";
import { GallerySection } from "@/components/GallerySection";
import { GiftSection } from "@/components/GiftSection";
import { UcapanSection } from "@/components/UcapanSection";
import { MusicToggle } from "@/components/MusicToggle";
import { ProfilesSection } from "@/components/ProfilesSection";
import { Toast } from "@/components/Toast";
import { invitationAudioSrc } from "@/lib/images";

export function WeddingInvitation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const unmutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const reflectPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(!audio.paused && !audio.muted);
  }, []);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(reflectPlaying).catch(() => {});
  }, [reflectPlaying]);

  const tryPlayRef = useRef(tryPlay);
  tryPlayRef.current = tryPlay;
  const startSoundRef = useRef<() => void>(() => {});

  const startSound = useCallback(() => {
    if (unmutedRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    unmutedRef.current = true;
    audio.muted = false;
    audio.currentTime = 0;
    tryPlay();
  }, [tryPlay]);

  startSoundRef.current = startSound;

  const handleOpen = useCallback(() => {
    if (!assetsReady) return;
    setInvitationOpened(true);
    startSound();
    document.getElementById("next")?.scrollIntoView({ behavior: "smooth" });
  }, [assetsReady, startSound]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToCover = () => {
      window.scrollTo(0, 0);
    };

    scrollToCover();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scrollToCover();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (invitationOpened) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const blockScroll = (event: Event) => event.preventDefault();

    const scrollKeys = new Set([
      " ",
      "PageDown",
      "PageUp",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End",
    ]);
    const blockKeyScroll = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) event.preventDefault();
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeyScroll);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockKeyScroll);
    };
  }, [invitationOpened]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    unmutedRef.current = true;
    audio.muted = false;
    if (audio.paused) tryPlay();
    else audio.pause();
    reflectPlaying();
  }, [tryPlay, reflectPlaying]);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2200,
    );
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 1;
    tryPlayRef.current();

    const retryIfPaused = () => {
      if (audio.paused) tryPlayRef.current();
    };
    audio.addEventListener("canplay", retryIfPaused);
    audio.addEventListener("loadeddata", retryIfPaused);

    const unlock = () => startSoundRef.current();
    const once = { once: true, passive: true } as AddEventListenerOptions;
    for (const event of ["pointerdown", "click"] as const) {
      window.addEventListener(event, unlock, once);
    }

    audio.addEventListener("play", reflectPlaying);
    audio.addEventListener("pause", reflectPlaying);
    audio.addEventListener("volumechange", reflectPlaying);

    return () => {
      audio.removeEventListener("canplay", retryIfPaused);
      audio.removeEventListener("loadeddata", retryIfPaused);
      for (const event of ["pointerdown", "click"] as const) {
        window.removeEventListener(event, unlock);
      }
      audio.removeEventListener("play", reflectPlaying);
      audio.removeEventListener("pause", reflectPlaying);
      audio.removeEventListener("volumechange", reflectPlaying);
    };
    // Mount-only: must not re-run and reset audio.muted after the user unmutes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Replace /audio/song.mp3 with your track in public/audio */}
      <audio
        ref={audioRef}
        src={invitationAudioSrc}
        loop
        preload="auto"
        playsInline
      />

      <MusicToggle playing={playing} onToggle={toggleMusic} />
      <Toast message={toast.message} show={toast.show} />

      <InvitationAssetPreloader onReady={() => setAssetsReady(true)} />

      <div className="paper-texture relative overflow-x-hidden">
        <CoverSection onOpen={handleOpen} assetsReady={assetsReady} />
        <CoupleSection />
        <CountdownSection />
        <ProfilesSection />
        <EventSection />
        <GallerySection />
        <GiftSection onCopy={showToast} />
        <UcapanSection />
        <ClosingSection />
        <FinalSection />
      </div>
    </>
  );
}
