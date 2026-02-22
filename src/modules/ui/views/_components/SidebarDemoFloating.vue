<script setup lang="ts">
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
  SidebarTrigger,
} from '@3df-spa/ui';

const icons = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  folder: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
  users:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  inbox:
    'M22 12h-6l-2 3H10l-2-3H2 M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
} as const;

type IconName = keyof typeof icons;

const navItems: { label: string; icon: IconName }[] = [
  { label: 'Dashboard', icon: 'home' },
  { label: 'Proyectos', icon: 'folder' },
  { label: 'Equipo', icon: 'users' },
  { label: 'Bandeja', icon: 'inbox' },
];
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      4 · Variante floating — con sombra y bordes redondeados
    </h2>

    <div class="border-border h-[480px] overflow-hidden rounded-lg border [contain:paint]">
      <SidebarProvider :default-open="true" side="left" variant="floating" collapsible="offcanvas">
        <Sidebar variant="floating">
          <SidebarHeader>
            <div class="flex items-center gap-2 px-1">
              <div
                class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md text-xs font-bold"
              >
                F
              </div>
              <span class="truncate text-sm font-semibold">Floating</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menú</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in navItems" :key="item.label">
                    <SidebarMenuButton :tooltip="item.label">
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
        </Sidebar>

        <SidebarInset>
          <header class="border-border flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span class="text-sm font-medium">Variante floating</span>
          </header>
          <div class="flex-1 p-6">
            <p class="text-muted-foreground text-sm">
              Flota sobre el contenido con bordes redondeados y sombra sutil.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
</template>
