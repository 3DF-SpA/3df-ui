<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DRAWER_KEY } from './drawer-types';

defineOptions({ name: 'UiDrawerHeader', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

inject(DRAWER_KEY)!;
</script>

<template>
  <div
    v-bind="restAttrs"
    data-drawer-header
    :class="cn('grid gap-1.5 p-4 text-center sm:text-left', attrs.class)"
  >
    <slot />
  </div>
</template>
