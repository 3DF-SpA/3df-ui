<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { uiRoutes, chartRoutes } from '@/router';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import CommandPalette from '@/components/CommandPalette.vue';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMobileTrigger,
  SidebarProvider,
  SidebarTrigger,
} from '@3df/ui';

const { t } = useI18n();

const route = useRoute();
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
  <SidebarProvider class="h-svh overflow-hidden bg-background text-foreground">
    <!-- ─── Sidebar ─── -->
    <Sidebar collapsible="offcanvas">
      <!-- Header: logo + tabs + search -->
      <SidebarHeader class="gap-0 p-0">
        <!-- Logo row -->
        <div class="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <img src="/icons/logo-3df.svg" alt="3DF UI" class="h-12 w-auto rounded-lg" />
          <span class="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            {{ t('layout.playground') }}
          </span>
        </div>

        <!-- Section tabs -->
        <div class="flex border-b border-sidebar-border">
          <button
            :class="[
              'flex-1 py-2 text-xs font-semibold transition-colors',
              activeSection === 'ui'
                ? 'border-b-2 border-primary text-primary'
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground',
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
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground',
            ]"
            @click="activeSection = 'charts'"
          >
            {{ t('layout.charts') }}
          </button>
        </div>

        <!-- Search -->
        <div class="border-b border-sidebar-border px-3 py-2">
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-sidebar-foreground/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              :placeholder="t('layout.search')"
              class="h-8 w-full rounded-md border border-sidebar-border bg-sidebar pl-8 pr-3 text-xs text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus-visible:outline-2 focus-visible:outline-ring"
            />
          </div>
        </div>
      </SidebarHeader>

      <!-- Content: nav groups -->
      <SidebarContent>
        <!-- UI section -->
        <template v-if="activeSection === 'ui'">
          <SidebarGroup v-for="group in filteredUiGroups" :key="group.label">
            <SidebarGroupLabel>
              {{ t('groups.' + group.label, group.label) }}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem v-for="item in group.items" :key="item.path">
                  <SidebarMenuButton
                    :as="RouterLink"
                    :to="item.fullPath"
                    :is-active="isActive(item.fullPath)"
                    size="sm"
                  >
                    <span>{{ item.name }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <p
            v-if="filteredUiGroups.length === 0"
            class="px-3 py-4 text-center text-xs text-sidebar-foreground/50"
          >
            {{ t('layout.noResults') }}
          </p>
        </template>

        <!-- Charts section -->
        <template v-else>
          <SidebarGroup v-for="group in filteredChartGroups" :key="group.label">
            <SidebarGroupLabel>
              {{ t('groups.' + group.label, group.label) }}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem v-for="item in group.items" :key="item.path">
                  <SidebarMenuButton
                    :as="RouterLink"
                    :to="item.fullPath"
                    :is-active="isActive(item.fullPath)"
                    size="sm"
                  >
                    <span>{{ item.name }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <p
            v-if="filteredChartGroups.length === 0"
            class="px-3 py-4 text-center text-xs text-sidebar-foreground/50"
          >
            {{ t('layout.noResults') }}
          </p>
        </template>
      </SidebarContent>
    </Sidebar>

    <!-- ─── Main area ─── -->
    <SidebarInset class="overflow-hidden">
      <!-- Toolbar -->
      <header class="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
        <!-- Desktop toggle -->
        <SidebarTrigger />

        <!-- Mobile hamburger -->
        <SidebarMobileTrigger />

        <!-- Current route name -->
        <span class="text-sm font-medium">{{ $route.name }}</span>

        <!-- Command palette trigger -->
        <button
          class="hidden sm:inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          @click="commandOpen = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Buscar componente...</span>
          <kbd class="pointer-events-none ml-1 hidden select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground opacity-100 sm:inline-flex">
            <span class="text-[11px]">⌘</span>K
          </kbd>
        </button>

        <div class="flex-1" />

        <LocaleSwitcher />
        <ThemeSwitcher />

        <span class="text-xs text-muted-foreground">@3df-spa/ui</span>
      </header>

      <!-- Page content -->
      <div class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-5xl p-8">
          <RouterView />
        </div>
      </div>
    </SidebarInset>

    <CommandPalette v-model:open="commandOpen" />
  </SidebarProvider>
</template>
