"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  currentGuestbookDate,
  fetchGuestbook,
  submitGuestbook,
  type Wish,
} from "@/lib/guestbook";

export function UcapanSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchGuestbook()
      .then((entries) => {
        if (!cancelled) setWishes(entries);
      })
      .catch(() => {
        if (!cancelled) setError("Ucapan belum dapat dimuat. Silakan coba lagi.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage || submitting) return;

    const tanggal = currentGuestbookDate();
    setSubmitting(true);
    setError("");

    try {
      await submitGuestbook({
        tanggal,
        nama: trimmedName,
        ucapan: trimmedMessage,
      });

      setWishes((prev) => [
        {
          id: crypto.randomUUID(),
          name: trimmedName,
          message: trimmedMessage,
          date: tanggal,
        },
        ...prev,
      ]);
      setName("");
      setMessage("");
    } catch {
      setError("Ucapan gagal dikirim. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="ucapan"
      className="relative flex w-full flex-col items-center px-6 py-[clamp(40px,9vw,58px)]"
    >
      <Reveal className="mb-[10px]">
        <h2 className="font-display text-[clamp(1.8rem,7vw,2.4rem)] font-medium text-ink">
          Guestbook
        </h2>
      </Reveal>

      <Reveal delay="dl1" className="mb-[30px] max-w-[28em] text-center text-[clamp(0.78rem,3.2vw,0.88rem)] leading-[1.75] text-ink/70">
        Tinggalkan pesan dan harapan untuk kami berdua.
      </Reveal>

      <Reveal delay="dl2" className="mb-[40px] w-full max-w-[400px]">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
            required
            disabled={submitting}
            className="w-full rounded-sm border border-ink/30 bg-transparent px-[14px] py-[14px] font-serif text-base text-ink outline-none transition-[border-color] placeholder:text-ink/40 focus:border-ink disabled:opacity-60"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ucapan & Doa"
            required
            rows={3}
            disabled={submitting}
            className="min-h-[90px] w-full resize-y rounded-sm border border-ink/30 bg-transparent px-[14px] py-[14px] font-serif text-base leading-[1.6] text-ink outline-none transition-[border-color] placeholder:text-ink/40 focus:border-ink disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-sm bg-ink px-6 py-[14px] font-serif text-[0.7rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ink/85 disabled:opacity-60"
          >
            {submitting ? "Mengirim..." : "Kirim Ucapan"}
          </button>
          {error ? (
            <p className="text-center font-serif text-[0.78rem] text-red-700/80">
              {error}
            </p>
          ) : null}
        </form>
      </Reveal>

      <Reveal delay="dl3" className="w-full max-w-[400px]">
        {loading ? (
          <p className="text-center font-serif text-[0.85rem] text-ink/50">
            Memuat ucapan...
          </p>
        ) : wishes.length === 0 ? (
          <p className="text-center font-serif text-[0.85rem] text-ink/50">
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        ) : (
          <ul className="flex max-h-[350px] flex-col gap-5 overflow-y-auto pr-2 text-left [scrollbar-width:thin]">
            {wishes.map((wish) => (
              <li
                key={wish.id}
                className="border-b border-ink/15 pb-[15px] last:border-0"
              >
                <div className="mb-[6px] flex items-baseline justify-between">
                  <span className="font-serif text-[1.05rem] font-semibold text-ink">
                    {wish.name}
                  </span>
                  <span className="font-serif text-[0.65rem] tracking-[0.05em] text-ink/50">
                    {wish.date}
                  </span>
                </div>
                <p className="font-serif text-[0.85rem] leading-[1.5] text-ink/85">
                  {wish.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
