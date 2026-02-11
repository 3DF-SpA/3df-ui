<script setup lang="ts">
import { inject } from 'vue';

import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogClose' });

const dialog = inject(DIALOG_KEY)!;
</script>

<template>
  <div
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    @click="dialog.close()"
    @keydown.enter.prevent="dialog.close()"
    @keydown.space.prevent="dialog.close()"
  >
    <slot />
  </div>
</template>
