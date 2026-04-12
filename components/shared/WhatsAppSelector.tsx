"use client";

import { WHATSAPP_CONTACTS, buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { spring } from "@/lib/animations";
import { useMotionSafe } from "@/lib/use-motion-safe";

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
  const { enabled } = useMotionSafe();

  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "column" ? "flex-col" : "flex-row flex-wrap",
        className
      )}
    >
      {WHATSAPP_CONTACTS.map((contact) => (
        <motion.a
          key={contact.id}
          href={buildWhatsAppUrl(contact.phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex cursor-pointer items-center justify-center gap-2 bg-[var(--brand-secondary)] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:opacity-90",
            "animate-cta-breathe"
          )}
          style={{ fontFamily: "var(--font-rubik)" }}
          whileTap={enabled ? { scale: 0.95 } : undefined}
          whileHover={enabled ? { y: -2 } : undefined}
          transition={spring.snappy}
        >
          <MessageCircle size={16} />
          {contact.label}
        </motion.a>
      ))}
    </div>
  );
}
