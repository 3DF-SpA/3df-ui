<script setup lang="ts">
import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';

import SidebarDemoComplete from './_components/SidebarDemoComplete.vue';
import SidebarDemoFloating from './_components/SidebarDemoFloating.vue';
import SidebarDemoIconCollapse from './_components/SidebarDemoIconCollapse.vue';
import SidebarDemoInset from './_components/SidebarDemoInset.vue';
import SidebarDemoRight from './_components/SidebarDemoRight.vue';
import SidebarDemoSkeleton from './_components/SidebarDemoSkeleton.vue';

const providerProps: PropItem[] = [
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'true',
    description: 'Estado abierto inicial (si open no está definido).',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Estado controlado de apertura. Soporta v-model.',
  },
  {
    name: 'side',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Lado en que se renderiza el sidebar.',
  },
  {
    name: 'variant',
    type: "'sidebar' | 'floating' | 'inset'",
    default: "'sidebar'",
    description: 'Variante visual del sidebar.',
  },
  {
    name: 'collapsible',
    type: "'offcanvas' | 'icon' | 'none'",
    default: "'offcanvas'",
    description: 'Comportamiento de colapso.',
  },
];

const menuButtonProps: PropItem[] = [
  {
    name: 'as',
    type: 'string | Component',
    default: "'button'",
    description: 'Elemento o componente a renderizar.',
  },
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description: 'Estado activo con estilos de acento y aria-current="page".',
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description: 'Tamaño del botón (sm=h-7, default=h-8, lg=h-10).',
  },
  {
    name: 'tooltip',
    type: 'string',
    default: 'undefined',
    description: 'Tooltip mostrado solo cuando el sidebar está colapsado en modo icono.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita pointer events y reduce opacidad.',
  },
];

const menuSubProps: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controla la visibilidad del submenú. Soporta v-model.',
  },
];

const menuSubButtonProps: PropItem[] = [
  {
    name: 'as',
    type: 'string | Component',
    default: "'a'",
    description: 'Elemento o componente a renderizar.',
  },
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description: 'Estado activo con estilos de acento.',
  },
  {
    name: 'size',
    type: "'sm' | 'default'",
    default: "'default'",
    description: 'Tamaño del botón (sm=h-6, default=h-7).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita el botón del submenú.',
  },
];

const otherProps: PropItem[] = [
  {
    name: 'MenuAction: showOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Muestra la acción solo al hacer hover en el item del menú.',
  },
  {
    name: 'MenuSkeleton: showIcon',
    type: 'boolean',
    default: 'false',
    description: 'Renderiza un placeholder de icono animado junto al texto.',
  },
];

const anatomyCode = `import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from '@3df/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Sidebar"
      description="Sistema de sidebar con múltiples variantes, colapso a iconos, posición izquierda/derecha, modo flotante e inset. Responsive con sheet en móvil."
      import-code="import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger, SidebarRail, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@3df/ui'"
    />

    <SidebarDemoComplete />
    <SidebarDemoRight />
    <SidebarDemoIconCollapse />
    <SidebarDemoFloating />
    <SidebarDemoInset />
    <SidebarDemoSkeleton />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" language="typescript" />
    </section>

    <DocPropsTable title="Props de SidebarProvider" :props="providerProps" />
    <DocPropsTable title="Props de SidebarMenuButton" :props="menuButtonProps" />
    <DocPropsTable title="Props de SidebarMenuSub" :props="menuSubProps" />
    <DocPropsTable title="Props de SidebarMenuSubButton" :props="menuSubButtonProps" />
    <DocPropsTable title="Otras props" :props="otherProps" />
  </div>
</template>
