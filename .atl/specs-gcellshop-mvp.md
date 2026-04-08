# GcellShop MVP — Complete Software Design Specification

**Document version**: 1.0.0
**Date**: 2026-04-06
**Project**: PaginaGcell / GcellShop
**Phase**: sdd-spec (MVP)

---

## Table of Contents

1. SPEC-01: Catalog & Navigation
2. SPEC-02: Try-On Engine
3. SPEC-03: Phone Model & Color Selection
4. SPEC-04: Case Variant Selection
5. SPEC-05: WhatsApp Purchase Flow
6. SPEC-06: Cookie Consent Banner
7. SPEC-07: Asset Specification
8. SPEC-08: Analytics
9. SPEC-09: Performance & Accessibility

---

## SPEC-01: Catalog & Navigation

### Overview

The landing page serves as both the entry point and the primary catalog view. It SHALL consist of a hero section followed by the full case catalog grid. Navigation to a case detail page occurs by selecting a case card.

---

### 1.1 Landing Page Structure

**Requirements**

- The landing page MUST render at the root route `/`.
- The page MUST be a Next.js App Router page using static export (`output: 'export'` in `next.config.js`).
- The page MUST contain two primary sections in order: a Hero section and a Catalog Grid section.
- The Hero section MUST appear above the fold on a 375px wide viewport.
- The page MUST NOT require any server-side data fetching at request time; all data MUST be imported statically from the catalog data file at build time.
- The page title (`<title>`) MUST be set to "GcellShop — Fundas para tu celular" or equivalent brand phrasing.
- The page MUST include a canonical `<link>` tag pointing to the production domain.
- The font stack MUST load Rubik for headings and Nunito Sans for body text via `next/font/google`, with `display: 'swap'`.

**Hero Section Requirements**

- The hero MUST include: a headline, a sub-headline, and a call-to-action element that scrolls the page to the catalog grid.
- The headline MUST use the Rubik font at a minimum of `text-4xl` on mobile (375px) and `text-6xl` on desktop (1024px+).
- The hero background color MUST be `#2563EB` (primary blue).
- The hero text MUST be white (`#F8FAFC` or white).
- The CTA element in the hero MUST use the orange color `#F97316`.
- The hero MUST NOT contain decorative emoji characters; any icons MUST be SVG (Lucide).
- The hero SHOULD display a static or CSS-animated visual showcasing the product (e.g., a phone with a case).

**Scenarios**

```
Given: a user navigates to the root URL "/"
When: the page loads
Then: the hero section is visible above the fold on a 375px viewport
  AND the headline is rendered in Rubik font
  AND the catalog grid is rendered below the hero
  AND the page title is "GcellShop — Fundas para tu celular"
```

```
Given: a user sees the hero section
When: the user taps or clicks the scroll CTA
Then: the page smoothly scrolls to the catalog grid section
```

---

### 1.2 Case Card Display

**Requirements**

- Each case in the catalog MUST be represented by a Case Card component.
- A Case Card MUST display: thumbnail image, case name, and price in ARS.
- Price MUST be formatted as `$XX.XXX` (Argentine Peso format, period as thousands separator, no decimals).
- The thumbnail MUST be sourced from `/public/cases/{slug}/{defaultVariantId}/back.png`.
- The thumbnail image MUST use `next/image` with `loading="lazy"` for cards not in the initial viewport and `loading="eager"` (or priority) for the first 6–8 visible cards.
- Case card names MUST use Rubik font (semi-bold).
- Price MUST be displayed using Nunito Sans (bold).
- The card MUST have a minimum touch target area of 44×44px.
- The card MUST have a visible focus ring when navigated via keyboard (`:focus-visible` CSS pseudo-class).
- The card MUST show a hover/active state with a CSS `transform: scale(1.02)` and `box-shadow` transition within 150ms.
- The card MUST NOT show stock or inventory information (not applicable for MVP).
- The card SHOULD display a "Ver funda" label or equivalent affordance on hover (desktop).

**Scenarios**

```
Given: the catalog data is loaded at build time
When: the catalog grid renders
Then: each case card displays:
  - The case thumbnail image (back view, default variant)
  - The case name in Rubik font
  - The price in ARS format "$XX.XXX" in Nunito Sans
```

```
Given: a user views a case card
When: the user taps/clicks the card
Then: the browser navigates to "/cases/{slug}"
  AND the URL changes without a full page reload (client-side navigation)
```

```
Given: a case card receives keyboard focus
When: the user tabs to the card
Then: a visible focus ring appears around the card
  AND the focus ring meets WCAG 2.1 AA contrast ratio requirements
```

---

### 1.3 Catalog Grid Layout

**Requirements**

- The catalog grid MUST use a CSS Grid layout.
- On mobile (375px): 2 columns.
- On tablet (768px): 3 columns.
- On desktop (1024px+): 4 columns.
- On wide desktop (1440px+): 4 columns (maximum), centered with a `max-width` container.
- Column gap MUST be a minimum of 8px (Tailwind `gap-2`) on mobile.
- The grid MUST support 50+ items without layout breakage.
- The catalog section MUST have an `id` attribute (e.g., `id="catalog"`) to enable anchor scroll from the hero CTA.

**Performance Considerations for 50+ Items**

- The first 8 case images MUST have `priority={true}` in `next/image` to be eagerly loaded.
- All remaining case images MUST use `loading="lazy"`.
- The catalog data file MUST be a static TypeScript/JSON import (no runtime fetch).
- Virtual scrolling is NOT required for MVP but the grid MUST NOT block the main thread during initial render. The catalog array MUST be imported entirely at build time.

**Scenarios**

```
Given: the catalog contains 52 case entries
When: the landing page renders on a 375px mobile viewport
Then: cases are displayed in a 2-column grid
  AND only the first 8 images are eagerly loaded
  AND all remaining images are lazy-loaded as the user scrolls
```

```
Given: the landing page is rendered on a 1024px desktop viewport
When: the catalog grid is visible
Then: cases are displayed in a 4-column grid
  AND column gap is at least 8px
```

---

### 1.4 Case Detail Page

**Requirements**

- Each case MUST have a dedicated detail page at the route `/cases/[slug]`.
- The page MUST be statically generated at build time using `generateStaticParams()`.
- The page MUST render the Try-On Engine (PhoneCanvas), Phone Model & Color selectors, Case Variant selector, and the WhatsApp CTA.
- The page title MUST include the case name: `"{Case Name} — GcellShop"`.
- The page MUST include an Open Graph image meta tag pointing to a static OG image (the default variant back.png or a dedicated OG image).
- The page MUST have a back navigation element (e.g., `← Volver al catálogo`) that navigates to `/`.
- Deep linking MUST be supported: visiting `/cases/marble-classic?model=iphone-15&color=black&variant=sunset-orange` MUST restore the full try-on state.

**Acceptance Criteria — SPEC-01**

- [ ] Landing page renders at `/` with hero and catalog grid
- [ ] Hero uses `#2563EB` background, white text, Rubik font
- [ ] Hero CTA scrolls to catalog grid
- [ ] Case cards display thumbnail, name (Rubik), price in ARS `$XX.XXX` format (Nunito Sans)
- [ ] Grid is 2-col mobile / 3-col tablet / 4-col desktop
- [ ] First 8 images are priority-loaded; rest are lazy-loaded
- [ ] Case cards have 44px minimum touch targets and `:focus-visible` ring
- [ ] Card hover state has `transform: scale(1.02)` within 150ms
- [ ] Case detail pages are statically generated via `generateStaticParams()`
- [ ] Case detail page supports deep linking via URL query parameters
- [ ] All text uses Rubik (headings) or Nunito Sans (body), loaded via `next/font`
- [ ] No emoji icons used; only SVG (Lucide)

