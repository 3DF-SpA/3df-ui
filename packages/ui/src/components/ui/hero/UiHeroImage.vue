<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction, HeroAlign } from './hero-types';

defineOptions({ name: 'UiHeroImage', inheritAttrs: false });

interface Props {
  headline?: string;
  description?: string;
  actions?: HeroAction[];
  imageSrc: string;
  imageAlt?: string;
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
  overlayOpacity?: number;
  align?: HeroAlign;
  minHeight?: string;
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  overlay: 'dark',
  overlayOpacity: 60,
  align: 'center',
  minHeight: '500px',
  compact: false,
});

defineSlots<{
  default?: () => unknown;
  headline?: () => unknown;
  description?: () => unknown;
  actions?: () => unknown;
}>();

const emit = defineEmits<{
  action: [action: HeroAction, index: number];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const overlayClass = computed(() => {
  const opacity = props.overlayOpacity / 100;
  switch (props.overlay) {
    case 'dark':
      return `background:rgba(0,0,0,${opacity})`;
    case 'light':
      return `background:rgba(255,255,255,${opacity})`;
    case 'gradient':
      return `background:linear-gradient(to top,rgba(0,0,0,${Math.min(opacity + 0.2, 1)}),rgba(0,0,0,${opacity * 0.3}))`;
    default:
      return '';
  }
});

const alignClass = computed(() => {
  const map: Record<HeroAlign, string> = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };
  return map[props.align];
});

const textColor = computed(() => (props.overlay === 'light' ? 'text-foreground' : 'text-white'));

const subtextColor = computed(() =>
  props.overlay === 'light' ? 'text-muted-foreground' : 'text-white/80',
);

function handleAction(action: HeroAction, index: number) {
  emit('action', action, index);
}
</script>

<template>
  <section
    v-bind="restAttrs"
    :class="cn('relative w-full overflow-hidden', attrs.class)"
    :style="{ minHeight }"
  >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      class="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      aria-hidden="true"
    />

    <div
      v-if="overlay !== 'none'"
      class="absolute inset-0"
      :style="overlayClass"
      aria-hidden="true"
    />

    <div
      :class="
        cn(
          'relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-6 lg:px-8',
          compact ? 'py-20 md:py-24' : 'py-32 md:py-40 lg:py-48',
          alignClass,
        )
      "
    >
      <slot name="headline">
        <h1
          v-if="headline"
          :class="cn('text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl', textColor)"
        >
          {{ headline }}
        </h1>
      </slot>

      <slot name="description">
        <p
          v-if="description"
          :class="
            cn(
              'max-w-2xl text-lg sm:text-xl',
              subtextColor,
              align === 'center' && 'mx-auto',
              align === 'right' && 'ml-auto',
            )
          "
        >
          {{ description }}
        </p>
      </slot>

      <slot name="actions">
        <div
          v-if="actions?.length"
          class="mt-4 flex flex-wrap gap-4"
          :class="
            align === 'center'
              ? 'justify-center'
              : align === 'right'
                ? 'justify-end'
                : 'justify-start'
          "
        >
          <component
            :is="action.href ? 'a' : 'button'"
            v-for="(action, i) in actions"
            :key="i"
            v-bind="
              action.href
                ? {
                    href: action.href,
                    ...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                  }
                : {}
            "
            :class="
              cn(
                'focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                action.variant === 'outline'
                  ? 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                  : action.variant === 'secondary'
                    ? 'bg-white/90 text-gray-900 hover:bg-white'
                    : action.variant === 'ghost'
                      ? 'text-white hover:bg-white/10'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
              )
            "
            @click="!action.href && handleAction(action, i)"
          >
            {{ action.label }}
          </component>
        </div>
      </slot>

      <slot />
    </div>
  </section>
</template>
