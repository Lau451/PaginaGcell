import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

interface CatalogGridProps {
  products: Product[];
  onReset?: () => void;
}

export function CatalogGrid({ products, onReset }: CatalogGridProps) {
  if (products.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