---

## SPEC-02: Try-On Engine

### Overview

The Try-On Engine renders the visual composition of a phone with the selected case applied. It uses three absolutely-positioned image layers within a fixed-aspect-ratio container. The result MUST appear as a seamless, photorealistic composite.

---

### 2.1 PhoneCanvas Component Contract

**Component Signature**

```typescript
interface PhoneCanvasProps {
  modelId: string;        // e.g., "iphone-15"
  color: PhoneColor;      // "black" | "white"
  caseSlug: string;       // e.g., "marble-classic"
  variantId: string;      // e.g., "sunset-orange"
  view?: "back";          // Only "back" is supported in MVP; defaults to "back"
  className?: string;
}

type PhoneColor = "black" | "white";
```

**Requirements**

- The PhoneCanvas MUST be a React client component (`'use client'`).
- The PhoneCanvas MUST accept the props defined in `PhoneCanvasProps`.
- The PhoneCanvas MUST render a container `<div>` with a fixed aspect ratio of 9:16 (portrait) using `aspect-ratio: 9/16` CSS.
- The container MUST use `position: relative` and `overflow: hidden`.
- The container MUST have a defined width (responsive: 100% of parent on mobile, capped on desktop).
- Three child `<img>` elements (or `next/image` components) MUST be absolutely positioned with `inset: 0`, `width: 100%`, `height: 100%`, `object-fit: contain`.
- Layer order (z-index ascending): phone base (z=1), case overlay (z=2), optional glare/shine layer (z=3, deferred to v1.1).
- The PhoneCanvas MUST expose a loading state: while any layer image is loading, a skeleton placeholder MUST be shown.
- The PhoneCanvas MUST NOT crash if an image 404s; it MUST display a fallback state (gray placeholder + error message).

**Image Path Resolution**

The PhoneCanvas MUST derive image paths using the following deterministic functions (no runtime API calls):

```
phoneBaseSrc  = `/phones/${modelId}/${color}/back.png`
maskSrc       = `/phones/masks/${modelId}/back.png`
caseOverlaySrc = `/cases/${caseSlug}/${variantId}/back.png`
```

These paths MUST resolve to files in the `/public` directory.

**Scenarios**

```
Given: PhoneCanvas receives props { modelId: "iphone-15", color: "black", caseSlug: "marble-classic", variantId: "sunset-orange" }
When: the component renders
Then: three image layers are rendered:
  - Layer 1 src="/phones/iphone-15/black/back.png" at z-index 1
  - Layer 2 src="/cases/marble-classic/sunset-orange/back.png" at z-index 2, with CSS mask applied
  - The mask CSS references "/phones/masks/iphone-15/back.png"
  AND the container has aspect-ratio 9/16
```

```
Given: PhoneCanvas is mounted
When: any image is still loading (onLoad not fired)
Then: a skeleton placeholder div with animated shimmer is displayed
  AND the skeleton has the same aspect ratio and dimensions as the canvas
```

```
Given: PhoneCanvas mounts and one of the image URLs returns a 404
When: the image fires an onError event
Then: the component displays a gray placeholder with the text "Vista previa no disponible"
  AND no JavaScript error is thrown
```

---

### 2.2 CSS Mask Compositing

**Requirements**

- The case overlay layer MUST have `mask-image` applied using the mask PNG for the selected phone model.
- The CSS property MUST be: `maskImage: "url(/phones/masks/{modelId}/back.png)"`.
- The `mask-size` MUST be `100% 100%` to match the container dimensions.
- The `mask-mode` MUST be `luminance` (white = visible, black = hidden).
- The `-webkit-mask-image` prefixed version MUST also be applied for Safari compatibility.
- The mask MUST be applied only to the case overlay layer (z=2), NOT to the phone base layer (z=1).
- The `mix-blend-mode` on the case layer MUST remain `normal` (no multiply/screen blending in MVP).

**Inline Style Object (reference)**

```typescript
const caseLayerStyle: React.CSSProperties = {
  maskImage: `url(/phones/masks/${modelId}/back.png)`,
  WebkitMaskImage: `url(/phones/masks/${modelId}/back.png)`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskMode: "luminance",
  WebkitMaskMode: "luminance",
};
```

**Scenarios**

```
Given: the case overlay layer renders with a mask for "iphone-15"
When: the browser composites the layers
Then: the case image is only visible through the phone-shaped cutout defined by the mask
  AND the mask URL is "/phones/masks/iphone-15/back.png"
  AND both maskImage and WebkitMaskImage are applied (Safari compatibility)
```

---

### 2.3 Asset Loading and Preloading Strategy

**Requirements**

- The phone base image for the CURRENT selection MUST be loaded eagerly (no lazy attribute).
- When the user changes the phone model or color, the new phone base image SHOULD be preloaded using `<link rel="preload" as="image">` injected into the document head via `next/head` or the App Router's `<head>` metadata.
- When the user changes the case variant, the new case overlay SHOULD be preloaded.
- All mask PNGs for ALL supported phone models MUST be preloaded as `<link rel="preload" as="image">` in the case detail page head, because they are small files and are needed immediately upon model switch.
- The catalog thumbnail images MUST NOT be preloaded globally; they MUST use lazy loading.
- `next/image` MUST be used for all images displayed on the page with correct `width` and `height` props set to the canvas spec (1080×1920) to prevent layout shift.

**Scenarios**

```
Given: the user is on the case detail page for "marble-classic"
When: the page loads with default model "iphone-15" and color "black"
Then: "/phones/iphone-15/black/back.png" is loaded eagerly
  AND all mask PNGs (iphone-14, iphone-15, iphone-16, samsung-s24) are preloaded in <head>
  AND the case overlay for the default variant is loaded eagerly
```

```
Given: the user switches from "iphone-15" to "iphone-16" 
When: the model change event fires
Then: "/phones/iphone-16/black/back.png" is preloaded before the crossfade begins
  AND the crossfade transition is triggered after preloading OR after a maximum 300ms timeout
```

---

### 2.4 Crossfade Animation When Switching

**Requirements**

- When any prop of PhoneCanvas changes (model, color, or variant), the canvas MUST perform a crossfade transition.
- The crossfade MUST use CSS `opacity` transitions from `0` to `1`.
- The transition duration MUST be between 150ms and 300ms.
- The transition MUST use `ease-in-out` easing.
- The transition MUST use `transform` and/or `opacity` ONLY (no layout-triggering properties like `width`, `height`, `top`, `left`).
- The animation MUST be suppressed if the user has enabled `prefers-reduced-motion`. In that case, the swap MUST be instantaneous.
- Implementation approach: the component SHOULD maintain a `key` prop or use a state flag that triggers the fade-out of the old composition and fade-in of the new composition simultaneously.

**Scenarios**

```
Given: the user is viewing "marble-classic" on "iphone-15" in "black"
When: the user selects "iphone-16" as the new model
Then: the current canvas fades to opacity 0 over 150–300ms
  AND the new canvas (iphone-16 + marble-classic) fades to opacity 1 over 150–300ms
  AND the aspect-ratio container does not shift during the transition
```

```
Given: the user has "prefers-reduced-motion: reduce" enabled in OS settings
When: the user switches the phone model
Then: the old canvas is immediately replaced with the new canvas (no fade animation)
  AND no opacity transition is applied
```

**Acceptance Criteria — SPEC-02**

