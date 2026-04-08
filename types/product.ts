export type Category =
  | "silicona"
  | "transparente"
  | "estetica"
  | "reforzada"
  | "cargadores"
  | "accesorios";

export const CATEGORIES: readonly Category[] = [
  "silicona",
  "transparente",
  "estetica",
  "reforzada",
  "cargadores",
  "accesorios",
] as const;

export const CATEGORY_LABELS: Record<Category, string> = {
  silicona: "Silicona",
  transparente: "Transparente",
  estetica: "Estética",
  reforzada: "Reforzada",
  cargadores: "Cargadores",
  accesorios: "Accesorios",
};

export interface ProductImage {
  src: string;
  alt: string;
  kind: "flat" | "with-phone";
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  /** Modelos compatibles. Usar ['universal'] para accesorios/cargadores. */
  compatibleModels: string[] | ["universal"];
  description: string;
  images: ProductImage[];
  featured?: boolean;
  tags?: string[];
}

export interface FilterState {
  category: Category | "all";
  model: string | "all";
  query: string;
}

export const DEFAULT_FILTER: FilterState = {
  category: "all",
  model: "all",
  query: "",
};
