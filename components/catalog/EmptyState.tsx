import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset?: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <SearchX size={40} className="text-gray-300" />
      <div>
        <p className="font-semibold text-gray-600">Sin resultados</p>
        <p className="mt-1 text-sm text-gray-400">
          No encontramos productos con esos filtros.
        </p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
