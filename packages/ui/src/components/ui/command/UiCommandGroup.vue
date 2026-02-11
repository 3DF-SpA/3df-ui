<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COMMAND_KEY } from './command-types';

defineOptions({ name: 'UiCommandGroup', inheritAttrs: false });

interface UiCommandGroupProps {
  heading?: string;
}

defineProps<UiCommandGroupProps>();

const cmd = inject(COMMAND_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

// We expose the command context so items can be filtered per slot rendering
// The visibility is controlled at the item level, but group hides if all items are hidden
// This is left to the consumer via CSS or we trust that items hide themselves
void cmd;
</script>

<template>
  <div
    v-bind="restAttrs"
    role="group"
    :class="cn('overflow-hidden p-1 text-foreground', attrs.class)"
  >
    <div
      v-if="heading"
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
