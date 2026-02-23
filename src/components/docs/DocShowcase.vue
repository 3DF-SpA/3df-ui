<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import { cn } from '@3df-spa/ui';
import type { ClassValue } from 'clsx';

import DocCodeBlock from './DocCodeBlock.vue';

defineOptions({ name: 'DocShowcase', inheritAttrs: false });

interface Props {
  title: string;
  description?: string;
  code: string;
}

defineProps<Props>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const showCode = ref(false);
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('border-ui border-border overflow-hidden rounded-lg', attrs.class)"
  >
    <div class="border-border flex items-start justify-between gap-4 border-b px-5 py-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-sm font-semibold">{{ title }}</h2>
        <p v-if="description" class="text-muted-foreground text-sm">
          {{ description }}
        </p>
      </div>
      <button
        :class="
          cn(
            'shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            showCode
              ? 'bg-zinc-900 text-zinc-100'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
          )
        "
        @click="showCode = !showCode"
      >
        {{ showCode ? 'Ocultar' : 'Código' }}
      </button>
    </div>

    <div class="p-5">
      <slot />
    </div>

    <div v-show="showCode" class="border-border border-t">
      <DocCodeBlock :code="code" class="rounded-none" />
    </div>
  </div>
</template>
