<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { NAV_MENU_KEY } from './navigation-menu-types';

defineOptions({ name: 'UiNavigationMenuViewport', inheritAttrs: false });

const menu = inject(NAV_MENU_KEY)!;
const el = ref<HTMLElement>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

onMounted(() => {
  menu.viewportRef.value = el.value;
});

onBeforeUnmount(() => {
  menu.viewportRef.value = undefined;
});

const classes = computed(() =>
  cn('absolute left-0 top-full z-50 mt-1.5', attrs.class),
);
</script>

<template>
  <div v-bind="restAttrs" ref="el" :class="classes" />
</template>
