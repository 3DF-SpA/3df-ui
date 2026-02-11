<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';

import { DROPDOWN_MENU_KEY } from './dropdown-menu-types';

defineOptions({ name: 'UiDropdownMenuTrigger' });

const menu = inject(DROPDOWN_MENU_KEY)!;

const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) {
    menu.triggerRef.value = el.value;
  }
});
</script>

<template>
  <div
    ref="el"
    :id="menu.triggerId"
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    :aria-expanded="menu.isOpen.value"
    aria-haspopup="menu"
    @click="menu.toggle()"
    @keydown.enter.prevent="menu.toggle()"
    @keydown.space.prevent="menu.toggle()"
  >
    <slot :open="menu.isOpen.value" />
  </div>
</template>
