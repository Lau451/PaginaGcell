"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { FilterState } from "@/types/product";
import { CATEGORIES, CATEGORY_LABELS } from "@/types/product";
import { PHONE_MODELS } from "@/data/phone-models";
import { cn } from "@/lib/utils";

interface CatalogFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  totalResults: number;
}

export function CatalogFilters({ value, onChange, totalResults }: CatalogFiltersProps) {
  const [query, setQuery] = useState(value.query);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce búsqueda
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ ...value, query });
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const showModelFilter =
    value.category === "all" ||
    (value.category !== "cargadores" && value.category !== "accesorios");

  function resetAll() {
    setQuery("");
    onChange({ category: "all", model: "all", query: "" });
  }

  const hasActiveFilters =
    value.category !== "all" || value.model !== "all" || query.trim() !== "";

  return (
    <div className="flex flex-col gap-4">
      {/* Búsqueda */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-[var(--brand-border)] bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Chips de categoría */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange({ ...value, category: "all", model: "all" })}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
            value.category === "all"
              ? "bg-[var(--brand-secondary)] text-white"
              : "bg-[var(--brand-accent)] text-gray-600 hover:bg-gray-200"
          )}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              onChange({
                ...value,
                category: cat,
                model: "all",
              })
            }
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
              value.category === cat
                ? "bg-[var(--brand-secondary)] text-white"
                : "bg-[var(--brand-accent)] text-gray-600 hover:bg-gray-200"
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Selector de modelo (solo para categorías de fundas) */}
      {showModelFilter && (
        <select
          value={value.model}
          onChange={(e) => onChange({ ...value, model: e.target.value })}
          className="rounded-xl border border-[var(--brand-border)] bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)]"
        >
          <option value="all">Todos los modelos</option>
          {PHONE_MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      )}

      {/* Resultados + limpiar */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{totalResults} producto{totalResults !== 1 ? "s" : ""}</span>
        {hasActiveFilters && (
          <button onClick={resetAll} className="text-[var(--brand-primary)] font-medium hover:underline">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
