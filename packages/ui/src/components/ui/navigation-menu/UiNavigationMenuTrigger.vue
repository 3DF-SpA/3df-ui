<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { NAV_MENU_ITEM_KEY, NAV_MENU_KEY } from './navigation-menu-types';

defineOptions({ name: 'UiNavigationMenuTrigger', inheritAttrs: false });

const menu = inject(NAV_MENU_KEY)!;
const item = inject(NAV_MENU_ITEM_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isActive = computed(() => menu.activeValue.value === item.value);

const classes = computed(() =>
  cn(
    'group inline-flex h-9 w-max items-center justify-center gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium',
    'transition-colors duration-200',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
    isActive.value && 'bg-accent/50 text-accent-foreground',
    attrs.class,
  ),
);
</script>

<template>
  <button
    v-bind="restAttrs"
    :class="classes"
    :aria-expanded="isActive"
    :data-state="isActive ? 'open' : 'closed'"
    @mouseenter="menu.onTriggerEnter(item.value)"
    @mouseleave="menu.onTriggerLeave()"
    @click="isActive ? menu.close() : menu.open(item.value)"
    @keydown.enter.prevent="isActive ? menu.close() : menu.open(item.value)"
    @keydown.space.prevent="isActive ? menu.close() : menu.open(item.value)"
    @keydown.down.prevent="menu.open(item.value)"
  >
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="relative top-px ml-1 shrink-0 transition-transform duration-200"
      :class="isActive && 'rotate-180'"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
</template>
