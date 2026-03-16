<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const controlledOpen = ref(false);
const goal = ref(350);

function adjustGoal(delta: number) {
  goal.value = Math.max(100, Math.min(1000, goal.value + delta));
}

const { description, propDesc, showcaseTitle } = useDocPage('drawer');

const drawerProps = computed<PropItem[]>(() => [
  {
    name: 'Drawer: open',
    type: 'boolean',
    default: '-',
    description: propDesc('open'),
  },
  {
    name: 'Drawer: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'DrawerContent: showClose',
    type: 'boolean',
    default: 'true',
    description: propDesc('showClose'),
  },
  {
    name: 'DrawerContent: dragCloseThreshold',
    type: 'number',
    default: '0.4',
    description: propDesc('dragCloseThreshold'),
  },
]);

const basicCode = `<Drawer>
  <DrawerTrigger>
    <Button variant="outline">Abrir Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Título</DrawerTitle>
      <DrawerDescription>Descripción del drawer.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Guardar</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

const interactiveCode = `const goal = ref(350)

<DrawerContent>
  <DrawerHeader>
    <DrawerTitle>Objetivo de movimiento</DrawerTitle>
  </DrawerHeader>
  <div class="flex items-center gap-4">
    <Button variant="outline" size="icon" @click="goal -= 10">-</Button>
    <span class="text-5xl font-bold">{{ goal }}</span>
    <Button variant="outline" size="icon" @click="goal += 10">+</Button>
  </div>
</DrawerContent>`;

const controlledCode = `const open = ref(false)

<Drawer v-model:open="open">
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer controlado</DrawerTitle>
    </DrawerHeader>
    <DrawerFooter>
      <Button @click="open = false">Cerrar</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

const noCloseCode = `<DrawerContent :show-close="false">
  <!-- Solo cierra con drag o Escape -->
</DrawerContent>`;

const anatomyCode = `<Drawer>
  <DrawerTrigger />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle />
      <DrawerDescription />
    </DrawerHeader>
    <DrawerFooter />
  </DrawerContent>
</Drawer>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Drawer"
      :description="description"
      import-code="import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Abrir Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar perfil</DrawerTitle>
            <DrawerDescription>
              Realiza cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado.
            </DrawerDescription>
          </DrawerHeader>
          <div class="p-4">
            <p class="text-muted-foreground text-sm">
              Contenido del drawer. Puedes arrastrarlo hacia abajo para cerrarlo.
            </p>
          </div>
          <DrawerFooter>
            <Button>Guardar cambios</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('interactive')" :code="interactiveCode">
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Establecer objetivo</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Objetivo de movimiento</DrawerTitle>
            <DrawerDescription>Establece tu objetivo de calorías diarias.</DrawerDescription>
          </DrawerHeader>
          <div class="flex flex-col items-center gap-4 p-4">
            <div class="flex items-center gap-4">
              <Button variant="outline" size="icon" @click="adjustGoal(-10)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </Button>
              <div class="text-center">
                <div class="text-5xl font-bold tracking-tighter">{{ goal }}</div>
                <div class="text-muted-foreground text-sm">calorías/día</div>
              </div>
              <Button variant="outline" size="icon" @click="adjustGoal(10)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Confirmar objetivo</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('controlled')" :code="controlledCode">
      <p class="text-muted-foreground text-xs">
        Estado: <code class="text-foreground">{{ controlledOpen ? 'abierto' : 'cerrado' }}</code>
      </p>
      <div class="flex gap-2">
        <Button variant="outline" @click="controlledOpen = true">Abrir programáticamente</Button>
      </div>
      <Drawer v-model:open="controlledOpen">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer controlado</DrawerTitle>
            <DrawerDescription>Este drawer se controla con v-model:open.</DrawerDescription>
          </DrawerHeader>
          <div class="p-4">
            <p class="text-muted-foreground text-sm">
              Puedes abrirlo y cerrarlo programáticamente.
            </p>
          </div>
          <DrawerFooter>
            <Button @click="controlledOpen = false">Cerrar</Button>
            <Button variant="outline" @click="controlledOpen = false">Cancelar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('noCloseButton')" :code="noCloseCode">
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Abrir (sin ×)</Button>
        </DrawerTrigger>
        <DrawerContent :show-close="false">
          <DrawerHeader>
            <DrawerTitle>Solo drag o Escape</DrawerTitle>
            <DrawerDescription>
              Arrastra el handle hacia abajo o presiona Escape para cerrar.
            </DrawerDescription>
          </DrawerHeader>
          <div class="p-4 pb-8">
            <p class="text-muted-foreground text-sm">No hay botón de cierre visible.</p>
          </div>
        </DrawerContent>
      </Drawer>
    </DocShowcase>

    <DocPropsTable :props="drawerProps" />
  </div>
</template>
