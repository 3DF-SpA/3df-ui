<script setup lang="ts">
import { inject } from 'vue';

import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogClose' });

const dialog = inject(DIALOG_KEY)!;
</script>

<template>
  <div class="inline-flex" @click="dialog.close()">
    <slot />
  </div>
</template>
