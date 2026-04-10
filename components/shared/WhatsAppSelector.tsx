"use client";

import { WHATSAPP_CONTACTS, buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppSelectorProps {
  message: string;
  layout?: "row" | "column";
  className?: string;
}

export function WhatsAppSelector({
  message,
  layout = "row",
  className,
}: WhatsAppSelectorProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "column" ? "flex-col" : "flex-row flex-wrap",
        className
      )}
    >
      {WHATSAPP_CONTACTS.map((contact) => (
        <a
          key={contact.id}
          href={buildWhatsAppUrl(contact.phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center justify-center gap-2 bg-[var(--brand-secondary)] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(28,74,50,0.35)] active:translate-y-0"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          <MessageCircle size={16} />
          {contact.label}
        </a>
      ))}
    </div>
  );
}
