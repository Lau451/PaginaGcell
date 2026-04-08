import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const flatImage = product.images.find((img) => img.kind === "flat") ?? product.images[0];

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden bg-white border border-[var(--brand-border)] transition-all hover:border-[var(--brand-secondary)]"
    >
      {/* Imagen */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--brand-accent)]">
        {flatImage ? (
          <Image
            src={flatImage.src}
            alt={flatImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}

        {/* Badge categoría — sobre la imagen */}
        <span className="absolute top-2 left-2 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-secondary)]">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3">
        <p className="line-clamp-2 text-sm font-bold text-[var(--brand-secondary)] leading-tight tracking-tight">
          {product.name}
        </p>

        {product.compatibleModels[0] !== "universal" && (
          <p className="text-xs text-[var(--brand-text-muted)]">
            {(product.compatibleModels as string[]).join(", ")}
          </p>
        )}

        <span className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
          Consultar precio →
        </span>
      </div>
    </Link>
  );
}
