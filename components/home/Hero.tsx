import { HeroCarousel } from "./HeroCarousel";
import { StepsSection } from "./StepsSection";
import { MarqueeTicker } from "./MarqueeTicker";
import { StatsStrip } from "./StatsStrip";

export function Hero() {
  return (
    <section className="w-full">
      {/* Hero: texto + carrusel */}
      <HeroCarousel />

      {/* ── Marquee ticker — scroll-linked on desktop, CSS on mobile ── */}
      <MarqueeTicker />

      {/* Stats strip — counter animations + gradient underlines */}
      <StatsStrip />

      {/* Cómo comprás — delegado a StepsSection para scroll-aware animations */}
      <StepsSection />
    </section>
  );
}
