<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { HeroAction } from './hero-types';

defineOptions({ name: 'UiHeroSplit', inheritAttrs: false });

interface Props {
  headline?: string;
  description?: string;
  actions?: HeroAction[];
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  compact?: boolean;
}

const _props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  reverse: false,
  compact: false,
});

defineSlots<{
  default?: () => unknown;
  headline?: () => unknown;
  description?: () => unknown;
  actions?: () => unknown;
  media?: () => unknown;
}>();

const emit = defineEmits<{
  action: [action: HeroAction, index: number];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

function handleAction(action: HeroAction, index: number) {
  emit('action', action, index);
}
</script>

<template>
  <section
    v-bind="restAttrs"
    :class="cn('relative w-full', compact ? 'py-16 md:py-20' : 'py-24 md:py-32', attrs.class)"
  >
    <div
      :class="
        cn(
          'mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8',
          reverse && 'lg:[direction:rtl]',
        )
      "
    >
      <div :class="cn('flex flex-col gap-6', reverse && 'lg:[direction:ltr]')">
        <slot name="headline">
          <h1 v-if="headline" class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            {{ headline }}
          </h1>
        </slot>

        <slot name="description">
          <p v-if="description" class="text-muted-foreground max-w-xl text-lg">
            {{ description }}
          </p>
        </slot>

        <slot name="actions">
          <div v-if="actions?.length" class="mt-2 flex flex-wrap gap-4">
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
                    ? 'bg-foreground/[0.06] text-foreground hover:bg-accent hover:text-accent-foreground'
                    : action.variant === 'secondary'
                      ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      : action.variant === 'ghost'
                        ? 'text-foreground hover:bg-accent hover:text-accent-foreground'
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

      <div :class="cn('relative', reverse && 'lg:[direction:ltr]')">
        <slot name="media">
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt"
            loading="lazy"
            class="ring-border/10 w-full rounded-xl object-cover shadow-2xl ring-1"
          />
        </slot>
      </div>
    </div>
  </section>
</template>
