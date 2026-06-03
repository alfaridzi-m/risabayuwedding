/** Turn `?to=budi-santoso` into display name "Budi Santoso". */
export function formatGuestNameFromSlug(
  slug: string | null | undefined,
): string | null {
  if (!slug?.trim()) return null;

  let decoded = slug.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // keep raw slug if decoding fails
  }

  const name = decoded
    .replace(/[-_+]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!name) return null;

  return name
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
}
