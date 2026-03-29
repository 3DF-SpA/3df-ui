<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme, INLINE_PRESETS } from '@/composables/useTheme';

const { currentMode, currentPreset, setMode, setPreset } = useTheme();
const isOpen = ref(false);

const activePreset = computed(() => INLINE_PRESETS.find(p => p.id === currentPreset.value) ?? INLINE_PRESETS[0]!);
const activePreview = computed(() =>
  currentMode.value === 'dark' || currentMode.value === '3df' ? activePreset.value.previewDark : activePreset.value.preview
);
</script>

<template>
  <div class="relative">
    <!-- Trigger -->
    <button
      class="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="flex items-center gap-0.5">
        <span class="size-3 rounded-full border border-border/30" :style="{ background: activePreview[0] }" />
        <span class="size-2.5 rounded-full" :style="{ background: activePreview[1] }" />
        <span class="size-2 rounded-full" :style="{ background: activePreview[2] }" />
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="size-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <!-- Panel -->
    <div
      v-if="isOpen"
      class="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-border bg-popover p-3 shadow-lg"
    >
      <!-- Base mode toggle -->
      <p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Color base</p>
      <div class="mb-3 flex gap-1.5">
        <!-- Light -->
        <button
          :class="[
            'inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border py-1.5 text-xs font-medium transition-colors',
            currentMode === 'light'
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground',
          ]"
          @click="setMode('light')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
          Light
        </button>
        <!-- Dark -->
        <button
          :class="[
            'inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border py-1.5 text-xs font-medium transition-colors',
            currentMode === 'dark'
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground',
          ]"
          @click="setMode('dark')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
          Dark
        </button>
        <!-- 3DF -->
        <button
          :class="[
            'inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border py-1.5 text-xs font-medium transition-colors',
            currentMode === '3df'
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border text-muted-foreground hover:bg-accent hover:text-foreground',
          ]"
          @click="setMode('3df')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
          3DF
        </button>
      </div>

      <div class="mb-2 border-t border-border" />

      <!-- Presets grid -->
      <p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Theme Presets</p>
      <div class="grid grid-cols-4 gap-1.5">
        <button
          v-for="preset in INLINE_PRESETS"
          :key="preset.id"
          :aria-label="preset.label"
          :aria-pressed="currentPreset === preset.id"
          :class="[
            'relative flex h-10 items-center justify-center gap-0.5 rounded-md border px-2 transition-colors',
            currentPreset === preset.id
              ? 'border-primary ring-1 ring-primary/30 bg-primary/5'
              : 'border-border hover:border-primary/40 hover:bg-accent',
          ]"
          @click="setPreset(preset.id)"
        >
          <svg
            v-if="currentPreset === preset.id"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute right-1 top-1 size-2.5 text-primary"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
          >
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          <span
            class="size-3 rounded-full shrink-0 border border-border/20"
            :style="{ background: currentMode === 'dark' ? preset.previewDark[0] : preset.preview[0] }"
          />
          <span
            class="size-2.5 rounded-full shrink-0"
            :style="{ background: currentMode === 'dark' ? preset.previewDark[1] : preset.preview[1] }"
          />
          <span
            class="size-2 rounded-full shrink-0"
            :style="{ background: currentMode === 'dark' ? preset.previewDark[2] : preset.preview[2] }"
          />
        </button>
      </div>
    </div>

    <!-- overlay click-outside -->
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false" />
  </div>
</template>
