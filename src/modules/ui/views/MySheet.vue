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

import SheetDemoReference from './_components/SheetDemoReference.vue';

const controlledOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Sheet</h1>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básico — derecha (default)</h2>
      <div class="flex gap-4">
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
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Posiciones — 4 lados</h2>
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
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Controlado (v-model:open)</h2>
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
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Sin botón (×) — showClose=false</h2>
      <div class="flex gap-4">
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
      </div>
    </section>

    <SheetDemoReference />
  </div>
</template>
