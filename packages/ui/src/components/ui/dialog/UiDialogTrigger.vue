<script setup lang="ts">
import { inject } from 'vue';

import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogTrigger' });

const dialog = inject(DIALOG_KEY)!;
</script>

<template>
  <div
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    @click="dialog.toggle()"
    @keydown.enter.prevent="dialog.toggle()"
    @keydown.space.prevent="dialog.toggle()"
  >
    <slot />
  </div>
</template>
