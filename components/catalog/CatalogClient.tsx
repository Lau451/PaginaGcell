"use client";

import { useMemo, useState } from "react";
import type { Product, FilterState } from "@/types/product";
import { DEFAULT_FILTER } from "@/types/product";
import { CatalogFilters } from "./CatalogFilters";
import { CatalogGrid } from "./CatalogGrid";

interface CatalogClientProps {
  products: Product[];
}

export function CatalogClient({ products }: CatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Filtro categoría
      if (filters.category !== "all" && p.category !== filters.category) return false;

      // Filtro modelo
      if (filters.model !== "all") {
        const models = p.compatibleModels as string[];
        if (!models.includes(filters.model) && !models.includes("universal")) return false;
      }

      // Filtro texto
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const searchable = [p.name, p.category, ...(p.tags ?? [])].join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [products, filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-[var(--brand-secondary)]">Catálogo</h1>
        <p className="text-[var(--brand-text-muted)]">Fundas y accesorios para tu celular</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Sidebar de filtros */}
        <aside className="w-full lg:w-64 shrink-0">
          <CatalogFilters
            value={filters}
            onChange={setFilters}
            totalResults={filtered.length}
          />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <CatalogGrid
            products={filtered}
            onReset={() => setFilters(DEFAULT_FILTER)}
          />
        </div>
      </div>
    </div>
  );
}
