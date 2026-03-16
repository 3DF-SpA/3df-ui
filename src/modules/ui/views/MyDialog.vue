<script setup lang="ts">
import { ref } from 'vue';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const controlledOpen = ref(false);

const dialogProps: PropItem[] = [
  {
    name: 'Dialog: open',
    type: 'boolean',
    default: '-',
    description: 'Estado abierto/cerrado (v-model:open).',
  },
  {
    name: 'Dialog: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Estado inicial del dialog.',
  },
  {
    name: 'DialogContent: showClose',
    type: 'boolean',
    default: 'true',
    description: 'Muestra el botón de cierre (×).',
  },
  {
    name: 'DialogContent: closeOnOverlay',
    type: 'boolean',
    default: 'true',
    description: 'Permite cerrar haciendo clic en el overlay.',
  },
  {
    name: 'DialogContent: closeLabel',
    type: 'string',
    default: "'Cerrar'",
    description: 'Etiqueta accesible del botón de cierre.',
  },
];

const basicCode = `<Dialog>
  <DialogTrigger>
    <Button variant="outline">Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>Realiza cambios en tu perfil.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant="outline">Cancelar</Button></DialogClose>
      <Button>Guardar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const confirmCode = `<Dialog>
  <DialogTrigger>
    <Button variant="destructive">Eliminar cuenta</Button>
  </DialogTrigger>
  <DialogContent class="max-w-md">
    <DialogHeader>
      <DialogTitle>¿Estás seguro?</DialogTitle>
      <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant="outline">Cancelar</Button></DialogClose>
      <Button variant="destructive">Eliminar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const controlledCode = `const open = ref(false)

<Dialog v-model:open="open">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog controlado</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button @click="open = false">Entendido</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const noOverlayCode = `<DialogContent :close-on-overlay="false">
  <!-- Solo se cierra con × o Escape -->
</DialogContent>`;

const noCloseCode = `<DialogContent :show-close="false" :close-on-overlay="false">
  <!-- Solo se cierra con botones de acción -->
</DialogContent>`;

const anatomyCode = `<Dialog>
  <DialogTrigger />
  <DialogContent>
    <DialogHeader>
      <DialogTitle />
      <DialogDescription />
    </DialogHeader>
    <DialogFooter>
      <DialogClose />
    </DialogFooter>
  </DialogContent>
</Dialog>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Dialog"
      description="Ventana modal que interrumpe al usuario para confirmar una acción o mostrar información importante."
      import-code="import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase title="Básico" :code="basicCode">
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
    </DocShowcase>

    <DocShowcase title="Confirmación destructiva" :code="confirmCode">
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Eliminar cuenta</Button>
        </DialogTrigger>
        <DialogContent class="max-w-md">
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos tus
              datos de nuestros servidores.
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
    </DocShowcase>

    <DocShowcase title="Controlado (v-model)" :code="controlledCode">
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
            <p class="text-muted-foreground text-sm">
              Puedes abrirlo y cerrarlo programáticamente desde fuera del componente.
            </p>
          </div>
          <DialogFooter>
            <Button @click="controlledOpen = false">Entendido</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocShowcase title="Sin cierre por overlay" :code="noOverlayCode">
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
          <DialogFooter>
            <DialogClose>
              <Button>Aceptar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocShowcase title="Sin botón de cierre" :code="noCloseCode">
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
          <div class="border-border max-h-60 overflow-y-auto rounded-md border p-4">
            <p class="text-muted-foreground text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
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
    </DocShowcase>

    <DocPropsTable :props="dialogProps" />
  </div>
</template>
