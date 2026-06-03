# Risa & Bayu — Wedding Invitation (Next.js)

Next.js upgrade of the static invitation in `weddingofmyown/index.html`, using Tailwind CSS and placeholder images.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Assets

- **Images**: Dummy URLs from `picsum.photos` / `placehold.co` in `src/lib/images.ts`. Replace with files in `public/` and update paths when ready.
- **Music**: Add `public/audio/song.mp3` (copy from `weddingofmyown/asset/song.mp3` if available).
- **Real photos**: Copy assets from `weddingofmyown/asset/` into `public/images/` and point `images.ts` to `/images/...`.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Google Fonts via `next/font`

## Features (from original HTML)

- Cover hero with open invitation CTA
- Couple names & typing animation
- Countdown to 11 June 2026
- Event details & maps link
- Gift / bank copy buttons
- Scroll reveal animations
- Background music toggle (requires `song.mp3`)
