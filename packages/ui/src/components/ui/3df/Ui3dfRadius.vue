<script setup lang="ts">
import { ref, useAttrs, computed } from 'vue'
import { cn } from '../../../lib/utils'
import type { ClassValue } from 'clsx'
import { RADIUS_LABELS } from './use-3df-config'

defineOptions({ name: 'Ui3dfRadius', inheritAttrs: false })

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue }
const restAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})

const trackRef = ref<HTMLDivElement | null>(null)
const dragging = ref(false)

function calcStep(clientX: number): number {
  const track = trackRef.value
  if (!track) return props.modelValue
  const rect = track.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  return Math.round(ratio * 8)
}

function onPointerDown(e: PointerEvent) {
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  emit('update:modelValue', calcStep(e.clientX))
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  emit('update:modelValue', calcStep(e.clientX))
}

function onPointerUp(e: PointerEvent) {
  dragging.value = false
  ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
}

const thumbPercent = computed(() => `${(props.modelValue / 8) * 100}%`)
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-1.5', attrs.class)">
    <div class="flex items-center justify-between">
      <span class="text-xs font-mono text-muted-foreground">{{ RADIUS_LABELS[modelValue] }}</span>
      <span class="text-xs font-mono text-muted-foreground">{{ modelValue }}/8</span>
    </div>
    <div
      ref="trackRef"
      class="relative h-2 w-full rounded-full bg-secondary cursor-pointer select-none touch-none"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    >
      <!-- filled track -->
      <div
        class="absolute inset-y-0 left-0 rounded-full bg-primary"
        :style="{ width: thumbPercent }"
      />
      <!-- thumb -->
      <div
        class="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background shadow-sm transition-shadow hover:shadow-md"
        :style="{ left: thumbPercent }"
      />
    </div>
  </div>
</template>