- [ ] PhoneCanvas renders three layers: phone base (z=1), case overlay (z=2), mask applied to overlay
- [ ] PhoneCanvas container has `aspect-ratio: 9/16`
- [ ] Mask is applied using `maskImage` + `WebkitMaskImage` with `luminance` mode
- [ ] Mask PNG path: `/phones/masks/{modelId}/back.png`
- [ ] Phone base path: `/phones/{modelId}/{color}/back.png`
- [ ] Case overlay path: `/cases/{caseSlug}/{variantId}/back.png`
- [ ] Loading skeleton shown while any image is loading
- [ ] Error state shown (gray + text) if any image 404s, no crash
- [ ] All mask PNGs preloaded in case detail page `<head>`
- [ ] Crossfade on prop change: 150–300ms, opacity only, ease-in-out
- [ ] `prefers-reduced-motion` disables animation
- [ ] No layout shift during transitions

---

## SPEC-03: Phone Model & Color Selection

### Overview

The Phone Model & Color Selection UI allows the user to choose their phone model and color. These selections affect the phone base image and mask used in the Try-On Engine and are synced to the URL.

---

### 3.1 Phone Model Picker

**Supported Models (MVP)**

The following phone models MUST be supported at launch:

| modelId | Display Name | Colors Supported |
|---|---|---|
| `iphone-14` | iPhone 14 | black, white |
| `iphone-15` | iPhone 15 | black, white |
| `iphone-16` | iPhone 16 | black, white |
| `samsung-s24` | Samsung S24 | black, white |

Additional models MAY be added by adding entries to the models configuration and providing the required assets.

**Requirements**

- The phone model picker MUST render as a list of selectable chips/buttons.
- Each model chip MUST display the model's display name.
- The selected model chip MUST have a visually distinct active state (border, background change, or both).
- The model picker MUST be scrollable horizontally on mobile if the chips exceed the viewport width.
- Each model chip MUST have a minimum touch target of 44×44px.
- The model picker MUST be keyboard navigable (arrow keys between chips, Enter/Space to select).
- The model picker MUST have an accessible `role="radiogroup"` with each chip having `role="radio"` and `aria-checked` set appropriately.
- The model picker label MUST be visible: "Tu modelo:" or equivalent.
- The default model MUST be `iphone-15` unless overridden by URL params.

**Scenarios**

```
Given: a user arrives at the case detail page for the first time (no URL params)
When: the phone model picker renders
Then: "iPhone 15" is selected by default (aria-checked="true")
  AND all 4 model chips are rendered
  AND the "iPhone 15" chip has the active visual state
```

```
Given: a user taps the "Samsung S24" chip
When: the chip receives a click/tap event
Then: the Samsung S24 chip becomes active
  AND the URL updates to include "?model=samsung-s24"
  AND the PhoneCanvas re-renders with modelId="samsung-s24"
  AND the crossfade transition plays
```

```
Given: a user arrives at "/cases/marble-classic?model=iphone-16&color=white&variant=sunset-orange"
When: the page loads
Then: "iPhone 16" chip is selected (aria-checked="true")
  AND the white color toggle is active
  AND the "sunset-orange" variant chip is active
  AND the PhoneCanvas renders iphone-16, white, sunset-orange
```

---

### 3.2 Phone Color Toggle

**Requirements**

- The color toggle MUST support exactly two values for MVP: `"black"` and `"white"`.
- The color toggle MUST be rendered as two visually distinct buttons or a toggle switch.
- Each color option MUST display a color swatch (a filled circle: black or white with border) alongside a text label ("Negro" / "Blanco").
- The active color MUST have a border or ring indicator (e.g., `ring-2 ring-primary`).
- The color toggle MUST be located adjacent to the model picker or directly below it.
- The color toggle MUST have `role="radiogroup"` with individual buttons having `role="radio"` and `aria-checked`.
- The default color MUST be `"black"` unless overridden by URL params.

**Scenarios**

```
Given: the current phone color is "black"
When: the user taps "Blanco"
Then: the white color option becomes active
  AND the URL updates to include "color=white"
  AND the PhoneCanvas re-renders with color="white"
  AND the crossfade transition plays
```

---

### 3.3 State Management and URL Sync

**Requirements**

- The try-on state (model, color, variant) MUST be managed using React state initialized from URL search params.
- The URL MUST be updated using Next.js `router.replace()` (not `push()`) to avoid polluting the browser history with every selection change.
- URL params MUST be: `model`, `color`, `variant`.
- If any URL param is missing or invalid, the corresponding default value MUST be used silently (no error).
- State updates MUST be batched where possible to avoid multiple re-renders per user interaction.
- The URL sync MUST be implemented in the case detail page component (not inside PhoneCanvas or picker sub-components).

**URL Format**

```
/cases/{slug}?model={modelId}&color={phoneColor}&variant={variantId}
```

Example: `/cases/marble-classic?model=iphone-15&color=black&variant=sunset-orange`

**Scenarios**

```
Given: the user is on "/cases/marble-classic"
When: the user changes model to "iphone-16" and then color to "white" in quick succession
Then: the URL reflects the final state "?model=iphone-16&color=white&variant={defaultVariant}"
  AND only one navigation history entry is created (router.replace used)
  AND the PhoneCanvas renders with the final state
```

---

### 3.4 Compatibility Fallback

**Requirements**

- Each case in the catalog data MUST declare a `compatibleModels` array listing the `modelId` values it supports.
- If the user selects a phone model that is NOT in the case's `compatibleModels` array, the UI MUST display a compatibility notice.
- The compatibility notice MUST state: "Esta funda no está disponible para {modelName}. Seleccioná otro modelo."
- The PhoneCanvas MUST NOT attempt to render with an incompatible model (it will 404 on the phone base image and potentially show broken UI).
- The WhatsApp CTA MUST be disabled or hidden when an incompatible model is selected.
- The notice MUST suggest compatible models as clickable chips.

**Scenarios**

```
Given: the case "marble-classic" has compatibleModels: ["iphone-14", "iphone-15", "iphone-16"]
When: the user selects "samsung-s24" from the model picker
Then: a notice appears: "Esta funda no está disponible para Samsung S24. Seleccioná otro modelo."
  AND suggested compatible model chips are shown (iPhone 14, iPhone 15, iPhone 16)
  AND the PhoneCanvas is replaced with a placeholder (not broken image)
  AND the WhatsApp CTA is disabled
```

**Acceptance Criteria — SPEC-03**

- [ ] 4 phone models available: iphone-14, iphone-15, iphone-16, samsung-s24
- [ ] Default model is iphone-15, default color is black
- [ ] Model picker has `role="radiogroup"`, chips have `role="radio"` + `aria-checked`
- [ ] Color toggle has 2 options with color swatches (black/white)
- [ ] URL updated via `router.replace()` (not push) on every selection change
- [ ] URL params: `model`, `color`, `variant`
- [ ] Deep-link URL restores full state on page load
- [ ] Invalid/missing URL params fall back to defaults silently
- [ ] Compatibility notice shown for incompatible model selections
- [ ] WhatsApp CTA disabled when model is incompatible
- [ ] All chips: 44px minimum touch targets, keyboard navigable

---

## SPEC-04: Case Variant Selection

### Overview

Cases MAY have multiple visual variants (colorways, patterns, materials). The variant picker allows the user to select among them. Only one variant MAY be active at a time.

---

### 4.1 Variant Color Chip Picker

**Requirements**

