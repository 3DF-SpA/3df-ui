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

void cmd;
</script>

<template>
  <div
    v-bind="restAttrs"
    role="group"
    :class="cn('text-foreground overflow-hidden p-1', attrs.class)"
  >
    <div v-if="heading" class="text-muted-foreground px-2 py-1.5 text-xs font-medium">
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
