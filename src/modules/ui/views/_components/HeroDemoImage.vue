<script setup lang="ts">
import { type HeroAction, HeroImage } from '@3df/ui';
import { useI18n } from 'vue-i18n';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const actions: HeroAction[] = [
  { label: 'Start Free Trial', variant: 'primary', href: '#' },
  { label: 'Watch Demo', variant: 'outline', href: '#' },
];

const darkCode = `<HeroImage
  headline="Explore the world of possibilities"
  description="Create stunning landing pages with beautiful background imagery."
  :actions="actions"
  image-src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop"
  overlay="dark"
  :overlay-opacity="50"
/>`;

const gradientCode = `<HeroImage
  headline="Where creativity meets technology"
  description="Push the boundaries of web design with our flexible hero components."
  :actions="actions"
  image-src="..."
  overlay="gradient"
  :overlay-opacity="40"
  align="left"
  min-height="550px"
/>`;
</script>

<template>
  <DocShowcase
    :title="t('views.hero.showcases.imageOverlayDark.title')"
    :description="t('views.hero.showcases.imageOverlayDark.description')"
    :code="darkCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroImage
        headline="Explore the world of possibilities"
        description="Create stunning landing pages with beautiful background imagery and full customization options."
        :actions="actions"
        image-src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop"
        image-alt="Mountain landscape"
        overlay="dark"
        :overlay-opacity="50"
      />
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.hero.showcases.imageOverlayGradient.title')"
    :description="t('views.hero.showcases.imageOverlayGradient.description')"
    :code="gradientCode"
  >
    <div class="overflow-hidden rounded-xl">
      <HeroImage
        headline="Where creativity meets technology"
        description="Push the boundaries of web design with our flexible hero components and rich visual options."
        :actions="actions"
        image-src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
        image-alt="Landscape"
        overlay="gradient"
        :overlay-opacity="40"
        align="left"
        min-height="550px"
      />
    </div>
  </DocShowcase>
</template>
