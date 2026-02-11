<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted, useAttrs, watch } from 'vue';
import type { ChartConfig, ChartContext } from './chart-types';
import { CHART_KEY } from './chart-types';
import { resolveConfigColors } from './chart-utils';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    class?: string;
    /** Minimum height in px (default 300) */
    minHeight?: number;
  }>(),
  { minHeight: 300 },
);

const attrs = useAttrs();

const containerRef = ref<HTMLDivElement>();
const width = ref(0);
const height = ref(0);

const resolvedColors = ref<Record<string, string>>({});

const configRef = computed(() => props.config);

// ResizeObserver for responsive sizing
let observer: ResizeObserver | null = null;

function updateSize() {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  width.value = Math.round(rect.width);
  height.value = Math.round(rect.height);
}

function updateColors() {
  resolvedColors.value = resolveConfigColors(props.config, containerRef.value ?? undefined);
}

onMounted(() => {
  updateSize();
  updateColors();

  observer = new ResizeObserver(() => {
    updateSize();
  });
  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});

watch(() => props.config, updateColors, { deep: true });

// Provide chart context to children
provide<ChartContext>(CHART_KEY, {
  config: configRef,
  resolvedColors,
});

// Expose dimensions for child components
defineExpose({ width, height });
</script>

<template>
  <div
    ref="containerRef"
    v-bind="attrs"
    :class="['relative w-full', props.class]"
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
    <!-- HTML overlay layer for tooltips -->
    <slot name="overlay" :width="width" :height="height" />
  </div>
</template>
