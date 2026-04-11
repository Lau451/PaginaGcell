import type { Product } from "@/types/product";
import { CatalogGridAnimated } from "./CatalogGridAnimated";
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
    <div className="bg-[var(--brand-border)]">
      <CatalogGridAnimated products={products} />
    </div>
  );
}
