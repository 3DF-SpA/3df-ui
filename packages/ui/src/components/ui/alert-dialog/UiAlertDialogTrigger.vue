<script setup lang="ts">
import { inject } from 'vue';

import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogTrigger' });

const ctx = inject(ALERT_DIALOG_KEY)!;
</script>

<template>
  <div class="inline-flex" @click="ctx.toggle()">
    <slot />
  </div>
</template>
