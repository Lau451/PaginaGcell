"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { slideUp, staggerOnScroll } from "@/lib/animations";

interface CatalogGridAnimatedProps {
  products: Product[];
}

export function CatalogGridAnimated({ products }: CatalogGridAnimatedProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-4"
      variants={staggerOnScroll}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {products.map((product) => (
        <motion.div
          key={product.slug}
          variants={slideUp}
          transition={{ duration: 0.5 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
