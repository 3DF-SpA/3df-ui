<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';
import { SHEET_INJECTION_KEY, type SheetContext } from './sheet-types';

defineOptions({ name: 'UiSheetTrigger' });

const sheet = inject<SheetContext>(SHEET_INJECTION_KEY)!;

const el = ref<HTMLElement>();

watchEffect(() => {
  // No necesitamos ref del trigger en el sheet, pero lo dejamos disponible
  if (el.value) el.value.id = sheet.triggerId;
});
</script>

<template>
  <div
    ref="el"
    class="inline-flex outline-none"
    :aria-expanded="sheet.isOpen.value"
    aria-haspopup="dialog"
    @click="sheet.toggle()"
  >
    <slot :open="sheet.isOpen.value" />
  </div>
</template>
