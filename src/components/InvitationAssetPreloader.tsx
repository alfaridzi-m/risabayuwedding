"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  getInvitationPreloadAssets,
  invitationAudioSrc,
} from "@/lib/images";

type InvitationAssetPreloaderProps = {
  onReady: () => void;
};

const PRELOAD_ASSETS = getInvitationPreloadAssets();
const PRELOAD_TIMEOUT_MS = 20_000;

export function InvitationAssetPreloader({
  onReady,
}: InvitationAssetPreloaderProps) {
  const pendingRef = useRef(PRELOAD_ASSETS.length + 1);
  const finishedRef = useRef(false);

  const markLoaded = useCallback(() => {
    if (finishedRef.current) return;
    pendingRef.current -= 1;
    if (pendingRef.current <= 0) {
      finishedRef.current = true;
      onReady();
    }
  }, [onReady]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    const finishAudio = () => markLoaded();
    audio.addEventListener("canplaythrough", finishAudio, { once: true });
    audio.addEventListener("error", finishAudio, { once: true });
    audio.src = invitationAudioSrc;
    audio.load();

    const timeout = window.setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onReady();
      }
    }, PRELOAD_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeout);
      audio.removeEventListener("canplaythrough", finishAudio);
      audio.removeEventListener("error", finishAudio);
    };
  }, [markLoaded, onReady]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-50 h-0 w-0 overflow-hidden opacity-0"
    >
      {PRELOAD_ASSETS.map(({ src, width, height }) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={width}
          height={height}
          loading="eager"
          onLoad={markLoaded}
          onError={markLoaded}
        />
      ))}
    </div>
  );
}
