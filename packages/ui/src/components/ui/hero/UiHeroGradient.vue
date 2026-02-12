<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction, HeroAlign } from './hero-types';

defineOptions({ name: 'UiHeroGradient', inheritAttrs: false });

interface Props {
  /** Main headline */
  headline?: string;
  /** Supporting text */
  description?: string;
  /** CTA buttons */
  actions?: HeroAction[];
  /** Gradient preset */
  gradient?: 'purple' | 'blue' | 'green' | 'orange' | 'rose' | 'custom';
  /** Custom gradient CSS (when gradient is 'custom') */
  customGradient?: string;
  /** Show decorative blur blobs */
  blobs?: boolean;
  /** Text alignment */
  align?: HeroAlign;
  /** Reduce vertical padding */
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  gradient: 'purple',
  blobs: true,
  align: 'center',
  compact: false,
});

defineSlots<{
  default?: () => unknown;
  headline?: () => unknown;
  description?: () => unknown;
  actions?: () => unknown;
  /** Extra decorative elements */
  decoration?: () => unknown;
}>();

const emit = defineEmits<{
  action: [action: HeroAction, index: number];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const gradientStyle = computed(() => {
  if (props.gradient === 'custom' && props.customGradient) return props.customGradient;

  const presets: Record<string, string> = {
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    blue: 'linear-gradient(135deg, #667eea 0%, #0ea5e9 50%, #06b6d4 100%)',
    green: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #34d399 100%)',
    orange: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
    rose: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #9333ea 100%)',
  };
  return presets[props.gradient] ?? presets.purple;
});

const blobColors = computed((): [string, string] => {
  const fallback: [string, string] = ['rgba(139,92,246,0.3)', 'rgba(236,72,153,0.2)'];
  const map: Record<string, [string, string]> = {
    purple: fallback,
    blue: ['rgba(14,165,233,0.3)', 'rgba(99,102,241,0.2)'],
    green: ['rgba(16,185,129,0.3)', 'rgba(14,165,233,0.2)'],
    orange: ['rgba(249,115,22,0.3)', 'rgba(239,68,68,0.2)'],
    rose: ['rgba(236,72,153,0.3)', 'rgba(147,51,234,0.2)'],
    custom: fallback,
  };
  return map[props.gradient] ?? fallback;
});

const alignClass = computed(() => {
  const map: Record<HeroAlign, string> = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };
  return map[props.align];
});

function handleAction(action: HeroAction, index: number) {
  emit('action', action, index);
}
</script>

<template>
  <section
    v-bind="restAttrs"
    :class="cn('relative w-full overflow-hidden', attrs.class)"
    :style="{ background: gradientStyle }"
  >
    <!-- Decorative blobs -->
    <template v-if="blobs">
      <div
        class="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        :style="{ background: blobColors[0] }"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full blur-3xl"
        :style="{ background: blobColors[1] }"
        aria-hidden="true"
      />
    </template>

    <slot name="decoration" />

    <!-- Content -->
    <div
      :class="cn(
        'relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-6 lg:px-8',
        compact ? 'py-20 md:py-24' : 'py-28 md:py-36 lg:py-44',
        alignClass,
      )"
    >
      <slot name="headline">
        <h1
          v-if="headline"
          class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {{ headline }}
        </h1>
      </slot>

      <slot name="description">
        <p
          v-if="description"
          :class="cn(
            'max-w-2xl text-lg text-white/80 sm:text-xl',
            align === 'center' && 'mx-auto',
            align === 'right' && 'ml-auto',
          )"
        >
          {{ description }}
        </p>
      </slot>

      <slot name="actions">
        <div
          v-if="actions?.length"
          class="mt-4 flex flex-wrap gap-4"
          :class="align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'"
        >
          <component
            :is="action.href ? 'a' : 'button'"
            v-for="(action, i) in actions"
            :key="i"
            v-bind="action.href ? { href: action.href, ...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {}"
            :class="cn(
              'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              action.variant === 'outline'
                ? 'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                : action.variant === 'secondary'
                  ? 'bg-white/90 text-gray-900 hover:bg-white'
                  : action.variant === 'ghost'
                    ? 'text-white hover:bg-white/10'
                    : 'bg-white text-gray-900 shadow-lg hover:bg-white/90',
            )"
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
