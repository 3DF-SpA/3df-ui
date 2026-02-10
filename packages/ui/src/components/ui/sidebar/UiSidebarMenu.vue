<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenu', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('flex w-full min-w-0 flex-col gap-1', attrs.class),
);
</script>

<template>
  <ul v-bind="restAttrs" :class="classes" data-sidebar="menu">
    <slot />
  </ul>
</template>
