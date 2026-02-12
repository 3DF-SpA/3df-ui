<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiLogoCloud', inheritAttrs: false });

export interface LogoItem {
  /** Display name */
  name: string;
  /** Logo image src (URL or import) */
  src: string;
  /** Optional link href */
  href?: string;
  /** Alt text override (defaults to name) */
  alt?: string;
}

interface Props {
  /** Array of logos to display */
  logos: LogoItem[];
  /** Grid columns (responsive) */
  columns?: 3 | 4 | 5 | 6;
  /** Show company name below logo */
  showNames?: boolean;
  /** Logo image max height in px */
  logoHeight?: number;
  /** Grayscale logos (colored on hover) */
  grayscale?: boolean;
  /** Optional heading */
  heading?: string;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4,
  showNames: false,
  logoHeight: 40,
  grayscale: true,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const gridCols = computed(() => {
  const map: Record<number, string> = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
  };
  return map[props.columns] ?? map[4];
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('w-full', attrs.class)"
  >
    <!-- Optional heading -->
    <p
      v-if="heading"
      class="mb-8 text-center text-sm font-medium tracking-wider text-muted-foreground uppercase"
    >
      {{ heading }}
    </p>

    <div :class="cn('grid gap-8 items-center justify-items-center', gridCols)">
      <component
        :is="logo.href ? 'a' : 'div'"
        v-for="logo in logos"
        :key="logo.name"
        v-bind="logo.href ? { href: logo.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
        :class="cn(
          'group flex flex-col items-center gap-3 p-4 rounded-lg transition-all duration-300',
          'hover:bg-accent/50',
          logo.href && 'cursor-pointer',
        )"
      >
        <img
          :src="logo.src"
          :alt="logo.alt ?? logo.name"
          :style="{ maxHeight: `${logoHeight}px` }"
          :class="cn(
            'w-auto object-contain select-none transition-all duration-300',
            grayscale && 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0 group-hover:opacity-100 group-hover:grayscale-0',
            !grayscale && 'opacity-70 hover:opacity-100 group-hover:opacity-100',
          )"
          loading="lazy"
          draggable="false"
        />
        <span
          v-if="showNames"
          class="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
        >
          {{ logo.name }}
        </span>
      </component>
    </div>
  </div>
</template>
