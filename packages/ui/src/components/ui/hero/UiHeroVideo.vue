<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction } from './hero-types';

defineOptions({ name: 'UiHeroVideo', inheritAttrs: false });

interface Props {
  /** Main headline */
  headline?: string;
  /** Supporting text */
  description?: string;
  /** CTA buttons */
  actions?: HeroAction[];
  /** Background video URL(s). Provide multiple for format fallbacks. */
  videoSrc: string | string[];
  /** Poster image shown before video loads */
  poster?: string;
  /** Video overlay */
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
  /** Overlay opacity 0-100 */
  overlayOpacity?: number;
  /** Reduce vertical padding */
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  overlay: 'dark',
  overlayOpacity: 60,
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

const sources = computed(() => {
  const srcs = Array.isArray(props.videoSrc) ? props.videoSrc : [props.videoSrc];
  return srcs.map((src) => {
    const ext = src.split('.').pop()?.toLowerCase() ?? '';
    const mimeMap: Record<string, string> = { mp4: 'video/mp4', webm: 'video/webm', ogg: 'video/ogg' };
    return { src, type: mimeMap[ext] || 'video/mp4' };
  });
});

const overlayStyle = computed(() => {
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

function handleAction(action: HeroAction, index: number) {
  emit('action', action, index);
}
</script>

<template>
  <section
    v-bind="restAttrs"
    :class="cn('relative w-full overflow-hidden', attrs.class)"
    :style="{ minHeight: '500px' }"
  >
    <!-- Background video -->
    <video
      class="absolute inset-0 h-full w-full object-cover"
      autoplay
      loop
      muted
      playsinline
      :poster="poster"
      aria-hidden="true"
    >
      <source
        v-for="(source, i) in sources"
        :key="i"
        :src="source.src"
        :type="source.type"
      />
    </video>

    <!-- Overlay -->
    <div
      v-if="overlay !== 'none'"
      class="absolute inset-0"
      :style="overlayStyle"
      aria-hidden="true"
    />

    <!-- Content -->
    <div
      :class="cn(
        'relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center lg:px-8',
        compact ? 'py-20 md:py-24' : 'py-32 md:py-40 lg:py-48',
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
        <p v-if="description" class="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl">
          {{ description }}
        </p>
      </slot>

      <slot name="actions">
        <div v-if="actions?.length" class="mt-4 flex flex-wrap items-center justify-center gap-4">
          <component
            :is="action.href ? 'a' : 'button'"
            v-for="(action, i) in actions"
            :key="i"
            v-bind="action.href ? { href: action.href, ...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {}"
            :class="cn(
              'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              action.variant === 'outline'
                ? 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                : action.variant === 'secondary'
                  ? 'bg-white/90 text-gray-900 hover:bg-white'
                  : action.variant === 'ghost'
                    ? 'text-white hover:bg-white/10'
                    : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
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
