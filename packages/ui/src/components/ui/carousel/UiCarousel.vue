<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import EmblaCarousel from 'embla-carousel';

import { cn } from '../../../lib/utils';
import { CAROUSEL_KEY, type CarouselOrientation } from './carousel-types';

defineOptions({ name: 'UiCarousel', inheritAttrs: false });

interface UiCarouselProps {
  opts?: Partial<EmblaOptionsType>;
  orientation?: CarouselOrientation;
  plugins?: EmblaPluginType[];
}

const props = withDefaults(defineProps<UiCarouselProps>(), {
  opts: undefined,
  orientation: 'horizontal',
  plugins: undefined,
});

const emit = defineEmits<{
  'set-api': [api: EmblaCarouselType];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const viewportRef = ref<HTMLElement>();
const api = ref<EmblaCarouselType>();
const canScrollPrev = ref(false);
const canScrollNext = ref(false);
const orientationRef = computed(() => props.orientation);

function scrollPrev() {
  api.value?.scrollPrev();
}

function scrollNext() {
  api.value?.scrollNext();
}

function onSelect(emblaApi: EmblaCarouselType) {
  canScrollPrev.value = emblaApi.canScrollPrev();
  canScrollNext.value = emblaApi.canScrollNext();
}

function destroyEmbla() {
  if (api.value) {
    api.value.destroy();
    api.value = undefined;
  }
}

function initCarousel() {
  const el = viewportRef.value;
  if (!el) return;

  destroyEmbla();

  const mergedOpts: Partial<EmblaOptionsType> = {
    ...props.opts,
    axis: props.orientation === 'vertical' ? 'y' : 'x',
  };

  const embla = EmblaCarousel(el, mergedOpts, props.plugins ?? []);

  api.value = embla;
  emit('set-api', embla);

  onSelect(embla);
  embla.on('select', onSelect);
  embla.on('reInit', onSelect);
}

onMounted(() => {
  nextTick(() => {
    if (viewportRef.value) initCarousel();
  });
});

watch(viewportRef, (el) => {
  if (el) {
    nextTick(() => initCarousel());
  }
});

watch(
  () => [props.opts, props.orientation],
  () => {
    nextTick(() => initCarousel());
  },
  { deep: true },
);

onBeforeUnmount(() => {
  destroyEmbla();
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft' && props.orientation === 'horizontal') {
    event.preventDefault();
    scrollPrev();
  } else if (event.key === 'ArrowRight' && props.orientation === 'horizontal') {
    event.preventDefault();
    scrollNext();
  } else if (event.key === 'ArrowUp' && props.orientation === 'vertical') {
    event.preventDefault();
    scrollPrev();
  } else if (event.key === 'ArrowDown' && props.orientation === 'vertical') {
    event.preventDefault();
    scrollNext();
  }
}

provide(CAROUSEL_KEY, {
  orientation: orientationRef,
  viewportRef,
  api,
  canScrollPrev,
  canScrollNext,
  scrollPrev,
  scrollNext,
});
</script>

<template>
  <div
    v-bind="restAttrs"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    :class="cn('relative', attrs.class)"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
