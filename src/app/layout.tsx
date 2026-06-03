import type { Metadata, Viewport } from "next";
import { ScrollRestore } from "@/components/ScrollRestore";
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

export const metadata: Metadata = {
  title: "Risa & Bayu — Undangan Pernikahan",
  description: "Undangan pernikahan Risa & Bayu — 11 Juni 2026",
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
      <body
        className={`${cormorant.variable} ${ebGaramond.variable} ${tangerine.variable} min-h-svh antialiased`}
      >
        <ScrollRestore />
        {children}
      </body>
    </html>
  );
}
