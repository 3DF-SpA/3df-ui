<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCommandGroup', inheritAttrs: false });

interface UiCommandGroupProps {
  heading?: string;
}

defineProps<UiCommandGroupProps>();

const uid = useId();
const headingId = `command-group-heading-${uid}`;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="restAttrs"
    role="group"
    :aria-labelledby="heading ? headingId : undefined"
    :class="cn('text-foreground overflow-hidden p-1', attrs.class)"
  >
    <div
      v-if="heading"
      :id="headingId"
      class="text-muted-foreground px-2 py-1.5 text-xs font-medium"
    >
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
