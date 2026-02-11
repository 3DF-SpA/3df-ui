<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue';

import { CONTEXT_MENU_KEY, CONTEXT_MENU_SUB_KEY } from './context-menu-types';

defineOptions({ name: 'UiContextMenuSub' });

const menu = inject(CONTEXT_MENU_KEY)!;

const subId = `ctx-sub-${Math.random().toString(36).slice(2, 9)}`;
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();

const isOpen = computed(() => menu.activeSubId.value === subId);

provide(CONTEXT_MENU_SUB_KEY, {
  subId,
  isOpen,
  triggerRef,
  contentRef,
});
</script>

<template>
  <div role="none">
    <slot />
  </div>
</template>
