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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@3df-spa/ui';
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      2 · Sidebar derecho — panel de propiedades
    </h2>

    <div class="border-border h-[420px] overflow-hidden rounded-lg border [contain:paint]">
      <SidebarProvider :default-open="true" side="right" collapsible="offcanvas">
        <SidebarInset>
          <header class="border-border flex h-12 items-center justify-between border-b px-4">
            <span class="text-sm font-medium">Panel principal</span>
            <SidebarTrigger />
          </header>
          <div class="flex-1 p-6">
            <p class="text-muted-foreground text-sm">
              Sidebar posicionado a la derecha. Útil para paneles de propiedades, detalle o
              inspectores.
            </p>
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
                  <SidebarMenuItem
                    v-for="item in ['Información', 'Historial', 'Adjuntos', 'Comentarios']"
                    :key="item"
                  >
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
</template>
