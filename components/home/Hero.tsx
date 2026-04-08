import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <section className="w-full">
      {/* Hero: texto + carrusel fusionados */}
      <HeroCarousel />

      {/* Strip de stats */}
      <div className="border-b border-[var(--brand-border)]">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-3 divide-x divide-[var(--brand-border)]">
          {[
            { value: "+60", label: "Modelos" },
            { value: "Envíos", label: "Todo el país" },
            { value: "WhatsApp", label: "Respuesta en minutos" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5">
              <span
                className="text-xl font-black text-[var(--brand-secondary)] md:text-2xl"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--brand-text-muted)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cómo comprás */}
      <div className="border-b border-[var(--brand-border)]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-muted)] mb-8"
            style={{ fontFamily: "var(--font-rubik)" }}
          >
            Cómo comprás
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
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
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <span
                  className="text-5xl font-black leading-none select-none shrink-0"
                  style={{
                    color: "var(--brand-border)",
                    fontFamily: "var(--font-rubik)",
                  }}
                >
                  {step}
                </span>
                <div className="pt-1">
                  <p
                    className="text-sm font-bold uppercase tracking-wide text-[var(--brand-secondary)]"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    {title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--brand-text-muted)]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
