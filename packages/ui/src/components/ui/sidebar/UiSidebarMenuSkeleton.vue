<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuSkeleton', inheritAttrs: false });

withDefaults(
  defineProps<{
    showIcon?: boolean;
  }>(),
  { showIcon: false },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn('flex h-8 items-center gap-2 rounded-md px-2', attrs.class));

const widths = ['60%', '70%', '50%', '80%', '65%', '75%'];
const textWidth = widths[Math.floor(Math.random() * widths.length)];
</script>

<template>
  <div v-bind="restAttrs" :class="classes" data-sidebar="menu-skeleton">
    <div v-if="showIcon" class="bg-sidebar-accent size-4 shrink-0 animate-pulse rounded-md" />
    <div
      class="bg-sidebar-accent h-3 flex-1 animate-pulse rounded-md"
      :style="{ maxWidth: textWidth }"
    />
  </div>
</template>
