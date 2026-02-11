<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuItem', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('group/menu-item relative overflow-hidden', attrs.class),
);
</script>

<template>
  <li v-bind="restAttrs" :class="classes" data-sidebar="menu-item">
    <slot />
  </li>
</template>
