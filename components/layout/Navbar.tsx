"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildGenericMessage, WHATSAPP_CONTACTS, buildWhatsAppUrl } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

/* ── Logo SVG inline ── */
function GcellLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 210 46"
      width="210"
      height="46"
      aria-hidden="true"
      className="gcell-logo-svg block"
      style={{ overflow: "visible" }}
    >
      {/* Monograma: círculo fino + G */}
      <circle cx="23" cy="23" r="20" fill="none" stroke="#7b1c2e" strokeWidth="1.2" className="gcell-ring" />
      <g transform="translate(38.5, 5)" fill="#7b1c2e">
        <path d="M3 0 L3.6 2.4 L6 3 L3.6 3.6 L3 6 L2.4 3.6 L0 3 L2.4 2.4 Z" />
      </g>
      <text x="23" y="29" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="22" fontWeight="400" fill="#7b1c2e" letterSpacing="-0.5">G</text>
      {/* Separador */}
      <line x1="52" y1="10" x2="52" y2="36" stroke="#e8c4c8" strokeWidth="1" />
      {/* Wordmark */}
      <text x="62" y="26" fontFamily="Georgia,'Times New Roman',serif" fontSize="18" fontWeight="400" fill="#1c4a32" letterSpacing="1">Gcell</text>
      {/* Sub-label */}
      <text x="63" y="38" fontFamily="'Trebuchet MS',Arial,sans-serif" fontSize="7" fontWeight="400" fill="#8b5a62" letterSpacing="3.5">PHONES</text>
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const waUrl = buildWhatsAppUrl(WHATSAPP_CONTACTS[0].phone, buildGenericMessage());

  return (
    <>
      {/* ── Announcement bar — MOBILE OPTIMIZED ── */}
      <div
        className="w-full py-1.5 sm:py-2.5 text-center"
        style={{ backgroundColor: "var(--brand-primary)" }}
      >
        <span className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white px-2">
          <span className="animate-pulse-glow inline-block h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-white/80 flex-shrink-0" aria-hidden />
          <span className="sm:hidden">WhatsApp · Envíos · Inmediato</span>
          <span className="hidden sm:inline">
            Comprá por WhatsApp
            <span className="mx-1 text-white/30">·</span>
            Envíos a todo el país
            <span className="mx-1 text-white/30">·</span>
            Respuesta inmediata
          </span>
        </span>
      </div>

      {/* ── Main header ── */}
      <header
        className="sticky top-0 z-50 w-full bg-[var(--background)]"
        style={{ boxShadow: "0 1px 0 var(--brand-border), 0 4px 16px rgba(123,28,46,0.06)" }}
      >
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-6 py-3 sm:py-4">

          {/* ── Nav links — izquierda (desktop only) ── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200",
                  isActive(href)
                    ? "text-[var(--brand-primary)]"
                    : "text-[var(--brand-secondary)] hover:text-[var(--brand-primary)]"
                )}
              >
                {label}
                {/* Dot indicator activo */}
                {isActive(href) && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
                    style={{ backgroundColor: "var(--brand-primary)" }}
                    aria-hidden
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Logo — centro absoluto ── */}
          <Link
            href="/"
            aria-label="GcellShop — Inicio"
            className="gcell-logo absolute left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <GcellLogo />
          </Link>

          <style>{`
            .gcell-logo-svg { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
            .gcell-logo:hover .gcell-logo-svg { transform: perspective(600px) rotateY(-8deg) rotateX(3deg) scale(1.05); }
            .gcell-ring { transition: stroke 0.3s; }
            .gcell-logo:hover .gcell-ring { stroke: #1c4a32; }
          `}</style>

          {/* ── Espacio derecho — balance visual ── */}
          <div className="hidden md:block w-[100px]" />

          {/* ── Hamburger — mobile (touch-friendly) ── */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-lg transition-colors hover:bg-[var(--brand-accent)]"
              style={{ color: "var(--brand-secondary)" }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {open && (
          <nav className="animate-slide-down border-t border-[var(--brand-border)] bg-[var(--background)] px-6 py-5 flex flex-col gap-1 md:hidden">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 border-l-2 pl-4 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200",
                  isActive(href)
                    ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                    : "border-transparent text-[var(--brand-text-muted)] hover:border-[var(--brand-border)] hover:text-[var(--brand-secondary)]"
                )}
              >
                {label}
              </Link>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white w-fit"
              style={{ backgroundColor: "var(--brand-secondary)" }}
            >
              <MessageCircle size={13} strokeWidth={2.5} />
              Consultar por WhatsApp
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
