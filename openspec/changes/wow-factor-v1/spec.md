# SPEC: WOW Factor V1 — Visual Urgency & Mobile-Native Redesign

**Change:** `wow-factor-v1`
**Status:** draft
**Target:** Design score 35+/40 (baseline: 25)
**Scope:** HeroCarousel, Hero (Stats + Marquee), CTA, ProductCard

## Stack Context

- Next.js 16 / React 19 / TypeScript
- Framer Motion 12 (ya integrado — `AnimatePresence`, `motion`, `useScroll`, `useMotionValue`)
- Animation tokens centralizados en `/lib/animations.ts`
- Brand tokens en CSS vars: `--brand-primary: #7b1c2e`, `--brand-secondary: #1c4a32`
- Mobile-first: viewport canónico = 375px (Samsung Galaxy A12 como target de performance)
- `prefers-reduced-motion` parcialmente cubierto (HeroCarousel ya tiene fallback en CSS)

---

## Feature 1: Hero Entrance Animation (HeroCarousel)

**Archivo afectado:** `components/home/HeroCarousel.tsx`

**Contexto actual:** Ya usa Framer Motion (`AnimatePresence`, `staggerContainer`, `fadeUp`). El slide-in de texto ya está implementado como stagger de `fadeUp` variants. El autoplay es 5000ms.

```gherkin
Feature: Hero carga con animación de entrada dramática por slide

  Background:
    Given el usuario accede a la homepage en cualquier dispositivo
    And Framer Motion está disponible

  Scenario: Entrada del primer slide en mobile (375px)
    Given viewport = 375px
    When la página carga por primera vez (slide 0 activo)
    Then la imagen de fondo hace fade-in desde opacity 0 → 1 en 600ms (duration.slow)
    And el label superior ("Nueva colección") aparece con fadeUp en 0ms
    And el heading principal (h1) aparece con fadeUp en 80ms de delay
    And el subtítulo aparece con fadeUp en 160ms de delay
    And el botón CTA aparece con fadeUp en 240ms de delay (slide up from y:20)
    And todas las animaciones completan antes de los 800ms totales
    And el stagger container usa delayChildren: 0.05 (ajustado desde 0.1)

  Scenario: Transición entre slides
    Given el carrusel está activo (autoplay 5000ms)
    When el usuario avanza al siguiente slide (botón o auto)
    Then el slide saliente hace exit con opacity 0, x: ±40 en 600ms
    And el nuevo slide entra con opacity 1, x: 0 en 600ms
    And el texto del nuevo slide re-ejecuta el stagger completo
    And la barra de progreso inferior actualiza el segmento activo (color: --brand-primary)

  Scenario: Network lento (3G, latencia > 2s)
    Given la imagen hero tarda > 2s en cargar
    When el LCP event ocurre tarde
    Then el fade-in de imagen NO bloquea interactividad (usa will-change: opacity)
    And el texto es visible desde el inicio (overlay garantiza legibilidad sin imagen)
    And no hay layout shift (CLS < 0.1, imagen es fill + absolute inset-0)

  Scenario: prefers-reduced-motion activado
    Given el usuario tiene prefers-reduced-motion: reduce
    When la página carga
    Then NO hay animaciones de slide (opacity: 1 inmediato, x: 0 sin transición)
    And NO hay stagger de texto
    And el hero es completamente visible desde frame 0
    And la funcionalidad del carrusel (botones, autoplay) sigue operativa
    And implementación: motion respects system settings via `useReducedMotion()` hook

  Scenario: Usuario en desktop (≥ 1024px)
    Given viewport ≥ 1024px
    When la página carga
    Then las duraciones son idénticas al mobile (NO cambio en desktop)
    And el badge flotante "+60 modelos" hace float animation (animate-float CSS)
    And los botones de navegación del carrusel tienen whileHover y whileTap activos
```

---

## Feature 2: Stats Counter Animation

**Archivo afectado:** `components/home/Hero.tsx` (sección Stats strip, actualmente estática)

**Contexto actual:** Stats es un grid estático con `text-2xl font-black`. Los valores son strings: `"+60"`, `"Envíos"`, `"WhatsApp"`. La animación de counter requiere extraer un componente cliente `<AnimatedStat>`.

