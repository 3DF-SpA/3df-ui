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
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from '@3df-spa/ui';

import { type NavItem, icons, mainNav, secondaryNav } from './sidebar-demo-data';

const activeItem = defineModel<string>('activeItem', { required: true });
const activeSubItem = defineModel<string>('activeSubItem', { required: true });
const projectsOpen = ref(true);
const settingsOpen = ref(false);

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
  <Sidebar>
    <SidebarHeader>
      <div class="flex items-center gap-2 px-1">
        <div
          class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-xs font-bold"
        >
          3D
        </div>
        <div class="flex flex-col text-sm leading-tight">
          <span class="truncate font-semibold">3DF Space</span>
          <span class="text-sidebar-foreground/50 text-[10px]">Workspace</span>
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton class="text-sidebar-foreground/50">
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
                    v-for="(d, i) in icons.search.split(' M')"
                    :key="i"
                    :d="i === 0 ? d : 'M' + d"
                  />
                </svg>
                <span>Buscar…</span>
                <kbd
                  class="border-sidebar-border/60 bg-sidebar-accent/50 text-sidebar-foreground/40 ml-auto rounded border px-1.5 py-0.5 font-mono text-[10px]"
                  >⌘K</kbd
                >
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in mainNav" :key="item.label">
              <SidebarMenuButton
                :is-active="activeItem === item.label"
                :tooltip="item.label"
                @click="item.children ? toggleSubMenu(item) : (activeItem = item.label)"
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

              <SidebarMenuBadge v-if="item.badge && !item.children">
                {{ item.badge }}
              </SidebarMenuBadge>

              <SidebarMenuAction
                v-if="item.label === 'Proyectos'"
                show-on-hover
                title="Crear proyecto"
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
                    v-for="(d, i) in icons.plus.split(' M')"
                    :key="i"
                    :d="i === 0 ? d : 'M' + d"
                  />
                </svg>
              </SidebarMenuAction>

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

      <SidebarGroup>
        <SidebarGroupLabel>Recursos</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in secondaryNav" :key="item.label">
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

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div
              class="from-primary/80 to-primary text-primary-foreground flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold"
            >
              NC
            </div>
            <div class="flex flex-col text-xs leading-tight">
              <span class="font-medium">Nicolás C.</span>
              <span class="text-sidebar-foreground/50">admin@3df.space</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-sidebar-foreground/40 ml-auto size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                v-for="(d, i) in icons.logout.split(' M')"
                :key="i"
                :d="i === 0 ? d : 'M' + d"
              />
            </svg>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
