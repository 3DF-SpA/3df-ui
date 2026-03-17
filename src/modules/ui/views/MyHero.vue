<script setup lang="ts">
import { computed } from 'vue';
import { useDocPage } from '@/i18n/composables/useDocPage';
import { type HeroAction, HeroSimple } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import HeroDemoGradients from './_components/HeroDemoGradients.vue';
import HeroDemoImage from './_components/HeroDemoImage.vue';
import HeroDemoSplit from './_components/HeroDemoSplit.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('hero');

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

const heroProps = computed<PropItem[]>(() => [
  {
    name: 'HeroAction: label',
    type: 'string',
    default: '-',
    description: propDesc('label'),
  },
  {
    name: 'HeroAction: href',
    type: 'string',
    default: '-',
    description: propDesc('href'),
  },
  {
    name: 'HeroAction: external',
    type: 'boolean',
    default: 'false',
    description: propDesc('external'),
  },
  {
    name: 'HeroAction: variant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost'",
    default: '-',
    description: propDesc('variant'),
  },
  {
    name: 'HeroSimple: headline',
    type: 'string',
    default: '-',
    description: propDesc('headline'),
  },
  {
    name: 'HeroSimple: description',
    type: 'string',
    default: '-',
    description: propDesc('descriptionProp'),
  },
  {
    name: 'HeroSimple: actions',
    type: 'HeroAction[]',
    default: '-',
    description: propDesc('actions'),
  },
  {
    name: 'HeroSimple: align',
    type: "'left' | 'center' | 'right'",
    default: "'center'",
    description: propDesc('align'),
  },
  {
    name: 'HeroSimple: compact',
    type: 'boolean',
    default: 'false',
    description: propDesc('compact'),
  },
  {
    name: 'HeroSplit: imageSrc',
    type: 'string',
    default: '-',
    description: propDesc('imageSrc'),
  },
  {
    name: 'HeroSplit: imageAlt',
    type: 'string',
    default: "''",
    description: propDesc('imageAlt'),
  },
  {
    name: 'HeroSplit: reverse',
    type: 'boolean',
    default: 'false',
    description: propDesc('reverse'),
  },
  {
    name: 'HeroImage: imageSrc',
    type: 'string',
    default: '-',
    description: propDesc('imageSrc'),
  },
  {
    name: 'HeroImage: overlay',
    type: "'dark' | 'light' | 'gradient' | 'none'",
    default: "'dark'",
    description: propDesc('overlay'),
  },
  {
    name: 'HeroImage: overlayOpacity',
    type: 'number',
    default: '60',
    description: propDesc('overlayOpacity'),
  },
  {
    name: 'HeroImage: minHeight',
    type: 'string',
    default: "'500px'",
    description: propDesc('minHeight'),
  },
  {
    name: 'HeroCentered: badge',
    type: 'string',
    default: '-',
    description: propDesc('badge'),
  },
  {
    name: 'HeroCentered: badgeHref',
    type: 'string',
    default: '-',
    description: propDesc('badgeHref'),
  },
  {
    name: 'HeroCentered: highlightText',
    type: 'string',
    default: '-',
    description: propDesc('highlightText'),
  },
  {
    name: 'HeroCentered: gridPattern',
    type: 'boolean',
    default: 'true',
    description: propDesc('gridPattern'),
  },
  {
    name: 'HeroGradient: gradient',
    type: "'purple' | 'blue' | 'green' | 'orange' | 'rose' | 'custom'",
    default: "'purple'",
    description: propDesc('gradient'),
  },
  {
    name: 'HeroGradient: customGradient',
    type: 'string',
    default: '-',
    description: propDesc('customGradient'),
  },
  {
    name: 'HeroGradient: blobs',
    type: 'boolean',
    default: 'true',
    description: propDesc('blobs'),
  },
  {
    name: 'HeroMinimal: separator',
    type: 'boolean',
    default: 'false',
    description: propDesc('separator'),
  },
]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Hero Sections"
      :description="description"
      import-code="import { HeroSimple, HeroSplit, HeroImage, HeroCentered, HeroGradient, HeroMinimal } from '@3df/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('centered')"
      :description="showcaseDesc('centered')"
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
      :title="showcaseTitle('left')"
      :description="showcaseDesc('left')"
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
