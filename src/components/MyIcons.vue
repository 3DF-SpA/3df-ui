<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'MyIcon' });

interface IconProps {
  name: string;
  size?: number | string;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 20,
});

const sizeValue = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size));
</script>

<template>
  <svg :width="sizeValue" :height="sizeValue" aria-hidden="true" class="inline-block shrink-0">
    <use :href="`/icons/sprite.svg#${name}`" />
  </svg>
</template>
