"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { WhatsAppSelector } from "@/components/shared/WhatsAppSelector";
import { buildGenericMessage } from "@/lib/whatsapp";

/* ── Ícono de chat propio — mismo lenguaje visual que el logo ── */
function ChatBubbleIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      width="28"
      height="28"
      aria-hidden
    >
      {/* Burbuja principal — trazo fino, esquinas suaves */}
      <path
        d="M3 6.5A3.5 3.5 0 016.5 3h15A3.5 3.5 0 0125 6.5v11A3.5 3.5 0 0121.5 21H10L4 26V6.5z"
        fill="rgba(255,255,255,0.10)"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Sparkle de 4 puntas — igual al del logo SVG */}
      <path
        d="M8 11.5 L8.55 13.2 L10.25 13.75 L8.55 14.3 L8 16 L7.45 14.3 L5.75 13.75 L7.45 13.2 Z"
        fill="white"
      />
      {/* Líneas de texto — sugieren conversación */}
      <line x1="13" y1="11.5" x2="21" y2="11.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="13" y1="15" x2="18.5" y2="15" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      {open && (
        <div className="rounded-2xl bg-[var(--background)] shadow-xl border border-[var(--brand-border)] p-4 w-52">
          <p className="mb-3 text-xs font-semibold text-[var(--brand-text-muted)] uppercase tracking-wide">
            Consultanos por
          </p>
          <WhatsAppSelector
            message={buildGenericMessage()}
            layout="column"
          />
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contactar por WhatsApp"
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--brand-secondary)] text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-[0_6px_20px_rgba(28,74,50,0.4)] active:scale-95"
      >
        {open ? <X size={22} /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
}
