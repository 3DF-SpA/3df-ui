<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';

import { HOVER_CARD_KEY } from './hover-card-types';

defineOptions({ name: 'UiHoverCardTrigger' });

const hoverCard = inject(HOVER_CARD_KEY)!;
const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) {
    hoverCard.triggerRef.value = el.value;
  }
});
</script>

<template>
  <div
    ref="el"
    class="inline-flex outline-none"
    tabindex="0"
    @mouseenter="hoverCard.open()"
    @mouseleave="hoverCard.close()"
    @focusin="hoverCard.open()"
    @focusout="hoverCard.close()"
  >
    <slot />
  </div>
</template>
