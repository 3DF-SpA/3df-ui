<script setup lang="ts">
import { ref } from 'vue';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
  Input,
  Label,
} from '@3df-spa/ui';

const controlledOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Dialog</h1>

    <!-- Básico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básico</h2>
      <p class="text-muted-foreground text-xs">Dialog con header, contenido y footer.</p>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Editar perfil</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Realiza cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">Nombre</Label>
              <Input class="col-span-3" placeholder="Tu nombre" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">Usuario</Label>
              <Input class="col-span-3" placeholder="@usuario" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>

    <!-- Confirmación -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Confirmación</h2>
      <p class="text-muted-foreground text-xs">Dialog de confirmación con acción destructiva.</p>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Eliminar cuenta</Button>
        </DialogTrigger>
        <DialogContent class="max-w-md">
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos tus datos de nuestros servidores.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive">Sí, eliminar cuenta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>

    <!-- Controlado -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Controlado (v-model)</h2>
      <p class="text-muted-foreground text-xs">
        Estado: <code class="text-foreground">{{ controlledOpen ? 'abierto' : 'cerrado' }}</code>
      </p>
      <div class="flex gap-2">
        <Button variant="outline" @click="controlledOpen = true">Abrir programáticamente</Button>
      </div>
      <Dialog v-model:open="controlledOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog controlado</DialogTitle>
            <DialogDescription>
              Este dialog se controla externamente con v-model:open.
            </DialogDescription>
          </DialogHeader>
          <div class="py-4">
            <p class="text-sm text-muted-foreground">
              Puedes abrirlo y cerrarlo programáticamente desde fuera del componente.
            </p>
          </div>
          <DialogFooter>
            <Button @click="controlledOpen = false">Entendido</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>

    <!-- Sin cierre por overlay -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Sin cierre por overlay</h2>
      <p class="text-muted-foreground text-xs">Solo se puede cerrar con el botón × o Escape.</p>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Abrir (sin cierre overlay)</Button>
        </DialogTrigger>
        <DialogContent :close-on-overlay="false">
          <DialogHeader>
            <DialogTitle>Acción requerida</DialogTitle>
            <DialogDescription>
              Debes completar esta acción. No puedes cerrar haciendo clic fuera.
            </DialogDescription>
          </DialogHeader>
          <div class="py-4">
            <p class="text-sm text-muted-foreground">
              Usa el botón × o presiona Escape para cerrar.
            </p>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button>Aceptar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>

    <!-- Sin botón de cierre -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Sin botón ×</h2>
      <p class="text-muted-foreground text-xs">Dialog con botones de acción como única forma de cerrar.</p>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Términos y condiciones</Button>
        </DialogTrigger>
        <DialogContent :show-close="false" :close-on-overlay="false">
          <DialogHeader>
            <DialogTitle>Términos de servicio</DialogTitle>
            <DialogDescription>
              Por favor lee y acepta los términos de servicio para continuar.
            </DialogDescription>
          </DialogHeader>
          <div class="max-h-60 overflow-y-auto rounded-md border border-border p-4">
            <p class="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Rechazar</Button>
            </DialogClose>
            <DialogClose>
              <Button>Aceptar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  </div>
</template>