- The variant picker MUST render each variant as a circular color chip.
- Each chip MUST be at minimum 44×44px (touch target) per WCAG and the design system.
- The gap between chips MUST be at minimum 8px.
- Each chip MUST display the variant's representative color (as a filled circle using the variant's `colorHex` field from catalog data).
- Each chip MUST have an `aria-label` set to the variant's display name (e.g., `aria-label="Sunset Orange"`).
- The active chip MUST display a ring: `ring-2 ring-offset-2 ring-primary` (Tailwind classes or equivalent).
- Chips MUST be arranged in a horizontal row, wrapping to a second row only if necessary.
- The variant picker MUST have a visible text label above it: "Color:" or the variant display name of the current selection.
- The variant picker MUST be keyboard navigable (arrow keys, Enter/Space).
- The variant picker MUST have `role="radiogroup"` with each chip having `role="radio"` and `aria-checked`.

**Scenarios**

```
Given: the case "marble-classic" has 3 variants: sunset-orange, midnight-blue, cherry-red
When: the variant picker renders
Then: 3 circular color chips are displayed in a horizontal row
  AND each chip is at least 44×44px
  AND the active chip (defaultVariant or from URL) has a ring indicator
  AND the label above shows the name of the active variant
```

```
Given: the user taps the "Midnight Blue" chip
When: the chip receives a click/tap event
Then: "midnight-blue" chip becomes active (ring appears)
  AND the URL updates to "?...&variant=midnight-blue"
  AND the PhoneCanvas re-renders with variantId="midnight-blue"
  AND the crossfade transition plays
  AND the label updates to "Midnight Blue"
```

---

### 4.2 Single Variant Behavior

**Requirements**

- If a case has exactly one variant, the variant picker MUST still render (showing the single chip as active).
- The single chip MUST be in the permanently active/selected state.
- The picker MUST NOT be hidden when there is only one variant, to maintain layout consistency.
- The label SHOULD still show the variant name.

**Scenarios**

```
Given: the case "transparent-clear" has exactly 1 variant: "clear"
When: the variant picker renders
Then: one chip is displayed, in the active state (ring shown)
  AND no interaction is required or expected
  AND the chip is still focusable (for accessibility consistency) but selecting it again has no effect
```

---

### 4.3 Catalog Data Structure (Variant)

**Requirements**

Each case in the catalog data file MUST conform to the following TypeScript interface:

```typescript
interface CaseVariant {
  variantId: string;        // e.g., "sunset-orange"
  displayName: string;      // e.g., "Sunset Orange"
  colorHex: string;         // e.g., "#F97316"
}

interface Case {
  slug: string;             // e.g., "marble-classic" — URL-safe, kebab-case
  name: string;             // e.g., "Marble Classic"
  priceARS: number;         // e.g., 12500 — rendered as "$12.500"
  variants: CaseVariant[];  // At least one variant REQUIRED
  defaultVariantId: string; // MUST match one of variants[].variantId
  compatibleModels: string[]; // e.g., ["iphone-14", "iphone-15", "iphone-16"]
  tags?: string[];          // Optional: for future filtering
}
```

The catalog data file MUST be located at `/src/data/catalog.ts` (or `/src/data/catalog.json`).
The catalog MUST contain a minimum of 50 case entries at launch.
Each `slug` MUST be unique across the entire catalog.
Each `variantId` within a case MUST be unique within that case.

**Acceptance Criteria — SPEC-04**

- [ ] Variant chips are circular, minimum 44×44px, minimum 8px gap
- [ ] Each chip has `aria-label` = variant display name
- [ ] Active chip has `ring-2 ring-offset-2 ring-primary` style
- [ ] Variant picker has `role="radiogroup"`, chips have `role="radio"` + `aria-checked`
- [ ] Label above chips shows current variant display name
- [ ] URL updates to `?variant={variantId}` on chip selection
- [ ] PhoneCanvas crossfade plays on variant change
- [ ] Single-variant cases still render the picker (one chip, always active)
- [ ] Catalog data conforms to the `Case` interface
- [ ] Catalog contains minimum 50 entries
- [ ] All slugs are unique; all variantIds are unique within a case

---

## SPEC-05: WhatsApp Purchase Flow

### Overview

The WhatsApp CTA is the sole purchase mechanism. It MUST be always visible on the case detail page, pre-fill a message with the user's current selection, and open WhatsApp (mobile app or web) on tap/click.

---

### 5.1 Fixed CTA Button

**Requirements**

- The WhatsApp CTA button MUST be fixed to the bottom of the viewport on mobile (375px–767px) using `position: fixed; bottom: 0; left: 0; right: 0; z-index: 50`.
- On desktop (1024px+), the CTA SHOULD be sticky within the product detail column or displayed as a prominent button below the selectors — it MUST NOT overlap content in a disruptive way.
- The button MUST use the CTA color `#F97316` (orange) as its background.
- The button text MUST be white.
- The button MUST include the WhatsApp SVG icon (Lucide `MessageCircle` or a custom WhatsApp SVG) to the left of the text.
- The button text MUST be: "Comprar por WhatsApp" or equivalent.
- The button MUST be disabled and visually distinct (opacity: 0.5, cursor: not-allowed) when the selected phone model is not compatible with the case.
- The button MUST have a minimum height of 48px.
- The button MUST have `aria-label="Comprar {caseName} por WhatsApp"` for screen readers.
- A safe area inset MUST be applied at the bottom for iOS notch/home indicator: `padding-bottom: env(safe-area-inset-bottom)` or Tailwind `pb-safe`.

**Scenarios**

```
Given: the user is on the case detail page with a compatible model selected
When: the page renders
Then: the WhatsApp button is fixed to the bottom of the viewport
  AND the button shows the WhatsApp icon + "Comprar por WhatsApp"
  AND the button background is #F97316
  AND the button is not disabled
```

```
Given: the user selects an incompatible phone model
When: the UI updates
Then: the WhatsApp button becomes disabled (opacity 0.5)
  AND the button is not clickable (pointer-events disabled)
  AND the aria-disabled attribute is set to "true"
```

---

### 5.2 Pre-Filled Message Format

**Requirements**

- The WhatsApp message MUST be URL-encoded and passed as the `text` parameter.
- The message MUST include: case name, variant display name, phone model display name, phone color display name, and the current page URL.
- The message template MUST be:

```
Hola! Me interesa la funda {caseName} ({variantDisplayName}) para {phoneModelDisplayName} ({phoneColorDisplayName}).

Precio: $XX.XXX

Ver producto: {currentPageUrl}
```

- The price in the message MUST use the ARS format `$XX.XXX`.
- The `{currentPageUrl}` MUST be the full URL including query params (e.g., `https://gcellshop.com/cases/marble-classic?model=iphone-15&color=black&variant=sunset-orange`).
- The message MUST be encoded with `encodeURIComponent()`.

---

### 5.3 URL Construction

**Requirements**

- The WhatsApp number MUST be read from the environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- The value MUST be in international format without the `+` sign and without spaces: e.g., `5491112345678`.
- The URL MUST be constructed as follows:
  - Mobile: `https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}?text={encodedMessage}`
  - Desktop: The same `wa.me` URL SHOULD be used (WhatsApp Web handles this).
- The `NEXT_PUBLIC_WHATSAPP_NUMBER` variable MUST be declared in `.env.local` and also in `.env.example` (with a placeholder value).
- If `NEXT_PUBLIC_WHATSAPP_NUMBER` is undefined or empty at build time, the button MUST still render but MUST log a console warning and the `href` MUST fallback to `"#"` with the button disabled.

**Scenarios**

