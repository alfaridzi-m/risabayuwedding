import type { Metadata, Viewport } from "next";
import { ScrollRestore } from "@/components/ScrollRestore";
import { WEDDING_DATE } from "@/lib/constants";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Tangerine,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const LOCATION_TEXT =
  "Kp. Cilukut RT 010/003, Cimangeunteung, Rangkasbitung";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBaseUrl = new URL(siteUrl ?? "http://localhost:3000");

export const metadata: Metadata = {
  title: "Risa & Bayu — Undangan Pernikahan",
  description:
    "Undangan pernikahan Risa & Bayu — Kamis, 11 Juni 2026. Yuk hadiri resepsi kami di Rangkasbitung.",
  robots: { index: true, follow: true },
  metadataBase: metadataBaseUrl,
  openGraph: {
    title: "Risa & Bayu — Undangan Pernikahan",
    description:
      "Kamis, 11 Juni 2026 — Undangan pernikahan Risa & Bayu. Buka undangannya & lihat lokasinya.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/final.png",
        width: 1289,
        height: 717,
        alt: "Risa & Bayu Wedding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risa & Bayu — Undangan Pernikahan",
    description:
      "Kamis, 11 Juni 2026 — Undangan pernikahan Risa & Bayu. Buka undangannya & lihat lokasinya.",
    images: ["/final.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6efdd",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="816x714"
          href="/final-ico.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="816x714"
          href="/final-ico.png"
        />
      </head>
      <body
        className={`${cormorant.variable} ${ebGaramond.variable} ${tangerine.variable} min-h-svh antialiased`}
      >
        <ScrollRestore />
        <script
          type="application/ld+json"
          // JSON-LD helps search engines understand this is a wedding event.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WeddingEvent",
              name: "Undangan Pernikahan Risa & Bayu",
              startDate: WEDDING_DATE.toISOString(),
              location: {
                "@type": "Place",
                name: LOCATION_TEXT,
              },
              image: new URL("/final.png", metadataBaseUrl).toString(),
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
