<script setup lang="ts">
import { inject } from 'vue';

import { DRAWER_KEY } from './drawer-types';

defineOptions({ name: 'UiDrawerTrigger' });

const drawer = inject(DRAWER_KEY)!;
</script>

<template>
  <div class="inline-flex" @click="drawer.toggle()">
    <slot />
  </div>
</template>
