"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--brand-border)] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[var(--brand-secondary)] tracking-tight">
          Gcell<span className="text-[var(--brand-primary)]">Shop</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-[var(--brand-secondary)] transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo" className="text-gray-600 hover:text-[var(--brand-secondary)] transition-colors">
            Catálogo
          </Link>
        </nav>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-[var(--brand-border)] bg-white px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" onClick={() => setOpen(false)} className="py-2 text-gray-700 hover:text-[var(--brand-secondary)]">
            Inicio
          </Link>
          <Link href="/catalogo" onClick={() => setOpen(false)} className="py-2 text-gray-700 hover:text-[var(--brand-secondary)]">
            Catálogo
          </Link>
        </nav>
      )}
    </header>
  );
}
