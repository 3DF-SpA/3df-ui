<script setup lang="ts">
import { type Component, computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { NAV_MENU_KEY } from './navigation-menu-types';

defineOptions({ name: 'UiNavigationMenuLink', inheritAttrs: false });

interface UiNavigationMenuLinkProps {
  as?: string | Component;
  active?: boolean;
}

const props = withDefaults(defineProps<UiNavigationMenuLinkProps>(), {
  as: 'a',
  active: false,
});

const menu = inject(NAV_MENU_KEY, null);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:bg-accent focus-visible:text-accent-foreground',
    'focus-visible:outline-none',
    props.active && 'bg-accent/50 text-accent-foreground',
    attrs.class,
  ),
);

function onClick() {
  menu?.close();
}
</script>

<template>
  <component
    :is="as"
    v-bind="restAttrs"
    :class="classes"
    :data-active="active || undefined"
    @click="onClick"
  >
    <slot />
  </component>
</template>
