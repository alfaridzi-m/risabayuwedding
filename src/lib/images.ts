/** Local assets in /public */
export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectFit?: "cover" | "contain";
  tileBg?: string;
};

export const images = {
  cover: "/photo-1.jpg",
  lineart: "/lineart.gif",
  profileRisa: "/cewk.jpg",
  profileBayu: "/cowk.jpg",
  venueDeco: "/venue.png",
  galleryItems: [
    { src: "/1.jpg", width: 1200, height: 1500 },
    { src: "/2.jpg", width: 1200, height: 1500 },
    {
      src: "/3.png",
      width: 4250,
      height: 5479,
      objectFit: "contain",
    },
    { src: "/4.jpg", width: 1200, height: 1500 },
    {
      src: "/5.png",
      width: 4250,
      height: 5479,
      objectFit: "contain",
      tileBg: "bg-[#ece9e4]",
    },
    { src: "/6.jpg", width: 1200, height: 1500 },
    {
      src: "/7.png",
      width: 4250,
      height: 5366,
      objectFit: "contain",
    },
    { src: "/8.jpg", width: 1800, height: 1200 },
    { src: "/9.jpg", width: 1200, height: 1500 },
  ] as const,
  final: "/final.png",
} as const;

export function toGalleryItem(
  asset: (typeof images.galleryItems)[number],
  alt: string,
): GalleryItem {
  return { ...asset, alt };
}

export type PreloadAsset = {
  src: string;
  width: number;
  height: number;
};

/** All images below the cover — preloaded while the user stays on section 1. */
export function getInvitationPreloadAssets(): PreloadAsset[] {
  return [
    { src: images.lineart, width: 1200, height: 200 },
    { src: images.profileRisa, width: 800, height: 1067 },
    { src: images.profileBayu, width: 800, height: 1067 },
    { src: images.venueDeco, width: 340, height: 280 },
    { src: images.final, width: 1200, height: 800 },
    ...images.galleryItems.map(({ src, width, height }) => ({
      src,
      width,
      height,
    })),
  ];
}

export const invitationAudioSrc = "/audio/song.mp3" as const;
