<script setup lang="ts">
import { computed } from 'vue';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import DropdownDemoAutoPosition from './_components/DropdownDemoAutoPosition.vue';
import DropdownDemoBasic from './_components/DropdownDemoBasic.vue';
import DropdownDemoIconActions from './_components/DropdownDemoIconActions.vue';
import DropdownDemoSections from './_components/DropdownDemoSections.vue';
import DropdownDemoTableActions from './_components/DropdownDemoTableActions.vue';
import DropdownDemoTriggers from './_components/DropdownDemoTriggers.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('dropdown');

const dropdownProps = computed<PropItem[]>(() => [
  {
    name: 'DropdownMenuContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    description: propDesc('align'),
  },
  {
    name: 'DropdownMenuContent: side',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: propDesc('side'),
  },
  {
    name: 'DropdownMenuContent: sideOffset',
    type: 'number',
    default: '4',
    description: propDesc('sideOffset'),
  },
  {
    name: 'DropdownMenuContent: viewportPadding',
    type: 'number',
    default: '8',
    description: propDesc('viewportPadding'),
  },
  {
    name: 'DropdownMenuItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('itemDisabled'),
  },
  {
    name: 'DropdownMenuItem: destructive',
    type: 'boolean',
    default: 'false',
    description: propDesc('destructive'),
  },
  {
    name: 'DropdownMenuLabel: inset',
    type: 'boolean',
    default: 'false',
    description: propDesc('inset'),
  },
]);

const anatomyCode = `<DropdownMenu>
  <DropdownMenuTrigger />
  <DropdownMenuContent>
    <DropdownMenuLabel />
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <DropdownMenuShortcut />
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const alignCode = `<DropdownMenuContent align="start"><!-- default --></DropdownMenuContent>
<DropdownMenuContent align="center"><!-- centrado --></DropdownMenuContent>
<DropdownMenuContent align="end"><!-- al final --></DropdownMenuContent>`;

const sideTopCode = `<DropdownMenuContent side="top">
  <!-- Se abre hacia arriba -->
</DropdownMenuContent>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Dropdown Menu"
      :description="description"
      import-code="import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DropdownDemoBasic />
    <DropdownDemoSections />

    <DocShowcase :title="showcaseTitle('alignment')" :code="alignCode">
      <div class="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Align start (default)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Opción A</DropdownMenuItem>
            <DropdownMenuItem>Opción B</DropdownMenuItem>
            <DropdownMenuItem>Opción C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Align center</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Opción A</DropdownMenuItem>
            <DropdownMenuItem>Opción B</DropdownMenuItem>
            <DropdownMenuItem>Opción C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Align end</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Opción A</DropdownMenuItem>
            <DropdownMenuItem>Opción B</DropdownMenuItem>
            <DropdownMenuItem>Opción C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('openUp')" :code="sideTopCode">
      <div class="mt-32 flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Menú arriba</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DocShowcase>

    <DropdownDemoIconActions />
    <DropdownDemoTableActions />
    <DropdownDemoTriggers />
    <DropdownDemoAutoPosition />

    <DocPropsTable :props="dropdownProps" />
  </div>
</template>
