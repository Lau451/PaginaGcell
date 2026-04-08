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
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-white transition-shadow hover:shadow-md"
    >
      {/* Imagen */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--brand-accent)]">
        {flatImage ? (
          <Image
            src={flatImage.src}
            alt={flatImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3">
        {/* Badge categoría */}
        <span className="w-fit rounded-full bg-[var(--brand-accent)] px-2 py-0.5 text-xs font-medium text-gray-500">
          {CATEGORY_LABELS[product.category]}
        </span>

        {/* Nombre */}
        <p className="line-clamp-2 text-sm font-semibold text-[var(--brand-secondary)] leading-tight">
          {product.name}
        </p>

        {/* Modelo */}
        {product.compatibleModels[0] !== "universal" && (
          <p className="text-xs text-[var(--brand-text-muted)]">
            {(product.compatibleModels as string[]).join(", ")}
          </p>
        )}

        {/* Precio */}
        <span className="mt-1 w-fit rounded-full bg-[var(--brand-primary)] px-3 py-1 text-xs font-semibold text-white">
          Consultar precio
        </span>
      </div>
    </Link>
  );
}
