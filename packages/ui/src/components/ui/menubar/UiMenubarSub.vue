<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue';

import { MENUBAR_MENU_KEY, MENUBAR_SUB_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubarSub' });

const menu = inject(MENUBAR_MENU_KEY)!;

const subId = `menubar-sub-${Math.random().toString(36).slice(2, 9)}`;
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();

const isOpen = computed(() => menu.activeSubId.value === subId);

provide(MENUBAR_SUB_KEY, {
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
