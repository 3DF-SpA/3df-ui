<script setup lang="ts">
import { type HeroAction, HeroSimple } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import HeroDemoGradients from './_components/HeroDemoGradients.vue';
import HeroDemoImage from './_components/HeroDemoImage.vue';
import HeroDemoSplit from './_components/HeroDemoSplit.vue';

const actions: HeroAction[] = [
  { label: 'Get Started', variant: 'primary', href: '#' },
  { label: 'Learn More', variant: 'outline', href: '#' },
];

const centeredCode = `<HeroSimple
  headline="Build beautiful web applications faster"
  description="A comprehensive Vue 3 component library built with Tailwind CSS."
  :actions="actions"
/>`;

const leftCode = `<HeroSimple
  headline="Ship products faster with 3DF UI"
  description="Production-ready components for Vue 3 with TypeScript."
  :actions="actions"
  align="left"
  compact
/>`;

const heroProps: PropItem[] = [
  {
    name: 'HeroAction: label',
    type: 'string',
    default: '-',
    description: 'Texto del botón de acción.',
  },
  {
    name: 'HeroAction: href',
    type: 'string',
    default: '-',
    description: 'URL del enlace. Si se omite, renderiza un <button>.',
  },
  {
    name: 'HeroAction: external',
    type: 'boolean',
    default: 'false',
    description: 'Abre el enlace en una nueva pestaña.',
  },
  {
    name: 'HeroAction: variant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost'",
    default: '-',
    description: 'Variante visual del botón.',
  },
  {
    name: 'HeroSimple: headline',
    type: 'string',
    default: '-',
    description: 'Título principal del hero.',
  },
  {
    name: 'HeroSimple: description',
    type: 'string',
    default: '-',
    description: 'Texto descriptivo debajo del headline.',
  },
  {
    name: 'HeroSimple: actions',
    type: 'HeroAction[]',
    default: '-',
    description: 'Botones CTA del hero.',
  },
  {
    name: 'HeroSimple: align',
    type: "'left' | 'center' | 'right'",
    default: "'center'",
    description: 'Alineación del contenido.',
  },
  {
    name: 'HeroSimple: compact',
    type: 'boolean',
    default: 'false',
    description: 'Reduce el padding vertical del hero.',
  },
  {
    name: 'HeroSplit: imageSrc',
    type: 'string',
    default: '-',
    description: 'URL de la imagen lateral.',
  },
  {
    name: 'HeroSplit: imageAlt',
    type: 'string',
    default: "''",
    description: 'Texto alternativo de la imagen.',
  },
  {
    name: 'HeroSplit: reverse',
    type: 'boolean',
    default: 'false',
    description: 'Invierte el orden: imagen a la izquierda, texto a la derecha.',
  },
  {
    name: 'HeroImage: imageSrc',
    type: 'string',
    default: '-',
    description: 'URL de la imagen de fondo (requerido).',
  },
  {
    name: 'HeroImage: overlay',
    type: "'dark' | 'light' | 'gradient' | 'none'",
    default: "'dark'",
    description: 'Tipo de overlay sobre la imagen.',
  },
  {
    name: 'HeroImage: overlayOpacity',
    type: 'number',
    default: '60',
    description: 'Opacidad del overlay (0-100).',
  },
  {
    name: 'HeroImage: minHeight',
    type: 'string',
    default: "'500px'",
    description: 'Altura mínima del hero.',
  },
  {
    name: 'HeroCentered: badge',
    type: 'string',
    default: '-',
    description: 'Texto del badge de anuncio.',
  },
  {
    name: 'HeroCentered: badgeHref',
    type: 'string',
    default: '-',
    description: 'Enlace del badge.',
  },
  {
    name: 'HeroCentered: highlightText',
    type: 'string',
    default: '-',
    description: 'Texto dentro del headline que se resalta con gradiente.',
  },
  {
    name: 'HeroCentered: gridPattern',
    type: 'boolean',
    default: 'true',
    description: 'Muestra un patrón de grid decorativo en el fondo.',
  },
  {
    name: 'HeroGradient: gradient',
    type: "'purple' | 'blue' | 'green' | 'orange' | 'rose' | 'custom'",
    default: "'purple'",
    description: 'Preset de gradiente. Usa custom junto con customGradient.',
  },
  {
    name: 'HeroGradient: customGradient',
    type: 'string',
    default: '-',
    description: 'Clase CSS de gradiente personalizado (cuando gradient="custom").',
  },
  {
    name: 'HeroGradient: blobs',
    type: 'boolean',
    default: 'true',
    description: 'Muestra blobs decorativos animados en el fondo.',
  },
  {
    name: 'HeroMinimal: separator',
    type: 'boolean',
    default: 'false',
    description: 'Muestra un separador inferior.',
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Hero Sections"
      description="Secciones hero para landing pages. 6 variantes: simple, split, imagen de fondo, gradiente, centrado con badge, y minimalista."
      import-code="import { HeroSimple, HeroSplit, HeroImage, HeroCentered, HeroGradient, HeroMinimal } from '@3df/ui'"
    />

    <DocShowcase
      title="Hero Simple — Centrado"
      description="Hero centrado estándar con headline, descripción y botones CTA."
      :code="centeredCode"
    >
      <div class="overflow-hidden rounded-xl">
        <HeroSimple
          headline="Build beautiful web applications faster"
          description="A comprehensive Vue 3 component library built with Tailwind CSS. Ship production-ready interfaces in record time."
          :actions="actions"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Hero Simple — Alineado a la izquierda"
      description="Misma estructura con texto alineado a la izquierda y modo compacto."
      :code="leftCode"
    >
      <div class="overflow-hidden rounded-xl">
        <HeroSimple
          headline="Ship products faster with 3DF UI"
          description="Production-ready components for Vue 3 with TypeScript, Tailwind CSS, and full accessibility support."
          :actions="actions"
          align="left"
          compact
        />
      </div>
    </DocShowcase>

    <HeroDemoSplit />
    <HeroDemoImage />
    <HeroDemoGradients />

    <DocPropsTable :props="heroProps" />
  </div>
</template>
