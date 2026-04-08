import Image from "next/image";
import Link from "next/link";
import { WhatsAppSelector } from "@/components/shared/WhatsAppSelector";
import { buildGenericMessage } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="w-full bg-[var(--brand-accent)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
          {/* Texto */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                GcellShop
              </span>
              <h1 className="text-4xl font-extrabold leading-tight text-[var(--brand-secondary)] md:text-5xl">
                Las mejores fundas{" "}
                <span className="text-[var(--brand-primary)]">para tu celular</span>
              </h1>
              <p className="text-lg text-[var(--brand-text-muted)] max-w-md">
                Encontrá tu funda ideal entre más de 60 modelos. Calidad garantizada, envíos y atención por WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-secondary)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Ver catálogo
              </Link>
              <WhatsAppSelector
                message={buildGenericMessage()}
                layout="row"
              />
            </div>
          </div>

          {/* Imagen hero */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="Funda premium para celular — GcellShop"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
