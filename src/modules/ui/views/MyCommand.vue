<script setup lang="ts">
import { ref } from 'vue';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import CommandDemoInline from './_components/CommandDemoInline.vue';

const dialogOpen = ref(false);

const commandProps: PropItem[] = [
  {
    name: 'Command: filter',
    type: '(value: string, search: string) => boolean',
    default: '-',
    description: 'Función de filtro personalizada para los ítems.',
  },
  {
    name: 'Command: label',
    type: 'string',
    default: '-',
    description: 'Etiqueta accesible del command.',
  },
  {
    name: 'CommandInput: placeholder',
    type: 'string',
    default: '-',
    description: 'Texto placeholder del input de búsqueda.',
  },
  {
    name: 'CommandInput: modelValue',
    type: 'string',
    default: '-',
    description: 'Valor del input (v-model).',
  },
  {
    name: 'CommandGroup: heading',
    type: 'string',
    default: '-',
    description: 'Título del grupo de ítems.',
  },
  {
    name: 'CommandItem: value',
    type: 'string',
    default: '-',
    description: 'Valor usado para filtrar el ítem.',
  },
  {
    name: 'CommandItem: keywords',
    type: 'string[]',
    default: '[]',
    description: 'Palabras clave adicionales para el filtro.',
  },
  {
    name: 'CommandItem: disabled',
    type: 'boolean',
    default: 'false',
    description: 'Desactiva el ítem.',
  },
  {
    name: 'CommandDialog: open',
    type: 'boolean',
    default: '-',
    description: 'Estado del dialog (v-model:open).',
  },
  {
    name: 'CommandDialog: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Estado inicial del dialog.',
  },
];

const anatomyCode = `<Command>
  <CommandInput />
  <CommandList>
    <CommandEmpty />
    <CommandGroup heading="...">
      <CommandItem value="...">
        <CommandShortcut />
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>`;

const dialogCode = `const open = ref(false)

<button @click="open = true">Buscar comando...</button>

<CommandDialog v-model:open="open">
  <CommandInput placeholder="Escribe un comando o busca..." />
  <CommandList>
    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
    <CommandGroup heading="Sugerencias">
      <CommandItem value="Calendario">Calendario</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Configuración">
      <CommandItem value="Perfil">
        Perfil
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Command"
      description="Paleta de comandos con búsqueda y filtrado para acceso rápido a acciones y navegación."
      import-code="import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <CommandDemoInline />

    <DocShowcase title="Command Dialog (⌘K / Ctrl+K)" :code="dialogCode">
      <p class="text-muted-foreground text-sm">
        Presiona <kbd class="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">⌘K</kbd> o haz clic
        en el botón para abrir el Command Dialog.
      </p>
      <button
        class="bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm"
        @click="dialogOpen = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Buscar comando...
        <kbd class="bg-background rounded border px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
      </button>

      <CommandDialog v-model:open="dialogOpen">
        <CommandInput placeholder="Escribe un comando o busca..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CommandItem value="Calendario">Calendario</CommandItem>
            <CommandItem value="Buscar emoji">Buscar emoji</CommandItem>
            <CommandItem value="Calculadora">Calculadora</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Configuración">
            <CommandItem value="Perfil">
              Perfil
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem value="Facturación">
              Facturación
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem value="Ajustes">
              Ajustes
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </DocShowcase>

    <DocPropsTable :props="commandProps" />
  </div>
</template>
