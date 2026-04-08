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
          className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1da851] active:scale-95"
        >
          <MessageCircle size={16} />
          {contact.label}
        </a>
      ))}
    </div>
  );
}
