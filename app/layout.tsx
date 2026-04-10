import type { Metadata } from "next";
import "./globals.css";
import { Rubik, Nunito_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GcellShop — Fundas y accesorios para celular",
    template: "%s — GcellShop",
  },
  description:
    "Encontrá tu funda ideal en GcellShop. Fundas de silicona, transparentes, estéticas y más. Comprá por WhatsApp.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gcellshop.com.ar"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`h-full antialiased ${rubik.variable} ${nunitoSans.variable}`}>
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]" style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
