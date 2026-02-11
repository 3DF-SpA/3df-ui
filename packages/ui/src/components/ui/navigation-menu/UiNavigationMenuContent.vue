<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { NAV_MENU_ITEM_KEY, NAV_MENU_KEY } from './navigation-menu-types';

defineOptions({ name: 'UiNavigationMenuContent', inheritAttrs: false });

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
    'border border-border bg-popover text-popover-foreground rounded-lg p-4 shadow-lg',
    attrs.class,
  ),
);
</script>

<template>
  <Teleport v-if="menu.viewportRef.value" :to="menu.viewportRef.value">
    <Transition
      enter-active-class="transition-[opacity,transform] duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-[opacity,transform] duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isActive"
        v-bind="restAttrs"
        :data-state="isActive ? 'open' : 'closed'"
        :class="classes"
        @mouseenter="menu.onContentEnter()"
        @mouseleave="menu.onContentLeave()"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
