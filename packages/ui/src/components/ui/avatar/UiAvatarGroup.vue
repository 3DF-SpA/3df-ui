<script setup lang="ts">
import { computed, provide, toRef, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { AVATAR_GROUP_KEY, type AvatarSize } from './avatar-types';

defineOptions({ name: 'UiAvatarGroup', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    overlap?: boolean;
    size?: AvatarSize;
  }>(),
  { overlap: true, size: 'md' },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

provide(AVATAR_GROUP_KEY, {
  overlap: toRef(props, 'overlap'),
  size: toRef(props, 'size'),
});

const groupClasses = computed(() =>
  cn(
    'flex items-center flex-wrap gap-2',
    props.overlap
      ? 'sm:flex-nowrap sm:gap-0 sm:-space-x-3'
      : 'sm:flex-nowrap sm:gap-3',
    attrs.class,
  ),
);
</script>

<template>
  <div v-bind="restAttrs" :class="groupClasses">
    <slot />
  </div>
</template>
