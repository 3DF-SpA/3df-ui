<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { TABS_KEY } from './tabs-types';

defineOptions({ name: 'UiTabsList', inheritAttrs: false });

const ctx = inject(TABS_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="restAttrs"
    role="tablist"
    :aria-orientation="ctx.orientation"
    :class="
      cn(
        'flex items-center',
        ctx.orientation === 'horizontal'
          ? 'w-full overflow-x-auto border-b-ui border-border'
          : 'flex-col border-r-ui border-border',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
