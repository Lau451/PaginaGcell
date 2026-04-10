import { HeroCarousel } from "./HeroCarousel";

const STATS = [
  { value: "+60", label: "Modelos disponibles" },
  { value: "Envíos", label: "A todo el país" },
  { value: "WhatsApp", label: "Respuesta inmediata" },
];

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

      {/* Cómo comprás — cards con borde izquierdo verde */}
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map(({ step, title, desc }, i) => (
              <div
                key={step}
                className="animate-fade-in group border border-[var(--brand-border)] border-l-4 border-l-[var(--brand-primary)] p-5 transition-all duration-300 hover:border-[var(--brand-secondary)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
