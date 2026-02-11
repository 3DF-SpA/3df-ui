<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiNavigationMenuList', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('group flex flex-1 list-none items-center justify-center gap-1', attrs.class),
);
</script>

<template>
  <ul v-bind="restAttrs" :class="classes">
    <slot />
  </ul>
</template>