```
Given: NEXT_PUBLIC_WHATSAPP_NUMBER="5491112345678"
  AND the user has selected: case="Marble Classic", variant="Sunset Orange", model="iPhone 15", color="Negro"
When: the user taps the WhatsApp CTA
Then: the browser opens "https://wa.me/5491112345678?text=Hola!%20Me%20interesa%20la%20funda%20Marble%20Classic%20(Sunset%20Orange)%20para%20iPhone%2015%20(Negro).%0A%0APrecio%3A%20%2412.500%0A%0AVer%20producto%3A%20{encodedUrl}"
  AND on mobile, the WhatsApp app opens (if installed) or wa.me redirects to web
```

---

### 5.4 GA4 Event on Click

**Requirements**

- Clicking the WhatsApp CTA MUST fire a GA4 event named `whatsapp_click`.
- The event MUST include the following parameters:
  - `case_slug`: the case slug
  - `case_name`: the case display name
  - `variant_id`: the selected variant ID
  - `model_id`: the selected phone model ID
  - `color`: the selected phone color
  - `price_ars`: the price as a number
- The event MUST be fired BEFORE navigating to the WhatsApp URL (or simultaneously, using `window.open`).
- If GA4 has not been initialized (consent not given), the event MUST be silently skipped.

---

### 5.5 Desktop vs Mobile Behavior

**Requirements**

- The `wa.me` link MUST work on both mobile and desktop.
- On desktop, `wa.me` redirects to WhatsApp Web automatically.
- The link MUST open in a new tab on desktop: `target="_blank" rel="noopener noreferrer"`.
- On mobile, the native app opens via the `wa.me` deep link.
- No user-agent sniffing is required; the `wa.me` URL handles both environments.

**Acceptance Criteria — SPEC-05**

- [ ] CTA button fixed to bottom of viewport on mobile (z-index 50)
- [ ] CTA button uses `#F97316` background, white text, WhatsApp SVG icon
- [ ] Button text: "Comprar por WhatsApp"
- [ ] Button height minimum 48px, with `env(safe-area-inset-bottom)` padding
- [ ] Button disabled (opacity 0.5, pointer-events none, aria-disabled) when model incompatible
- [ ] Pre-filled message includes: case name, variant, model, color, price ($XX.XXX), and current URL
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` sourced from environment variable
- [ ] URL format: `https://wa.me/{number}?text={encoded}`
- [ ] Opens in new tab on desktop (`target="_blank"`)
- [ ] GA4 `whatsapp_click` event fires on click (if consent given)
- [ ] `aria-label="Comprar {caseName} por WhatsApp"` on button
- [ ] Fallback behavior if env var is missing (button disabled, console warning)

---

## SPEC-06: Cookie Consent Banner

### Overview

A cookie consent banner is required by Argentine data privacy law (Ley 25.326) and best practices. The banner MUST appear on first visit and gate GA4 initialization.

---

### 6.1 Display on First Visit

**Requirements**

- The banner MUST appear on the user's first visit to any page of the site.
- The banner MUST appear at the bottom of the viewport using `position: fixed; bottom: 0; left: 0; right: 0; z-index: 100`.
- The banner MUST be rendered above the WhatsApp CTA button (higher z-index).
- The banner MUST NOT appear if the user has previously accepted or declined (determined by localStorage key `gcell_cookie_consent`).
- The banner MUST include: a short text explaining cookie usage, an "Aceptar" button, and a "Rechazar" button.
- The banner text MUST reference analytics cookies (Google Analytics/GA4).
- A link to the privacy policy MAY be included (deferred if no policy page exists in MVP).
- The banner MUST be ARIA-labelled as a dialog: `role="dialog"` with `aria-label="Aviso de cookies"` and `aria-live="polite"`.
- The banner SHOULD animate in from the bottom using a CSS slide-up transition (150–300ms, transform only).
- The banner MUST be keyboard accessible: focus MUST be trapped within the banner while it is visible; Tab/Shift-Tab MUST cycle between "Aceptar" and "Rechazar"; Escape MAY close the banner as a "decline" action.

**Scenarios**

```
Given: a new user visits the site for the first time
  AND localStorage does not contain the key "gcell_cookie_consent"
When: any page of the site loads
Then: the cookie consent banner appears at the bottom of the viewport
  AND the banner is above the WhatsApp CTA
  AND the banner contains "Aceptar" and "Rechazar" buttons
  AND focus is trapped within the banner
```

```
Given: a returning user visits the site
  AND localStorage["gcell_cookie_consent"] === "accepted" or "declined"
When: any page of the site loads
Then: the cookie consent banner does NOT appear
```

---

### 6.2 Accept / Decline Behavior

**Requirements**

- When the user clicks "Aceptar":
  - `localStorage.setItem("gcell_cookie_consent", "accepted")` MUST be called.
  - GA4 MUST be initialized immediately (if not already initialized).
  - The banner MUST animate out and be removed from the DOM.
  - The whatsapp_click and other analytics events MAY begin firing.

- When the user clicks "Rechazar":
  - `localStorage.setItem("gcell_cookie_consent", "declined")` MUST be called.
  - GA4 MUST NOT be initialized.
  - The banner MUST animate out and be removed from the DOM.
  - No analytics events MUST be sent for this session.

**Scenarios**

```
Given: the cookie consent banner is visible
When: the user clicks "Aceptar"
Then: localStorage["gcell_cookie_consent"] is set to "accepted"
  AND GA4 is initialized (gtag script loaded or gtag('consent', 'update', ...) called)
  AND the banner slides out and is removed from the DOM
  AND subsequent analytics events fire normally
```

```
Given: the cookie consent banner is visible
When: the user clicks "Rechazar"
Then: localStorage["gcell_cookie_consent"] is set to "declined"
  AND GA4 is NOT initialized
  AND the banner slides out and is removed from the DOM
  AND no analytics events fire for this session
```

---

### 6.3 GA4 Deferred Until Consent

**Requirements**

- The GA4 `<Script>` tag MUST NOT be added to the page on initial load.
- The GA4 initialization MUST only occur after the user accepts cookies.
- The recommended implementation is to use the `gtag.js` Consent Mode v2:
  - On page load, call `gtag('consent', 'default', { analytics_storage: 'denied' })`.
  - After acceptance, call `gtag('consent', 'update', { analytics_storage: 'granted' })`.
  - Alternatively, dynamically inject the GA4 script tag after consent.
- The `NEXT_PUBLIC_GA4_MEASUREMENT_ID` environment variable MUST be used for the GA4 Measurement ID.
- If `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is undefined, GA4 MUST be silently skipped.

---

### 6.4 Persistence

**Requirements**

- Consent state MUST be persisted in `localStorage` under the key `gcell_cookie_consent`.
- Valid values for the key are `"accepted"` and `"declined"`.
- The consent state MUST be read on every page load (via a React context or top-level layout effect).
- If the value is `"accepted"`, GA4 MUST be initialized automatically (without showing the banner) on page load.
- If the value is `"declined"`, GA4 MUST NOT be initialized and the banner MUST NOT be shown.
- If the value is absent or any other value, the banner MUST be shown.
- There is NO mechanism to reset consent in MVP (a "Manage cookies" link is deferred to v1.1).

**Scenarios**

```
Given: localStorage["gcell_cookie_consent"] === "accepted"
When: the user navigates to the site
Then: GA4 is initialized on page load without showing the banner
  AND analytics events fire normally throughout the session
