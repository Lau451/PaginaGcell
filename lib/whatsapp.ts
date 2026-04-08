export const WA_NUMBER_1 = "5493471590236";
export const WA_NUMBER_2 = "5493471611216";

export const WHATSAPP_CONTACTS = [
  { id: "wa1", label: "WhatsApp 1", phone: WA_NUMBER_1 },
  { id: "wa2", label: "WhatsApp 2", phone: WA_NUMBER_2 },
] as const;

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildGenericMessage(): string {
  return "Hola GcellShop! Quería hacerles una consulta.";
}

export function buildProductMessage(name: string, slug: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gcellshop.com.ar";
  const url = `${siteUrl}/productos/${slug}`;
  return `Hola! Me interesa "${name}". ¿Me pasan precio y disponibilidad?\n${url}`;
}
