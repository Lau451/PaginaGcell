import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá nuestro catálogo de fundas y accesorios para iPhone y más marcas.",
};

export default function CatalogoPage() {
  const products = getAllProducts();
  return <CatalogClient products={products} />;
}
