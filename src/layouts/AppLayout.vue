<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { uiRoutes, chartRoutes } from '@/router';

const route = useRoute();
const sidebarOpen = ref(true);


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
    const group = (r.meta?.group as string) ?? 'Otros';
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push({
      path: r.path,
      name: r.name as string,
      fullPath: `${prefix}/${r.path}`,
    });
  }
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
}

const uiGroups = computed(() => groupRoutes(uiRoutes, '/ui'));
const chartGroups = computed(() => groupRoutes(chartRoutes, '/charts'));

const activeSection = ref<'ui' | 'charts'>(route.path.startsWith('/charts') ? 'charts' : 'ui');

function isActive(fullPath: string) {
  return route.path === fullPath;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground">
    
    <aside
      :class="[
        'flex h-full shrink-0 flex-col border-r border-border bg-muted/50 transition-[width] duration-200',
        sidebarOpen ? 'w-60' : 'w-0 overflow-hidden border-r-0',
      ]"
    >
      
      <div class="flex h-14 items-center gap-2 border-b border-border px-4">
        <span class="text-sm font-bold tracking-tight">3DF UI</span>
        <span class="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
          Playground
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
          Componentes
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
          Charts
        </button>
      </div>

      
      <nav class="flex-1 overflow-y-auto px-3 py-3">
        <template v-if="activeSection === 'ui'">
          <div v-for="group in uiGroups" :key="group.label" class="mb-4">
            <h3 class="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {{ group.label }}
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
        </template>

        <template v-else>
          <div v-for="group in chartGroups" :key="group.label" class="mb-4">
            <h3 class="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {{ group.label }}
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

        <div class="flex-1" />

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
  </div>
</template>
