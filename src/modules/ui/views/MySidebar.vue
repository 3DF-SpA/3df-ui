<script setup lang="ts">
import { ref } from 'vue';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@3df-spa/ui';

/* Estado activo */
const activeItem = ref('Dashboard');
const activeSubItem = ref('');

/* Sub-menú abierto */
const projectsOpen = ref(true);
const settingsOpen = ref(false);

/* ─ Icon paths ─ */
const icons = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  folder: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  calendar: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  inbox: 'M22 12h-6l-2 3H10l-2-3H2 M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01',
  sparkles: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z',
  plus: 'M12 5v14 M5 12h14',
  chevron: 'M9 18l6-6-6-6',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
  search: 'M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z M16 16l4.5 4.5',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
} as const;

type IconName = keyof typeof icons;

interface NavItem {
  label: string;
  icon: IconName;
  badge?: number;
  children?: { label: string }[];
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', icon: 'home' },
  {
    label: 'Proyectos',
    icon: 'folder',
    badge: 12,
    children: [
      { label: 'Todos los proyectos' },
      { label: 'Recientes' },
      { label: 'Archivados' },
    ],
  },
  { label: 'Equipo', icon: 'users', badge: 3 },
  { label: 'Bandeja', icon: 'inbox', badge: 28 },
  { label: 'Calendario', icon: 'calendar' },
  {
    label: 'Configuración',
    icon: 'settings',
    children: [
      { label: 'General' },
      { label: 'Seguridad' },
      { label: 'Notificaciones' },
      { label: 'Integraciones' },
    ],
  },
];

const secondaryNav: { label: string; icon: IconName }[] = [
  { label: 'Documentación', icon: 'book' },
  { label: 'Soporte', icon: 'help' },
  { label: 'Novedades', icon: 'sparkles' },
];

function handleSubClick(parentLabel: string, childLabel: string) {
  activeItem.value = parentLabel;
  activeSubItem.value = childLabel;
}

function toggleSubMenu(item: NavItem) {
  if (item.label === 'Proyectos') projectsOpen.value = !projectsOpen.value;
  if (item.label === 'Configuración') settingsOpen.value = !settingsOpen.value;
  activeItem.value = item.label;
}

function isSubOpen(item: NavItem): boolean {
  if (item.label === 'Proyectos') return projectsOpen.value;
  if (item.label === 'Configuración') return settingsOpen.value;
  return false;
}
</script>

