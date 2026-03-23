<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { uiRoutes, chartRoutes } from '@/router';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import CommandPalette from '@/components/CommandPalette.vue';
const { t } = useI18n();

const route = useRoute();
const sidebarOpen = ref(true);
const searchQuery = ref('');
const commandOpen = ref(false);

interface NavItem {
  path: string;
  name: string;
  fullPath: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

function groupRoutes(routes: typeof uiRoutes, prefix: string): NavGroup[] {
  const map = new Map<string, NavItem[]>();
  for (const r of routes) {
    const group = (r.meta?.group as string) ?? 'other';
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push({
      path: r.path,
      name: r.name as string,
      fullPath: `${prefix}/${r.path}`,
    });
  }
  return Array.from(map.entries()).map(([label, items]) => ({
    label,
    items: items.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

const uiGroups = computed(() => groupRoutes(uiRoutes, '/ui'));
const chartGroups = computed(() => groupRoutes(chartRoutes, '/charts'));

const filteredUiGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return uiGroups.value;
  return uiGroups.value
    .map(group => ({
      label: group.label,
      items: group.items.filter(item => item.name.toLowerCase().includes(q)),
    }))
    .filter(group => group.items.length > 0);
});

const filteredChartGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return chartGroups.value;
  return chartGroups.value
    .map(group => ({
      label: group.label,
      items: group.items.filter(item => item.name.toLowerCase().includes(q)),
    }))
    .filter(group => group.items.length > 0);
});

const activeSection = ref<'ui' | 'charts'>(route.path.startsWith('/charts') ? 'charts' : 'ui');

function isActive(fullPath: string) {
  return route.path === fullPath;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground">
    
    <aside
      :class="[
        'flex h-full shrink-0 flex-col border-r-ui border-border bg-muted/50 transition-[width] duration-200',
        sidebarOpen ? 'w-60' : 'w-0 overflow-hidden border-r-0',
      ]"
    >
      
      <div class="flex h-14 items-center gap-2 border-b border-border px-4">
        <span class="text-sm font-bold tracking-tight">3DF UI</span>
        <span class="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
          {{ t('layout.playground') }}
        </span>
      </div>

      
      <div class="flex border-b border-border">
        <button
          :class="[
            'flex-1 py-2 text-xs font-semibold transition-colors',
            activeSection === 'ui'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="activeSection = 'ui'"
        >
          {{ t('layout.components') }}
        </button>
        <button
          :class="[
            'flex-1 py-2 text-xs font-semibold transition-colors',
            activeSection === 'charts'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="activeSection = 'charts'"
        >
          {{ t('layout.charts') }}
        </button>
      </div>

      
      <div class="border-b border-border px-3 py-2">
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('layout.search')"
            class="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>
      </div>

      
      <nav class="flex-1 overflow-y-auto px-3 py-3">
        <template v-if="activeSection === 'ui'">
          <div v-for="group in filteredUiGroups" :key="group.label" class="mb-4">
            <h3 class="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {{ t('groups.' + group.label, group.label) }}
            </h3>
            <ul class="space-y-0.5">
              <li v-for="item in group.items" :key="item.path">
                <RouterLink
                  :to="item.fullPath"
                  :class="[
                    'block rounded-md px-2 py-1.5 text-[13px] transition-colors',
                    isActive(item.fullPath)
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  ]"
                >
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <p v-if="filteredUiGroups.length === 0 && activeSection === 'ui'" class="px-3 py-4 text-xs text-muted-foreground text-center">
            {{ t('layout.noResults') }}
          </p>
        </template>

        <template v-else>
          <div v-for="group in filteredChartGroups" :key="group.label" class="mb-4">
            <h3 class="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {{ t('groups.' + group.label, group.label) }}
            </h3>
            <ul class="space-y-0.5">
              <li v-for="item in group.items" :key="item.path">
                <RouterLink
                  :to="item.fullPath"
                  :class="[
                    'block rounded-md px-2 py-1.5 text-[13px] transition-colors',
                    isActive(item.fullPath)
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  ]"
                >
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <p v-if="filteredChartGroups.length === 0 && activeSection === 'charts'" class="px-3 py-4 text-xs text-muted-foreground text-center">
            {{ t('layout.noResults') }}
          </p>
        </template>
      </nav>
    </aside>

    
    <div class="flex flex-1 flex-col overflow-hidden">
      
      <header class="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
        <button
          class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </button>

        <span class="text-sm font-medium">
          {{ $route.name }}
        </span>

        <button
          class="hidden sm:inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click="commandOpen = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Buscar componente...</span>
          <kbd class="pointer-events-none ml-1 hidden select-none rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground opacity-100 sm:inline-flex items-center gap-0.5">
            <span class="text-[11px]">⌘</span>K
          </kbd>
        </button>

        <div class="flex-1" />

        <LocaleSwitcher />
        <ThemeSwitcher />

        <span class="text-xs text-muted-foreground">
          @3df-spa/ui
        </span>
      </header>

      
      <main class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-5xl p-8">
          <RouterView />
        </div>
      </main>
    </div>

    <CommandPalette v-model:open="commandOpen" />
  </div>
</template>
