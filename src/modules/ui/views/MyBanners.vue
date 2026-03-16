<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Banner, Button } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

import BannersDemoFeatureCards from './_components/BannersDemoFeatureCards.vue';
import BannersDemoVariants from './_components/BannersDemoVariants.vue';

const { description, propDesc, showcaseTitle } = useDocPage('banners');

const { t } = useI18n();

const showDismissible = ref(true);
const showFixed = ref(false);

function resetDismissible() {
  showDismissible.value = true;
}

const bannerProps = computed<PropItem[]>(() => [
  {
    name: 'variant',
    type: "'default' | 'info' | 'success' | 'warning' | 'destructive' | 'muted'",
    default: "'default'",
    description: propDesc('variant'),
  },
  {
    name: 'position',
    type: "'static' | 'sticky' | 'fixed'",
    default: "'static'",
    description: propDesc('position'),
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'between'",
    default: "'center'",
    description: propDesc('align'),
  },
  {
    name: 'dismissible',
    type: 'boolean',
    default: 'false',
    description: propDesc('dismissible'),
  },
]);

const defaultCode = `<Banner>
  New version available — Update now.
</Banner>`;

const actionCode = `<Banner variant="info" align="between">
  <template #icon>
    <svg class="size-4">...</svg>
  </template>
  You have 5 unread notifications.
  <template #action>
    <button class="rounded-md bg-white/20 px-3 py-1 text-xs">
      View all
    </button>
  </template>
</Banner>`;

const dismissibleCode = `<Banner
  v-if="showDismissible"
  variant="success"
  dismissible
  @dismiss="showDismissible = false"
>
  This banner can be closed.
</Banner>`;

const alignCode = `<Banner variant="muted" align="start">Start</Banner>
<Banner variant="muted" align="center">Center</Banner>
<Banner variant="muted" align="between">
  Distributed
  <template #action>
    <button>Action</button>
  </template>
</Banner>`;

const fixedCode = `<Banner
  variant="warning"
  position="fixed"
  dismissible
  @dismiss="showFixed = false"
>
  Fixed banner at the top.
</Banner>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Banner"
      :description="description"
      import-code="import { Banner } from '@3df/ui'"
    />

    <DocShowcase :title="showcaseTitle('default')" :code="defaultCode">
      <Banner>
        {{ t('demo.banners.newVersion') }}
      </Banner>
    </DocShowcase>

    <BannersDemoVariants />

    <DocShowcase :title="showcaseTitle('withAction')" :code="actionCode">
      <Banner variant="info" align="between">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </template>
        {{ t('demo.banners.unreadNotifications') }}
        <template #action>
          <button
            class="rounded-md bg-white/20 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors hover:bg-white/30"
          >
            {{ t('demo.banners.viewAll') }}
          </button>
        </template>
      </Banner>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('dismissible')" :code="dismissibleCode">
      <Banner
        v-if="showDismissible"
        variant="success"
        dismissible
        @dismiss="showDismissible = false"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </template>
        {{ t('demo.banners.dismissibleText') }}
      </Banner>
      <Button v-if="!showDismissible" variant="outline" size="sm" @click="resetDismissible">
        {{ t('demo.banners.showAgain') }}
      </Button>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('align')" :code="alignCode">
      <div class="flex flex-col gap-3">
        <Banner variant="muted" align="start">{{ t('demo.banners.alignStart') }}</Banner>
        <Banner variant="muted" align="center">{{ t('demo.banners.alignCenter') }}</Banner>
        <Banner variant="muted" align="between">
          {{ t('demo.banners.alignBetween') }}
          <template #action>
            <button
              class="bg-foreground/10 hover:bg-foreground/20 rounded-md px-3 py-1 text-xs font-medium transition-colors"
            >
              {{ t('demo.banners.action') }}
            </button>
          </template>
        </Banner>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('fixedPosition')" :code="fixedCode">
      <Button variant="outline" size="sm" @click="showFixed = !showFixed">
        {{ showFixed ? t('demo.banners.hideFixedBanner') : t('demo.banners.showFixedBanner') }}
      </Button>
      <Teleport to="body">
        <Banner
          v-if="showFixed"
          variant="warning"
          position="fixed"
          dismissible
          align="between"
          @dismiss="showFixed = false"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </template>
          {{ t('demo.banners.fixedText') }}
          <template #action>
            <button
              class="rounded-md bg-white/20 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors hover:bg-white/30"
              @click="showFixed = false"
            >
              {{ t('demo.banners.understood') }}
            </button>
          </template>
        </Banner>
      </Teleport>
    </DocShowcase>

    <BannersDemoFeatureCards />

    <DocPropsTable :props="bannerProps" />
  </div>
</template>
