<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DRAWER_KEY } from './drawer-types';

defineOptions({ name: 'UiDrawerTitle', inheritAttrs: false });

const drawer = inject(DRAWER_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <h2
    v-bind="restAttrs"
    :id="drawer.titleId"
    :class="cn('text-lg font-semibold leading-none tracking-tight', attrs.class)"
  >
    <slot />
  </h2>
</template>
