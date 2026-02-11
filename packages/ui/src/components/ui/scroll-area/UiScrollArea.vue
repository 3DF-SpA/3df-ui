<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiScrollArea', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Tipo de scrollbar a mostrar */
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    /** Orientación del scroll */
    orientation?: 'vertical' | 'horizontal' | 'both';
  }>(),
  {
    type: 'hover',
    orientation: 'vertical',
  },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('relative overflow-hidden', attrs.class),
);

/* ── Refs ── */
const viewportRef = ref<HTMLElement>();
const thumbYRef = ref<HTMLElement>();
const thumbXRef = ref<HTMLElement>();
const trackYRef = ref<HTMLElement>();
const trackXRef = ref<HTMLElement>();

/* ── State ── */
const hasOverflowY = ref(false);
const hasOverflowX = ref(false);
const thumbYHeight = ref(0);
const thumbYTop = ref(0);
const thumbXWidth = ref(0);
const thumbXLeft = ref(0);
const isHovering = ref(false);
const isScrolling = ref(false);
const isDraggingY = ref(false);
const isDraggingX = ref(false);

let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

/* ── Visibility logic ── */
const showVertical = computed(() => {
  if (!hasOverflowY.value) return false;
  if (props.orientation !== 'vertical' && props.orientation !== 'both') return false;
  switch (props.type) {
    case 'always': return true;
    case 'auto': return true;
    case 'scroll': return isScrolling.value || isDraggingY.value;
    case 'hover': return isHovering.value || isScrolling.value || isDraggingY.value;
  }
  return false;
});

const showHorizontal = computed(() => {
  if (!hasOverflowX.value) return false;
  if (props.orientation !== 'horizontal' && props.orientation !== 'both') return false;
  switch (props.type) {
    case 'always': return true;
    case 'auto': return true;
    case 'scroll': return isScrolling.value || isDraggingX.value;
    case 'hover': return isHovering.value || isScrolling.value || isDraggingX.value;
  }
  return false;
});

/* ── Cálculos de thumb ── */
function updateScrollbars() {
  const vp = viewportRef.value;
  if (!vp) return;

  // Vertical
  hasOverflowY.value = vp.scrollHeight > vp.clientHeight;
  if (hasOverflowY.value) {
    const ratio = vp.clientHeight / vp.scrollHeight;
    thumbYHeight.value = Math.max(ratio * vp.clientHeight, 18);
    const scrollRatio = vp.scrollTop / (vp.scrollHeight - vp.clientHeight);
    thumbYTop.value = scrollRatio * (vp.clientHeight - thumbYHeight.value);
  }

  // Horizontal
  hasOverflowX.value = vp.scrollWidth > vp.clientWidth;
  if (hasOverflowX.value) {
    const ratio = vp.clientWidth / vp.scrollWidth;
    thumbXWidth.value = Math.max(ratio * vp.clientWidth, 18);
    const scrollRatio = vp.scrollLeft / (vp.scrollWidth - vp.clientWidth);
    thumbXLeft.value = scrollRatio * (vp.clientWidth - thumbXWidth.value);
  }
}

function onScroll() {
  updateScrollbars();
  isScrolling.value = true;
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false;
  }, 1000);
}

/* ── Drag vertical ── */
let dragStartY = 0;
let dragStartScrollTop = 0;

function onThumbYPointerDown(e: PointerEvent) {
  e.preventDefault();
  isDraggingY.value = true;
  dragStartY = e.clientY;
  dragStartScrollTop = viewportRef.value?.scrollTop ?? 0;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
  document.addEventListener('pointermove', onThumbYPointerMove);
  document.addEventListener('pointerup', onThumbYPointerUp);
}

function onThumbYPointerMove(e: PointerEvent) {
  const vp = viewportRef.value;
  if (!vp) return;
  const delta = e.clientY - dragStartY;
  const scrollableHeight = vp.scrollHeight - vp.clientHeight;
  const trackHeight = vp.clientHeight - thumbYHeight.value;
  if (trackHeight <= 0) return;
  vp.scrollTop = dragStartScrollTop + (delta / trackHeight) * scrollableHeight;
}

function onThumbYPointerUp() {
  isDraggingY.value = false;
  document.removeEventListener('pointermove', onThumbYPointerMove);
  document.removeEventListener('pointerup', onThumbYPointerUp);
}

/* ── Drag horizontal ── */
let dragStartX = 0;
let dragStartScrollLeft = 0;

function onThumbXPointerDown(e: PointerEvent) {
  e.preventDefault();
  isDraggingX.value = true;
  dragStartX = e.clientX;
  dragStartScrollLeft = viewportRef.value?.scrollLeft ?? 0;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
  document.addEventListener('pointermove', onThumbXPointerMove);
  document.addEventListener('pointerup', onThumbXPointerUp);
}

