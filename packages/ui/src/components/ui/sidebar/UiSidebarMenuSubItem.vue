<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuSubItem', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('group/menu-sub-item relative', attrs.class),
);
</script>

<template>
  <li v-bind="restAttrs" :class="classes" data-sidebar="menu-sub-item">
    <slot />
  </li>
</template>
