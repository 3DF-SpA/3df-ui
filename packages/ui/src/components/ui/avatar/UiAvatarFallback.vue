<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { AVATAR_KEY } from './avatar-types';

defineOptions({ name: 'UiAvatarFallback', inheritAttrs: false });

const ctx = inject(AVATAR_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const showFallback = computed(() => !ctx.imageLoaded.value);
</script>

<template>
  <span
    v-if="showFallback"
    v-bind="restAttrs"
    :class="
      cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
        attrs.class,
      )
    "
  >
    <slot />
  </span>
</template>
