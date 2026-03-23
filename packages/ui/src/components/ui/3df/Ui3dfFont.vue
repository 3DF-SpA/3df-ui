<script setup lang="ts">
import { use3dfConfig } from './use-3df-config';
import { FONT_OPTIONS } from './font-options';

defineOptions({ name: 'Ui3dfFont', inheritAttrs: false });

const { config } = use3dfConfig();

function selectFont(id: string): void {
  config.value.fontId = id;
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-xs font-medium text-muted-foreground">Tipografía</span>
    <div class="grid grid-cols-2 gap-1.5">
      <button
        v-for="font in FONT_OPTIONS"
        :key="font.id"
        :aria-label="font.label"
        :aria-pressed="config.fontId === font.id"
        :style="{ fontFamily: font.stack }"
        :class="[
          'relative flex items-center justify-center rounded-md border px-3 py-2.5 text-xs font-medium transition-colors',
          config.fontId === font.id
            ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary/30'
            : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground',
        ]"
        @click="selectFont(font.id)"
      >
        <svg
          v-if="config.fontId === font.id"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute right-1 top-1 size-2.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        {{ font.label }}
      </button>
    </div>
  </div>
</template>
