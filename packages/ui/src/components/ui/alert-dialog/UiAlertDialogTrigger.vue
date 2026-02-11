<script setup lang="ts">
import { inject } from 'vue';

import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogTrigger' });

const ctx = inject(ALERT_DIALOG_KEY)!;
</script>

<template>
  <div
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    @click="ctx.toggle()"
    @keydown.enter.prevent="ctx.toggle()"
    @keydown.space.prevent="ctx.toggle()"
  >
    <slot />
  </div>
</template>
