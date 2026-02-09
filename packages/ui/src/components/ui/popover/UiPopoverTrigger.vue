<script setup lang="ts">
import { type Ref, inject, ref, watchEffect } from 'vue';

defineOptions({ name: 'UiPopoverTrigger' });

const popover = inject<{
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  triggerId: string;
  toggle: () => void;
}>('popover')!;

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
    :aria-expanded="popover.isOpen.value"
    aria-haspopup="dialog"
    @click="popover.toggle()"
  >
    <slot :open="popover.isOpen.value" />
  </div>
</template>
