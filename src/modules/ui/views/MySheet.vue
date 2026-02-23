<script setup lang="ts">
import { ref } from 'vue';

import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import SheetDemoReference from './_components/SheetDemoReference.vue';

const controlledOpen = ref(false);

const sheetProps: PropItem[] = [
  {
    name: 'Sheet: open',
    type: 'boolean',
    default: '-',
    description: 'Estado abierto/cerrado (v-model:open).',
  },
  {
    name: 'Sheet: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Estado inicial del sheet.',
  },
  {
    name: 'SheetContent: side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'right'",
    description: 'Lado desde el que se desliza el panel.',
  },
  {
    name: 'SheetContent: showClose',
    type: 'boolean',
    default: 'true',
    description: 'Muestra el botón de cierre (×).',
  },
  {
    name: 'SheetContent: closeLabel',
    type: 'string',
    default: "'Cerrar'",
    description: 'Etiqueta accesible del botón de cierre.',
  },
  {
    name: 'SheetTitle: as',
    type: 'string',
    default: "'h2'",
    description: 'Elemento HTML para el título.',
  },
];

const anatomyCode = `<Sheet>
  <SheetTrigger />
  <SheetContent>
    <SheetHeader>
      <SheetTitle />
      <SheetDescription />
    </SheetHeader>
    <!-- contenido -->
    <SheetFooter>
      <SheetClose />
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const basicCode = `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Abrir Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Editar perfil</SheetTitle>
      <SheetDescription>Realiza cambios en tu perfil.</SheetDescription>
    </SheetHeader>
    <div class="flex flex-col gap-4 py-4">
      <Label for="name">Nombre</Label>
      <Input id="name" value="Pedro Duarte" />
    </div>
    <SheetFooter>
      <SheetClose><Button variant="outline">Cancelar</Button></SheetClose>
      <SheetClose><Button>Guardar cambios</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const sidesCode = `<Sheet v-for="side in ['top', 'right', 'bottom', 'left']" :key="side">
  <SheetTrigger>
    <Button variant="outline">{{ side }}</Button>
  </SheetTrigger>
  <SheetContent :side="side">
    <SheetHeader>
      <SheetTitle>Sheet desde {{ side }}</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`;

const controlledCode = `const open = ref(false)

<Sheet v-model:open="open">
  <SheetTrigger>
    <Button>Abrir controlado</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Sheet controlado</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

<Button @click="open = !open">Toggle externo</Button>`;

const noCloseCode = `<SheetContent :show-close="false">
  <!-- Solo se cierra con Escape, overlay, o botón propio -->
</SheetContent>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Sheet"
      description="Panel lateral que se desliza desde un borde de la pantalla para mostrar contenido secundario."
      import-code="import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase title="Básico — derecha (default)" :code="basicCode">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">Abrir Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar perfil</SheetTitle>
            <SheetDescription>
              Realiza cambios en tu perfil aquí. Haz clic en guardar cuando termines.
            </SheetDescription>
          </SheetHeader>
          <div class="flex flex-col gap-4 py-4">
            <div class="flex flex-col gap-2">
              <Label for="name">Nombre</Label>
              <Input id="name" value="Pedro Duarte" />
            </div>
            <div class="flex flex-col gap-2">
              <Label for="username">Username</Label>
              <Input id="username" value="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose>
              <Button variant="outline">Cancelar</Button>
            </SheetClose>
            <SheetClose>
              <Button>Guardar cambios</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocShowcase>

    <DocShowcase title="Posiciones — 4 lados" :code="sidesCode">
      <div class="flex flex-wrap gap-4">
        <Sheet v-for="side in ['top', 'right', 'bottom', 'left'] as const" :key="side">
          <SheetTrigger>
            <Button variant="outline" class="capitalize">{{ side }}</Button>
          </SheetTrigger>
          <SheetContent :side="side">
            <SheetHeader>
              <SheetTitle>Sheet desde {{ side }}</SheetTitle>
              <SheetDescription>
                Este panel se desliza desde el lado <strong>{{ side }}</strong
                >.
              </SheetDescription>
            </SheetHeader>
            <div class="py-4">
              <p class="text-muted-foreground text-sm">Contenido del sheet.</p>
            </div>
            <SheetFooter>
              <SheetClose>
                <Button variant="outline">Cerrar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </DocShowcase>

    <DocShowcase title="Controlado (v-model:open)" :code="controlledCode">
      <div class="flex items-center gap-4">
        <Sheet v-model:open="controlledOpen">
          <SheetTrigger>
            <Button>Abrir controlado</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Sheet controlado</SheetTitle>
              <SheetDescription>
                Este sheet usa v-model:open para control externo.
              </SheetDescription>
            </SheetHeader>
            <div class="py-4">
              <p class="text-muted-foreground text-sm">
                Estado actual: <strong>{{ controlledOpen ? 'Abierto' : 'Cerrado' }}</strong>
              </p>
            </div>
            <SheetFooter>
              <SheetClose>
                <Button variant="outline">Cerrar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <span class="text-muted-foreground text-sm">
          Estado: <code class="text-foreground font-mono">{{ controlledOpen }}</code>
        </span>
        <Button variant="ghost" size="sm" @click="controlledOpen = !controlledOpen">
          Toggle externo
        </Button>
      </div>
    </DocShowcase>

    <DocShowcase title="Sin botón (×) — showClose=false" :code="noCloseCode">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">Sin botón ×</Button>
        </SheetTrigger>
        <SheetContent :show-close="false">
          <SheetHeader>
            <SheetTitle>Sin botón de cierre</SheetTitle>
            <SheetDescription>
              Puedes cerrar con
              <kbd class="border-border bg-muted rounded border px-1 py-0.5 text-xs">Escape</kbd>,
              click en el overlay, o con el botón de abajo.
            </SheetDescription>
          </SheetHeader>
          <div class="flex-1" />
          <SheetFooter>
            <SheetClose>
              <Button class="w-full">Cerrar sheet</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocShowcase>

    <SheetDemoReference />

    <DocPropsTable :props="sheetProps" />
  </div>
</template>
