import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getProductBySlug } from "@/lib/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const ogImage = product.images.find((img) => img.kind === "with-phone") ?? product.images[0];

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: ogImage ? [{ url: ogImage.src }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <Link href="/catalogo" className="hover:text-gray-600 transition-colors">Catálogo</Link>
        <ChevronRight size={14} />
        <span className="text-gray-600 font-medium">{product.name}</span>
      </nav>

      {/* Detalle */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
