<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiEmptyState', inheritAttrs: false });

interface UiEmptyStateProps {
  /** Heading text */
  title?: string;
  /** Description text */
  description?: string;
}

const props = withDefaults(defineProps<UiEmptyStateProps>(), {
  title: undefined,
  description: undefined,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'flex flex-col items-center justify-center gap-4 px-6 py-16 text-center',
    attrs.class,
  ),
);
</script>

<template>
  <div v-bind="restAttrs" :class="classes">
    <!-- Icon slot -->
    <div v-if="$slots.icon" class="text-muted-foreground [&>svg]:size-12">
      <slot name="icon" />
    </div>

    <!-- Title -->
    <h3
      v-if="props.title || $slots.title"
      class="text-lg font-semibold tracking-tight text-foreground"
    >
      <slot name="title">{{ props.title }}</slot>
    </h3>

    <!-- Description -->
    <p
      v-if="props.description || $slots.description"
      class="max-w-sm text-sm text-muted-foreground"
    >
      <slot name="description">{{ props.description }}</slot>
    </p>

    <!-- Actions (children) -->
    <div v-if="$slots.default" class="mt-2 flex gap-2">
      <slot />
    </div>
  </div>
</template>
