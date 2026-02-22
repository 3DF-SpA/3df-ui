<script setup lang="ts">
import { ref } from 'vue';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  Button,
} from '@3df-spa/ui';

const controlledOpen = ref(false);
const goal = ref(350);

function adjustGoal(delta: number) {
  goal.value = Math.max(100, Math.min(1000, goal.value + delta));
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Drawer</h1>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básico</h2>
      <p class="text-muted-foreground text-xs">Drawer con trigger, header, contenido y footer. Arrastra el handle para cerrar.</p>
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
            <p class="text-sm text-muted-foreground">
              Contenido del drawer. Puedes arrastrarlo hacia abajo para cerrarlo.
            </p>
          </div>
          <DrawerFooter>
            <Button>Guardar cambios</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Interactivo</h2>
      <p class="text-muted-foreground text-xs">Drawer con contenido interactivo (contador de objetivo).</p>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>
              </Button>
              <div class="text-center">
                <div class="text-5xl font-bold tracking-tighter">{{ goal }}</div>
                <div class="text-sm text-muted-foreground">calorías/día</div>
              </div>
              <Button variant="outline" size="icon" @click="adjustGoal(10)">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Confirmar objetivo</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Controlado (v-model)</h2>
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
            <DrawerDescription>
              Este drawer se controla con v-model:open.
            </DrawerDescription>
          </DrawerHeader>
          <div class="p-4">
            <p class="text-sm text-muted-foreground">
              Puedes abrirlo y cerrarlo programáticamente.
            </p>
          </div>
          <DrawerFooter>
            <Button @click="controlledOpen = false">Cerrar</Button>
            <Button variant="outline" @click="controlledOpen = false">Cancelar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Sin botón de cierre</h2>
      <p class="text-muted-foreground text-xs">Drawer que solo se cierra con drag o Escape.</p>
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
            <p class="text-sm text-muted-foreground">
              No hay botón de cierre visible.
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  </div>
</template>