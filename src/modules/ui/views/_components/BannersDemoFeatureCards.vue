<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Button, Card } from '@3df-spa/ui';

const activeTab = ref(0);
const { t } = useI18n();
const tabs = computed(() => [
  {
    title: t('demo.banners.plasma.tab0Title'),
    text: t('demo.banners.plasma.tab0Text'),
  },
  {
    title: t('demo.banners.plasma.tab1Title'),
    text: t('demo.banners.plasma.tab1Text'),
  },
  {
    title: t('demo.banners.plasma.tab2Title'),
    text: t('demo.banners.plasma.tab2Text'),
  },
]);
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">{{ t('demo.banners.featureCard.sectionTitle') }}</h2>
    <p class="text-muted-foreground text-xs">
      {{ t('demo.banners.featureCard.sectionDesc') }}
    </p>

    <Card
      class="dark:to-background/80 overflow-hidden bg-gradient-to-br from-sky-100/80 via-sky-50/60 to-white/80 backdrop-blur-sm dark:from-sky-950/40 dark:via-sky-900/20"
    >
      <div class="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
        <div class="flex flex-col justify-center gap-6 p-8 lg:p-12">
          <span
            class="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400"
          >
            {{ t('demo.banners.plasma.learnMore') }}
          </span>
          <div class="flex flex-col gap-1">
            <button
              v-for="(tab, i) in tabs"
              :key="i"
              class="text-left text-2xl font-bold transition-colors duration-200 lg:text-3xl"
              :class="
                activeTab === i
                  ? 'text-foreground'
                  : 'text-muted-foreground/40 hover:text-muted-foreground/60'
              "
              @click="activeTab = i"
            >
              {{ tab.title }}
            </button>
          </div>
          <p class="text-muted-foreground max-w-md text-sm leading-relaxed">
            {{ tabs[activeTab]?.text }}
          </p>
          <div>
            <Button
              variant="outline"
              class="dark:bg-background rounded-full bg-white px-6 shadow-sm"
            >
              {{ t('demo.banners.plasma.joinList') }}
            </Button>
          </div>
        </div>
        <div class="relative flex items-center justify-center p-4 lg:p-8">
          <div
            class="relative w-full overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-xl backdrop-blur-md"
          >
            <img
              src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=600&fit=crop"
              alt="Feature image"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Card>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">{{ t('demo.banners.featureCard.darkTitle') }}</h2>

    <Card
      class="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      <div class="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
        <div class="relative flex items-center justify-center p-4 lg:p-8">
          <div class="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              alt="Dashboard analytics"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
        <div class="flex flex-col justify-center gap-6 p-8 lg:p-12">
          <span class="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Analytics
          </span>
          <h3 class="text-3xl leading-tight font-bold lg:text-4xl">
            {{ t('demo.banners.featureCard.heading') }}
          </h3>
          <p class="max-w-md text-sm leading-relaxed text-slate-300">
            {{ t('demo.banners.featureCard.text') }}
          </p>
          <div class="flex gap-3">
            <Button class="rounded-full bg-white px-6 text-slate-900 hover:bg-white/90">
              {{ t('demo.banners.featureCard.startFree') }}
            </Button>
            <Button variant="ghost" class="rounded-full text-white hover:bg-white/10">
              {{ t('demo.viewDemo') }}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </section>
</template>
