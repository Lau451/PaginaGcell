"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useVelocity, useTransform } from "framer-motion";
import { useMotionSafe } from "@/lib/use-motion-safe";

const MARQUEE_ITEMS = [
  "Fundas premium",
  "Envíos a todo el país",
  "Atención por WhatsApp",
  "+60 modelos",
  "Calidad garantizada",
  "Respuesta inmediata",
  "Precios accesibles",
  "Modelo para tu celular",
];

// Emoji cycle — rotates every 3s with AnimatePresence crossfade
const EMOJIS = ["✨", "📦", "💬", "🛡️", "🚀"];

function EmojiCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % EMOJIS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block w-5 text-center" aria-hidden>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {EMOJIS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Dot() {
  return (
    <svg width="5" height="5" viewBox="0 0 5 5" fill="currentColor" aria-hidden>
      <circle cx="2.5" cy="2.5" r="2.5" />
    </svg>
  );
}

export function MarqueeTicker() {
  const { enabled, breakpoint } = useMotionSafe();
  const isMobile = breakpoint === "mobile";

  // Scroll-linked speed — desktop only
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Map velocity to a duration multiplier: fast scroll → shorter duration → faster marquee
  // Velocity ±500 → multiplier 2 → duration 22/2 = 11s (faster)
  // Velocity 0 → multiplier 1 → duration 22/1 = 22s (idle)
  const speedMultiplier = useTransform(
    scrollVelocity,
    [-500, 0, 500],
    [2, 1, 2]  // FIX: was [0.5, 1, 0.5] which inverted the logic
  );

  const [duration, setDuration] = useState(22);
  const [paused, setPaused] = useState(false);
  const baseSpeed = 22;

  useEffect(() => {
    if (isMobile || !enabled) return;
    return speedMultiplier.on("change", (v) => {
      setDuration(baseSpeed / v);
    });
  }, [isMobile, enabled, speedMultiplier]);

  // Doubled items for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "var(--brand-primary)" }}
      aria-hidden
    >
      {/* Mobile: simple CSS animation — no scroll link, no jank risk */}
      {isMobile || !enabled ? (
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {items.map((item, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              <Dot />
              {item}
            </span>
          ))}
        </div>
      ) : (
        /* Desktop: Framer Motion scroll-linked animation with hover pause */
        <motion.div
          className="flex whitespace-nowrap py-3"
          animate={{ x: paused ? "0%" : ["0%", "-50%"] }}
          transition={{
            duration: paused ? 0 : duration,
            ease: "linear",
            repeat: paused ? 0 : Infinity,
            repeatType: "loop",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              {i % 3 === 0 ? <EmojiCycle /> : <Dot />}
              {item}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