```gherkin
Feature: Stats strip anima contadores al entrar en viewport

  Background:
    Given el usuario navega en cualquier dispositivo
    And la stats strip está debajo del HeroCarousel

  Scenario: Usuario scrollea hasta la stats section (mobile)
    Given la stats strip está fuera del viewport inicial
    When el top del componente cruza el 80% del viewport (rootMargin: "-20%")
    Then el stat "+60" anima desde "0" → "+60" en 1.2s con easing ease-out
    And "Envíos" aparece con typewriter de 0 → completo en 1.2s (char by char, 80ms/char)
    And "WhatsApp" aparece con typewriter de 0 → completo en 1.2s (char by char, 80ms/char)
    And cada stat tiene stagger de 100ms respecto al anterior (0ms, 100ms, 200ms)
    And la animación se ejecuta exactamente UNA VEZ (no repite al hacer scroll)
    And implementación: `useInView` de Framer Motion con `once: true`

  Scenario: Stats visible en carga inicial (viewport grande, ≥ 900px height)
    Given el viewport es suficientemente alto para ver stats sin scroll
    When la página carga
    Then los contadores inician animación inmediatamente al mount
    And no hay delay adicional (0ms, 100ms, 200ms stagger estándar)

  Scenario: Stagger entre los 3 stats
    Given la stats section entra en viewport
    When la animación se dispara
    Then "+60" counter empieza en t=0ms
    And "Envíos" counter empieza en t=100ms
    And "WhatsApp" counter empieza en t=200ms
    And los tres terminan antes de t=1400ms (1200ms duración + 200ms stagger)

  Scenario: Hover sobre cada stat (desktop)
    Given el usuario está en desktop (≥ 768px)
    When el usuario hace hover sobre un stat individual
    Then aparece un underline gradient que crece de izquierda a derecha (scaleX: 0 → 1)
    And el underline color es `--brand-primary` → `--brand-secondary` (gradient horizontal)
    And la transición del underline dura 300ms (ease-out)
    When el usuario quita el hover
    Then el underline vuelve a scaleX: 0 en 200ms

  Scenario: Mobile — solo label, desktop — texto completo
    Given stat "Modelos disponibles"
    When viewport < 768px
    Then el label muestra solo la versión corta definida en los datos
    When viewport ≥ 768px
    Then el label muestra el texto completo
    And implementación: prop `shortLabel` en el array STATS de Hero.tsx

  Scenario: prefers-reduced-motion activado
    Given el usuario tiene prefers-reduced-motion: reduce
    When la stats section es visible
    Then los valores aparecen directamente en su valor final (sin counter animation)
    And el hover underline aparece/desaparece sin transición (instant opacity toggle)
```

---

## Feature 3: Marquee — Scroll-Linked Speed

**Archivo afectado:** `components/home/Hero.tsx` (sección marquee, actualmente CSS `animate-marquee`)

**Contexto actual:** El marquee usa `animate-marquee` (CSS keyframe). Para scroll-linking se necesita migrar a `motion.div` con `useVelocity` + `useTransform` de Framer Motion. Los items actuales son strings con un dot SVG de separador.

```gherkin
Feature: Marquee ticker reacciona a la velocidad de scroll

  Background:
    Given el marquee está visible en la página
    And Framer Motion `useScroll` y `useVelocity` están disponibles

  Scenario: Velocidad base (sin scroll)
    Given el usuario no está scrolleando
    When el marquee está activo
    Then el marquee avanza a velocidad base: 60px/s (approx. 20s para un ciclo completo)
    And el separador es el dot SVG existente (sin emoji por defecto)
    And text opacity es 0.9 (constante)

  Scenario: Scroll rápido del usuario (velocity > 300px/s)
    Given el usuario scrollea hacia abajo rápido
    When la scroll velocity supera 300px/s
    Then la velocidad del marquee escala proporcionalmente (max: 200px/s)
    And el multiplicador de velocidad es: `Math.min(velocity / 300 * 2, 3.5)`
    And el efecto se suaviza con `useSpring(scrollVelocity, { stiffness: 100, damping: 30 })`
    And el texto no pierde legibilidad (opacity mínima: 0.7)

  Scenario: Hover sobre el marquee (desktop)
    Given el usuario está en desktop (pointer: fine)
    And el marquee está en movimiento
    When el usuario hace hover sobre el marquee container
    Then la velocidad del marquee desacelera a 0 en 400ms (spring smooth)
    And el texto es completamente legible (opacity: 1)
    When el cursor sale del marquee
    Then la velocidad se restaura a la velocidad pre-hover en 400ms
    And implementación: `onMouseEnter`/`onMouseLeave` con estado `isPaused`

  Scenario: Mobile — scroll sin hover, velocidad reducida
    Given viewport = 375px (touch device)
    When el usuario scrollea
    Then el marquee speed scaling es al 80% del desktop (max: 160px/s)
    And NO hay pause-on-hover (touch devices no tienen hover real)
    And la velocidad base se mantiene en 48px/s (80% de 60px/s)
    And implementación: detectar `pointer: coarse` via media query o `window.matchMedia`

  Scenario: prefers-reduced-motion activado
    Given el usuario tiene prefers-reduced-motion: reduce
    When el marquee está visible
    Then el marquee está completamente detenido (velocidad: 0)
    And el contenido del marquee es legible en posición estática
    And NO hay scroll-linking de ningún tipo
```

