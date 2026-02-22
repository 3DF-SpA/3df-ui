<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { NAV_MENU_ITEM_KEY } from './navigation-menu-types';

defineOptions({ name: 'UiNavigationMenuItem', inheritAttrs: false });

interface UiNavigationMenuItemProps {
  value?: string;
}

const props = withDefaults(defineProps<UiNavigationMenuItemProps>(), {
  value: undefined,
});

const generatedId = `nav-item-${Math.random().toString(36).slice(2, 9)}`;
const itemValue = props.value ?? generatedId;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

provide(NAV_MENU_ITEM_KEY, { value: itemValue });

const classes = computed(() => cn('', attrs.class));
</script>

<template>
  <li v-bind="restAttrs" :class="classes">
    <slot />
  </li>
</template>
