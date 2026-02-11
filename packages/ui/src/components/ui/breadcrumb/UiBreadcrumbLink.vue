<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiBreadcrumbLink', inheritAttrs: false });

interface UiBreadcrumbLinkProps {
  href?: string;
  as?: string;
}

const props = withDefaults(defineProps<UiBreadcrumbLinkProps>(), {
  href: undefined,
  as: undefined,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const tag = computed(() => props.as ?? (props.href ? 'a' : 'span'));
</script>

<template>
  <component
    :is="tag"
    v-bind="restAttrs"
    :href="href"
    :class="
      cn(
        'text-muted-foreground transition-colors hover:text-foreground',
        attrs.class,
      )
    "
  >
    <slot />
  </component>
</template>
