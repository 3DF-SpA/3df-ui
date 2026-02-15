<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction, HeroAlign } from './hero-types';

defineOptions({ name: 'UiHeroSimple', inheritAttrs: false });

interface Props {
  /** Main headline */
  headline?: string;
  /** Supporting description text */
  description?: string;
  /** CTA buttons */
  actions?: HeroAction[];
  /** Text alignment */
  align?: HeroAlign;
  /** Reduce vertical padding */
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
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
    :class="cn(
      'relative w-full',
      compact ? 'py-16 md:py-20' : 'py-24 md:py-32 lg:py-40',
      attrs.class,
    )"
  >
    <div :class="cn('mx-auto flex max-w-4xl flex-col gap-6 px-6 lg:px-8', alignClass)">
      <!-- Headline -->
      <slot name="headline">
        <h1
          v-if="headline"
          class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {{ headline }}
        </h1>
      </slot>

      <!-- Description -->
      <slot name="description">
        <p
          v-if="description"
          :class="cn(
            'max-w-2xl text-lg text-muted-foreground sm:text-xl',
            align === 'center' && 'mx-auto',
            align === 'right' && 'ml-auto',
          )"
        >
          {{ description }}
        </p>
      </slot>

      <!-- Actions -->
      <slot name="actions">
        <div v-if="actions?.length" class="mt-4 flex flex-wrap gap-4" :class="align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'">
          <component
            :is="action.href ? 'a' : 'button'"
            v-for="(action, i) in actions"
            :key="i"
            v-bind="action.href ? { href: action.href, ...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {}"
            :class="cn(
              'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              action.variant === 'outline'
                ? 'bg-foreground/[0.06] text-foreground hover:bg-accent hover:text-accent-foreground'
                : action.variant === 'secondary'
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  : action.variant === 'ghost'
                    ? 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
            )"
            @click="!action.href && handleAction(action, i)"
          >
            {{ action.label }}
          </component>
        </div>
      </slot>

      <!-- Extra content -->
      <slot />
    </div>
  </section>
</template>
