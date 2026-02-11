<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTableEmpty', inheritAttrs: false });

interface UiTableEmptyProps {
  colspan?: number;
}

withDefaults(defineProps<UiTableEmptyProps>(), {
  colspan: 1,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn('h-24 text-center text-muted-foreground', attrs.class));
</script>

<template>
  <tr v-bind="restAttrs">
    <td :colspan="colspan" :class="classes">
      <slot>No hay resultados.</slot>
    </td>
  </tr>
</template>