```

**Acceptance Criteria — SPEC-06**

- [ ] Banner renders at `position: fixed; bottom: 0` with `z-index: 100`
- [ ] Banner is above the WhatsApp CTA button
- [ ] Banner does not appear if `localStorage["gcell_cookie_consent"]` is set
- [ ] Banner has `role="dialog"` and `aria-label="Aviso de cookies"`
- [ ] Focus is trapped within the banner while visible
- [ ] "Aceptar" sets localStorage + initializes GA4 + removes banner
- [ ] "Rechazar" sets localStorage + does NOT initialize GA4 + removes banner
- [ ] GA4 script/initialization is gated entirely on consent
- [ ] GA4 Measurement ID from `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- [ ] On returning "accepted" visit, GA4 initializes automatically (no banner)
- [ ] Banner slide-in animation uses transform only (150–300ms)
- [ ] Escape key closes banner as "decline"

---

## SPEC-07: Asset Specification

### Overview

This section defines the exact requirements for all image assets used in the Try-On Engine and catalog. This spec is addressed to the store owner and the designer preparing assets.

---

### 7.1 Canvas Specification

**ALL try-on assets (phone bases, case overlays, and mask PNGs) MUST adhere to the following canvas spec:**

| Property | Value |
|---|---|
| Width | 1080 pixels |
| Height | 1920 pixels |
| Orientation | Portrait (9:16) |
| Color space | sRGB |
| DPI/PPI | 72 DPI (screen resolution) |
| Format | PNG (all try-on assets) |

---

### 7.2 File Format Requirements

**Phone Base Images**

- File format: PNG
- Background: OPAQUE white or any solid color — this is the background of the phone render
- Content: The phone body in the specified color (black or white) photographed or rendered from the back, filling the canvas appropriately (centered, with padding)
- Transparent background: NOT required; a solid background is acceptable
- The phone SHOULD be centered horizontally and vertically on the canvas
- The phone body SHOULD occupy 60–75% of the canvas height

**Case Overlay Images**

- File format: PNG
- Background: TRANSPARENT (alpha channel required)
- Content: The case image (back view only for MVP), aligned EXACTLY to match the phone base canvas dimensions and phone position
- The case image MUST be precisely aligned to the phone form factor — it will be composited directly on top of the phone base
- The case design MUST be contained within the phone outline area only; any pixels outside the phone outline MUST be transparent
- If the case has a texture or print, it MUST be pre-applied to the case shape in the PNG

**Mask Images**

- File format: PNG
- Background: BLACK (`#000000`)
- Content: The phone back surface area rendered in WHITE (`#FFFFFF`) — the exact shape of the case-visible area (back of the phone)
- Grayscale: the mask MUST be pure black and white — no gray values, no anti-aliasing on edges (or minimal if necessary for edge quality)
- Canvas dimensions: identical to phone base and case overlay (1080×1920)
- Alignment: the white area MUST perfectly match the phone case contact area in the corresponding phone base image

**Catalog Thumbnail Images**

- The Try-On system uses the back.png case overlay as the catalog thumbnail
- No separate thumbnail asset is required; `next/image` resizes on the fly
- If a distinct marketing thumbnail is desired, it MUST be placed at `/public/cases/{slug}/{variantId}/thumb.png` and SHOULD be 400×400px

---

### 7.3 Mask Creation Guidelines

**Step-by-step guide for creating a mask PNG:**

