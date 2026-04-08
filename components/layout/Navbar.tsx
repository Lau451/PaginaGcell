"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Announcement bar */}
      <div className="w-full bg-[var(--brand-secondary)] py-2 text-center text-xs font-semibold tracking-widest uppercase text-white">
        Comprá por WhatsApp — Envíos a todo el país
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-[var(--brand-border)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Nav desktop izquierda */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-all pb-0.5",
                  isActive(href)
                    ? "font-black text-[var(--brand-secondary)] border-b-2 border-[var(--brand-primary)]"
                    : "text-[var(--brand-secondary)] hover:opacity-60 border-b-2 border-transparent"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Logo centrado */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl font-black tracking-tight text-[var(--brand-secondary)] uppercase"
          >
            Gcell<span className="text-[var(--brand-primary)]">Shop</span>
          </Link>

          {/* Hamburger mobile */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="rounded-md p-2 text-[var(--brand-secondary)]"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="animate-slide-down md:hidden border-t border-[var(--brand-border)] bg-white px-4 py-4 flex flex-col gap-1 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2.5 border-l-2 pl-3 font-semibold uppercase tracking-wide transition-all",
                  isActive(href)
                    ? "border-[var(--brand-primary)] text-[var(--brand-secondary)]"
                    : "border-transparent text-[var(--brand-text-muted)] hover:text-[var(--brand-secondary)] hover:border-[var(--brand-border)]"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
