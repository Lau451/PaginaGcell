import Link from "next/link";
import { WHATSAPP_CONTACTS, buildWhatsAppUrl, buildGenericMessage } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-secondary)] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 border-b border-white/10 pb-10">
          <p className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl leading-none">
            Gcell<span className="text-[var(--brand-primary)]">Shop</span>
          </p>
          <p className="mt-2 text-sm text-white/50">
            Fundas y accesorios para tu celular
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Navegación
            </p>
            <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
              Catálogo
            </Link>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Contacto
            </p>
            {WHATSAPP_CONTACTS.map((contact) => (
              <a
                key={contact.id}
                href={buildWhatsAppUrl(contact.phone, buildGenericMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[var(--brand-primary)] transition-colors"
              >
                <MessageCircle size={14} />
                {contact.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/30">
          © {year} GcellShop. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
