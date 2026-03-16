<script setup lang="ts">
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import TooltipDemoIcons from './_components/TooltipDemoIcons.vue';

const tooltipProps: PropItem[] = [
  {
    name: 'Tooltip: delay',
    type: 'number',
    default: '300',
    description: 'Milisegundos antes de mostrar el tooltip.',
  },
  {
    name: 'Tooltip: closeDelay',
    type: 'number',
    default: '150',
    description: 'Milisegundos antes de ocultar el tooltip.',
  },
  {
    name: 'TooltipContent: side',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: 'Lado preferido para mostrar el tooltip.',
  },
  {
    name: 'TooltipContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'Alineación respecto al trigger.',
  },
  {
    name: 'TooltipContent: sideOffset',
    type: 'number',
    default: '6',
    description: 'Distancia en px entre trigger y tooltip.',
  },
  {
    name: 'TooltipContent: viewportPadding',
    type: 'number',
    default: '8',
    description: 'Padding mínimo respecto al viewport.',
  },
];

const anatomyCode = `<Tooltip>
  <TooltipTrigger />
  <TooltipContent>
    <!-- texto del tooltip -->
  </TooltipContent>
</Tooltip>`;

const basicCode = `<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover sobre mí</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Este es un tooltip básico</p>
  </TooltipContent>
</Tooltip>`;

const sidesCode = `<TooltipContent side="top">Arriba</TooltipContent>
<TooltipContent side="bottom">Abajo</TooltipContent>
<TooltipContent side="left">Izquierda</TooltipContent>
<TooltipContent side="right">Derecha</TooltipContent>`;

const alignCode = `<TooltipContent align="start">Inicio</TooltipContent>
<TooltipContent align="center">Centro</TooltipContent>
<TooltipContent align="end">Final</TooltipContent>`;

const delayCode = `<Tooltip :delay="0"><!-- Instantáneo --></Tooltip>
<Tooltip :delay="300"><!-- Normal (default) --></Tooltip>
<Tooltip :delay="1000"><!-- Lento --></Tooltip>`;

const richCode = `<TooltipContent class="max-w-xs">
  <div class="flex flex-col gap-1">
    <p class="font-semibold">Atajo de teclado</p>
    <p class="text-muted-foreground text-xs">
      Presiona <kbd>Ctrl+S</kbd> para guardar.
    </p>
  </div>
</TooltipContent>`;

const focusCode = `<!-- Los tooltips también aparecen al hacer focus con Tab -->
<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Navega con Tab</Button>
  </TooltipTrigger>
  <TooltipContent>Tooltip por focus</TooltipContent>
</Tooltip>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Tooltip"
      description="Elemento flotante que muestra información adicional al pasar el cursor o hacer focus sobre un elemento."
      import-code="import { Tooltip, TooltipTrigger, TooltipContent } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase title="Básico" :code="basicCode">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Hover sobre mí</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Este es un tooltip básico</p>
        </TooltipContent>
      </Tooltip>
    </DocShowcase>

    <DocShowcase title="Posiciones" :code="sidesCode">
      <div class="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Top (default)</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip arriba</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip abajo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip izquierda</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip derecha</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <DocShowcase title="Alineación" :code="alignCode">
      <div class="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Start</Button>
          </TooltipTrigger>
          <TooltipContent align="start">Alineado al inicio</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Center</Button>
          </TooltipTrigger>
          <TooltipContent align="center">Alineado al centro</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">End</Button>
          </TooltipTrigger>
          <TooltipContent align="end">Alineado al final</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <TooltipDemoIcons />

    <DocShowcase title="Delay personalizado" :code="delayCode">
      <div class="flex flex-wrap gap-4">
        <Tooltip :delay="0">
          <TooltipTrigger>
            <Button variant="outline" size="sm">Instantáneo (0ms)</Button>
          </TooltipTrigger>
          <TooltipContent>¡Aparezco al instante!</TooltipContent>
        </Tooltip>

        <Tooltip :delay="300">
          <TooltipTrigger>
            <Button variant="outline" size="sm">Normal (300ms)</Button>
          </TooltipTrigger>
          <TooltipContent>Delay por defecto</TooltipContent>
        </Tooltip>

        <Tooltip :delay="1000">
          <TooltipTrigger>
            <Button variant="outline" size="sm">Lento (1s)</Button>
          </TooltipTrigger>
          <TooltipContent>Tardo 1 segundo en aparecer</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <DocShowcase title="Contenido rico" :code="richCode">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Con contenido rico</Button>
        </TooltipTrigger>
        <TooltipContent class="max-w-xs">
          <div class="flex flex-col gap-1">
            <p class="font-semibold">Atajo de teclado</p>
            <p class="text-muted-foreground text-xs">
              Presiona
              <kbd class="border-border bg-muted rounded border px-1 py-0.5 font-mono text-[10px]"
                >Ctrl+S</kbd
              >
              para guardar los cambios.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </DocShowcase>

    <DocShowcase
      title="Se activa con focus (Tab)"
      description="Usa Tab para navegar a los botones y ver los tooltips sin mouse."
      :code="focusCode"
    >
      <div class="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Primero</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip por focus</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Segundo</Button>
          </TooltipTrigger>
          <TooltipContent>También por focus</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <DocPropsTable :props="tooltipProps" />
  </div>
</template>
