<script setup lang="ts">
import { type HeroAction, HeroCentered, HeroGradient, HeroMinimal } from '@3df-spa/ui';

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
  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Gradient — Purple</h2>
      <p class="text-muted-foreground text-sm">
        Fondo gradiente moderno con blobs decorativos. Preset <code>purple</code>.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
      <HeroGradient
        headline="Next-generation components"
        description="Beautiful, accessible, and performant. Built with Vue 3, TypeScript, and Tailwind CSS for the modern web."
        :actions="gradientActions"
        gradient="purple"
      />
    </div>
  </section>

  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Gradient — Blue (Sin Blobs)</h2>
      <p class="text-muted-foreground text-sm">
        Preset <code>blue</code> sin blobs decorativos. Look más limpio.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
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

  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Gradient — Rose, Izquierda</h2>
      <p class="text-muted-foreground text-sm">
        Preset <code>rose</code> con alineación a la izquierda.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
      <HeroGradient
        headline="Design with confidence"
        description="Every component is thoroughly tested and fully accessible. Build inclusive experiences by default."
        :actions="gradientActions"
        gradient="rose"
        align="left"
      />
    </div>
  </section>

  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Centered — Badge + Highlight</h2>
      <p class="text-muted-foreground text-sm">
        Hero centrado con badge/anuncio, headline con texto resaltado en gradiente, y patrón de grid
        sutil.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
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

  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Centered — Limpio, Sin Grid</h2>
      <p class="text-muted-foreground text-sm">
        Sin patrón de grid ni badge. Look más limpio y elegante.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
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

  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Minimal — Izquierda con Separador</h2>
      <p class="text-muted-foreground text-sm">
        Hero minimalista alineado a la izquierda con separador inferior. Ideal para headers de
        páginas.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
      <HeroMinimal
        headline="Component Library"
        description="Browse our collection of production-ready Vue 3 components."
        :actions="minimalActions"
        separator
      />
    </div>
  </section>

  <section class="space-y-4">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold">Hero Minimal — Centrado</h2>
      <p class="text-muted-foreground text-sm">
        Versión centrada del hero minimalista. Perfecto para páginas internas.
      </p>
    </div>
    <div class="overflow-hidden rounded-xl">
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
</template>
