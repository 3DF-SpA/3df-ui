<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import { cn } from '@3df/ui';
import type { ClassValue } from 'clsx';

import { useHighlighter } from '@/composables/useHighlighter';

const { t } = useI18n();

defineOptions({ name: 'DocCodeBlock', inheritAttrs: false });

interface Props {
  code: string;
  language?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const { highlight, isReady } = useHighlighter();

const renderedHtml = computed(() => highlight(props.code, props.language));

const copied = ref(false);

function copyCode() {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div v-bind="restAttrs" :class="cn('relative rounded-lg bg-zinc-950 text-sm', attrs.class)">
    <button
      :class="
        cn(
          'absolute top-2 right-2 z-10 rounded-md px-2 py-1 text-xs font-medium transition-colors',
          copied
            ? 'bg-green-600/20 text-green-400'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300',
        )
      "
      @click="copyCode"
    >
      {{ copied ? t('common.copied') : t('common.copy') }}
    </button>

    <div
      v-if="isReady"
      class="overflow-x-auto p-4 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
      v-html="renderedHtml"
    />
    <pre v-else class="overflow-x-auto p-4 text-zinc-300"><code>{{ code }}</code></pre>
  </div>
</template>
