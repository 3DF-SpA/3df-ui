<script setup lang="ts">
import { type Ref, inject, ref, watchEffect } from 'vue';

defineOptions({ name: 'UiDropdownMenuTrigger' });

const menu = inject<{
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  triggerId: string;
  toggle: () => void;
}>('dropdown-menu')!;

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
    class="inline-flex"
    role="button"
    tabindex="0"
    :aria-expanded="menu.isOpen.value"
    aria-haspopup="menu"
    @click.stop="menu.toggle()"
  >
    <slot :open="menu.isOpen.value" />
  </div>
</template>
