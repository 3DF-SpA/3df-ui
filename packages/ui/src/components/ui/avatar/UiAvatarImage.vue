<script setup lang="ts">
import { computed, inject, onMounted, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { AVATAR_KEY } from './avatar-types';

defineOptions({ name: 'UiAvatarImage', inheritAttrs: false });

const props = defineProps<{
  src?: string;
  alt?: string;
}>();

const ctx = inject(AVATAR_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const imgRef = ref<HTMLImageElement>();

function loadImage(src: string | undefined) {
  ctx.imageLoaded.value = false;
  ctx.imageError.value = false;

  if (!src) {
    ctx.imageError.value = true;
    return;
  }

  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.imageLoaded.value = true;
    ctx.imageError.value = false;
  };
  img.onerror = () => {
    ctx.imageLoaded.value = false;
    ctx.imageError.value = true;
  };
}

onMounted(() => {
  loadImage(props.src);
});

watch(
  () => props.src,
  (newSrc) => {
    loadImage(newSrc);
  },
);
</script>

<template>
  <img
    v-if="ctx.imageLoaded.value"
    ref="imgRef"
    v-bind="restAttrs"
    :src="props.src"
    :alt="props.alt ?? ''"
    :class="cn('aspect-square h-full w-full object-cover', attrs.class)"
  />
</template>
