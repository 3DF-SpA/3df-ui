<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiLogoCloud', inheritAttrs: false });

export interface LogoItem {
  name: string;
  src: string;
  href?: string;
  alt?: string;
}

interface Props {
  logos: LogoItem[];
  columns?: 3 | 4 | 5 | 6;
  showNames?: boolean;
  logoHeight?: number;
  grayscale?: boolean;
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
  <div v-bind="restAttrs" :class="cn('w-full', attrs.class)">
    <p
      v-if="heading"
      class="text-muted-foreground mb-8 text-center text-sm font-medium tracking-wider uppercase"
    >
      {{ heading }}
    </p>

    <div :class="cn('grid items-center justify-items-center gap-8', gridCols)">
      <component
        :is="logo.href ? 'a' : 'div'"
        v-for="logo in logos"
        :key="logo.name"
        v-bind="logo.href ? { href: logo.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
        :class="
          cn(
            'group flex flex-col items-center gap-3 rounded-lg p-4 transition-all duration-300',
            'hover:bg-accent/50',
            logo.href && 'cursor-pointer',
          )
        "
      >
        <img
          :src="logo.src"
          :alt="logo.alt ?? logo.name"
          :style="{ maxHeight: `${logoHeight}px` }"
          :class="
            cn(
              'w-auto object-contain transition-all duration-300 select-none',
              grayscale &&
                'opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 hover:opacity-100 hover:grayscale-0',
              !grayscale && 'opacity-70 group-hover:opacity-100 hover:opacity-100',
            )
          "
          loading="lazy"
          draggable="false"
        />
        <span
          v-if="showNames"
          class="text-muted-foreground group-hover:text-foreground text-xs font-medium transition-colors duration-300"
        >
          {{ logo.name }}
        </span>
      </component>
    </div>
  </div>
</template>
