<script setup lang="ts">
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import PopoverDemoRichContent from './_components/PopoverDemoRichContent.vue';

const popoverProps: PropItem[] = [
  {
    name: 'Popover: open',
    type: 'boolean',
    default: '-',
    description: 'Estado abierto/cerrado (v-model:open).',
  },
  {
    name: 'Popover: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Estado inicial del popover.',
  },
  {
    name: 'PopoverContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'Alineación respecto al trigger.',
  },
  {
    name: 'PopoverContent: side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: 'Lado de apertura.',
  },
  {
    name: 'PopoverContent: sideOffset',
    type: 'number',
    default: '8',
    description: 'Distancia del popover al trigger.',
  },
  {
    name: 'PopoverContent: viewportPadding',
    type: 'number',
    default: '8',
    description: 'Padding respecto al borde del viewport.',
  },
];

const basicCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Abrir popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p class="text-sm">Contenido del popover.</p>
  </PopoverContent>
</Popover>`;

const formCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Configuración</Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="grid gap-3">
      <div class="grid grid-cols-3 items-center gap-4">
        <Label class="text-right">Ancho</Label>
        <Input class="col-span-2 h-8" value="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>`;

const alignCode = `<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`;

const sideCode = `<PopoverContent side="top">
  Se abre hacia arriba. Si no cabe, auto-flip a abajo.
</PopoverContent>`;

const anatomyCode = `<Popover>
  <PopoverTrigger />
  <PopoverContent>
    <!-- contenido -->
  </PopoverContent>
</Popover>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Popover"
      description="Panel flotante para mostrar contenido contextual, formularios rápidos o acciones adicionales."
      import-code="import { Popover, PopoverTrigger, PopoverContent } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase title="Básico" :code="basicCode">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Abrir popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="flex flex-col gap-2">
            <h3 class="text-sm font-medium">Dimensiones</h3>
            <p class="text-muted-foreground text-sm">Configura las dimensiones del componente.</p>
          </div>
        </PopoverContent>
      </Popover>
    </DocShowcase>

    <DocShowcase title="Con formulario" :code="formCode">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Configuración</Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="flex flex-col gap-4">
            <div>
              <h3 class="text-sm font-medium">Dimensiones</h3>
              <p class="text-muted-foreground text-sm">Configura las dimensiones del componente.</p>
            </div>
            <div class="grid gap-3">
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">Ancho</Label>
                <Input class="col-span-2 h-8" value="100%" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">Max ancho</Label>
                <Input class="col-span-2 h-8" value="300px" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">Alto</Label>
                <Input class="col-span-2 h-8" value="25px" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">Max alto</Label>
                <Input class="col-span-2 h-8" value="none" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </DocShowcase>

    <DocShowcase title="Alineación" :code="alignCode">
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align start</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p class="text-sm">Alineado al inicio del trigger.</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align center</Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <p class="text-sm">Centrado respecto al trigger (default).</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align end</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p class="text-sm">Alineado al final del trigger.</p>
          </PopoverContent>
        </Popover>
      </div>
    </DocShowcase>

    <DocShowcase title="Abre hacia arriba" :code="sideCode">
      <div class="mt-24">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Popover arriba</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium">Side="top"</h3>
              <p class="text-muted-foreground text-sm">
                Se abre hacia arriba. Si no cabe, auto-flip a abajo.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </DocShowcase>

    <PopoverDemoRichContent />

    <DocPropsTable :props="popoverProps" />
  </div>
</template>
