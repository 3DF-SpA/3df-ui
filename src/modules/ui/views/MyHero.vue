<script setup lang="ts">
import {
  HeroSimple,
  HeroSplit,
  HeroImage,
  HeroGradient,
  HeroCentered,
  HeroMinimal,
  type HeroAction,
} from '@3df-spa/ui';

/* ── Action sets ─────────────────────────────────────────── */

const primaryActions: HeroAction[] = [
  { label: 'Get Started', variant: 'primary', href: '#' },
  { label: 'Learn More', variant: 'outline', href: '#' },
];

const imageActions: HeroAction[] = [
  { label: 'Start Free Trial', variant: 'primary', href: '#' },
  { label: 'Watch Demo', variant: 'outline', href: '#' },
];

const gradientActions: HeroAction[] = [
  { label: 'Get Started Free', variant: 'primary', href: '#' },
  { label: 'See Pricing', variant: 'secondary', href: '#' },
];

const centeredActions: HeroAction[] = [
  { label: 'Start Building', variant: 'primary', href: '#' },
  { label: 'View Documentation', variant: 'ghost', href: '#' },
];

const minimalActions: HeroAction[] = [
  { label: 'Browse Components', variant: 'primary', href: '#' },
];
</script>

<template>
  <div class="space-y-4 p-8">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-3xl font-bold tracking-tight">Hero Sections</h1>
      <p class="mt-2 text-muted-foreground">
        Secciones hero para landing pages. 6 variantes: simple, split, imagen de fondo,
        gradiente moderno, centrado con badge, y minimalista.
      </p>
    </div>

    <!-- 1. Hero Simple — Centered basic -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Simple — Centrado Básico</h2>
        <p class="text-sm text-muted-foreground">
          Hero centrado estándar con headline, descripción y botones CTA.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroSimple
          headline="Build beautiful web applications faster"
          description="A comprehensive Vue 3 component library built with Tailwind CSS. Ship production-ready interfaces in record time."
          :actions="primaryActions"
        />
      </div>
    </section>

    <!-- 2. Hero Simple — Left aligned -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Simple — Alineado a la Izquierda</h2>
        <p class="text-sm text-muted-foreground">
          Misma estructura, pero con texto alineado a la izquierda.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroSimple
          headline="Ship products faster with 3DF UI"
          description="Production-ready components for Vue 3 with TypeScript, Tailwind CSS, and full accessibility support."
          :actions="primaryActions"
          align="left"
          compact
        />
      </div>
    </section>

    <!-- 3. Hero Split — Text + Image -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Split — Texto + Imagen</h2>
        <p class="text-sm text-muted-foreground">
          Layout dividido: contenido de texto a la izquierda, imagen a la derecha.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroSplit
          headline="The modern way to build dashboards"
          description="Combine powerful data visualization with a rich component library. From charts to forms, everything you need in one package."
          :actions="primaryActions"
          image-src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          image-alt="Dashboard preview"
        />
      </div>
    </section>

    <!-- 4. Hero Split — Reversed -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Split — Invertido</h2>
        <p class="text-sm text-muted-foreground">
          Split con la imagen a la izquierda y texto a la derecha usando <code>reverse</code>.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroSplit
          headline="Design systems made simple"
          description="Consistent, reusable components that scale with your team. Built for developers who care about quality."
          :actions="primaryActions"
          image-src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          image-alt="Design system"
          reverse
          compact
        />
      </div>
    </section>

    <!-- 5. Hero Image Background — Dark overlay -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Image — Fondo con Overlay Oscuro</h2>
        <p class="text-sm text-muted-foreground">
          Imagen de fondo a pantalla completa con overlay oscuro semi-transparente.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroImage
          headline="Explore the world of possibilities"
          description="Create stunning landing pages with beautiful background imagery and full customization options."
          :actions="imageActions"
          image-src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop"
          image-alt="Mountain landscape"
          overlay="dark"
          :overlay-opacity="50"
        />
      </div>
    </section>

    <!-- 6. Hero Image — Gradient overlay, left aligned -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Image — Overlay Gradiente</h2>
        <p class="text-sm text-muted-foreground">
          Overlay gradiente de abajo hacia arriba. Texto alineado a la izquierda.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroImage
          headline="Where creativity meets technology"
          description="Push the boundaries of web design with our flexible hero components and rich visual options."
          :actions="imageActions"
          image-src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
          image-alt="Landscape"
          overlay="gradient"
          :overlay-opacity="40"
          align="left"
          min-height="550px"
        />
      </div>
    </section>

    <!-- 7. Hero Gradient — Purple -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Gradient — Purple</h2>
        <p class="text-sm text-muted-foreground">
          Fondo gradiente moderno con blobs decorativos. Preset <code>purple</code>.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroGradient
          headline="Next-generation components"
          description="Beautiful, accessible, and performant. Built with Vue 3, TypeScript, and Tailwind CSS for the modern web."
          :actions="gradientActions"
          gradient="purple"
        />
      </div>
    </section>

    <!-- 8. Hero Gradient — Blue -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Gradient — Blue (Sin Blobs)</h2>
        <p class="text-sm text-muted-foreground">
          Preset <code>blue</code> sin blobs decorativos. Look más limpio.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroGradient
          headline="Scale your frontend effortlessly"
          description="From prototyping to production, our components adapt to your needs without compromising on design quality."
          :actions="gradientActions"
          gradient="blue"
          :blobs="false"
          compact
        />
      </div>
    </section>

    <!-- 9. Hero Gradient — Rose, left aligned -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Gradient — Rose, Izquierda</h2>
        <p class="text-sm text-muted-foreground">
          Preset <code>rose</code> con alineación a la izquierda.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroGradient
          headline="Design with confidence"
          description="Every component is thoroughly tested and fully accessible. Build inclusive experiences by default."
          :actions="gradientActions"
          gradient="rose"
          align="left"
        />
      </div>
    </section>

    <!-- 10. Hero Centered — Con Badge + Highlight -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Centered — Badge + Highlight</h2>
        <p class="text-sm text-muted-foreground">
          Hero centrado con badge/anuncio, headline con texto resaltado en gradiente, y patrón de grid sutil.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroCentered
          badge="🚀 New: Charts package now available"
          badge-href="#"
          headline="Build interfaces that feel like magic"
          highlight-text="feel like magic"
          description="A complete design system for Vue 3 with 45+ component families, charts, and everything you need to ship beautiful products."
          :actions="centeredActions"
          :grid-pattern="true"
        />
      </div>
    </section>

    <!-- 11. Hero Centered — Sin grid, sin badge -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Centered — Limpio, Sin Grid</h2>
        <p class="text-sm text-muted-foreground">
          Sin patrón de grid ni badge. Look más limpio y elegante.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroCentered
          headline="The future of web components"
          highlight-text="future"
          description="Designed with precision, built for speed. Every pixel matters."
          :actions="centeredActions"
          :grid-pattern="false"
          compact
        />
      </div>
    </section>

    <!-- 12. Hero Minimal — Izquierda -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Minimal — Izquierda con Separador</h2>
        <p class="text-sm text-muted-foreground">
          Hero minimalista alineado a la izquierda con separador inferior. Ideal para headers de páginas.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroMinimal
          headline="Component Library"
          description="Browse our collection of production-ready Vue 3 components."
          :actions="minimalActions"
          separator
        />
      </div>
    </section>

    <!-- 13. Hero Minimal — Centro -->
    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Minimal — Centrado</h2>
        <p class="text-sm text-muted-foreground">
          Versión centrada del hero minimalista. Perfecto para páginas internas.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl border border-border">
        <HeroMinimal
          headline="Documentation"
          description="Everything you need to know to get started with 3DF UI."
          :actions="[
            { label: 'Quick Start', variant: 'primary', href: '#' },
            { label: 'API Reference', variant: 'outline', href: '#' },
          ]"
          align="center"
          compact
        />
      </div>
    </section>
  </div>
</template>