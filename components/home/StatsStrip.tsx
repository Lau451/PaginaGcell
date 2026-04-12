"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useMotionSafe } from "@/lib/use-motion-safe";
import { counterReveal, fadeUp } from "@/lib/animations";

const STATS = [
  { value: "+60", label: "Modelos disponibles", isCounter: true, counterTarget: 60 },
  { value: "Envíos", label: "A todo el país", isCounter: false },
  { value: "WhatsApp", label: "Respuesta inmediata", isCounter: false },
];

// ── Counter Stat ──
function CounterStat({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `+${Math.round(v)}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const { enabled, breakpoint } = useMotionSafe();

  useEffect(() => {
    if (!inView) return;
    const duration = breakpoint === "mobile" ? 1.5 : 1.2;
    if (!enabled) {
      count.set(target);
      return;
    }
    const controls = animate(count, target, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, enabled, breakpoint, count, target]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {enabled ? rounded : `+${target}${suffix}`}
    </motion.span>
  );
}

// ── Gradient underline ──
function GradientUnderline({ delay }: { delay: number }) {
  const { enabled } = useMotionSafe();
  return (
    <motion.div
      className="absolute -bottom-1 left-0 right-0 h-[2px] md:h-[2.5px]"
      style={{
        background: "linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))",
        transformOrigin: "left",
      }}
      initial={enabled ? { scaleX: 0 } : { scaleX: 1 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    />
  );
}

// ── Main component ──
export function StatsStrip() {
  const { enabled, safeVariant } = useMotionSafe();

  return (
    <div className="bg-[var(--brand-secondary)]">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-3 divide-x divide-white/10">
        {STATS.map(({ value, label, isCounter, counterTarget }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center py-6 gap-1 relative"
            variants={fadeUp}
            initial={enabled ? "hidden" : "visible"}
            whileInView={safeVariant("visible")}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: enabled ? 0.5 : 0,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            <motion.span
              className="text-2xl font-black text-white md:text-3xl"
              variants={counterReveal}
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              {isCounter && counterTarget !== undefined ? (
                <CounterStat target={counterTarget} />
              ) : (
                value
              )}
            </motion.span>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              {label}
            </span>

            {/* Gradient underline below value */}
            <GradientUnderline delay={0.3 + i * 0.15} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
