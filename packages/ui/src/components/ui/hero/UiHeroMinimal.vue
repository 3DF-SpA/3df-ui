<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction, HeroAlign } from './hero-types';

defineOptions({ name: 'UiHeroMinimal', inheritAttrs: false });

interface Props {
  headline?: string;
  description?: string;
  actions?: HeroAction[];
  align?: HeroAlign;
  separator?: boolean;
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  separator: false,
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
    :class="
      cn(
        'relative w-full',
        compact ? 'py-12 md:py-16' : 'py-20 md:py-28',
        separator && 'border-border border-b',
        attrs.class,
      )
    "
  >
    <div :class="cn('mx-auto flex max-w-4xl flex-col gap-5 px-6 lg:px-8', alignClass)">
      <slot name="headline">
        <h1
          v-if="headline"
          class="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {{ headline }}
        </h1>
      </slot>

      <slot name="description">
        <p
          v-if="description"
          :class="
            cn(
              'text-muted-foreground max-w-xl text-base sm:text-lg',
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
          class="mt-2 flex flex-wrap gap-3"
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
                'focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                action.variant === 'outline'
                  ? 'bg-foreground/[0.06] text-foreground hover:bg-accent hover:text-accent-foreground'
                  : action.variant === 'secondary'
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    : action.variant === 'ghost'
                      ? 'text-muted-foreground hover:text-foreground'
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
