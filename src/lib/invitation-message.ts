const DEFAULT_BASE_PATH = "/";

/** Build `?to=` query value from the guest label (e.g. "STMKG 2016"). */
export function guestNameToQueryValue(name: string): string {
  return encodeURIComponent(name.trim());
}

export function buildInvitationUrl(
  guestName: string,
  baseUrl: string,
  basePath = DEFAULT_BASE_PATH,
): string {
  const trimmed = guestName.trim();
  if (!trimmed) return "";

  const origin = baseUrl.replace(/\/$/, "");
  const path = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const normalizedPath = path === "/" ? "" : path.replace(/\/$/, "");

  return `${origin}${normalizedPath}?to=${guestNameToQueryValue(trimmed)}`;
}

export function buildInvitationMessage(
  guestName: string,
  invitationUrl: string,
): string {
  const label = guestName.trim();
  if (!label) return "";

  return `Kepada Yth.
Bapak/Ibu/Saudara/i
${label}
di tempat

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara Resepsi Pernikahan Kami

Info lebih lengkap klik link dibawah ini
${invitationUrl}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Kami yang berbahagia
Keluarga Kedua Mempelai

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini.`;
}
