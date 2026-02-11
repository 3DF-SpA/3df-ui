<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { toggleVariants } from './toggle-variants';

defineOptions({ name: 'UiToggle', inheritAttrs: false });

type ToggleVariants = VariantProps<typeof toggleVariants>;

const props = withDefaults(
  defineProps<{
    variant?: NonNullable<ToggleVariants['variant']>;
    size?: NonNullable<ToggleVariants['size']>;
    pressed?: boolean;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    variant: 'default',
    size: 'default',
    pressed: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  'update:pressed': [value: boolean];
}>();

function toggle() {
  if (props.disabled) return;
  emit('update:pressed', !props.pressed);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggle();
  }
}
</script>

<template>
  <button
    type="button"
    :aria-pressed="props.pressed"
    :data-state="props.pressed ? 'on' : 'off'"
    :disabled="props.disabled"
    :class="cn(toggleVariants({ variant: props.variant, size: props.size }), props.class)"
    @click="toggle"
    @keydown="onKeydown"
  >
    <slot :pressed="props.pressed" />
  </button>
</template>
