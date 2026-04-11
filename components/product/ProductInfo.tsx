"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { BuyOnWhatsAppButton } from "./BuyOnWhatsAppButton";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const isUniversal = product.compatibleModels[0] === "universal";

  return (
    <motion.div
      className="flex flex-col gap-5"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Badge categoría */}
      <motion.span
        className="w-fit bg-[var(--brand-secondary)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white"
        style={{ fontFamily: "var(--font-rubik)" }}
        variants={fadeUp}
      >
        {CATEGORY_LABELS[product.category]}
      </motion.span>

      {/* Nombre */}
      <motion.h1
        className="text-3xl font-black leading-tight tracking-tight text-[var(--brand-secondary)] md:text-4xl"
        style={{ fontFamily: "var(--font-rubik)" }}
        variants={fadeUp}
      >
        {product.name}
      </motion.h1>

      {/* Modelos compatibles */}
      {!isUniversal && (
        <motion.div variants={fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-text-muted)] mb-1">
            Compatible con
          </p>
          <p className="text-sm text-[var(--foreground)]">
            {(product.compatibleModels as string[]).join(", ")}
          </p>
        </motion.div>
      )}

      {/* Descripción */}
      <motion.p
        className="text-base text-[var(--brand-text-muted)] leading-relaxed"
        variants={fadeUp}
      >
        {product.description}
      </motion.p>

      {/* CTA WhatsApp */}
      <motion.div variants={fadeUp}>
        <BuyOnWhatsAppButton productName={product.name} productSlug={product.slug} />
      </motion.div>
    </motion.div>
  );
}
