import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "GcellShop — Fundas y accesorios para celular",
  description:
    "Encontrá tu funda ideal en GcellShop. Fundas de silicona, transparentes, estéticas y más. Comprá por WhatsApp.",
  openGraph: {
    images: [{ url: "/hero.jpg" }],
  },
};

export default function HomePage() {
  return <Hero />;
}
