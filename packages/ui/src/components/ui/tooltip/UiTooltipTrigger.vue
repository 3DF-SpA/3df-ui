<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';

import { TOOLTIP_KEY } from './tooltip-types';

defineOptions({ name: 'UiTooltipTrigger' });

const tooltip = inject(TOOLTIP_KEY)!;

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
    tabindex="0"
    :aria-describedby="tooltip.isOpen.value ? tooltip.tooltipId : undefined"
    @mouseenter="tooltip.open()"
    @mouseleave="tooltip.close()"
    @focusin="tooltip.open()"
    @focusout="tooltip.close()"
  >
    <slot />
  </div>
</template>
