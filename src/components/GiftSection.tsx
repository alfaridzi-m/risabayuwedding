"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { BANK_ACCOUNTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type GiftSectionProps = {
  onCopy: (message: string) => void;
};

function CopyButton({
  account,
  onCopy,
}: {
  account: string;
  onCopy: (msg: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(account);
      } else {
        const ta = document.createElement("textarea");
        ta.value = account;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      onCopy("Account number copied");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      onCopy("Copy failed — please copy manually");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "mt-auto flex items-center gap-1.5 border-none bg-transparent pt-3 font-serif text-[0.58rem] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink",
        copied && "text-ink",
      )}
    >
      <svg
        className="h-[11px] w-[11px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <span>{copied ? "Copied ✓" : "Copy"}</span>
    </button>
  );
}

export function GiftSection({ onCopy }: GiftSectionProps) {
  return (
    <section
      id="gift"
      className="relative flex w-full flex-col items-center px-7 py-[clamp(40px,9vw,58px)] pb-[clamp(44px,10vw,64px)]"
    >
      <Reveal className="mx-auto mb-[clamp(32px,7vw,44px)] max-w-[28em] text-center text-[clamp(0.78rem,3.2vw,0.88rem)] leading-[1.75] text-ink/70">
        Your presence and prayers are the greatest gift of all. For those who
        wish to share a token of love, our details are below.
      </Reveal>

      <div className="flex w-full max-w-[400px] items-stretch justify-center">
        <Reveal delay="dl1" className="flex flex-1 flex-col items-center gap-[5px] px-[clamp(10px,3.5vw,20px)] py-[clamp(2px,2vw,8px)] text-center">
          <div className="font-display text-[clamp(1rem,4.4vw,1.2rem)] font-semibold tracking-[0.06em] text-ink">
            {BANK_ACCOUNTS.risa.bank}
          </div>
          <div className="mt-0.5 break-all font-display text-[clamp(0.9rem,4vw,1.05rem)] leading-[1.2] tracking-[0.04em] text-ink">
            {BANK_ACCOUNTS.risa.number}
          </div>
          <div className="text-[clamp(0.62rem,2.8vw,0.7rem)] uppercase leading-[1.4] tracking-[0.04em] text-ink/55">
            {BANK_ACCOUNTS.risa.holder}
          </div>
          <CopyButton account={BANK_ACCOUNTS.risa.number} onCopy={onCopy} />
        </Reveal>

        <Reveal
          delay="dl1"
          variant="reveal2-vline"
          className="w-px shrink-0 self-stretch bg-ink/28"
        >
          <span className="sr-only">divider</span>
        </Reveal>

        <Reveal delay="dl2" className="flex flex-1 flex-col items-center gap-[5px] px-[clamp(10px,3.5vw,20px)] py-[clamp(2px,2vw,8px)] text-center">
          <div className="font-display text-[clamp(1rem,4.4vw,1.2rem)] font-semibold tracking-[0.06em] text-ink">
            {BANK_ACCOUNTS.bayu.bank}
          </div>
          <div className="mt-0.5 break-all font-display text-[clamp(0.9rem,4vw,1.05rem)] leading-[1.2] tracking-[0.04em] text-ink">
            {BANK_ACCOUNTS.bayu.number}
          </div>
          <div className="text-[clamp(0.62rem,2.8vw,0.7rem)] uppercase leading-[1.4] tracking-[0.04em] text-ink/55">
            {BANK_ACCOUNTS.bayu.holder}
          </div>
          <CopyButton account={BANK_ACCOUNTS.bayu.number} onCopy={onCopy} />
        </Reveal>
      </div>
    </section>
  );
}
