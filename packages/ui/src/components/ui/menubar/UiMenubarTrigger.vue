<script setup lang="ts">
import { computed, inject, ref, useAttrs, watchEffect } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { MENUBAR_KEY, MENUBAR_MENU_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubarTrigger', inheritAttrs: false });

const menubar = inject(MENUBAR_KEY)!;
const menu = inject(MENUBAR_MENU_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) {
    menu.triggerRef.value = el.value;
    menubar.setTriggerRef(menu.value, el.value);
  }
});

function onClick() {
  if (menu.isOpen.value) {
    menubar.closeAll();
  } else {
    menubar.openMenu(menu.value);
  }
}

function onPointerEnter() {
  if (menubar.isAnyOpen.value && !menu.isOpen.value) {
    menubar.openMenu(menu.value);
    el.value?.focus();
  }
}
</script>

<template>
  <button
    ref="el"
    v-bind="restAttrs"
    :id="menu.triggerId"
    type="button"
    role="menuitem"
    :aria-expanded="menu.isOpen.value"
    aria-haspopup="menu"
    :data-state="menu.isOpen.value ? 'open' : 'closed'"
    :class="
      cn(
        'flex cursor-pointer select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        attrs.class,
      )
    "
    @click="onClick"
    @pointerenter="onPointerEnter"
  >
    <slot />
  </button>
</template>
