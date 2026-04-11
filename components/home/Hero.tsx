import { HeroCarousel } from "./HeroCarousel";
import { StepsSection } from "./StepsSection";

const STATS = [
  { value: "+60", label: "Modelos disponibles" },
  { value: "Envíos", label: "A todo el país" },
  { value: "WhatsApp", label: "Respuesta inmediata" },
];

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

export function Hero() {
  return (
    <section className="w-full">
      {/* Hero: texto + carrusel */}
      <HeroCarousel />

      {/* ── Marquee ticker ── */}
      <div
        className="overflow-hidden"
        style={{ backgroundColor: "var(--brand-primary)" }}
        aria-hidden
      >
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              <svg width="5" height="5" viewBox="0 0 5 5" fill="currentColor" aria-hidden>
                <circle cx="2.5" cy="2.5" r="2.5" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip — block-based, alta energía */}
      <div className="bg-[var(--brand-secondary)]">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-3 divide-x divide-white/10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-6 gap-1">
              <span
                className="text-2xl font-black text-white md:text-3xl"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {value}
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cómo comprás — delegado a StepsSection para scroll-aware animations */}
      <StepsSection />
    </section>
  );
}
