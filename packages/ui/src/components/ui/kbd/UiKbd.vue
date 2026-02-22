<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { type KbdVariants, kbdVariants } from './kbd-variants';

defineOptions({ name: 'UiKbd', inheritAttrs: false });

interface UiKbdProps {
  variant?: NonNullable<KbdVariants['variant']>;
  size?: NonNullable<KbdVariants['size']>;
}

const props = withDefaults(defineProps<UiKbdProps>(), {
  variant: 'default',
  size: 'default',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(kbdVariants({ variant: props.variant, size: props.size }), attrs.class),
);
</script>

<template>
  <kbd v-bind="restAttrs" :class="classes">
    <slot />
  </kbd>
</template>
