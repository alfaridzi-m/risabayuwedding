"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Toast } from "@/components/Toast";
import {
  buildInvitationMessage,
  buildInvitationUrl,
} from "@/lib/invitation-message";
import { cn } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

export function InvitationGenerator() {
  const [guestName, setGuestName] = useState("");
  const [baseUrl, setBaseUrl] = useState(SITE_URL);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    if (!SITE_URL && typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const invitationUrl = useMemo(
    () => buildInvitationUrl(guestName, baseUrl),
    [guestName, baseUrl],
  );

  const message = useMemo(
    () => buildInvitationMessage(guestName, invitationUrl),
    [guestName, invitationUrl],
  );

  const canCopy = message.length > 0;

  const showToast = useCallback((text: string) => {
    setToast({ show: true, message: text });
    const id = window.setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2200,
    );
    return () => window.clearTimeout(id);
  }, []);

  const copyMessage = async () => {
    if (!canCopy) return;
    try {
      await navigator.clipboard.writeText(message);
      showToast("Pesan disalin");
    } catch {
      showToast("Gagal menyalin");
    }
  };

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col px-6 py-10">
      <header className="mb-8 text-center">
        <p className="font-[family-name:var(--font-tangerine)] text-4xl text-ink/80">
          Generator
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl font-medium tracking-wide text-ink">
          Template &amp; Link Undangan
        </h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
          Masukkan nama tamu untuk membuat pesan undangan dan link
          personal.
        </p>
      </header>

      <label className="block">
        <span className="text-[0.7rem] uppercase tracking-[0.14em] text-ink/60">
          Nama tamu
        </span>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Contoh: STMKG 2016"
          className={cn(
            "mt-2 w-full border border-ink/15 bg-ivory px-4 py-3",
            "font-[family-name:var(--font-eb-garamond)] text-base text-ink",
            "outline-none transition-colors placeholder:text-ink/35",
            "focus:border-ink/35",
          )}
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      {invitationUrl ? (
        <p className="mt-4 break-all text-[0.8rem] text-ink/55">
          Link:{" "}
          <a
            href={invitationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/80 underline-offset-2 hover:underline"
          >
            {invitationUrl}
          </a>
        </p>
      ) : null}

      <label className="mt-6 flex flex-1 flex-col">
        <span className="text-[0.7rem] uppercase tracking-[0.14em] text-ink/60">
          Pesan undangan
        </span>
        <textarea
          readOnly
          value={message}
          rows={16}
          className={cn(
            "mt-2 w-full flex-1 resize-none border border-ink/15 bg-ivory px-4 py-3",
            "font-[family-name:var(--font-eb-garamond)] text-[0.95rem] leading-relaxed text-ink",
            "outline-none",
          )}
          placeholder="Isi nama tamu di atas untuk melihat pesan…"
        />
      </label>

      <button
        type="button"
        onClick={copyMessage}
        disabled={!canCopy}
        className={cn(
          "mt-6 w-full border border-ink bg-ink py-3.5",
          "text-[0.7rem] uppercase tracking-[0.16em] text-ivory",
          "transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
          "hover:enabled:opacity-90",
        )}
      >
        Salin pesan
      </button>

      <Toast message={toast.message} show={toast.show} />
    </main>
  );
}
