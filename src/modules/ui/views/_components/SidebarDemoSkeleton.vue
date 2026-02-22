<script setup lang="ts">
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
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@3df-spa/ui';
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      6 · Sidebar skeleton — estado de carga
    </h2>

    <div class="border-border h-[400px] overflow-hidden rounded-lg border [contain:paint]">
      <SidebarProvider :default-open="true" side="left" collapsible="offcanvas">
        <Sidebar>
          <SidebarHeader>
            <div class="flex items-center gap-2 px-1">
              <div class="bg-sidebar-accent size-8 animate-pulse rounded-lg" />
              <div class="flex flex-1 flex-col gap-1.5">
                <div class="bg-sidebar-accent h-3.5 w-24 animate-pulse rounded" />
                <div class="bg-sidebar-accent h-2.5 w-16 animate-pulse rounded" />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <div class="bg-sidebar-accent h-2.5 w-16 animate-pulse rounded" />
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
                <div class="bg-sidebar-accent h-2.5 w-12 animate-pulse rounded" />
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
              <div class="bg-sidebar-accent size-8 animate-pulse rounded-full" />
              <div class="flex flex-1 flex-col gap-1.5">
                <div class="bg-sidebar-accent h-3 w-20 animate-pulse rounded" />
                <div class="bg-sidebar-accent h-2.5 w-28 animate-pulse rounded" />
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header class="border-border flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span class="text-sm font-medium">Skeleton de carga</span>
          </header>
          <div class="flex-1 p-6">
            <p class="text-muted-foreground text-sm">
              Usa
              <code class="bg-muted rounded px-1 font-mono text-xs">SidebarMenuSkeleton</code>
              para estados de carga elegantes.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
</template>
