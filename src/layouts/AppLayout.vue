<script setup lang="ts">
import { computed, ref, watch, shallowRef, markRaw, type Component } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { uiRoutes, chartRoutes } from '@/router';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import {
  CommandPalette,
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
  type CommandPaletteGroup,
  type CommandPaletteItem,
} from '@3df/ui';

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const commandOpen = ref(false);
const mobileNavOpen = ref(false);

watch(() => route.path, () => {
  mobileNavOpen.value = false;
});

// ── CommandPalette logic ──────────────────────────────────────────────────────

type RouteFactory = () => Promise<{ default: Component }>

const componentMap = new Map<string, RouteFactory>()
uiRoutes.forEach((r) => {
  if (r.component && typeof r.component === 'function') {
    componentMap.set(`/ui/${r.path}`, r.component as RouteFactory)
  }
})
chartRoutes.forEach((r) => {
  if (r.component && typeof r.component === 'function') {
    componentMap.set(`/charts/${r.path}`, r.component as RouteFactory)
  }
})

const groupIconMap: Record<string, string> = {
  General:     'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
  Layout:      'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  Formularios: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM8 13h8M8 17h5M14 2v6h6',
  Navegación:  'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  Charts:      'M18 20V10M12 20V4M6 20v-6',
  Feedback:    'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  Overlay:     'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  Data:        'M12 2C6.48 2 2 4.69 2 8s4.48 6 10 6 10-2.69 10-6-4.48-6-10-6zM2 8v4c0 3.31 4.48 6 10 6s10-2.69 10-6V8M2 12v4c0 3.31 4.48 6 10 6s10-2.69 10-6v-4',
  Media:       'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10.5 7H5l4-5 3 3.5 3-2.5 4 4z',
  Other:       'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
}

function buildGroups(routes: typeof uiRoutes, prefix: string): CommandPaletteGroup[] {
  const map = new Map<string, CommandPaletteItem[]>()
  for (const r of routes) {
    const group = (r.meta?.group as string) ?? 'Other'
    if (!map.has(group)) map.set(group, [])
    map.get(group)!.push({
      value: `${prefix}/${r.path}`,
      label: r.name as string,
      group,
    })
  }
  return Array.from(map.entries()).map(([label, items]) => ({
    label,
    icon: groupIconMap[label] ?? groupIconMap['Other']!,
    items,
  }))
}

const paletteGroups = computed<CommandPaletteGroup[]>(() => [
  ...buildGroups(uiRoutes, '/ui'),
  ...buildGroups(chartRoutes, '/charts'),
])

const previewComponent = shallowRef<Component | null>(null)
const currentItem = ref<CommandPaletteItem | null>(null)

async function loadPreview(item: CommandPaletteItem | null) {
  currentItem.value = item
  if (!item) { previewComponent.value = null; return }
  const factory = componentMap.get(item.value)
  if (factory) {
    try {
      const mod = await factory()
      previewComponent.value = markRaw(mod.default)
    } catch {
      previewComponent.value = null
    }
  } else {
    previewComponent.value = null
  }
}

function onPaletteSelect(item: CommandPaletteItem) {
  router.push(item.value)
}

function onPaletteOpenChange(val: boolean) {
  commandOpen.value = val
  if (!val) {
    previewComponent.value = null
    currentItem.value = null
  }
}

// ── Sidebar nav logic ─────────────────────────────────────────────────────────

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

        <!-- Search — abre el command palette -->
        <button
          class="relative hidden sm:flex h-8 w-44 items-center gap-2 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-muted-foreground transition-colors hover:bg-accent lg:w-56"
          @click="commandOpen = true"
        >
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
          <span class="flex-1 text-left">{{ t('layout.search') }}</span>
          <kbd class="pointer-events-none hidden select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            <span class="text-[11px]">⌘</span>K
          </kbd>
        </button>

        <RouterLink
          to="/demo"
          class="hidden sm:flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          Demo
        </RouterLink>

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

    <CommandPalette
      :open="commandOpen"
      :groups="paletteGroups"
      search-placeholder="Buscar componente..."
      @update:open="onPaletteOpenChange"
      @update:selected="loadPreview"
      @select="onPaletteSelect"
    >
      <template #preview="{ item, close }">
        <template v-if="previewComponent && item">
          <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-background/60 backdrop-blur-sm shrink-0">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-sm">{{ item.label }}</span>
              <span class="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                {{ (item as any).group }}
              </span>
            </div>
            <div class="flex items-center gap-3">
              <button
                class="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                @click="onPaletteSelect(item); close()"
              >
                Abrir
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </button>
              <button class="rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-auto p-6">
            <Transition name="preview" mode="out-in">
              <component :is="previewComponent" :key="item.value" />
            </Transition>
          </div>
        </template>
        <div v-else class="flex h-full flex-col items-center justify-center gap-3 text-center px-8 relative">
          <button class="absolute top-2 right-2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity" @click="close">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
          <div class="rounded-full bg-muted p-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6 text-muted-foreground">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium">Selecciona un componente</p>
            <p class="text-xs text-muted-foreground/60 mt-1">Usa el buscador o navega por grupos</p>
          </div>
        </div>
      </template>
    </CommandPalette>
  </SidebarProvider>
</template>

<style scoped>
.preview-enter-active,
.preview-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.preview-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.preview-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