1. Open the phone base image (`/phones/{modelId}/{color}/back.png`) in Photoshop, Figma, or Affinity Photo.
2. Select the phone back surface area — the region where the case would sit. This includes the back glass/body but EXCLUDES camera bumps, buttons, and frame sides.
3. Fill the selected area with pure white (#FFFFFF) on a new layer.
4. Fill the background (everything outside the selection) with pure black (#000000).
5. Save as PNG with no transparency (the mask does not use alpha — it uses luminance).
6. Verify: when applied as a CSS `mask-image` with `mask-mode: luminance`, the case overlay should be visible only within the white area.

**Important**: one mask is required per phone model, NOT per color. The mask PNG is model-specific, not color-specific.

---

### 7.4 File Naming Convention

**All file names and directory names MUST be lowercase kebab-case.**

```
/public/
  phones/
    iphone-14/
      black/
        back.png
      white/
        back.png
    iphone-15/
      black/
        back.png
      white/
        back.png
    iphone-16/
      black/
        back.png
      white/
        back.png
    samsung-s24/
      black/
        back.png
      white/
        back.png
    masks/
      iphone-14/
        back.png
      iphone-15/
        back.png
      iphone-16/
        back.png
      samsung-s24/
        back.png
  cases/
    {slug}/
      {variantId}/
        back.png
```

**Naming rules:**

- `{slug}`: the case's catalog slug, kebab-case, lowercase, alphanumeric and hyphens only (e.g., `marble-classic`, `sunset-vibes`, `transparent-clear`)
- `{variantId}`: the variant identifier, kebab-case, lowercase, alphanumeric and hyphens only (e.g., `midnight-blue`, `cherry-red`, `clear`)
- `{modelId}`: the phone model identifier as defined in SPEC-03 (e.g., `iphone-15`, `samsung-s24`)
- `{color}`: `black` or `white` only

---

### 7.5 How to Add a New Case to the Catalog

**Process for adding a new case:**

1. **Prepare assets**: Create the case overlay PNG(s) for each variant at 1080×1920px with transparent background. If the case is compatible with multiple phone models, a separate overlay MAY be needed per model if the case shape differs (for MVP, one overlay per variant is used for all models — if this is acceptable, document the assumption).

2. **Name and place assets**:
   ```
   /public/cases/{new-slug}/{variantId}/back.png
   ```
   Repeat for each variant.

3. **Add catalog entry**: Open `/src/data/catalog.ts` and add a new entry to the `cases` array following the `Case` interface defined in SPEC-04.

4. **Verify `compatibleModels`**: Ensure the case entry lists only models for which correctly-aligned overlay assets exist.

5. **Run the build** (`npm run build`) to verify:
   - `generateStaticParams()` picks up the new case slug
   - No TypeScript errors in the catalog data
   - The case detail page is generated statically

6. **Test locally**: Navigate to `/cases/{new-slug}` and verify the try-on renders correctly for all compatible models and all variants.

7. **Deploy**: Commit assets and catalog data, push to the main branch; Vercel deploys automatically.

**Acceptance Criteria — SPEC-07**

- [ ] All try-on images are 1080×1920px, PNG format
- [ ] Phone base images have opaque backgrounds
- [ ] Case overlay images have transparent (alpha) backgrounds
- [ ] Mask images are pure black (#000000) background with white (#FFFFFF) phone back area
- [ ] One mask per phone model (not per color)
- [ ] All directory and file names are lowercase kebab-case
- [ ] Catalog thumbnail uses case overlay back.png via `next/image` resizing
- [ ] New case addition process: add asset files + add catalog entry + rebuild
- [ ] Minimum 50 case entries with all required assets present at launch

---

## SPEC-08: Analytics

### Overview

GA4 analytics track user engagement and purchase intent signals. All analytics MUST be gated on cookie consent (SPEC-06).

---

### 8.1 GA4 Events

The following events MUST be implemented:

| Event Name | Trigger | Component |
|---|---|---|
| `case_view` | Case detail page loads | Case detail page effect |
| `variant_change` | User selects a new variant chip | Variant picker |
| `model_change` | User selects a new phone model | Model picker |
| `color_change` | User toggles phone color | Color toggle |
| `whatsapp_click` | User clicks the WhatsApp CTA | CTA button |

---

### 8.2 Event Payload Structure

**`case_view`**
```typescript
{
  event: "case_view",
  case_slug: string,        // e.g., "marble-classic"
  case_name: string,        // e.g., "Marble Classic"
  default_variant_id: string, // e.g., "sunset-orange"
  model_id: string,         // e.g., "iphone-15"
  color: string,            // e.g., "black"
  price_ars: number,        // e.g., 12500
}
```

**`variant_change`**
```typescript
{
  event: "variant_change",
  case_slug: string,
  previous_variant_id: string,
  new_variant_id: string,
  new_variant_name: string,
}
```

**`model_change`**
```typescript
{
  event: "model_change",
  case_slug: string,
  previous_model_id: string,
  new_model_id: string,
}
```

**`color_change`**
```typescript
{
  event: "color_change",
  case_slug: string,
  model_id: string,
  previous_color: string,
  new_color: string,
}
```

**`whatsapp_click`**
```typescript
{
  event: "whatsapp_click",
  case_slug: string,
  case_name: string,
  variant_id: string,
  variant_name: string,
  model_id: string,
  color: string,
  price_ars: number,
}
```

---

### 8.3 Analytics Utility Module

**Requirements**

- All GA4 event firing MUST be centralized in a utility module: `/src/lib/analytics.ts`.
- The module MUST export typed functions for each event (e.g., `trackCaseView(params)`, `trackWhatsAppClick(params)`).
- Each function MUST check whether `window.gtag` is defined before calling it; if not defined, the function MUST return silently.
- The module MUST NOT import or depend on any component-level code.
- The module MUST be a plain TypeScript module (not a React component or hook).

**Reference structure:**

```typescript
// /src/lib/analytics.ts
declare global {
  interface Window { gtag: (...args: unknown[]) => void; }
}

function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function trackCaseView(params: CaseViewParams): void {
  if (!isGtagAvailable()) return;
  window.gtag("event", "case_view", params);
}
// ... other track functions
```

---

### 8.4 Initialization After Consent

**Requirements**

- GA4 initialization MUST follow the Consent Mode v2 pattern:
  1. In the Next.js root layout, add `gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' })` before the GA4 script.
  2. After user accepts cookies, call `gtag('consent', 'update', { analytics_storage: 'granted' })`.
  3. The GA4 `<Script>` tag MUST use `strategy="afterInteractive"`.
  4. The GA4 measurement ID MUST come from `process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID`.
- Alternatively (simpler approach): do NOT load the gtag script at all until consent is given. After acceptance, dynamically append the `<script src="https://www.googletagmanager.com/gtag/js?id={ID}">` tag and then call `gtag('config', ID)`. Both approaches are acceptable; the Consent Mode v2 approach is preferred.

**Scenarios**

```
Given: the user has accepted cookies
  AND the user is on the case detail page for "marble-classic"
When: the page component mounts
Then: a "case_view" GA4 event is fired with the correct payload
  AND window.gtag is defined and callable
```

```
Given: the user has declined cookies
  AND the user is on the case detail page for "marble-classic"
When: the page component mounts
Then: NO GA4 event is fired
  AND window.gtag is either undefined or analytics_storage remains "denied"
```

```
Given: the user is viewing the case detail page
  AND the user has accepted cookies
When: the user changes the phone model from "iphone-15" to "iphone-16"
Then: a "model_change" event is fired:
  { case_slug: "marble-classic", previous_model_id: "iphone-15", new_model_id: "iphone-16" }
```

**Acceptance Criteria — SPEC-08**

- [ ] 5 GA4 events implemented: case_view, variant_change, model_change, color_change, whatsapp_click
- [ ] Each event has the correct payload fields as defined in SPEC-08.2
- [ ] All analytics calls centralized in `/src/lib/analytics.ts`
- [ ] Each track function checks `window.gtag` availability before calling
- [ ] GA4 initialization uses Consent Mode v2 (or dynamic injection) — gated on consent
- [ ] GA4 Measurement ID from `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- [ ] `case_view` fires on case detail page mount
- [ ] No events fire when consent is "declined"

---

## SPEC-09: Performance & Accessibility

### Overview

The app MUST meet specific Core Web Vitals targets, follow image optimization best practices, and be accessible to users with disabilities and assistive technologies.

---

### 9.1 Core Web Vitals Targets

The following Lighthouse and CrUX targets MUST be met on mobile (simulated 4G, Moto G4 equivalent):

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5 seconds |
| FID / INP (Interaction to Next Paint) | ≤ 200ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |
| FCP (First Contentful Paint) | ≤ 1.8 seconds |
| Lighthouse Performance Score | ≥ 85 (mobile) |

**Requirements**

- Explicit `width` and `height` props MUST be provided to all `next/image` components to prevent layout shift (CLS).
- The hero section MUST NOT cause a layout shift when fonts load (use `font-display: swap` and size-adjust if necessary).
- The WhatsApp CTA fixed button MUST NOT cause layout shift; it MUST be positioned using `position: fixed` (out of flow).
- Font files MUST be loaded via `next/font` (self-hosted by Next.js), eliminating external font network requests.
- The JS bundle for the landing page MUST be as small as possible; heavy components (e.g., PhoneCanvas) MUST be dynamically imported with `next/dynamic` on the case detail page.
- Total page weight for the landing page MUST be under 500KB (excluding lazy-loaded images).

---

### 9.2 Image Optimization via next/image

**Requirements**

- ALL images rendered in the UI MUST use the `next/image` component (`<Image>` from `"next/image"`).
- `next/image` MUST be configured with the `unoptimized: false` setting (default) for Vercel deployments, enabling automatic WebP conversion and responsive sizing.
- For static export (`output: 'export'`), if image optimization is not available, the `loader` MUST be set to a custom loader OR `unoptimized: true` with pre-optimized assets.
- IMPORTANT: Since static export is used, the recommended approach is to use `unoptimized: false` and deploy to Vercel (which supports `next/image` optimization even with static export via Vercel's Image Optimization API), OR pre-optimize all assets to WebP and use `unoptimized: true`.
- The team MUST decide and document this choice in `next.config.js` comments.
- Case catalog thumbnails MUST be sized appropriately: width 400px, height 711px (maintaining 9:16 ratio) in the `next/image` props, with `sizes` prop: `"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"`.
- PhoneCanvas images MUST use `next/image` with `fill` prop or explicit dimensions matching the container.

---

### 9.3 Lazy Loading Non-Visible Catalog Images

**Requirements**

- The first 8 catalog images MUST use `priority={true}` in `next/image`.
- All remaining catalog images MUST use `loading="lazy"` (this is the `next/image` default when `priority` is not set).
- The lazy loading boundary MUST use the native browser Intersection Observer (provided automatically by `next/image`).
- The catalog grid MUST render all 50+ cards in the DOM at initial render (no virtual scrolling for MVP), relying on native lazy loading for performance.

---

### 9.4 Accessibility

**Color Contrast**

- All text on `#F8FAFC` background MUST meet WCAG 2.1 AA contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text).
- `#1E293B` text on `#F8FAFC` background: contrast ratio ≈ 13.7:1 — PASSES AA and AAA.
- White text on `#2563EB` background: contrast ratio ≈ 4.7:1 — PASSES AA.
- White text on `#F97316` background: contrast ratio ≈ 3.0:1 — PASSES AA for large text only. The CTA button text MUST be at minimum 18px (bold) or 24px (normal) to qualify as large text. If the button text is smaller, the background MUST be darkened to meet AA.
- All interactive elements MUST have visible focus indicators (`:focus-visible`) with sufficient contrast against their background.

**Focus Management**

- The cookie consent banner MUST trap focus (SPEC-06 already covers this).
- When the banner closes, focus MUST return to the element that was focused before the banner appeared (or to the body).
- The case detail page MUST have a skip navigation link (`<a href="#main-content">Saltar al contenido</a>`) as the first focusable element.

**Alt Text**

- Phone base images MUST have `alt="{modelName} en color {colorName}"` (e.g., `alt="iPhone 15 en color negro"`).
- Case overlay images MUST have `alt=""` (empty alt, decorative — the composite is the meaningful image, not individual layers).
- Case thumbnail images in the catalog MUST have `alt="{caseName} — funda para celular"`.
- The PhoneCanvas container MUST have `role="img"` and `aria-label="Vista previa de {caseName} en {modelName} {colorName}"`.

**Reduced Motion**

- ALL CSS transitions and animations MUST be conditional on `prefers-reduced-motion: no-preference`.
- The Tailwind CSS `motion-reduce:` variant MUST be used, OR a global CSS rule:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- The crossfade animation in PhoneCanvas (SPEC-02.4) MUST respect this setting.

**ARIA and Semantic HTML**

- The landing page MUST use semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`.
- The catalog grid section MUST have `<section aria-label="Catálogo de fundas">`.
- The hero section MUST have `<section aria-label="Introducción">`.
- The phone model picker and variant picker MUST use `role="radiogroup"` as specified in SPEC-03 and SPEC-04.
- Buttons MUST be `<button>` elements (not `<div>` or `<a>` styled as buttons, unless navigation is required).
- All icon-only buttons (if any) MUST have `aria-label` text.

---

### 9.5 Responsive Breakpoints

The design system defines four breakpoints:

| Breakpoint | Viewport Width | Tailwind Prefix |
|---|---|---|
| Mobile (base) | 375px | (no prefix) |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide Desktop | 1440px | `xl:` |

**Requirements**

- All components MUST be designed mobile-first (375px base styles, overrides at larger breakpoints).
- The PhoneCanvas container MUST have a maximum width on desktop: SHOULD be capped at `max-w-sm` (384px) or similar to prevent the phone image from becoming unrealistically large.
- The case detail page layout on desktop (1024px+) MUST switch from a stacked (single column) to a side-by-side layout: PhoneCanvas on the left, selectors on the right.
- The catalog grid breakpoints MUST be as specified in SPEC-01.3.
- The minimum touch target of 44×44px MUST apply across ALL breakpoints (not just mobile).
- Text sizes MUST scale appropriately — no text smaller than 14px on any breakpoint.

---

### 9.6 Tailwind CSS Configuration

**Requirements**

- Tailwind CSS `content` paths MUST include all source file patterns: `./src/**/*.{js,ts,jsx,tsx,mdx}`.
- The Tailwind `theme.extend` MUST include the custom color palette:
  ```typescript
  colors: {
    primary: "#2563EB",
    cta: "#F97316",
    bg: "#F8FAFC",
    text: "#1E293B",
  }
  ```
- The `fontFamily` extension MUST include Rubik and Nunito Sans using the CSS variable approach from `next/font`.
- `screens` MUST define the four breakpoints: `375` (or use default `sm`), `768`, `1024`, `1440`.

**Acceptance Criteria — SPEC-09**

- [ ] LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms on mobile
- [ ] Lighthouse Performance ≥ 85 on mobile
- [ ] All `next/image` components have explicit `width`, `height`, and `alt`
- [ ] First 8 catalog images have `priority={true}`; rest are lazy-loaded
- [ ] Image optimization strategy documented in `next.config.js`
- [ ] All text meets WCAG 2.1 AA contrast (4.5:1 normal text, 3:1 large text)
- [ ] CTA button text meets AA contrast (large text rule if on #F97316 background)
- [ ] Skip navigation link present on all pages
- [ ] PhoneCanvas has `role="img"` + `aria-label`
- [ ] Phone base alt: "{modelName} en color {colorName}"
- [ ] Case thumbnail alt: "{caseName} — funda para celular"
- [ ] Case overlay layer alt: "" (empty, decorative)
- [ ] `prefers-reduced-motion` suppresses all transitions/animations
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
- [ ] Mobile-first layout: 375px base, `md:`, `lg:`, `xl:` overrides
- [ ] Case detail page: stacked on mobile, side-by-side on desktop (1024px+)
- [ ] PhoneCanvas max-width capped on desktop
- [ ] Tailwind theme includes custom colors, fonts, and breakpoints

---

## Appendix A: Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | MUST | WhatsApp number in international format, no + | `5491112345678` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | SHOULD | GA4 Measurement ID | `G-XXXXXXXXXX` |

Both variables MUST be documented in `.env.example` with placeholder values.
Neither variable MUST contain secrets (both are `NEXT_PUBLIC_` and will be embedded in the client bundle).

---

## Appendix B: Project File Structure (Reference)

```
/
  .env.local               # Real values (gitignored)
  .env.example             # Placeholder values (committed)
  next.config.js           # output: 'export', image config, etc.
  tailwind.config.ts       # Theme, colors, fonts, breakpoints
  src/
    app/
      layout.tsx           # Root layout: fonts, consent provider, banner
      page.tsx             # Landing page: hero + catalog
      cases/
        [slug]/
          page.tsx         # Case detail: try-on, selectors, CTA
    components/
      PhoneCanvas.tsx      # Try-On Engine
      ModelPicker.tsx      # Phone model selector
      ColorPicker.tsx      # Phone color toggle
      VariantPicker.tsx    # Case variant chips
      WhatsAppCTA.tsx      # Fixed CTA button
      CookieBanner.tsx     # Consent banner
      CaseCard.tsx         # Catalog card
      CatalogGrid.tsx      # Grid of CaseCards
      SkipNavLink.tsx      # Accessibility skip link
    data/
      catalog.ts           # 50+ case entries, typed
      models.ts            # Phone model definitions
    lib/
      analytics.ts         # GA4 event tracking utilities
      formatPrice.ts       # ARS price formatting ($XX.XXX)
      buildWhatsAppUrl.ts  # WhatsApp URL construction
    contexts/
      ConsentContext.tsx   # Cookie consent state provider
  public/
    phones/
      {modelId}/{color}/back.png
      masks/{modelId}/back.png
    cases/
      {slug}/{variantId}/back.png
```

---

## Appendix C: Data Format — Price Formatting

The ARS price format `$XX.XXX` MUST be implemented as a pure utility function:

```typescript
// /src/lib/formatPrice.ts
export function formatPriceARS(priceARS: number): string {
  // Output: "$12.500" for input 12500
  return "$" + priceARS.toLocaleString("es-AR", { maximumFractionDigits: 0 });
}
```

The `es-AR` locale in `Intl.NumberFormat` uses period (`.`) as the thousands separator and comma (`,`) as the decimal separator — which matches the `$XX.XXX` format requirement.

---

### Critical Files for Implementation

- `/src/components/PhoneCanvas.tsx` — The core Try-On Engine component (SPEC-02); all image layering, masking, crossfade logic, and error/loading states live here
- `/src/data/catalog.ts` — The entire catalog data (50+ entries), typed interfaces for `Case` and `CaseVariant`, ground truth for all case detail page generation
- `/src/app/cases/[slug]/page.tsx` — The case detail page: URL param state management, `generateStaticParams`, PhoneCanvas + all pickers + WhatsApp CTA composition, GA4 event triggers
- `/src/contexts/ConsentContext.tsx` — Cookie consent state provider that gates GA4 initialization and controls the banner lifecycle across the entire app
- `/src/lib/analytics.ts` — Centralized GA4 event utility with typed functions and `window.gtag` availability guard