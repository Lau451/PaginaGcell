"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerOnScroll } from "@/lib/animations";

const STEPS = [
  {
    step: "01",
    title: "Elegís tu funda",
    desc: "Explorá el catálogo y encontrá el modelo que se adapta a tu celular y tu estilo.",
  },
  {
    step: "02",
    title: "Consultás por WhatsApp",
    desc: "Te respondemos con precio y disponibilidad al instante. Sin formularios, sin esperas.",
  },
  {
    step: "03",
    title: "Coordinamos el envío",
    desc: "Enviamos a todo el país. Pago acordado directamente con nosotros, simple y seguro.",
  },
];

export function StepsSection() {
  return (
    <div className="border-b border-[var(--brand-border)]">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-10 flex items-center gap-4">
          <span
            className="h-px w-8 shrink-0 bg-[var(--brand-primary)]"
            aria-hidden
          />
          <p
            className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-muted)]"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Cómo comprás
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          variants={staggerOnScroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STEPS.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              className="group border border-[var(--brand-border)] border-l-4 border-l-[var(--brand-primary)] p-5 transition-all duration-300 hover:border-[var(--brand-secondary)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <span
                className="block text-4xl font-black leading-none select-none mb-4 transition-colors duration-300 group-hover:text-[var(--brand-primary)]"
                style={{
                  color: i === 0 ? "var(--brand-primary)" : "var(--brand-border)",
                  fontFamily: "var(--font-rubik)",
                }}
              >
                {step}
              </span>
              <p
                className="text-sm font-black uppercase tracking-wide text-[var(--brand-secondary)] mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {title}
              </p>
              <p className="text-sm leading-relaxed text-[var(--brand-text-muted)]">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