---

## Feature 4: CTA Button — Urgency Micro-interactions

**Archivo afectado:** `components/home/HeroCarousel.tsx` (botón "Ver catálogo")
**Archivo secundario:** `components/shared/WhatsAppFab.tsx` (si se aplica mismo patrón)

**Contexto actual:** El botón usa `animate-pulse-glow` (CSS keyframe en globals.css, `pulse-glow` keyframe con box-shadow `rgba(123, 28, 46, 0.45)`). Ya tiene `hover:bg-[var(--brand-primary)] hover:text-white`.

```gherkin
Feature: Botón CTA genera urgencia mediante micro-interacciones

  Background:
    Given el hero está visible en viewport
    And el CTA principal es "Ver catálogo" (Link a /catalogo)

  Scenario: Glow breathing al cargar página
    Given la página acaba de cargar
    When el hero slide 0 está activo
    Then el CTA button tiene breathing glow contínuo
    And el glow cycles: box-shadow 0px → 10px → 0px con opacity 0.45 → 0 → 0.45
    And el ciclo completo dura 2s (CSS keyframe `pulse-glow` ya existente)
    And el loop continúa hasta que el usuario interactúa con el botón
    And al interactuar, el glow se detiene (remover clase `animate-pulse-glow`)

  Scenario: Hover del CTA (desktop, pointer: fine)
    Given el usuario está en desktop
    When el cursor entra en el CTA
    Then background cambia a `--brand-primary`, texto a white (ya existe via Tailwind)
    And el botón escala a 1.03 (whileHover: { scale: 1.03 })
    And el glow brightness aumenta (box-shadow más prominente: 0 0 20px rgba(123,28,46,0.6))
    And la transición usa `spring.snappy` del animation token system
    When el cursor sale del CTA
    Then el botón vuelve a escala 1.0 con spring.snappy
    And el glow breathing se retoma

  Scenario: Tap del CTA en mobile
    Given el usuario está en mobile (touch device)
    When el usuario presiona el CTA
    Then el botón hace pulse: scale 0.97 → 1.02 → 1 en 250ms (whileTap)
    And navega a `/catalogo` (comportamiento Link existente)
    And NO hay hover state persistente (touch devices)

  Scenario: Cambio de slide — el glow persiste
    Given el carrusel cambia de slide automáticamente
    When el texto animado del nuevo slide re-entra
    Then el CTA button re-aparece con el stagger fadeUp (ya implementado)
    And el glow breathing se reinicia con el nuevo slide
    And la animación es parte del stagger container del slide

  Scenario: prefers-reduced-motion activado
    Given el usuario tiene prefers-reduced-motion: reduce
    When el hero es visible
    Then NO hay glow animation (clase pulse-glow no se aplica)
    And NO hay scale en hover ni tap (whileHover/whileTap retornan {} cuando reducedMotion)
    And el botón sigue siendo clickeable y navegable (funcionalidad completa)
    And hover de color (CSS Tailwind hover:bg) SÍ se mantiene (no es animación, es estado)
```

---

## Feature 5: Product Card — Stagger Reveal

**Archivo afectado:** `components/catalog/ProductCard.tsx`, `components/catalog/CatalogGridAnimated.tsx`

