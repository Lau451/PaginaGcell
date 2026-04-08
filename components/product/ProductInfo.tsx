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
      <span className="w-fit rounded-full bg-[var(--brand-accent)] px-3 py-1 text-xs font-semibold text-gray-500">
        {CATEGORY_LABELS[product.category]}
      </span>

      {/* Nombre */}
      <h1 className="text-3xl font-extrabold leading-tight text-[var(--brand-secondary)]">
        {product.name}
      </h1>

      {/* Modelos compatibles */}
      {!isUniversal && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Compatible con
          </p>
          <p className="text-sm text-gray-600">
            {(product.compatibleModels as string[]).join(", ")}
          </p>
        </div>
      )}

      {/* Descripción */}
      <p className="text-base text-gray-600 leading-relaxed">{product.description}</p>

      {/* CTA WhatsApp */}
      <BuyOnWhatsAppButton productName={product.name} productSlug={product.slug} />
    </div>
  );
}
