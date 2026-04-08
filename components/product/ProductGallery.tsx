"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[var(--brand-accent)]">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          className="object-cover transition-opacity duration-200"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all",
                i === activeIndex
                  ? "border-[var(--brand-secondary)] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              )}
              aria-label={`Ver imagen ${i + 1} de ${productName}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
