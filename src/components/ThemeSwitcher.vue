<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme, THEMES, type ThemeDefinition } from '@/composables/useTheme';

const { currentTheme, setTheme } = useTheme();
const isOpen = ref(false);

const activeTheme = computed<ThemeDefinition>(() => THEMES.find((t) => t.id === currentTheme.value) ?? THEMES[0]!);

const families = computed(() => {
  const map = new Map<string, typeof THEMES>();
  for (const t of THEMES) {
    if (!map.has(t.family)) map.set(t.family, []);
    map.get(t.family)!.push(t);
  }
  return Array.from(map.entries()).map(([family, themes]) => ({ family, themes }));
});

function select(id: typeof currentTheme.value) {
  setTheme(id);
  isOpen.value = false;
}
</script>

<template>
  <div class="relative">
    <button
      class="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
    >
      <span
        class="inline-block size-3 rounded-full border border-border/50 shadow-xs"
        :style="{ background: activeTheme.preview.primary }"
        aria-hidden="true"
      />
      <span class="hidden sm:inline">{{ activeTheme.label }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-3 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-border bg-popover p-2 shadow-lg"
      role="listbox"
      :aria-label="'Seleccionar tema'"
    >
      <div v-for="{ family, themes } in families" :key="family" class="mb-2 last:mb-0">
        <p class="mb-1 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {{ family }}
        </p>
        <div class="grid grid-cols-2 gap-1">
          <button
            v-for="theme in themes"
            :key="theme.id"
            role="option"
            :aria-selected="currentTheme === theme.id"
            :class="[
              'flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors',
              currentTheme === theme.id
                ? 'bg-primary/10 font-medium text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            ]"
            @click="select(theme.id)"
          >
            <span
              class="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-border/50"
              :style="{ background: theme.preview.bg }"
              aria-hidden="true"
            >
              <span
                class="size-2.5 rounded-full"
                :style="{ background: theme.preview.primary }"
              />
            </span>
            <span class="truncate">{{ theme.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- click outside -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      aria-hidden="true"
      @click="isOpen = false"
    />
  </div>
</template>