<template>
  <div class="flex flex-col gap-16 p-8">
    <h1 class="text-3xl font-bold">Sidebar</h1>

    <!-- ═══════════════════════════════════════════════════
         1. Sidebar completo — sub-menús, badges, actions, skeleton
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        1 · Sidebar completo — sub-menús, badges, actions
      </h2>
      <p class="max-w-prose text-sm text-muted-foreground">
        Demuestra sub-menús colapsables, badges de conteo, action buttons y
        skeleton de carga. Atajo: <kbd class="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono">Ctrl+B</kbd>
      </p>

      <div class="overflow-hidden rounded-lg border border-border" style="height: 560px; contain: paint">
        <SidebarProvider :default-open="true" side="left" collapsible="offcanvas">
          <Sidebar>
            <SidebarHeader>
              <div class="flex items-center gap-2 px-1">
                <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">3D</div>
                <div class="flex flex-col text-sm leading-tight">
                  <span class="font-semibold truncate">3DF Space</span>
                  <span class="text-[10px] text-sidebar-foreground/50">Workspace</span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <!-- Búsqueda rápida -->
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton class="text-sidebar-foreground/50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons.search.split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                        <span>Buscar…</span>
                        <kbd class="ml-auto rounded border border-sidebar-border/60 bg-sidebar-accent/50 px-1.5 py-0.5 text-[10px] font-mono text-sidebar-foreground/40">⌘K</kbd>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <!-- Nav principal -->
              <SidebarGroup>
                <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in mainNav" :key="item.label">
                      <!-- Botón principal -->
                      <SidebarMenuButton
                        :is-active="activeItem === item.label"
                        :tooltip="item.label"
                        @click="item.children ? toggleSubMenu(item) : (activeItem = item.label)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons[item.icon].split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                        <span>{{ item.label }}</span>

                        <!-- Chevron para items con hijos -->
                        <svg
                          v-if="item.children"
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-auto size-4 shrink-0 transition-transform duration-200"
                          :class="isSubOpen(item) && 'rotate-90'"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </SidebarMenuButton>

                      <!-- Badge -->
                      <SidebarMenuBadge v-if="item.badge && !item.children">
                        {{ item.badge }}
                      </SidebarMenuBadge>

                      <!-- Action button (+ para Proyectos) -->
                      <SidebarMenuAction
                        v-if="item.label === 'Proyectos'"
                        show-on-hover
                        title="Crear proyecto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons.plus.split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                      </SidebarMenuAction>

                      <!-- Sub-menú -->
                      <SidebarMenuSub v-if="item.children" :open="isSubOpen(item)">
                        <SidebarMenuSubItem v-for="child in item.children" :key="child.label">
                          <SidebarMenuSubButton
                            :is-active="activeSubItem === child.label"
                            @click="handleSubClick(item.label, child.label)"
                          >
                            <span>{{ child.label }}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />

              <!-- Recursos -->
              <SidebarGroup>
                <SidebarGroupLabel>Recursos</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in secondaryNav" :key="item.label">
                      <SidebarMenuButton :tooltip="item.label">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons[item.icon].split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                        <span>{{ item.label }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <div class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-xs font-bold">NC</div>
                    <div class="flex flex-col text-xs leading-tight">
                      <span class="font-medium">Nicolás C.</span>
                      <span class="text-sidebar-foreground/50">admin@3df.space</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto size-4 text-sidebar-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path v-for="(d, i) in icons.logout.split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                    </svg>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <header class="flex h-12 items-center gap-2 border-b border-border px-4">
              <SidebarTrigger />
              <span class="text-sm font-medium">{{ activeItem }}</span>
              <span v-if="activeSubItem" class="text-sm text-muted-foreground">/ {{ activeSubItem }}</span>
            </header>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">Sub-menús colapsables con animación, badges de conteo, y action buttons que aparecen al hover.</p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         2. Sidebar derecho
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        2 · Sidebar derecho — panel de propiedades
      </h2>

      <div class="overflow-hidden rounded-lg border border-border" style="height: 420px; contain: paint">
        <SidebarProvider :default-open="true" side="right" collapsible="offcanvas">
          <SidebarInset>
            <header class="flex h-12 items-center justify-between border-b border-border px-4">
              <span class="text-sm font-medium">Panel principal</span>
              <SidebarTrigger />
            </header>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">Sidebar posicionado a la derecha. Útil para paneles de propiedades, detalle o inspectores.</p>
            </div>
          </SidebarInset>

          <Sidebar side="right">
            <SidebarHeader>
              <span class="text-sm font-semibold">Inspector</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Detalles</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in ['Información', 'Historial', 'Adjuntos', 'Comentarios']" :key="item">
                      <SidebarMenuButton>
                        <span>{{ item }}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge v-if="item === 'Comentarios'">5</SidebarMenuBadge>
                      <SidebarMenuBadge v-if="item === 'Adjuntos'">2</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         3. Sidebar icon-collapse
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        3 · Icon collapse — solo íconos al colapsar
      </h2>
      <p class="max-w-prose text-sm text-muted-foreground">
        Al colapsar se reduce a 3rem mostrando solo los íconos. Header, footer y grupos ajustan su padding con transición suave.
      </p>

      <div class="overflow-hidden rounded-lg border border-border" style="height: 520px; contain: paint">
        <SidebarProvider :default-open="true" side="left" collapsible="icon">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <div class="flex items-center gap-2 px-1">
                <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">3D</div>
                <span class="text-sm font-semibold truncate group-data-[collapsible=icon]/sidebar-wrapper:hidden">3DF Space</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in mainNav.filter(i => !i.children)" :key="item.label">
                      <SidebarMenuButton
                        :is-active="activeItem === item.label"
                        :tooltip="item.label"
                        @click="activeItem = item.label"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons[item.icon].split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                        <span>{{ item.label }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <div class="flex items-center gap-2 px-1">
                <div class="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium shrink-0">NC</div>
                <span class="text-xs font-medium truncate group-data-[collapsible=icon]/sidebar-wrapper:hidden">Nicolás</span>
              </div>
            </SidebarFooter>

            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <header class="flex h-12 items-center gap-2 border-b border-border px-4">
              <SidebarTrigger />
              <span class="text-sm font-medium">Con icon collapse</span>
            </header>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">El padding de header, footer y grupos se reduce suavemente. Los badges y sub-menús se ocultan automáticamente en modo icon.</p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         4. Variante floating
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        4 · Variante floating — con sombra y bordes redondeados
      </h2>

      <div class="overflow-hidden rounded-lg border border-border" style="height: 480px; contain: paint">
        <SidebarProvider :default-open="true" side="left" variant="floating" collapsible="offcanvas">
          <Sidebar variant="floating">
            <SidebarHeader>
              <div class="flex items-center gap-2 px-1">
                <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">F</div>
                <span class="text-sm font-semibold truncate">Floating</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menú</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in mainNav.slice(0, 4)" :key="item.label">
                      <SidebarMenuButton :tooltip="item.label">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons[item.icon].split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                        <span>{{ item.label }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset>
            <header class="flex h-12 items-center gap-2 border-b border-border px-4">
              <SidebarTrigger />
              <span class="text-sm font-medium">Variante floating</span>
            </header>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">Flota sobre el contenido con bordes redondeados y sombra sutil.</p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         5. Variante inset
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        5 · Variante inset — contenido empotrado
      </h2>

      <div class="overflow-hidden rounded-lg border border-border" style="height: 480px; contain: paint">
        <SidebarProvider :default-open="true" side="left" variant="inset" collapsible="icon">
          <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
              <div class="flex items-center gap-2 px-1">
                <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">IN</div>
                <span class="text-sm font-semibold truncate group-data-[collapsible=icon]/sidebar-wrapper:hidden">Inset</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in mainNav.filter(i => !i.children)" :key="item.label">
                      <SidebarMenuButton :is-active="activeItem === item.label" :tooltip="item.label" @click="activeItem = item.label">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path v-for="(d, i) in icons[item.icon].split(' M')" :key="i" :d="i === 0 ? d : 'M' + d" />
                        </svg>
                        <span>{{ item.label }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <header class="flex h-12 items-center gap-2 border-b border-border px-4">
              <SidebarTrigger />
              <span class="text-sm font-medium">Variante inset</span>
            </header>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">Contenido enmarcado con bordes redondeados y sombra.</p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         6. Skeleton de carga
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        6 · Sidebar skeleton — estado de carga
      </h2>

      <div class="overflow-hidden rounded-lg border border-border" style="height: 400px; contain: paint">
        <SidebarProvider :default-open="true" side="left" collapsible="offcanvas">
          <Sidebar>
            <SidebarHeader>
              <div class="flex items-center gap-2 px-1">
                <div class="size-8 animate-pulse rounded-lg bg-sidebar-accent" />
                <div class="flex flex-1 flex-col gap-1.5">
                  <div class="h-3.5 w-24 animate-pulse rounded bg-sidebar-accent" />
                  <div class="h-2.5 w-16 animate-pulse rounded bg-sidebar-accent" />
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>
                  <div class="h-2.5 w-16 animate-pulse rounded bg-sidebar-accent" />
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="i in 6" :key="i">
                      <SidebarMenuSkeleton show-icon />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>
                  <div class="h-2.5 w-12 animate-pulse rounded bg-sidebar-accent" />
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="i in 3" :key="i">
                      <SidebarMenuSkeleton show-icon />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div class="flex items-center gap-2 px-1">
                <div class="size-8 animate-pulse rounded-full bg-sidebar-accent" />
                <div class="flex flex-1 flex-col gap-1.5">
                  <div class="h-3 w-20 animate-pulse rounded bg-sidebar-accent" />
                  <div class="h-2.5 w-28 animate-pulse rounded bg-sidebar-accent" />
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <header class="flex h-12 items-center gap-2 border-b border-border px-4">
              <SidebarTrigger />
              <span class="text-sm font-medium">Skeleton de carga</span>
            </header>
            <div class="flex-1 p-6">
              <p class="text-sm text-muted-foreground">Usa <code class="rounded bg-muted px-1 text-xs font-mono">SidebarMenuSkeleton</code> para estados de carga elegantes.</p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         7. Referencia rápida de props
         ═══════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        7 · Referencia rápida
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full max-w-2xl text-sm">
          <thead>
            <tr class="border-b border-border text-left">
              <th class="pb-2 pr-4 font-medium">Componente / Prop</th>
              <th class="pb-2 pr-4 font-medium">Valores</th>
              <th class="pb-2 font-medium">Default</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.side</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">'left' | 'right'</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">'left'</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.variant</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">'sidebar' | 'floating' | 'inset'</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">'sidebar'</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.collapsible</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">'offcanvas' | 'icon' | 'none'</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">'offcanvas'</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.v-model:open</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">boolean</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">true</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarMenuButton.isActive</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">boolean</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">false</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarMenuSub.v-model:open</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">boolean</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">false</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarMenuAction.showOnHover</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">boolean</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">false</code></td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">SidebarMenuSkeleton.showIcon</td>
              <td class="py-2 pr-4"><code class="rounded bg-muted px-1">boolean</code></td>
              <td class="py-2"><code class="rounded bg-muted px-1">false</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>