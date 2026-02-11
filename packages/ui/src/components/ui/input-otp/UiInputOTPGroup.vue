<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiInputOTPGroup', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('flex items-center', attrs.class),
);
</script>

<template>
  <div v-bind="restAttrs" :class="classes" role="group">
    <slot />
  </div>
</template>
