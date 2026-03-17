<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    minHeight?: number;
  }>(),
  { minHeight: 300 },
);

const attrs = useAttrs();

const containerRef = ref<HTMLDivElement>();
const width = ref(0);
const height = ref(0);

let observer: ResizeObserver | null = null;

function updateSize() {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  width.value = Math.round(rect.width);
  height.value = Math.round(rect.height);
}

onMounted(() => {
  updateSize();

  observer = new ResizeObserver(() => {
    updateSize();
  });
  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});

const containerClass = computed(() => ['relative w-full', props.class].filter(Boolean).join(' '));

defineExpose({ width, height });
</script>

<template>
  <div
    ref="containerRef"
    v-bind="attrs"
    :class="containerClass"
    :style="{ minHeight: `${minHeight}px` }"
    role="img"
  >
    <svg
      v-if="width > 0 && height > 0"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      class="overflow-visible"
    >
      <slot :width="width" :height="height" />
    </svg>
    <slot name="overlay" :width="width" :height="height" />
  </div>
</template>
