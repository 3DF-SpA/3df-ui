<script setup lang="ts">
import { computed } from 'vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

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

const { description, propDesc } = useDocPage('sidebar');

const providerProps = computed<PropItem[]>(() => [
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'true',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: propDesc('open'),
  },
  {
    name: 'side',
    type: "'left' | 'right'",
    default: "'left'",
    description: propDesc('side'),
  },
  {
    name: 'variant',
    type: "'sidebar' | 'floating' | 'inset'",
    default: "'sidebar'",
    description: propDesc('variant'),
  },
  {
    name: 'collapsible',
    type: "'offcanvas' | 'icon' | 'none'",
    default: "'offcanvas'",
    description: propDesc('collapsible'),
  },
]);

const menuButtonProps = computed<PropItem[]>(() => [
  {
    name: 'as',
    type: 'string | Component',
    default: "'button'",
    description: propDesc('menuButtonAs'),
  },
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description: propDesc('isActive'),
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description: propDesc('size'),
  },
  {
    name: 'tooltip',
    type: 'string',
    default: 'undefined',
    description: propDesc('tooltip'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const menuSubProps = computed<PropItem[]>(() => [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: propDesc('open'),
  },
]);

const menuSubButtonProps = computed<PropItem[]>(() => [
  {
    name: 'as',
    type: 'string | Component',
    default: "'a'",
    description: propDesc('as'),
  },
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description: propDesc('isActive'),
  },
  {
    name: 'size',
    type: "'sm' | 'default'",
    default: "'default'",
    description: propDesc('size'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const otherProps = computed<PropItem[]>(() => [
  {
    name: 'MenuAction: showOnHover',
    type: 'boolean',
    default: 'false',
    description: propDesc('showOnHover'),
  },
  {
    name: 'MenuSkeleton: showIcon',
    type: 'boolean',
    default: 'false',
    description: propDesc('showIcon'),
  },
]);

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
      :description="description"
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
