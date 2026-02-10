<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuSkeleton', inheritAttrs: false });

const props = withDefaults(
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

const classes = computed(() =>
  cn(
    'flex h-8 items-center gap-2 rounded-md px-2',
    attrs.class,
  ),
);

/* Ancho aleatorio para simular texto natural */
const textWidth = computed(() => {
  const widths = ['60%', '70%', '50%', '80%', '65%', '75%'];
  return widths[Math.floor(Math.random() * widths.length)];
});
</script>

<template>
  <div v-bind="restAttrs" :class="classes" data-sidebar="menu-skeleton">
    <!-- Icono skeleton -->
    <div
      v-if="showIcon"
      class="size-4 shrink-0 animate-pulse rounded-md bg-sidebar-accent"
    />
    <!-- Texto skeleton -->
    <div
      class="h-3 flex-1 animate-pulse rounded-md bg-sidebar-accent"
      :style="{ maxWidth: textWidth }"
    />
  </div>
</template>
