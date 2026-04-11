"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { spring, duration, fadeUp, staggerContainer } from "@/lib/animations";

const SLIDES = [
  {
    src: "/hero.jpg",
    alt: "Fundas premium para celular — GcellShop",
    label: "Nueva colección",
    headingLine1: "Las mejores",
    headingAccent: "fundas",
  },
  {
    src: "/hero 2.jpg",
    alt: "Nueva colección de fundas — GcellShop",
    label: "Exclusivo",
    headingLine1: "Diseños que te",
    headingAccent: "destacan",
  },
  {
    src: "/hero3.jpg",
    alt: "Accesorios para celular — GcellShop",
    label: "+60 modelos",
    headingLine1: "Más de 60",
    headingAccent: "opciones",
  },
];

const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0); // 1 = right/next, -1 = left/prev

  const goTo = useCallback((index: number, dir: number = 1) => {
    setCurrent(index);
    setDirection(dir);
  }, []);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(520px, 88vh, 860px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero GcellShop"
    >
      {/* ── Fondo: imágenes con slide direccional ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
          transition={{ duration: duration.slow, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-hidden={false}
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay gradient: lectura del texto ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(28,14,18,0.94) 0%, rgba(28,14,18,0.76) 38%, rgba(28,14,18,0.28) 65%, transparent 100%)",
        }}
      />

      {/* ── Floating badge (decorativo) ── */}
      <div
        aria-hidden
        className="animate-float absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex"
      >
        <div
          className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 text-center"
          style={{
            borderColor: "var(--brand-primary)",
            backgroundColor: "rgba(10,10,10,0.70)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="block text-2xl font-black leading-none"
            style={{ color: "var(--brand-primary)", fontFamily: "var(--font-rubik)" }}
          >
            +60
          </span>
          <span
            className="block text-[8px] font-bold uppercase tracking-wider text-white/60"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            modelos
          </span>
        </div>
        {/* Decorative rotating ring */}
        <svg
          className="animate-spin-slow absolute inset-0 h-20 w-20"
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden
        >
          <circle
            cx="40" cy="40" r="38"
            stroke="rgba(37,211,102,0.25)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* ── Contenido textual ── */}
      <div className="relative z-20 flex h-full items-center" style={{ minHeight: "inherit" }}>
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              className="max-w-xl"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Label animado por slide */}
              <motion.div
                className="mb-5 flex items-center gap-3"
                variants={fadeUp}
              >
                <span
                  className="h-px w-10 shrink-0"
                  style={{ backgroundColor: "var(--brand-primary)" }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: "var(--brand-primary)", fontFamily: "var(--font-rubik)" }}
                >
                  {SLIDES[current].label}
                </span>
              </motion.div>

              {/* Heading principal */}
              <motion.h1
                className="font-display text-white uppercase leading-[0.88] tracking-tight"
                style={{
                  fontFamily: "var(--font-rubik)",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 9vw, 7rem)",
                }}
                variants={fadeUp}
              >
                {SLIDES[current].headingLine1}<br />
                <span style={{ color: "var(--brand-primary)" }}>{SLIDES[current].headingAccent}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-5 text-sm leading-relaxed md:text-base"
                style={{
                  color: "rgba(255,255,255,0.60)",
                  fontFamily: "var(--font-nunito)",
                  maxWidth: "38ch",
                }}
                variants={fadeUp}
              >
                Más de 60 modelos. Calidad garantizada,{" "}
                envíos y atención directa por WhatsApp.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-9 flex flex-wrap items-center gap-4"
                variants={fadeUp}
              >
                <Link
                  href="/catalogo"
                  className="animate-pulse-glow inline-flex cursor-pointer items-center justify-center bg-white px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] transition-all duration-200 hover:bg-[var(--brand-primary)] hover:text-white"
                  style={{
                    color: "var(--brand-secondary)",
                    fontFamily: "var(--font-rubik)",
                  }}
                >
                  Ver catálogo
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Contador de slide ── */}
      <div className="absolute bottom-8 right-24 z-20 hidden md:block">
        <span
          className="text-xs font-bold tabular-nums tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-rubik)" }}
        >
          {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Flechas de navegación ── */}
      <motion.button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute bottom-6 right-16 z-20 flex h-10 w-10 cursor-pointer items-center justify-center border border-white/20 text-white/50 md:bottom-7 md:right-20"
        whileHover={{ borderColor: "white", color: "white" }}
        whileTap={{ scale: 0.9 }}
        transition={spring.snappy}
      >
        <ChevronLeft size={18} />
      </motion.button>
      <motion.button
        onClick={next}
        aria-label="Slide siguiente"
        className="absolute bottom-6 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center border border-white/20 text-white/50 md:bottom-7"
        whileHover={{ borderColor: "white", color: "white" }}
        whileTap={{ scale: 0.9 }}
        transition={spring.snappy}
      >
        <ChevronRight size={18} />
      </motion.button>

      {/* ── Barra de progreso inferior ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-1">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className="h-full flex-1 cursor-pointer transition-colors duration-300"
            style={{
              backgroundColor:
                i === current
                  ? "var(--brand-primary)"
                  : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
