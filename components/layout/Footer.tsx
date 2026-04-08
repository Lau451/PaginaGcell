import Link from "next/link";
import { WHATSAPP_CONTACTS, buildWhatsAppUrl, buildGenericMessage } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--brand-border)] bg-[var(--brand-accent)] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-[var(--brand-secondary)]">
              Gcell<span className="text-[var(--brand-primary)]">Shop</span>
            </p>
            <p className="mt-1 text-sm text-[var(--brand-text-muted)]">
              Fundas y accesorios para tu celular
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Navegación
            </p>
            <Link href="/" className="text-sm text-gray-600 hover:text-[var(--brand-secondary)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm text-gray-600 hover:text-[var(--brand-secondary)]">
              Catálogo
            </Link>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Contacto
            </p>
            {WHATSAPP_CONTACTS.map((contact) => (
              <a
                key={contact.id}
                href={buildWhatsAppUrl(contact.phone, buildGenericMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#25d366] transition-colors"
              >
                <MessageCircle size={14} />
                {contact.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--brand-border)] pt-6 text-center text-xs text-gray-400">
          © {year} GcellShop. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
