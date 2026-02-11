<script setup lang="ts">
import { inject } from 'vue';

import { DRAWER_KEY } from './drawer-types';

defineOptions({ name: 'UiDrawerTrigger' });

const drawer = inject(DRAWER_KEY)!;
</script>

<template>
  <div
    class="inline-flex outline-none"
    role="button"
    tabindex="0"
    @click="drawer.toggle()"
    @keydown.enter.prevent="drawer.toggle()"
    @keydown.space.prevent="drawer.toggle()"
  >
    <slot />
  </div>
</template>
