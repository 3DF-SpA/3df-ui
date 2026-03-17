<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import HoverCardDemoRich from './_components/HoverCardDemoRich.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('hoverCard');

const { t } = useI18n();

const hoverCardProps = computed<PropItem[]>(() => [
  {
    name: 'HoverCard: openDelay',
    type: 'number',
    default: '700',
    description: propDesc('openDelay'),
  },
  {
    name: 'HoverCard: closeDelay',
    type: 'number',
    default: '300',
    description: propDesc('closeDelay'),
  },
  {
    name: 'HoverCardContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: propDesc('align'),
  },
  {
    name: 'HoverCardContent: side',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: propDesc('side'),
  },
  {
    name: 'HoverCardContent: sideOffset',
    type: 'number',
    default: '8',
    description: propDesc('sideOffset'),
  },
  {
    name: 'HoverCardContent: viewportPadding',
    type: 'number',
    default: '8',
    description: propDesc('viewportPadding'),
  },
]);

const anatomyCode = `<HoverCard>
  <HoverCardTrigger />
  <HoverCardContent>
    <!-- contenido del card -->
  </HoverCardContent>
</HoverCard>`;

const profileCode = `<HoverCard>
  <HoverCardTrigger>
    <a href="#" class="underline decoration-dotted">@vuejs</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div class="flex justify-between space-x-4">
      <div class="bg-muted flex size-10 items-center justify-center rounded-full">V</div>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">@vuejs</h4>
        <p class="text-muted-foreground text-sm">The Progressive JavaScript Framework.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`;

const alignStartCode = `<HoverCardContent align="start">
  <!-- Alineado al inicio del trigger -->
</HoverCardContent>`;

const alignEndCode = `<HoverCardContent align="end">
  <!-- Alineado al final del trigger -->
</HoverCardContent>`;

const sideTopCode = `<HoverCardContent side="top">
  <!-- Aparece por encima del trigger -->
</HoverCardContent>`;

const delaysCode = `<HoverCard :open-delay="200" :close-delay="100">
  <!-- Respuesta más rápida que el default -->
</HoverCard>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Hover Card"
      :description="description"
      import-code="import { HoverCard, HoverCardTrigger, HoverCardContent } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('profile')" :code="profileCode">
      <p class="text-muted-foreground text-xs">
        {{ t('demo.hoverCardHint') }}
      </p>
      <HoverCard>
        <HoverCardTrigger>
          <a
            href="https://github.com/vuejs"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium underline decoration-dotted underline-offset-4"
          >
            @vuejs
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div class="flex justify-between space-x-4">
            <div
              class="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            >
              V
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">@vuejs</h4>
              <p class="text-muted-foreground text-sm">
                The Progressive JavaScript Framework. Approachable, Performant, Versatile.
              </p>
              <div class="flex items-center pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-muted-foreground mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span class="text-muted-foreground text-xs">Joined February 2014</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('alignStart')" :code="alignStartCode">
      <HoverCard>
        <HoverCardTrigger>
          <span
            class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4"
          >
            {{ t('demo.hoverCard.hoverAlignStart') }}
          </span>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <p class="text-sm" v-html="t('demo.hoverCard.alignStartDesc')" />
        </HoverCardContent>
      </HoverCard>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('alignEnd')" :code="alignEndCode">
      <div class="flex justify-end">
        <HoverCard>
          <HoverCardTrigger>
            <span
              class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4"
            >
              {{ t('demo.hoverCard.hoverAlignEnd') }}
            </span>
          </HoverCardTrigger>
          <HoverCardContent align="end">
            <p class="text-sm" v-html="t('demo.hoverCard.alignEndDesc')" />
          </HoverCardContent>
        </HoverCard>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('topPosition')" :code="sideTopCode">
      <div class="pt-40">
        <HoverCard>
          <HoverCardTrigger>
            <span
              class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4"
            >
              {{ t('demo.hoverCard.hoverSideTop') }}
            </span>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p class="text-sm">
              {{ t('demo.hoverCard.topPositionDesc') }}
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('customDelays')" :code="delaysCode">
      <HoverCard :open-delay="200" :close-delay="100">
        <HoverCardTrigger>
          <span
            class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4"
          >
            {{ t('demo.hoverCard.hoverFastDelays') }}
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">{{ t('demo.hoverCard.fastResponseTitle') }}</h4>
            <p class="text-muted-foreground text-sm">
              {{ t('demo.hoverCard.fastResponseDesc') }}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </DocShowcase>

    <HoverCardDemoRich />

    <DocPropsTable :props="hoverCardProps" />
  </div>
</template>
