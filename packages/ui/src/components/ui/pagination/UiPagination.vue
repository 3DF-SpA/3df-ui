<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiPagination', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('mx-auto flex w-full justify-center', attrs.class),
);
</script>

<template>
  <nav
    v-bind="restAttrs"
    role="navigation"
    aria-label="pagination"
    :class="classes"
  >
    <slot />
  </nav>
</template>
