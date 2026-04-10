import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { BuyOnWhatsAppButton } from "./BuyOnWhatsAppButton";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const isUniversal = product.compatibleModels[0] === "universal";

  return (
    <div className="flex flex-col gap-5">
      {/* Badge categoría */}
      <span
        className="w-fit bg-[var(--brand-secondary)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white"
        style={{ fontFamily: "var(--font-rubik)" }}
      >
        {CATEGORY_LABELS[product.category]}
      </span>

      {/* Nombre */}
      <h1
        className="text-3xl font-black leading-tight tracking-tight text-[var(--brand-secondary)] md:text-4xl"
        style={{ fontFamily: "var(--font-rubik)" }}
      >
        {product.name}
      </h1>

      {/* Modelos compatibles */}
      {!isUniversal && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-muted)] mb-1">
            Compatible con
          </p>
          <p className="text-sm text-[var(--foreground)]">
            {(product.compatibleModels as string[]).join(", ")}
          </p>
        </div>
      )}

      {/* Descripción */}
      <p className="text-base text-[var(--brand-text-muted)] leading-relaxed">{product.description}</p>

      {/* CTA WhatsApp */}
      <BuyOnWhatsAppButton productName={product.name} productSlug={product.slug} />
    </div>
  );
}
