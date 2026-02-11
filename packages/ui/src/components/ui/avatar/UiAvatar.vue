<script setup lang="ts">
import { computed, provide, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { AVATAR_KEY, type AvatarSize } from './avatar-types';

defineOptions({ name: 'UiAvatar', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: AvatarSize;
  }>(),
  { size: 'md' },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const sizeRef = computed(() => props.size);

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const imageLoaded = ref(false);
const imageError = ref(false);

provide(AVATAR_KEY, {
  imageLoaded,
  imageError,
  size: sizeRef,
});
</script>

<template>
  <span
    v-bind="restAttrs"
    :class="
      cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClasses[sizeRef],
        attrs.class,
      )
    "
  >
    <slot />
  </span>
</template>
