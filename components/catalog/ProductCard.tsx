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
      className="group flex flex-col overflow-hidden bg-[var(--background)] border border-[var(--brand-border)] cursor-pointer transition-all duration-300 hover:border-[var(--brand-primary)] hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(123,28,46,0.15)]"
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

        {/* Badge categoría */}
        <span
          className="absolute top-2 left-2 bg-[var(--brand-secondary)] px-2 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-[var(--brand-secondary)]"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3 pb-4">
        <p
          className="line-clamp-2 text-sm font-bold text-[var(--brand-secondary)] leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-rubik)" }}
        >
          {product.name}
        </p>

        {product.compatibleModels[0] !== "universal" && (
          <p className="text-xs text-[var(--brand-text-muted)]">
            {(product.compatibleModels as string[]).join(", ")}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between border-t border-[var(--brand-border)] pt-2.5">
          <span
            className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--brand-primary)]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Consultar precio
          </span>
          <span
            className="flex h-6 w-6 items-center justify-center bg-[var(--brand-primary)] text-white transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8M5.5 1.5L9 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
