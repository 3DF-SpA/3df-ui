<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';

import { POPOVER_KEY } from './popover-types';

defineOptions({ name: 'UiPopoverTrigger' });

const popover = inject(POPOVER_KEY)!;

const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) {
    popover.triggerRef.value = el.value;
  }
});
</script>

<template>
  <div
    ref="el"
    :id="popover.triggerId"
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    :aria-expanded="popover.isOpen.value"
    aria-haspopup="dialog"
    @click="popover.toggle()"
    @keydown.enter.prevent="popover.toggle()"
    @keydown.space.prevent="popover.toggle()"
  >
    <slot :open="popover.isOpen.value" />
  </div>
</template>
