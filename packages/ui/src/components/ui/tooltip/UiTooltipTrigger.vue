<script setup lang="ts">
import { type Ref, inject, ref, watchEffect } from 'vue';

defineOptions({ name: 'UiTooltipTrigger' });

const tooltip = inject<{
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  tooltipId: string;
  open: () => void;
  close: () => void;
}>('tooltip')!;

const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) {
    tooltip.triggerRef.value = el.value;
  }
});
</script>

<template>
  <div
    ref="el"
    class="inline-flex outline-none"
    :aria-describedby="tooltip.isOpen.value ? tooltip.tooltipId : undefined"
    @mouseenter="tooltip.open()"
    @mouseleave="tooltip.close()"
    @focusin="tooltip.open()"
    @focusout="tooltip.close()"
  >
    <slot />
  </div>
</template>
