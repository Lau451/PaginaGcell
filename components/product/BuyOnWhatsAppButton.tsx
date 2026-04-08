"use client";

import { WhatsAppSelector } from "@/components/shared/WhatsAppSelector";
import { buildProductMessage } from "@/lib/whatsapp";

interface BuyOnWhatsAppButtonProps {
  productName: string;
  productSlug: string;
}

export function BuyOnWhatsAppButton({ productName, productSlug }: BuyOnWhatsAppButtonProps) {
  const message = buildProductMessage(productName, productSlug);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-[var(--brand-text-muted)] uppercase tracking-wide">
        Consultar precio
      </p>
      <WhatsAppSelector message={message} layout="column" />
    </div>
  );
}