function onThumbXPointerMove(e: PointerEvent) {
  const vp = viewportRef.value;
  if (!vp) return;
  const delta = e.clientX - dragStartX;
  const scrollableWidth = vp.scrollWidth - vp.clientWidth;
  const trackWidth = vp.clientWidth - thumbXWidth.value;
  if (trackWidth <= 0) return;
  vp.scrollLeft = dragStartScrollLeft + (delta / trackWidth) * scrollableWidth;
}

function onThumbXPointerUp() {
  isDraggingX.value = false;
  document.removeEventListener('pointermove', onThumbXPointerMove);
  document.removeEventListener('pointerup', onThumbXPointerUp);
}

/* ── Track click (saltar a posición) ── */
function onTrackYClick(e: MouseEvent) {
  const vp = viewportRef.value;
  const track = trackYRef.value;
  if (!vp || !track) return;
  const rect = track.getBoundingClientRect();
  const clickRatio = (e.clientY - rect.top) / rect.height;
  vp.scrollTop = clickRatio * (vp.scrollHeight - vp.clientHeight);
}

function onTrackXClick(e: MouseEvent) {
  const vp = viewportRef.value;
  const track = trackXRef.value;
  if (!vp || !track) return;
  const rect = track.getBoundingClientRect();
  const clickRatio = (e.clientX - rect.left) / rect.width;
  vp.scrollLeft = clickRatio * (vp.scrollWidth - vp.clientWidth);
}

/* ── ResizeObserver para recalcular si cambia el contenido ── */
let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  updateScrollbars();
  if (viewportRef.value) {
    resizeObserver = new ResizeObserver(() => updateScrollbars());
    resizeObserver.observe(viewportRef.value);
    // Observar también los hijos directos para detectar cambios de contenido
    const firstChild = viewportRef.value.firstElementChild;
    if (firstChild) resizeObserver.observe(firstChild);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  if (scrollTimeout) clearTimeout(scrollTimeout);
  document.removeEventListener('pointermove', onThumbYPointerMove);
  document.removeEventListener('pointerup', onThumbYPointerUp);
  document.removeEventListener('pointermove', onThumbXPointerMove);
  document.removeEventListener('pointerup', onThumbXPointerUp);
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="classes"
    data-scroll-area=""
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- Viewport (scrollbars nativas ocultas) -->
    <div
      ref="viewportRef"
      class="h-full w-full rounded-[inherit]"
      :class="[
        orientation === 'vertical' || orientation === 'both' ? 'overflow-y-scroll' : 'overflow-y-hidden',
        orientation === 'horizontal' || orientation === 'both' ? 'overflow-x-scroll' : 'overflow-x-hidden',
      ]"
      style="scrollbar-width: none; -ms-overflow-style: none;"
      data-scroll-area="viewport"
      @scroll="onScroll"
    >
      <div class="min-w-full table">
        <slot />
      </div>
    </div>

    <!-- Scrollbar vertical -->
    <div
      v-if="showVertical"
      ref="trackYRef"
      class="absolute right-0 top-0 flex w-2.5 touch-none select-none border-l border-l-transparent p-px transition-opacity duration-200"
      :class="showVertical ? 'opacity-100' : 'opacity-0'"
      :style="{ height: showHorizontal ? 'calc(100% - 10px)' : '100%' }"
      data-scroll-area="scrollbar-y"
      data-orientation="vertical"
      @click.self="onTrackYClick"
    >
      <div
        ref="thumbYRef"
        class="relative flex-1 cursor-pointer rounded-full bg-border transition-colors hover:bg-border/80"
        :style="{
          height: `${thumbYHeight}px`,
          transform: `translateY(${thumbYTop}px)`,
        }"
        data-scroll-area="thumb-y"
        @pointerdown="onThumbYPointerDown"
      />
    </div>

    <!-- Scrollbar horizontal -->
    <div
      v-if="showHorizontal"
      ref="trackXRef"
      class="absolute bottom-0 left-0 flex h-2.5 touch-none select-none border-t border-t-transparent p-px transition-opacity duration-200"
      :class="showHorizontal ? 'opacity-100' : 'opacity-0'"
      :style="{ width: showVertical ? 'calc(100% - 10px)' : '100%' }"
      data-scroll-area="scrollbar-x"
      data-orientation="horizontal"
      @click.self="onTrackXClick"
    >
      <div
        ref="thumbXRef"
        class="relative cursor-pointer rounded-full bg-border transition-colors hover:bg-border/80"
        :style="{
          width: `${thumbXWidth}px`,
          height: '100%',
          transform: `translateX(${thumbXLeft}px)`,
        }"
        data-scroll-area="thumb-x"
        @pointerdown="onThumbXPointerDown"
      />
    </div>
  </div>
</template>

<style scoped>
/* Ocultar scrollbar nativa en WebKit */
[data-scroll-area="viewport"]::-webkit-scrollbar {
  display: none;
}
</style>
