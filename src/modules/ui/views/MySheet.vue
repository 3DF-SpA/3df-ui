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

const controlledOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Sheet</h1>

    <!-- ─── 1. Básico (derecha) ─── -->
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

    <!-- ─── 2. Los 4 lados ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Posiciones — 4 lados</h2>
      <div class="flex flex-wrap gap-4">
        <Sheet v-for="side in (['top', 'right', 'bottom', 'left'] as const)" :key="side">
          <SheetTrigger>
            <Button variant="outline" class="capitalize">{{ side }}</Button>
          </SheetTrigger>
          <SheetContent :side="side">
            <SheetHeader>
              <SheetTitle>Sheet desde {{ side }}</SheetTitle>
              <SheetDescription>
                Este panel se desliza desde el lado <strong>{{ side }}</strong>.
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

    <!-- ─── 3. Controlado con v-model ─── -->
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

    <!-- ─── 4. Sin botón de cierre ─── -->
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
                Puedes cerrar con <kbd class="rounded border border-border bg-muted px-1 py-0.5 text-xs">Escape</kbd>,
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

    <!-- ─── 5. Con contenido largo (scroll) ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Contenido scrollable</h2>
      <div class="flex gap-4">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Contenido largo</Button>
          </SheetTrigger>
          <SheetContent class="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Términos y condiciones</SheetTitle>
              <SheetDescription>
                Lee los términos antes de continuar.
              </SheetDescription>
            </SheetHeader>
            <div class="flex flex-col gap-4 py-4">
              <p v-for="i in 20" :key="i" class="text-muted-foreground text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <SheetFooter>
              <SheetClose>
                <Button variant="outline">Rechazar</Button>
              </SheetClose>
              <SheetClose>
                <Button>Aceptar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </section>

    <!-- ─── 6. Custom width ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Ancho personalizado</h2>
      <div class="flex gap-4">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Sheet ancho (lg)</Button>
          </SheetTrigger>
          <SheetContent class="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Panel amplio</SheetTitle>
              <SheetDescription>
                Este sheet tiene un ancho de <code class="text-foreground font-mono text-xs">sm:max-w-lg</code>.
              </SheetDescription>
            </SheetHeader>
            <div class="py-4">
              <p class="text-muted-foreground text-sm">Más espacio para formularios complejos.</p>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Sheet extra ancho (2xl)</Button>
          </SheetTrigger>
          <SheetContent class="sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle>Panel extra amplio</SheetTitle>
              <SheetDescription>
                Este sheet tiene un ancho de <code class="text-foreground font-mono text-xs">sm:max-w-2xl</code>.
              </SheetDescription>
            </SheetHeader>
            <div class="py-4">
              <p class="text-muted-foreground text-sm">Ideal para vistas de detalle o tablas.</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>

    <!-- ─── 7. Referencia de Props ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Referencia de Props</h2>
      <div class="overflow-x-auto rounded-lg border border-border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-2 text-left font-medium">Componente</th>
              <th class="px-4 py-2 text-left font-medium">Prop</th>
              <th class="px-4 py-2 text-left font-medium">Tipo</th>
              <th class="px-4 py-2 text-left font-medium">Default</th>
              <th class="px-4 py-2 text-left font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">Sheet</td>
              <td class="px-4 py-2 font-mono text-xs">open</td>
              <td class="px-4 py-2 font-mono text-xs">boolean</td>
              <td class="px-4 py-2 font-mono text-xs">—</td>
              <td class="px-4 py-2">v-model:open</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">Sheet</td>
              <td class="px-4 py-2 font-mono text-xs">defaultOpen</td>
              <td class="px-4 py-2 font-mono text-xs">boolean</td>
              <td class="px-4 py-2 font-mono text-xs">false</td>
              <td class="px-4 py-2">Estado inicial</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">SheetContent</td>
              <td class="px-4 py-2 font-mono text-xs">side</td>
              <td class="px-4 py-2 font-mono text-xs">'top' | 'right' | 'bottom' | 'left'</td>
              <td class="px-4 py-2 font-mono text-xs">'right'</td>
              <td class="px-4 py-2">Lado de deslizamiento</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">SheetContent</td>
              <td class="px-4 py-2 font-mono text-xs">showClose</td>
              <td class="px-4 py-2 font-mono text-xs">boolean</td>
              <td class="px-4 py-2 font-mono text-xs">true</td>
              <td class="px-4 py-2">Mostrar botón ×</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">SheetTitle</td>
              <td class="px-4 py-2 font-mono text-xs">as</td>
              <td class="px-4 py-2 font-mono text-xs">string | Component</td>
              <td class="px-4 py-2 font-mono text-xs">'h2'</td>
              <td class="px-4 py-2">Elemento HTML a renderizar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
