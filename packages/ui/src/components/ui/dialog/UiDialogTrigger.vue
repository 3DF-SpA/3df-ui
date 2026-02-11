<script setup lang="ts">
import { inject } from 'vue';

import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogTrigger' });

const dialog = inject(DIALOG_KEY)!;
</script>

<template>
  <div class="inline-flex" @click="dialog.toggle()">
    <slot />
  </div>
</template>
