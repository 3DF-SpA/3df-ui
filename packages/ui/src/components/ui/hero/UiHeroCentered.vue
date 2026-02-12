<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction } from './hero-types';

defineOptions({ name: 'UiHeroCentered', inheritAttrs: false });

interface Props {
  /** Small badge / announcement text above headline */
  badge?: string;
  /** Badge href (optional — makes it a link) */
  badgeHref?: string;
  /** Main headline */
  headline?: string;
  /** Highlighted word(s) in headline rendered with gradient */
  highlightText?: string;
  /** Supporting text */
  description?: string;
  /** CTA buttons */
  actions?: HeroAction[];
  /** Show subtle grid pattern in background */
  gridPattern?: boolean;
  /** Reduce vertical padding */
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  gridPattern: true,
  compact: false,
});

defineSlots<{
  default?: () => unknown;
  badge?: () => unknown;
  headline?: () => unknown;
  description?: () => unknown;
  actions?: () => unknown;
  /** Content below actions (e.g. stats, logos, screenshot) */
  footer?: () => unknown;
}>();

const emit = defineEmits<{
  action: [action: HeroAction, index: number];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

/** Split headline into parts around the highlight text */
const headlineParts = computed(() => {
  if (!props.headline) return null;
  if (!props.highlightText) return { before: props.headline, highlight: '', after: '' };

  const idx = props.headline.indexOf(props.highlightText);
  if (idx === -1) return { before: props.headline, highlight: '', after: '' };

  return {
    before: props.headline.slice(0, idx),
    highlight: props.highlightText,
    after: props.headline.slice(idx + props.highlightText.length),
  };
});

function handleAction(action: HeroAction, index: number) {
  emit('action', action, index);
}
</script>

<template>
  <section
    v-bind="restAttrs"
    :class="cn('relative w-full overflow-hidden', attrs.class)"
  >
    <!-- Grid pattern -->
    <div
      v-if="gridPattern"
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      :style="{
        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
      }"
      aria-hidden="true"
    />

    <!-- Glow spot -->
    <div
      class="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/10 blur-3xl"
      aria-hidden="true"
    />

    <!-- Content -->
    <div
      :class="cn(
        'relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center lg:px-8',
        compact ? 'py-20 md:py-24' : 'py-28 md:py-36 lg:py-44',
      )"
    >
      <!-- Badge / Announcement -->
      <slot name="badge">
        <component
          :is="badgeHref ? 'a' : 'div'"
          v-if="badge"
          v-bind="badgeHref ? { href: badgeHref } : {}"
          :class="cn(
            'inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors',
            badgeHref && 'cursor-pointer hover:border-primary/40 hover:text-foreground',
          )"
        >
          {{ badge }}
          <svg v-if="badgeHref" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </component>
      </slot>

      <!-- Headline with optional gradient highlight -->
      <slot name="headline">
        <h1
          v-if="headline"
          class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          <template v-if="headlineParts?.highlight">
            {{ headlineParts.before }}<span class="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">{{ headlineParts.highlight }}</span>{{ headlineParts.after }}
          </template>
          <template v-else>{{ headline }}</template>
        </h1>
      </slot>

      <!-- Description -->
      <slot name="description">
        <p v-if="description" class="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {{ description }}
        </p>
      </slot>

      <!-- Actions -->
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
                ? 'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground'
                : action.variant === 'secondary'
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  : action.variant === 'ghost'
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
            )"
            @click="!action.href && handleAction(action, i)"
          >
            {{ action.label }}
          </component>
        </div>
      </slot>

      <slot />

      <slot name="footer" />
    </div>
  </section>
</template>
