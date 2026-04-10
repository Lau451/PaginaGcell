"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
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
  const [modelOpen, setModelOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

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

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showModelFilter =
    value.category === "all" ||
    (value.category !== "cargadores" && value.category !== "accesorios");

  function resetAll() {
    setQuery("");
    onChange({ category: "all", model: "all", query: "" });
  }

  const hasActiveFilters =
    value.category !== "all" || value.model !== "all" || query.trim() !== "";

  const selectedModelLabel =
    value.model === "all" ? "Todos los modelos" : value.model;

  return (
    <div className="flex flex-col gap-5">
      {/* Búsqueda */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-text-muted)]" />
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-[var(--brand-border)] bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-[var(--brand-secondary)] placeholder:text-[var(--brand-text-muted)]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--brand-text-muted)] hover:text-[var(--brand-secondary)]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Categorías */}
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-muted)] mb-2">
          Categoría
        </p>
        <button
          onClick={() => onChange({ ...value, category: "all", model: "all" })}
          className={cn(
            "cursor-pointer text-left px-0 py-1.5 text-sm font-semibold transition-all border-l-2",
            value.category === "all"
              ? "border-[var(--brand-secondary)] text-[var(--brand-secondary)] pl-3"
              : "border-transparent text-[var(--brand-text-muted)] hover:text-[var(--brand-secondary)] hover:pl-3"
          )}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({ ...value, category: cat, model: "all" })}
            className={cn(
              "cursor-pointer text-left px-0 py-1.5 text-sm font-semibold transition-all border-l-2",
              value.category === cat
                ? "border-[var(--brand-secondary)] text-[var(--brand-secondary)] pl-3"
                : "border-transparent text-[var(--brand-text-muted)] hover:text-[var(--brand-secondary)] hover:pl-3"
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Selector de modelo — custom dropdown */}
      {showModelFilter && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-muted)]">
            Modelo
          </p>
          <div ref={modelDropdownRef} className="relative">
            <button
              onClick={() => setModelOpen(!modelOpen)}
              className={cn(
                "w-full cursor-pointer flex items-center justify-between border px-3 py-2.5 text-sm bg-white transition-colors",
                modelOpen
                  ? "border-[var(--brand-secondary)]"
                  : "border-[var(--brand-border)] hover:border-[var(--brand-secondary)]"
              )}
            >
              <span
                className={cn(
                  "font-semibold",
                  value.model === "all"
                    ? "text-[var(--brand-text-muted)]"
                    : "text-[var(--brand-secondary)]"
                )}
              >
                {selectedModelLabel}
              </span>
              <ChevronDown
                size={14}
                className={cn(
                  "text-[var(--brand-text-muted)] transition-transform shrink-0",
                  modelOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {modelOpen && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-t-0 border-[var(--brand-secondary)] max-h-52 overflow-y-auto animate-slide-down">
                <button
                  onClick={() => { onChange({ ...value, model: "all" }); setModelOpen(false); }}
                  className={cn(
                    "w-full cursor-pointer text-left px-3 py-2 text-sm border-l-2 transition-all",
                    value.model === "all"
                      ? "border-[var(--brand-secondary)] text-[var(--brand-secondary)] font-semibold bg-[var(--brand-accent)]"
                      : "border-transparent text-[var(--brand-text-muted)] hover:text-[var(--brand-secondary)] hover:bg-[var(--brand-accent)]"
                  )}
                >
                  Todos los modelos
                </button>
                {PHONE_MODELS.map((model) => (
                  <button
                    key={model}
                    onClick={() => { onChange({ ...value, model }); setModelOpen(false); }}
                    className={cn(
                      "w-full cursor-pointer text-left px-3 py-2 text-sm border-l-2 transition-all",
                      value.model === model
                        ? "border-[var(--brand-secondary)] text-[var(--brand-secondary)] font-semibold bg-[var(--brand-accent)]"
                        : "border-transparent text-[var(--brand-text-muted)] hover:text-[var(--brand-secondary)] hover:bg-[var(--brand-accent)]"
                    )}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Limpiar */}
      {hasActiveFilters && (
        <button
          onClick={resetAll}
          className="cursor-pointer text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
