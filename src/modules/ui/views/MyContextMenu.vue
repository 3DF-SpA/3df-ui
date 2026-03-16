<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('contextMenu');

const showBookmarks = ref(true);
const showFullUrls = ref(false);
const person = ref('pedro');

const contextMenuProps = computed<PropItem[]>(() => [
  {
    name: 'ContextMenuItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('itemDisabled'),
  },
  {
    name: 'ContextMenuItem: destructive',
    type: 'boolean',
    default: 'false',
    description: propDesc('destructive'),
  },
  {
    name: 'ContextMenuCheckboxItem: checked',
    type: 'boolean',
    default: 'false',
    description: propDesc('checked'),
  },
  {
    name: 'ContextMenuRadioGroup: modelValue',
    type: 'string',
    default: '-',
    description: propDesc('modelValue'),
  },
  {
    name: 'ContextMenuRadioItem: value',
    type: 'string',
    default: '-',
    description: propDesc('value'),
  },
  {
    name: 'ContextMenuLabel: inset',
    type: 'boolean',
    default: 'false',
    description: propDesc('inset'),
  },
]);

const basicCode = `<ContextMenu>
  <ContextMenuTrigger>
    <div class="flex h-[150px] items-center justify-center rounded-md border border-dashed">
      Clic derecho aquí
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent class="w-64">
    <ContextMenuItem>Atrás <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem v-model:checked="checked">
      Mostrar marcadores
    </ContextMenuCheckboxItem>
    <ContextMenuLabel inset>Personas</ContextMenuLabel>
    <ContextMenuRadioGroup v-model="person">
      <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`;

const subMenuCode = `<ContextMenuSub>
  <ContextMenuSubTrigger>Compartir</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Email</ContextMenuItem>
    <ContextMenuItem>Mensaje</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Copiar enlace</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`;

const anatomyCode = `<ContextMenu>
  <ContextMenuTrigger />
  <ContextMenuContent>
    <ContextMenuItem />
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem />
    <ContextMenuLabel />
    <ContextMenuRadioGroup>
      <ContextMenuRadioItem />
    </ContextMenuRadioGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger />
      <ContextMenuSubContent />
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Context Menu"
      :description="description"
      import-code="import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basicCheckboxRadio')" :code="basicCode">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            class="text-muted-foreground flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm"
          >
            Clic derecho aquí
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-64">
          <ContextMenuItem @select="() => {}">
            Atrás
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Adelante
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Recargar
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem v-model:checked="showBookmarks">
            Mostrar marcadores
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem v-model:checked="showFullUrls">
            Mostrar URLs completas
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel inset>Personas</ContextMenuLabel>
          <ContextMenuRadioGroup v-model="person">
            <ContextMenuRadioItem value="pedro">Pedro García</ContextMenuRadioItem>
            <ContextMenuRadioItem value="maria">María López</ContextMenuRadioItem>
            <ContextMenuRadioItem value="juan">Juan Martínez</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('subMenu')" :code="subMenuCode">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            class="text-muted-foreground flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm"
          >
            Clic derecho para acciones de archivo
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-56">
          <ContextMenuItem>
            Editar
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Duplicar</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Compartir</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Email</ContextMenuItem>
              <ContextMenuItem>Mensaje</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Copiar enlace</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>
            Eliminar
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </DocShowcase>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Estado reactivo</h2>
      <div class="space-y-1 rounded-md border p-4 text-sm">
        <p><strong>Marcadores:</strong> {{ showBookmarks ? 'Visible' : 'Oculto' }}</p>
        <p><strong>URLs completas:</strong> {{ showFullUrls ? 'Sí' : 'No' }}</p>
        <p><strong>Persona:</strong> {{ person }}</p>
      </div>
    </section>

    <DocPropsTable :props="contextMenuProps" />
  </div>
</template>
