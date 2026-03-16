<script setup lang="ts">
import { computed } from 'vue';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

import NavMenuDemoCentered from './_components/NavMenuDemoCentered.vue';
import NavMenuDemoComplete from './_components/NavMenuDemoComplete.vue';
import NavMenuDemoDirectLinks from './_components/NavMenuDemoDirectLinks.vue';
import NavMenuDemoMega from './_components/NavMenuDemoMega.vue';
import NavMenuDemoMultiCategory from './_components/NavMenuDemoMultiCategory.vue';
import NavMenuDemoNavbar from './_components/NavMenuDemoNavbar.vue';
import NavMenuDemoSimple from './_components/NavMenuDemoSimple.vue';

const { description, propDesc } = useDocPage('navigationMenu');

const menuItemProps = computed<PropItem[]>(() => [
  {
    name: 'value',
    type: 'string',
    default: 'auto-generado',
    description: propDesc('value'),
  },
]);

const menuLinkProps = computed<PropItem[]>(() => [
  {
    name: 'as',
    type: 'string | Component',
    default: "'a'",
    description: propDesc('as'),
  },
  {
    name: 'active',
    type: 'boolean',
    default: 'false',
    description: propDesc('active'),
  },
]);

const anatomyCode = `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from '@3df/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Navigation Menu"
      :description="description"
      import-code="import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from '@3df/ui'"
    />

    <NavMenuDemoComplete />
    <NavMenuDemoCentered />
    <NavMenuDemoMultiCategory />
    <NavMenuDemoSimple />
    <NavMenuDemoNavbar />
    <NavMenuDemoDirectLinks />
    <NavMenuDemoMega />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" language="typescript" />
    </section>

    <DocPropsTable title="Props de NavigationMenuItem" :props="menuItemProps" />
    <DocPropsTable title="Props de NavigationMenuLink" :props="menuLinkProps" />
  </div>
</template>
