<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';

import { SHEET_INJECTION_KEY, type SheetContext } from './sheet-types';

defineOptions({ name: 'UiSheetTrigger' });

const sheet = inject<SheetContext>(SHEET_INJECTION_KEY)!;

const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) el.value.id = sheet.triggerId;
});
</script>

<template>
  <div
    ref="el"
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    :aria-expanded="sheet.isOpen.value"
    aria-haspopup="dialog"
    @click="sheet.toggle()"
    @keydown.enter.prevent="sheet.toggle()"
    @keydown.space.prevent="sheet.toggle()"
  >
    <slot :open="sheet.isOpen.value" />
  </div>
</template>
