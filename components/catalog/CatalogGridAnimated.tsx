"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { staggerOnScroll } from "@/lib/animations";
import { useMotionSafe } from "@/lib/use-motion-safe";

interface CatalogGridAnimatedProps {
  products: Product[];
}

// Enhanced slideUp: more dramatic scale + breakpoint-aware timing
const slideUpEnhanced = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function CatalogGridAnimated({ products }: CatalogGridAnimatedProps) {
  const { enabled, breakpoint } = useMotionSafe();
  const isMobile = breakpoint === "mobile";

  const staggerConfig = enabled
    ? {
        ...staggerOnScroll,
        visible: {
          transition: {
            staggerChildren: isMobile ? 0.05 : 0.1,
            delayChildren: 0,
          },
        },
      }
    : staggerOnScroll;

  const itemDuration = isMobile ? 0.35 : 0.4;

  return (
    <motion.div
      className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-4"
      variants={staggerConfig}
      initial={enabled ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {products.map((product) => (
        <motion.div
          key={product.slug}
          variants={enabled ? slideUpEnhanced : undefined}
          transition={{
            duration: itemDuration,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
