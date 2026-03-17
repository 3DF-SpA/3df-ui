<script setup lang="ts">
import { type HeroAction, HeroCentered, HeroGradient, HeroMinimal } from '@3df-spa/ui';
import { useI18n } from 'vue-i18n';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

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

const purpleCode = `<HeroGradient
  headline="Next-generation components"
  description="Beautiful, accessible, and performant."
  :actions="actions"
  gradient="purple"
/>`;

const blueCode = `<HeroGradient
  headline="Scale your frontend effortlessly"
  description="From prototyping to production."
  :actions="actions"
  gradient="blue"
  :blobs="false"
  compact
/>`;

const roseCode = `<HeroGradient
  headline="Design with confidence"
  description="Every component is thoroughly tested."
  :actions="actions"
  gradient="rose"
  align="left"
/>`;

const centeredBadgeCode = `<HeroCentered
  badge="🚀 New: Charts package now available"
  badge-href="#"
  headline="Build interfaces that feel like magic"
  highlight-text="feel like magic"
  description="A complete design system for Vue 3."
  :actions="actions"
  :grid-pattern="true"
/>`;

const centeredCleanCode = `<HeroCentered
  headline="The future of web components"
  highlight-text="future"
  description="Designed with precision, built for speed."
  :actions="actions"
  :grid-pattern="false"
  compact
/>`;

const minimalLeftCode = `<HeroMinimal
  headline="Component Library"
  description="Browse our collection of production-ready Vue 3 components."
  :actions="actions"
  separator
/>`;

const minimalCenterCode = `<HeroMinimal
  headline="Documentation"
  description="Everything you need to know to get started."
  :actions="actions"
  align="center"
  compact
/>`;
</script>

<template>
  <DocShowcase
    :title="t('views.hero.showcases.gradientPurple.title')"
    :description="t('views.hero.showcases.gradientPurple.description')"
    :code="purpleCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroGradient
        headline="Next-generation components"
        description="Beautiful, accessible, and performant. Built with Vue 3, TypeScript, and Tailwind CSS for the modern web."
        :actions="gradientActions"
        gradient="purple"
      />
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.gradientBlue.title')"
    :description="t('views.hero.showcases.gradientBlue.description')"
    :code="blueCode"
  >
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
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.gradientRose.title')"
    :description="t('views.hero.showcases.gradientRose.description')"
    :code="roseCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroGradient
        headline="Design with confidence"
        description="Every component is thoroughly tested and fully accessible. Build inclusive experiences by default."
        :actions="gradientActions"
        gradient="rose"
        align="left"
      />
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.centeredBadge.title')"
    :description="t('views.hero.showcases.centeredBadge.description')"
    :code="centeredBadgeCode"
  >
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
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.centeredClean.title')"
    :description="t('views.hero.showcases.centeredClean.description')"
    :code="centeredCleanCode"
  >
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
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.minimalLeft.title')"
    :description="t('views.hero.showcases.minimalLeft.description')"
    :code="minimalLeftCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroMinimal
        headline="Component Library"
        description="Browse our collection of production-ready Vue 3 components."
        :actions="minimalActions"
        separator
      />
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.minimalCentered.title')"
    :description="t('views.hero.showcases.minimalCentered.description')"
    :code="minimalCenterCode"
  >
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
  </DocShowcase>
</template>
