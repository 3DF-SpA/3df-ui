<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COLLAPSIBLE_KEY } from './collapsible-types';

defineOptions({ name: 'UiCollapsibleTrigger', inheritAttrs: false });

const ctx = inject(COLLAPSIBLE_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    :aria-expanded="ctx.isOpen.value"
    :aria-controls="undefined"
    :data-state="ctx.isOpen.value ? 'open' : 'closed'"
    :data-disabled="ctx.disabled.value ? '' : undefined"
    :disabled="ctx.disabled.value"
    :class="cn(attrs.class)"
    @click="ctx.toggle()"
  >
    <slot :open="ctx.isOpen.value" />
  </button>
</template>
