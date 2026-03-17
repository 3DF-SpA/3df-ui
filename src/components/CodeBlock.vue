<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  code: string;
  language?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  label: '',
});

const copied = ref(false);
let copyTimeout: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    // Fallback for browsers without clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = props.code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    copied.value = true;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => { copied.value = false; }, 2000);
  }
}
</script>

<template>
  <div class="group relative rounded-lg border-ui border-border bg-muted/50 overflow-hidden">
    <div v-if="label" class="flex items-center justify-between border-b-ui border-border px-4 py-2">
      <span class="text-xs font-medium text-muted-foreground">{{ label }}</span>
      <button
        class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        :aria-label="copied ? t('common.copied') : t('common.copy')"
        @click="copy"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        {{ copied ? t('common.copied') : t('common.copy') }}
      </button>
    </div>
    <div v-else class="absolute top-2.5 right-2.5 opacity-0 transition-opacity group-hover:opacity-100">
      <button
        class="inline-flex items-center gap-1 rounded-md border-ui border-border bg-background/90 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        :aria-label="copied ? t('common.copied') : t('common.copy')"
        @click="copy"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-3 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        {{ copied ? t('common.copied') : t('common.copy') }}
      </button>
    </div>
    <pre class="overflow-x-auto p-4 text-xs leading-relaxed text-foreground/90"><code>{{ code }}</code></pre>
  </div>
</template>
