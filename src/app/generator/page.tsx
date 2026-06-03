import { InvitationGenerator } from "@/components/InvitationGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator Undangan — Risa & Bayu",
  description: "Buat template pesan undangan dan link personal untuk tamu.",
  robots: { index: false, follow: false },
};

export default function GeneratorPage() {
  return <InvitationGenerator />;
}
