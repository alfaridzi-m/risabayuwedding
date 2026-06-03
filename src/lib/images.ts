/** Local assets in /public */
export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const GALLERY_PHOTO_SIZE = 600;

export const images = {
  cover: "/photo-1.jpg",
  lineart: "/lineart.gif",
  profileRisa: "https://images.unsplash.com/photo-1541250848049-b4f71426cad8?auto=format&fit=crop&q=80&w=500",
  profileBayu: "https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&q=80&w=500",
  venueDeco: "/venue.png",
  galleryPhotos: [
    "https://picsum.photos/seed/gallery-risa-bayu-1/600/600",
    "https://picsum.photos/seed/gallery-risa-bayu-2/600/600",
    "https://picsum.photos/seed/gallery-risa-bayu-3/600/600",
    "https://picsum.photos/seed/gallery-risa-bayu-4/600/600",
    "https://picsum.photos/seed/gallery-risa-bayu-5/600/600",
    "https://picsum.photos/seed/gallery-risa-bayu-6/600/600",
  ] as const,
  galleryBlessing: {
    src: "/1.png",
    width: 4250,
    height: 5479,
  },
  galleryForever: {
    src: "/2.png",
    width: 4250,
    height: 5366,
  },
  galleryQuote: {
    src: "/3.png",
    width: 4250,
    height: 5479,
  },
  final: "/final.png",
} as const;

export function toGalleryPhoto(src: string, alt: string): GalleryItem {
  return {
    src,
    alt,
    width: GALLERY_PHOTO_SIZE,
    height: GALLERY_PHOTO_SIZE,
  };
}

export function toGalleryGraphic(
  asset: { src: string; width: number; height: number },
  alt: string,
): GalleryItem {
  return { ...asset, alt };
}
