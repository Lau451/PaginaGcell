import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 text-center px-4">
      <p className="text-7xl font-extrabold text-[var(--brand-primary)]">404</p>
      <div>
        <h1 className="text-2xl font-bold text-[var(--brand-secondary)]">
          Página no encontrada
        </h1>
        <p className="mt-2 text-[var(--brand-text-muted)]">
          El producto o la página que buscás no existe.
        </p>
      </div>
      <Link
        href="/catalogo"
        className="rounded-full bg-[var(--brand-secondary)] px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
      >
        Ver catálogo
      </Link>
    </div>
  );
}
