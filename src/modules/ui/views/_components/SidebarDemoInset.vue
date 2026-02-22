<script setup lang="ts">
import { ref } from 'vue';

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
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@3df-spa/ui';

const activeItem = ref('Dashboard');

const icons = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  users:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  calendar:
    'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18',
  inbox:
    'M22 12h-6l-2 3H10l-2-3H2 M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
} as const;

type IconName = keyof typeof icons;

interface NavItem {
  label: string;
  icon: IconName;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'home' },
  { label: 'Equipo', icon: 'users', badge: 3 },
  { label: 'Bandeja', icon: 'inbox', badge: 28 },
  { label: 'Calendario', icon: 'calendar' },
];
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      5 · Variante inset — contenido empotrado
    </h2>

    <div class="border-border h-[480px] overflow-hidden rounded-lg border [contain:paint]">
      <SidebarProvider :default-open="true" side="left" variant="inset" collapsible="icon">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <div class="flex items-center gap-2 px-1">
              <div
                class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md text-xs font-bold"
              >
                IN
              </div>
              <span
                class="truncate text-sm font-semibold group-data-[collapsible=icon]/sidebar-wrapper:hidden"
                >Inset</span
              >
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in navItems" :key="item.label">
                    <SidebarMenuButton
                      :is-active="activeItem === item.label"
                      :tooltip="item.label"
                      @click="activeItem = item.label"
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
                      >
                        <path
                          v-for="(d, i) in icons[item.icon].split(' M')"
                          :key="i"
                          :d="i === 0 ? d : 'M' + d"
                        />
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
          <header class="border-border flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span class="text-sm font-medium">Variante inset</span>
          </header>
          <div class="flex-1 p-6">
            <p class="text-muted-foreground text-sm">
              Contenido enmarcado con bordes redondeados y sombra.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
</template>
