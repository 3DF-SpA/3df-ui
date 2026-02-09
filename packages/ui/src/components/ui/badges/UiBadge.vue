<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { badgeVariants } from './badge-variants';

defineOptions({ name: 'UiBadge', inheritAttrs: false });

type BadgeVariants = VariantProps<typeof badgeVariants>;

interface UiBadgeProps {
  variant?: BadgeVariants['variant'];
  size?: BadgeVariants['size'];
  as?: string | Component;
}

const props = withDefaults(defineProps<UiBadgeProps>(), {
  as: 'span',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(badgeVariants({ variant: props.variant, size: props.size }), attrs.class),
);
</script>

<template>
  <component :is="as" v-bind="restAttrs" :class="classes">
    <slot />
  </component>
</template>
