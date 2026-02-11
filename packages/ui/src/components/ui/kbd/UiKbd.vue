<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { kbdVariants, type KbdVariants } from './kbd-variants';

defineOptions({ name: 'UiKbd', inheritAttrs: false });

interface UiKbdProps {
  /** Size variant */
  size?: NonNullable<KbdVariants['size']>;
}

const props = withDefaults(defineProps<UiKbdProps>(), {
  size: 'default',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn(kbdVariants({ size: props.size }), attrs.class));
</script>

<template>
  <kbd v-bind="restAttrs" :class="classes">
    <slot />
  </kbd>
</template>