**Contexto actual:** `ProductCard` usa CSS transitions puras (`transition-all duration-300`, `hover:-translate-y-1.5`, `hover:shadow-[...]`). `CatalogGridAnimated.tsx` ya existe — probablemente maneja el grid con animaciones. El hover image scale ya está: `group-hover:scale-105`.

```gherkin
Feature: Product cards revelan con stagger de entrada

  Background:
    Given el usuario está en la homepage o página de catálogo
    And hay 3+ product cards visibles o próximas a entrar en viewport

  Scenario: Carga inicial de la página — cards visibles
    Given 3+ cards están en el viewport inicial
    When la página carga
    Then la primera card escala de 0.95 → 1, opacity 0 → 1 en 400ms (ease-out)
    And la segunda card tiene 100ms de delay adicional
    And la tercera card tiene 200ms de delay adicional
    And cards subsiguientes siguen el patrón (index × 100ms, máx 600ms cap)
    And el easing es cubic-bezier(0.4, 0, 0.2, 1) (easeInOut del token system)
    And implementación: `staggerOnScroll` variant de `/lib/animations.ts` con `once: true`

  Scenario: Cards cargadas por scroll (lazy reveal)
    Given cards están inicialmente fuera del viewport
    When el usuario scrollea y las cards entran en viewport
    Then el stagger animation se dispara (mismo timing que carga inicial)
    And la animación ocurre exactamente UNA VEZ por card (once: true)
    And cards que ya animaron NO re-animan
    And implementación: `useInView` por card individual o `whileInView` de Framer Motion

  Scenario: Hover sobre card en desktop
    Given el usuario está en desktop (≥ 768px)
    When el cursor entra en una ProductCard
    Then la card sube 8px (translateY: -8px) — ya existe como `-translate-y-1.5` en CSS
    And el shadow crece: `0_8px_32px_rgba(123,28,46,0.15)` — ya existe en CSS hover
    And el border cambia a `--brand-primary` — ya existe en CSS hover
    And la imagen hace scale 1.0 → 1.05 — ya existe (`group-hover:scale-105`)
    And el badge de categoría cambia de secondary → primary bg — ya existe
    And duración de transition: 300ms (ya definida en `transition-all duration-300`)
    Y NOTE: los hover de CSS existentes se MANTIENEN — no reemplazar con Framer Motion

  Scenario: Tap de card en mobile
    Given el usuario está en mobile (375px)
    When el usuario toca una ProductCard
    Then la card muestra el lift visual brevemente (CSS active state)
    And el link navega a `/productos/[slug]`
    And tap target cumple WCAG AAA: ≥ 48px de área táctil mínima

  Scenario: Quick-view badge en desktop hover
    Given el usuario hace hover en una card en desktop
    When el hover state está activo
    Then aparece un badge/overlay de "Ver producto" en la zona inferior de la imagen
    And el badge hace fade-in en 200ms (opacity 0 → 1)
    And el badge tiene background `rgba(28,14,18,0.85)` con texto blanco
    And en mobile el badge NO aparece (display none en < 768px)

  Scenario: prefers-reduced-motion activado
    Given el usuario tiene prefers-reduced-motion: reduce
    When las cards son visibles
    Then NO hay stagger animation de entrada (cards aparecen directamente en estado final)
    And el hover lift CSS se deshabilita via `@media (prefers-reduced-motion: reduce)`
    And el scale de imagen en hover se deshabilita
    And la navegación y funcionalidad de link siguen intactas
```

---

## Acceptance Criteria Globales

### Timing y Performance

- [ ] Todas las animaciones completan dentro de las duraciones propuestas (±5%)
- [ ] Frame rate consistente a 60fps (16ms/frame sin jank)
- [ ] Mobile animations: stats counter y card reveal 20% más rápido que desktop (duration × 0.8)
- [ ] `will-change: transform, opacity` aplicado SOLO en elementos que animan (no en todos)
- [ ] FCP < 2.5s en conexión 4G simulada (Chrome DevTools throttling)
- [ ] LCP < 2.8s — imagen hero tiene `priority` en slide 0 (ya implementado)
- [ ] CLS < 0.1 — no agregar elementos que desplacen layout durante animación
- [ ] JS execution por frame < 3% (sin blocking animations en main thread)

### Accesibilidad

