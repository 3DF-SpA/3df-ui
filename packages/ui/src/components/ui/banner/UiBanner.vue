<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue';
import type { ClassValue } from 'clsx';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { bannerVariants } from './banner-variants';

defineOptions({ name: 'UiBanner', inheritAttrs: false });

type BannerVariantProps = VariantProps<typeof bannerVariants>;

interface Props {
  variant?: NonNullable<BannerVariantProps>['variant'];
  position?: NonNullable<BannerVariantProps>['position'];
  align?: NonNullable<BannerVariantProps>['align'];
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  position: 'static',
  align: 'center',
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const slots = useSlots();

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const visible = ref(true);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>

<template>
  <div
    v-if="visible"
    v-bind="restAttrs"
    role="banner"
    :class="
      cn(
        bannerVariants({ variant: props.variant, position: props.position, align: props.align }),
        attrs.class,
      )
    "
  >
    <!-- Icon slot -->
    <span v-if="slots.icon" class="flex shrink-0 items-center">
      <slot name="icon" />
    </span>

    <!-- Content -->
    <div class="flex min-w-0 flex-1 items-center gap-2">
      <slot />
    </div>

    <!-- Action slot -->
    <div v-if="slots.action" class="flex shrink-0 items-center">
      <slot name="action" />
    </div>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      type="button"
      class="ml-2 inline-flex shrink-0 items-center justify-center rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current/30"
      aria-label="Cerrar"
      @click="dismiss"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>
