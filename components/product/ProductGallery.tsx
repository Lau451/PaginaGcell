"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";
import { duration, spring } from "@/lib/animations";

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
      {/* Imagen principal con AnimatePresence */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[var(--brand-accent)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: duration.normal }}
            className="relative h-full w-full"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all",
                i === activeIndex
                  ? "border-[var(--brand-secondary)] opacity-100"
                  : "border-transparent opacity-60"
              )}
              aria-label={`Ver imagen ${i + 1} de ${productName}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={spring.snappy}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
