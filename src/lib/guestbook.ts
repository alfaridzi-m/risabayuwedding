const GUESTBOOK_URL = "/api/guestbook";

export type GuestbookEntry = {
  tanggal: string;
  nama: string;
  ucapan: string;
};

export type Wish = {
  id: string;
  name: string;
  message: string;
  date: string;
};

export function formatGuestbookDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function currentGuestbookDate() {
  return formatGuestbookDate(new Date().toISOString());
}

function toWish(entry: GuestbookEntry, index: number): Wish {
  return {
    id: `${entry.tanggal}-${entry.nama}-${index}`,
    name: entry.nama,
    message: entry.ucapan,
    date: formatGuestbookDate(entry.tanggal),
  };
}

export async function fetchGuestbook(): Promise<Wish[]> {
  const response = await fetch(GUESTBOOK_URL);
  if (!response.ok) throw new Error("Gagal memuat ucapan");

  const data = (await response.json()) as GuestbookEntry[];
  return [...data].reverse().map(toWish);
}

export async function submitGuestbook(entry: GuestbookEntry) {
  const response = await fetch(GUESTBOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!response.ok) throw new Error("Gagal mengirim ucapan");

  const result = (await response.json()) as { status?: string; message?: string };
  if (result.status !== "success") {
    throw new Error(result.message ?? "Gagal mengirim ucapan");
  }
}
