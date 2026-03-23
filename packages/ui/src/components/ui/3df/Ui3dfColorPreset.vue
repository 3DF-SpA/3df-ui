<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { use3dfConfig } from './use-3df-config';
import { COLOR_PRESETS } from './color-presets';

defineOptions({ name: 'Ui3dfColorPreset', inheritAttrs: false });

const { config } = use3dfConfig();

const isDark = ref(false);
let observer: MutationObserver | null = null;

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
  observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark');
  });
  observer.observe(document.documentElement, { attributeFilter: ['class'] });
});

onUnmounted(() => observer?.disconnect());

function selectPreset(id: string): void {
  config.value.colorPreset = id;
}

const currentSwatches = computed(() =>
  COLOR_PRESETS.map(p => ({
    ...p,
    colors: isDark.value ? p.previewDark : p.preview,
  }))
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-xs font-medium text-muted-foreground">Color</span>
    <div class="grid grid-cols-3 gap-1.5">
      <button
        v-for="preset in currentSwatches"
        :key="preset.id"
        :aria-label="preset.label"
        :aria-pressed="config.colorPreset === preset.id"
        :class="[
          'relative flex flex-col items-center gap-1.5 rounded-md border px-2 py-2.5 text-[10px] font-medium transition-colors',
          config.colorPreset === preset.id
            ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary/30'
            : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground',
        ]"
        @click="selectPreset(preset.id)"
      >
        <svg
          v-if="config.colorPreset === preset.id"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute right-1 top-1 size-2.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span class="flex items-center gap-0.5">
          <span
            class="size-3 shrink-0 rounded-full border border-border/20"
            :style="{ background: preset.colors[0] }"
          />
          <span
            class="size-2.5 shrink-0 rounded-full"
            :style="{ background: preset.colors[1] }"
          />
          <span
            class="size-2 shrink-0 rounded-full"
            :style="{ background: preset.colors[2] }"
          />
        </span>
        {{ preset.label }}
      </button>
    </div>
  </div>
</template>
