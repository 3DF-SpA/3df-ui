<script setup lang="ts">
import { type HeroAction, HeroImage, HeroSimple, HeroSplit } from '@3df-spa/ui';

import HeroDemoGradients from './_components/HeroDemoGradients.vue';

const primaryActions: HeroAction[] = [
  { label: 'Get Started', variant: 'primary', href: '#' },
  { label: 'Learn More', variant: 'outline', href: '#' },
];

const imageActions: HeroAction[] = [
  { label: 'Start Free Trial', variant: 'primary', href: '#' },
  { label: 'Watch Demo', variant: 'outline', href: '#' },
];
</script>

<template>
  <div class="space-y-4 p-8">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-3xl font-bold tracking-tight">Hero Sections</h1>
      <p class="text-muted-foreground mt-2">
        Secciones hero para landing pages. 6 variantes: simple, split, imagen de fondo, gradiente
        moderno, centrado con badge, y minimalista.
      </p>
    </div>

    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Simple — Centrado Básico</h2>
        <p class="text-muted-foreground text-sm">
          Hero centrado estándar con headline, descripción y botones CTA.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl">
        <HeroSimple
          headline="Build beautiful web applications faster"
          description="A comprehensive Vue 3 component library built with Tailwind CSS. Ship production-ready interfaces in record time."
          :actions="primaryActions"
        />
      </div>
    </section>

    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Simple — Alineado a la Izquierda</h2>
        <p class="text-muted-foreground text-sm">
          Misma estructura, pero con texto alineado a la izquierda.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl">
        <HeroSimple
          headline="Ship products faster with 3DF UI"
          description="Production-ready components for Vue 3 with TypeScript, Tailwind CSS, and full accessibility support."
          :actions="primaryActions"
          align="left"
          compact
        />
      </div>
    </section>

    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Split — Texto + Imagen</h2>
        <p class="text-muted-foreground text-sm">
          Layout dividido: contenido de texto a la izquierda, imagen a la derecha.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl">
        <HeroSplit
          headline="The modern way to build dashboards"
          description="Combine powerful data visualization with a rich component library. From charts to forms, everything you need in one package."
          :actions="primaryActions"
          image-src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          image-alt="Dashboard preview"
        />
      </div>
    </section>

    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Split — Invertido</h2>
        <p class="text-muted-foreground text-sm">
          Split con la imagen a la izquierda y texto a la derecha usando <code>reverse</code>.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl">
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

    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Image — Fondo con Overlay Oscuro</h2>
        <p class="text-muted-foreground text-sm">
          Imagen de fondo a pantalla completa con overlay oscuro semi-transparente.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl">
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

    <section class="space-y-4">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-xl font-semibold">Hero Image — Overlay Gradiente</h2>
        <p class="text-muted-foreground text-sm">
          Overlay gradiente de abajo hacia arriba. Texto alineado a la izquierda.
        </p>
      </div>
      <div class="overflow-hidden rounded-xl">
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

    <HeroDemoGradients />
  </div>
</template>
