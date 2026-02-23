<script setup lang="ts">
import { ref } from 'vue';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const deleteResult = ref('');
const programmaticOpen = ref(false);

function handleDelete() {
  deleteResult.value = 'Cuenta eliminada (simulado)';
  setTimeout(() => {
    deleteResult.value = '';
  }, 3000);
}

const alertDialogProps: PropItem[] = [
  {
    name: 'AlertDialog: open',
    type: 'boolean',
    default: '-',
    description: 'Estado abierto/cerrado (v-model:open).',
  },
  {
    name: 'AlertDialog: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Estado inicial del alert dialog.',
  },
  {
    name: 'AlertDialogAction: variant',
    type: "'default' | 'destructive'",
    default: "'default'",
    description: 'Variante visual del botón de acción.',
  },
];

const deleteCode = `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Eliminar cuenta</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
      <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Eliminar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

const genericCode = `<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Confirmar envío</AlertDialogTitle>
    <AlertDialogDescription>¿Deseas continuar?</AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancelar</AlertDialogCancel>
    <AlertDialogAction>Confirmar</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>`;

const controlledCode = `const open = ref(false)

<AlertDialog v-model:open="open">
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>Iniciar sesión</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

const anatomyCode = `<AlertDialog>
  <AlertDialogTrigger />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle />
      <AlertDialogDescription />
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel />
      <AlertDialogAction />
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Alert Dialog"
      description="Dialog modal de confirmación que requiere una respuesta del usuario antes de continuar."
      import-code="import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase title="Eliminación destructiva" :code="deleteCode">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">Eliminar cuenta</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y removerá
              todos tus datos de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" @click="handleDelete">
              Sí, eliminar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p v-if="deleteResult" class="text-destructive text-sm">{{ deleteResult }}</p>
    </DocShowcase>

    <DocShowcase title="Confirmación genérica" :code="genericCode">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">Enviar formulario</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envío</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de enviar este formulario. Una vez enviado, no podrás modificar los
              datos ingresados. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DocShowcase>

    <DocShowcase title="Controlado (v-model)" :code="controlledCode">
      <Button @click="programmaticOpen = true">Abrir programáticamente</Button>
      <AlertDialog v-model:open="programmaticOpen">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
            <AlertDialogDescription>
              Tu sesión ha expirado por inactividad. Serás redirigido a la página de inicio de
              sesión.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Iniciar sesión</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DocShowcase>

    <DocPropsTable :props="alertDialogProps" />
  </div>
</template>
