<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { uiRoutes, chartRoutes } from '@/router';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import CommandPalette from '@/components/CommandPalette.vue';
import {
  Sheet,
  SheetContent,
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
  SidebarProvider,
} from '@3df/ui';

const { t } = useI18n();

const route = useRoute();
const searchQuery = ref('');
const commandOpen = ref(false);
const mobileNavOpen = ref(false);

watch(() => route.path, () => {
  mobileNavOpen.value = false;
});

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
    <!-- ─── Sidebar (oculto en tablet/mobile) ─── -->
    <Sidebar class="hidden lg:flex">
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
      </SidebarHeader>

      <!-- Content: nav groups -->
      <SidebarContent>
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
      <header class="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <!-- Hamburger — solo mobile/tablet -->
        <button
          class="flex lg:hidden items-center justify-center rounded-md p-1.5 text-foreground transition-colors hover:bg-accent"
          aria-label="Abrir menú"
          @click="mobileNavOpen = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        <!-- Current route name -->
        <span class="text-sm font-medium">{{ $route.name }}</span>

        <div class="flex-1" />

        <!-- Search — junto al locale switcher -->
        <div class="relative hidden sm:flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground"
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
            class="h-8 w-44 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring lg:w-56"
          />
        </div>

        <LocaleSwitcher />
        <ThemeSwitcher />

        <span class="hidden md:inline text-xs text-muted-foreground">@3df-spa/ui</span>
      </header>

      <!-- Page content -->
      <div class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-5xl p-8">
          <RouterView />
        </div>
      </div>
    </SidebarInset>

    <!-- ─── Menú mobile (Sheet) ─── -->
    <Sheet v-model:open="mobileNavOpen">
      <SheetContent side="left" class="w-72 p-0 flex flex-col" :show-close="false">
        <!-- Header -->
        <div class="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <img src="/icons/logo-3df.svg" alt="3DF UI" class="h-10 w-auto rounded-lg" />
          <span class="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            {{ t('layout.playground') }}
          </span>
          <div class="flex-1" />
          <button
            class="rounded-md p-1.5 text-foreground transition-colors hover:bg-accent"
            aria-label="Cerrar menú"
            @click="mobileNavOpen = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <!-- Section tabs -->
        <div class="flex shrink-0 border-b border-border">
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

        <!-- Search (visible en mobile dentro del sheet) -->
        <div class="shrink-0 border-b border-border px-3 py-2 sm:hidden">
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60"
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
              class="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </div>
        </div>

        <!-- Nav items -->
        <div class="flex-1 overflow-y-auto py-2">
          <template v-if="activeSection === 'ui'">
            <div v-for="group in filteredUiGroups" :key="group.label" class="mb-2">
              <p class="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {{ t('groups.' + group.label, group.label) }}
              </p>
              <RouterLink
                v-for="item in group.items"
                :key="item.path"
                :to="item.fullPath"
                :class="[
                  'flex items-center px-4 py-1.5 text-sm transition-colors',
                  isActive(item.fullPath)
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-foreground hover:bg-accent',
                ]"
              >
                {{ item.name }}
              </RouterLink>
            </div>
            <p
              v-if="filteredUiGroups.length === 0"
              class="px-4 py-4 text-center text-xs text-muted-foreground"
            >
              {{ t('layout.noResults') }}
            </p>
          </template>

          <template v-else>
            <div v-for="group in filteredChartGroups" :key="group.label" class="mb-2">
              <p class="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {{ t('groups.' + group.label, group.label) }}
              </p>
              <RouterLink
                v-for="item in group.items"
                :key="item.path"
                :to="item.fullPath"
                :class="[
                  'flex items-center px-4 py-1.5 text-sm transition-colors',
                  isActive(item.fullPath)
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-foreground hover:bg-accent',
                ]"
              >
                {{ item.name }}
              </RouterLink>
            </div>
            <p
              v-if="filteredChartGroups.length === 0"
              class="px-4 py-4 text-center text-xs text-muted-foreground"
            >
              {{ t('layout.noResults') }}
            </p>
          </template>
        </div>
      </SheetContent>
    </Sheet>

    <CommandPalette v-model:open="commandOpen" />
  </SidebarProvider>
</template>
