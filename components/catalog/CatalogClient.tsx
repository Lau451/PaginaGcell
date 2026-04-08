"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import type { Product, FilterState } from "@/types/product";
import { DEFAULT_FILTER } from "@/types/product";
import { CatalogFilters } from "./CatalogFilters";
import { CatalogGrid } from "./CatalogGrid";
import { cn } from "@/lib/utils";

interface CatalogClientProps {
  products: Product[];
}

export function CatalogClient({ products }: CatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category) return false;

      if (filters.model !== "all") {
        const models = p.compatibleModels as string[];
        if (!models.includes(filters.model) && !models.includes("universal")) return false;
      }

      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const searchable = [p.name, p.category, ...(p.tags ?? [])].join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [products, filters]);

  const activeFilterCount = [
    filters.category !== "all",
    filters.model !== "all",
    filters.query.trim() !== "",
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 border-b border-[var(--brand-border)] pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-muted)] mb-2">
          GcellShop
        </p>
        <h1 className="text-5xl font-black uppercase tracking-tight text-[var(--brand-secondary)] md:text-7xl leading-none">
          Catálogo
        </h1>
        <p className="mt-3 text-sm text-[var(--brand-text-muted)]">
          {filtered.length} producto{filtered.length !== 1 ? "s" : ""} disponibles
        </p>
      </div>

      {/* Mobile filter toggle */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={cn(
            "flex items-center gap-2 border px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors",
            activeFilterCount > 0
              ? "border-[var(--brand-secondary)] bg-[var(--brand-secondary)] text-white"
              : "border-[var(--brand-secondary)] text-[var(--brand-secondary)] hover:bg-[var(--brand-secondary)] hover:text-white"
          )}
        >
          <SlidersHorizontal size={13} />
          {activeFilterCount > 0 ? `Filtros (${activeFilterCount})` : "Filtrar"}
          <ChevronDown
            size={13}
            className={cn("transition-transform", filtersOpen ? "rotate-180" : "")}
          />
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Sidebar de filtros */}
        <aside
          className={cn(
            "w-full lg:w-64 shrink-0",
            filtersOpen ? "block animate-slide-down" : "hidden lg:block"
          )}
        >
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
