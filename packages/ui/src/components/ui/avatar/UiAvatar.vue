<script setup lang="ts">
import { computed, inject, provide, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { AVATAR_GROUP_KEY, AVATAR_KEY, type AvatarSize } from './avatar-types';

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

const groupCtx = inject(AVATAR_GROUP_KEY, null);

const sizeRef = computed<AvatarSize>(() => {
  if (props.size !== 'md') return props.size;
  return groupCtx ? groupCtx.size.value : props.size;
});

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

const ringClass = computed(() =>
  groupCtx && groupCtx.overlap.value ? 'ring-2 ring-background' : '',
);
</script>

<template>
  <span
    v-bind="restAttrs"
    :class="cn('relative flex shrink-0 overflow-hidden rounded-full', sizeClasses[sizeRef], ringClass, attrs.class)"
  >
    <slot />
  </span>
</template>
