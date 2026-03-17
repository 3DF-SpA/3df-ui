<script setup lang="ts">
import { type HeroAction, HeroSplit } from '@3df/ui';
import { useI18n } from 'vue-i18n';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const actions: HeroAction[] = [
  { label: 'Get Started', variant: 'primary', href: '#' },
  { label: 'Learn More', variant: 'outline', href: '#' },
];

const splitCode = `<HeroSplit
  headline="The modern way to build dashboards"
  description="Combine powerful data visualization with a rich component library."
  :actions="actions"
  image-src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  image-alt="Dashboard preview"
/>`;

const reverseCode = `<HeroSplit
  headline="Design systems made simple"
  description="Consistent, reusable components that scale with your team."
  :actions="actions"
  image-src="..."
  image-alt="Design system"
  reverse
  compact
/>`;
</script>

<template>
  <DocShowcase
    :title="t('views.hero.showcases.splitTextImage.title')"
    :description="t('views.hero.showcases.splitTextImage.description')"
    :code="splitCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroSplit
        headline="The modern way to build dashboards"
        description="Combine powerful data visualization with a rich component library. From charts to forms, everything you need in one package."
        :actions="actions"
        image-src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
        image-alt="Dashboard preview"
      />
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.splitReversed.title')"
    :description="t('views.hero.showcases.splitReversed.description')"
    :code="reverseCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroSplit
        headline="Design systems made simple"
        description="Consistent, reusable components that scale with your team. Built for developers who care about quality."
        :actions="actions"
        image-src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
        image-alt="Design system"
        reverse
        compact
      />
    </div>
  </DocShowcase>
</template>
