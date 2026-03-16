<script setup lang="ts">
import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';

import NavMenuDemoCentered from './_components/NavMenuDemoCentered.vue';
import NavMenuDemoComplete from './_components/NavMenuDemoComplete.vue';
import NavMenuDemoDirectLinks from './_components/NavMenuDemoDirectLinks.vue';
import NavMenuDemoMega from './_components/NavMenuDemoMega.vue';
import NavMenuDemoMultiCategory from './_components/NavMenuDemoMultiCategory.vue';
import NavMenuDemoNavbar from './_components/NavMenuDemoNavbar.vue';
import NavMenuDemoSimple from './_components/NavMenuDemoSimple.vue';

const menuItemProps: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    default: 'auto-generado',
    description: 'Identificador único del item. Determina qué panel está abierto.',
  },
];

const menuLinkProps: PropItem[] = [
  {
    name: 'as',
    type: 'string | Component',
    default: "'a'",
    description: 'Elemento HTML o componente a renderizar (ej. RouterLink).',
  },
  {
    name: 'active',
    type: 'boolean',
    default: 'false',
    description: 'Indica la página activa. Aplica estilos de acento y data-active.',
  },
];

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
      description="Menú de navegación horizontal con paneles desplegables, transiciones suaves y soporte de teclado."
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
