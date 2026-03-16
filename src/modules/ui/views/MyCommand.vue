<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
import { useDocPage } from '@/i18n/composables/useDocPage';

import CommandDemoInline from './_components/CommandDemoInline.vue';

const dialogOpen = ref(false);

const { t } = useI18n();
const { description, propDesc, showcaseTitle } = useDocPage('command');

const commandProps = computed<PropItem[]>(() => [
  {
    name: 'Command: filter',
    type: '(value: string, search: string) => boolean',
    default: '-',
    description: propDesc('filter'),
  },
  {
    name: 'Command: label',
    type: 'string',
    default: '-',
    description: propDesc('label'),
  },
  {
    name: 'CommandInput: placeholder',
    type: 'string',
    default: '-',
    description: propDesc('inputPlaceholder'),
  },
  {
    name: 'CommandInput: modelValue',
    type: 'string',
    default: '-',
    description: propDesc('inputModelValue'),
  },
  {
    name: 'CommandGroup: heading',
    type: 'string',
    default: '-',
    description: propDesc('heading'),
  },
  {
    name: 'CommandItem: value',
    type: 'string',
    default: '-',
    description: propDesc('value'),
  },
  {
    name: 'CommandItem: keywords',
    type: 'string[]',
    default: '[]',
    description: propDesc('keywords'),
  },
  {
    name: 'CommandItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('cmdItemDisabled'),
  },
  {
    name: 'CommandDialog: open',
    type: 'boolean',
    default: '-',
    description: propDesc('dialogOpen'),
  },
  {
    name: 'CommandDialog: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('dialogDefaultOpen'),
  },
]);

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
      :description="description"
      import-code="import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <CommandDemoInline />

    <DocShowcase :title="showcaseTitle('commandDialog')" :code="dialogCode">
      <p class="text-muted-foreground text-sm">
        {{ t('demo.command.openHintBefore') }}
        <kbd class="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
        {{ t('demo.command.openHintAfter') }}
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
        {{ t('demo.command.searchButton') }}
        <kbd class="bg-background rounded border px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
      </button>

      <CommandDialog v-model:open="dialogOpen">
        <CommandInput :placeholder="t('demo.command.searchPlaceholder')" />
        <CommandList>
          <CommandEmpty>{{ t('demo.command.noResults') }}</CommandEmpty>
          <CommandGroup :heading="t('demo.command.suggestions')">
            <CommandItem :value="t('demo.command.calendar')">{{ t('demo.command.calendar') }}</CommandItem>
            <CommandItem :value="t('demo.searchEmoji')">{{ t('demo.searchEmoji') }}</CommandItem>
            <CommandItem :value="t('demo.command.calculator')">{{ t('demo.command.calculator') }}</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup :heading="t('demo.command.configGroup')">
            <CommandItem :value="t('demo.profile')">
              {{ t('demo.profile') }}
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem :value="t('demo.command.billing')">
              {{ t('demo.command.billing') }}
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem :value="t('demo.command.ajustes')">
              {{ t('demo.command.ajustes') }}
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </DocShowcase>

    <DocPropsTable :props="commandProps" />
  </div>
</template>

