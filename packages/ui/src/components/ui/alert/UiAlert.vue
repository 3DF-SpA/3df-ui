<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { alertVariants } from './alert-variants';

defineOptions({ name: 'UiAlert', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: NonNullable<VariantProps<typeof alertVariants>>['variant'];
    class?: string;
  }>(),
  {
    variant: 'default',
  },
);
</script>

<template>
  <div :class="cn(alertVariants({ variant: props.variant }), props.class)" role="alert">
    <slot />
  </div>
</template>
