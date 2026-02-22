<script setup lang="ts">
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@3df-spa/ui';
</script>

<template>
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
            <SheetDescription> Lee los términos antes de continuar. </SheetDescription>
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
              Este sheet tiene un ancho de
              <code class="text-foreground font-mono text-xs">sm:max-w-lg</code>.
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
              Este sheet tiene un ancho de
              <code class="text-foreground font-mono text-xs">sm:max-w-2xl</code>.
            </SheetDescription>
          </SheetHeader>
          <div class="py-4">
            <p class="text-muted-foreground text-sm">Ideal para vistas de detalle o tablas.</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Referencia de Props</h2>
    <div class="border-border overflow-x-auto rounded-lg border">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-border bg-muted/50 border-b">
            <th class="px-4 py-2 text-left font-medium">Componente</th>
            <th class="px-4 py-2 text-left font-medium">Prop</th>
            <th class="px-4 py-2 text-left font-medium">Tipo</th>
            <th class="px-4 py-2 text-left font-medium">Default</th>
            <th class="px-4 py-2 text-left font-medium">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-border border-b">
            <td class="px-4 py-2 font-mono text-xs">Sheet</td>
            <td class="px-4 py-2 font-mono text-xs">open</td>
            <td class="px-4 py-2 font-mono text-xs">boolean</td>
            <td class="px-4 py-2 font-mono text-xs">—</td>
            <td class="px-4 py-2">v-model:open</td>
          </tr>
          <tr class="border-border border-b">
            <td class="px-4 py-2 font-mono text-xs">Sheet</td>
            <td class="px-4 py-2 font-mono text-xs">defaultOpen</td>
            <td class="px-4 py-2 font-mono text-xs">boolean</td>
            <td class="px-4 py-2 font-mono text-xs">false</td>
            <td class="px-4 py-2">Estado inicial</td>
          </tr>
          <tr class="border-border border-b">
            <td class="px-4 py-2 font-mono text-xs">SheetContent</td>
            <td class="px-4 py-2 font-mono text-xs">side</td>
            <td class="px-4 py-2 font-mono text-xs">'top' | 'right' | 'bottom' | 'left'</td>
            <td class="px-4 py-2 font-mono text-xs">'right'</td>
            <td class="px-4 py-2">Lado de deslizamiento</td>
          </tr>
          <tr class="border-border border-b">
            <td class="px-4 py-2 font-mono text-xs">SheetContent</td>
            <td class="px-4 py-2 font-mono text-xs">showClose</td>
            <td class="px-4 py-2 font-mono text-xs">boolean</td>
            <td class="px-4 py-2 font-mono text-xs">true</td>
            <td class="px-4 py-2">Mostrar botón ×</td>
          </tr>
          <tr class="border-border border-b">
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
</template>
