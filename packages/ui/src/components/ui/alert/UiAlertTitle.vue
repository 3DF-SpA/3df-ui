<script setup lang="ts">
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiAlertTitle' });

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <h5 :class="cn('mb-1 leading-none font-medium tracking-tight', props.class)">
    <slot />
  </h5>
</template>
