<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSlider', inheritAttrs: false });

interface UiSliderProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiSliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const trackRef = ref<HTMLElement>();
const isDragging = ref(false);

// ─── Clamp & snap value ───────────────────────────────────────
function clamp(value: number): number {
  const clamped = Math.min(props.max, Math.max(props.min, value));
  // Snap to step
  const steps = Math.round((clamped - props.min) / props.step);
  return Math.min(props.max, props.min + steps * props.step);
}

// ─── Percentage for positioning ───────────────────────────────
const percentage = computed(() => {
  if (props.max === props.min) return 0;
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
});

// ─── Resolve value from pointer position ──────────────────────
function resolveValue(clientX: number): number {
  if (!trackRef.value) return props.modelValue;
  const rect = trackRef.value.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  const rawValue = props.min + ratio * (props.max - props.min);
  return clamp(rawValue);
}

// ─── Pointer handlers ─────────────────────────────────────────
function onPointerDown(event: PointerEvent) {
  if (props.disabled) return;
  event.preventDefault();
  isDragging.value = true;
  document.addEventListener('pointerup', onDocumentPointerUp);
  const value = resolveValue(event.clientX);
  emit('update:modelValue', value);
  (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value || props.disabled) return;
  const value = resolveValue(event.clientX);
  emit('update:modelValue', value);
}

function onPointerUp() {
  isDragging.value = false;
}

// ─── Keyboard handler ─────────────────────────────────────────
function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  let newValue = props.modelValue;
  const bigStep = (props.max - props.min) / 10;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault();
      newValue = clamp(props.modelValue + props.step);
      break;
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault();
      newValue = clamp(props.modelValue - props.step);
      break;
    case 'PageUp':
      event.preventDefault();
      newValue = clamp(props.modelValue + bigStep);
      break;
    case 'PageDown':
      event.preventDefault();
      newValue = clamp(props.modelValue - bigStep);
      break;
    case 'Home':
      event.preventDefault();
      newValue = props.min;
      break;
    case 'End':
      event.preventDefault();
      newValue = props.max;
      break;
    default:
      return;
  }

  emit('update:modelValue', newValue);
}

// ─── Cleanup global listeners on unmount ──────────────────────
function onDocumentPointerUp() {
  isDragging.value = false;
  document.removeEventListener('pointerup', onDocumentPointerUp);
}

onBeforeUnmount(() => {
  document.removeEventListener('pointerup', onDocumentPointerUp);
});

// ─── Ensure value is clamped when props change ────────────────
watch(
  () => [props.min, props.max, props.step],
  () => {
    const clamped = clamp(props.modelValue);
    if (clamped !== props.modelValue) {
      emit('update:modelValue', clamped);
    }
  },
);
</script>

<template>
  <div
    v-bind="restAttrs"
    ref="trackRef"
    role="slider"
    :tabindex="disabled ? -1 : 0"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="modelValue"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="
      cn(
        [
          'relative flex w-full touch-none select-none items-center',
          'cursor-pointer',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        ].join(' '),
        attrs.class,
      )
    "
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @keydown="onKeydown"
  >
    <!-- Track -->
    <div class="bg-secondary relative h-1.5 w-full overflow-hidden rounded-full">
      <!-- Range (filled portion) -->
      <div
        class="bg-primary absolute h-full rounded-full transition-[width] duration-75 ease-out"
        :style="{ width: `${percentage}%` }"
      />
    </div>

    <!-- Thumb -->
    <div
      class="bg-background absolute block size-4 rounded-full border-ui border-border shadow-md transition-[transform,box-shadow] duration-200 hover:scale-110"
      :class="[
        isDragging
          ? 'scale-110 ring-[3px] ring-ring/40 shadow-md'
          : 'shadow-sm',
      ]"
      :style="{ left: `calc(${percentage}% - 8px)` }"
    />
  </div>
</template>
