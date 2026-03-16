<script setup lang="ts">
import { ref, computed } from 'vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import CollapsibleDemoStates from './_components/CollapsibleDemoStates.vue';

const isOpen = ref(false);

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('collapsible');

const collapsibleProps = computed<PropItem[]>(() => [
  {
    name: 'Collapsible: open',
    type: 'boolean',
    default: '-',
    description: propDesc('open'),
  },
  {
    name: 'Collapsible: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'Collapsible: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const anatomyCode = `<Collapsible>
  <CollapsibleTrigger />
  <CollapsibleContent />
</Collapsible>`;

const basicCode = `<Collapsible class="space-y-2">
  <div class="flex items-center justify-between">
    <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
    <CollapsibleTrigger>
      <template #default="{ open }">
        <Button variant="ghost" size="sm" :class="open ? 'rotate-180' : ''">⇅</Button>
      </template>
    </CollapsibleTrigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
  </CollapsibleContent>
</Collapsible>`;

const controlledCode = `const isOpen = ref(false)

<Button @click="isOpen = !isOpen">{{ isOpen ? 'Cerrar' : 'Abrir' }}</Button>

<Collapsible v-model:open="isOpen">
  <CollapsibleTrigger>
    <Button variant="ghost" size="sm">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Controlado con v-model:open.</p>
  </CollapsibleContent>
</Collapsible>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Collapsible"
      :description="description"
      import-code="import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" />
    </section>

    <DocShowcase
      :title="showcaseTitle('basic')"
      :description="showcaseDesc('basic')"
      :code="basicCode"
    >
      <div class="mx-auto w-full max-w-sm">
        <Collapsible class="space-y-2">
          <div class="flex items-center justify-between space-x-4">
            <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
            <CollapsibleTrigger>
              <template #default="{ open }">
                <Button variant="ghost" size="sm" class="w-9 p-0">
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
                    class="h-4 w-4 transition-transform"
                    :class="open ? 'rotate-180' : ''"
                  >
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                  <span class="sr-only">Toggle</span>
                </Button>
              </template>
            </CollapsibleTrigger>
          </div>
          <div class="border-border/60 rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/primitives
          </div>
          <CollapsibleContent class="space-y-2">
            <div class="border-border/60 rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/colors
            </div>
            <div class="border-border/60 rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('controlled')"
      :description="showcaseDesc('controlled')"
      :code="controlledCode"
    >
      <div class="mx-auto w-full max-w-sm space-y-4">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="isOpen = !isOpen">
            {{ isOpen ? 'Cerrar' : 'Abrir' }}
          </Button>
          <span class="text-muted-foreground text-sm">
            Estado: <strong>{{ isOpen ? 'abierto' : 'cerrado' }}</strong>
          </span>
        </div>
        <Collapsible v-model:open="isOpen" class="space-y-2">
          <div class="flex items-center justify-between space-x-4">
            <h4 class="text-sm font-semibold">Sección controlada</h4>
            <CollapsibleTrigger>
              <Button variant="ghost" size="sm" class="w-9 p-0">
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
                  class="h-4 w-4 transition-transform"
                  :class="isOpen ? 'rotate-180' : ''"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div class="border-border/60 rounded-md border p-4">
              <p class="text-sm">
                Este contenido se puede controlar tanto con el trigger interno como con el botón
                externo, gracias al binding bidireccional de v-model.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </DocShowcase>

    <CollapsibleDemoStates />

    <DocPropsTable :props="collapsibleProps" />
  </div>
</template>