- [ ] `prefers-reduced-motion: reduce` DESHABILITA todas las animaciones de movimiento
- [ ] Implementación obligatoria: `useReducedMotion()` de Framer Motion en todos los componentes cliente nuevos
- [ ] Navegación por teclado idéntica con o sin animaciones (Tab, Enter, Escape)
- [ ] Labels ARIA no cambian durante animaciones
- [ ] Contraste de color mantenido durante TODOS los estados de animación (4.5:1 mínimo)
- [ ] Los CTAs tienen `aria-label` descriptivos cuando el texto no es suficiente

### Mobile-First (375px canónico)

- [ ] Todos los CTAs tienen área táctil mínima 48×48px (WCAG 2.5.5 AAA)
- [ ] El CTA principal ("Ver catálogo") tiene mínimo 48px height
- [ ] Animaciones optimizadas para Galaxy A12 (MediaTek Helio G35, GPU limitada)
- [ ] Marquee: reducción al 80% de velocidad en touch devices
- [ ] Sin scroll horizontal causado por animaciones (overflow-x: hidden en container)
- [ ] Texto legible durante TODAS las fases de animación (nunca opacity < 0.7 en texto final)

### Cross-Browser

- [ ] Chrome 120+ (desktop y mobile): funcionalidad completa
- [ ] Firefox 121+ (desktop): funcionalidad completa
- [ ] Safari 17+ (desktop y iOS): testear `useSpring` y `useVelocity` específicamente
- [ ] Samsung Internet 23+ (mobile): testear marquee y scroll-linking
- [ ] Fallback sin JS: hero visible en estado estático (opacity: 1, no animation)
- [ ] Progressive enhancement: Framer Motion es enhancement, no bloqueante

### Implementación Técnica

- [ ] NO duplicar animation logic — usar tokens de `/lib/animations.ts`
- [ ] Nuevas variants NO se agregan inline — se exportan desde `/lib/animations.ts`
- [ ] Componentes con `"use client"` solo donde es necesario (servidor por defecto)
- [ ] `useReducedMotion()` pattern centralizado (considerar HOC o custom hook `useMotion`)
- [ ] Stats counter extraído a componente `<AnimatedStat>` (permite lazy import)
- [ ] Marquee migrado de CSS puro a `motion.div` con `useVelocity`

---

## Open Questions (pendientes para sdd-tasks)

| # | Pregunta | Impacto | Decisión default si no se responde |
|---|----------|---------|-------------------------------------|
| 1 | **Marquee debounce:** ¿debounce del scroll listener a 50ms o 100ms? | Performance en scroll rápido | 50ms (más responsivo, Framer Motion `useSpring` absorbe el jitter) |
| 2 | **Stats counter:** ¿mostrar comas/decimales en números futuros o solo enteros? | UX de legibilidad | Solo enteros (el único número es "+60", sin decimales) |
| 3 | **CTA secondary action:** ¿el botón "Ver catálogo" tiene texto secundario o solo el label actual? | Diseño del botón | Solo label actual (no agregar complejidad innecesaria) |
| 4 | **Quick-view card:** ¿el overlay "Ver producto" navega a la misma URL que el link del card? | Funcionalidad | Sí, misma URL — es un affordance visual, no acción nueva |
| 5 | **Marquee emoji rotation:** La propuesta menciona `✨ → 🎨 → 🛍️`, pero el componente actual usa dots SVG. ¿Agregar emojis o mantener dots? | Visual style | Mantener dots SVG (más consistente con el estilo tipográfico actual) |

---

## Dependencies entre Features

```
Feature 1 (Hero) ──────────────────────────────────┐
Feature 3 (Marquee) ──── requiere Hero.tsx refactor ┤──► sdd-tasks batch
Feature 2 (Stats) ────── requiere Hero.tsx refactor ┘

Feature 4 (CTA) ─────── requiere HeroCarousel.tsx ──► independiente
Feature 5 (Cards) ────── requiere ProductCard.tsx ───► independiente
```

**Orden recomendado de implementación:**
1. Feature 4 (CTA) — menor cambio, alto impacto visual
2. Feature 5 (Cards) — componente independiente, testeable
3. Feature 1 (Hero) — mejorar stagger existente, agregar `useReducedMotion`
4. Feature 2 (Stats) — extraer `AnimatedStat`, agregar counter
5. Feature 3 (Marquee) — mayor complejidad técnica (migrar CSS → Framer Motion)
