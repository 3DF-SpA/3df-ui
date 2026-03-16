<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('alertDialog');

const { t } = useI18n();

const deleteResult = ref('');
const programmaticOpen = ref(false);

function handleDelete() {
  deleteResult.value = 'Cuenta eliminada (simulado)';
  setTimeout(() => {
    deleteResult.value = '';
  }, 3000);
}

const alertDialogProps = computed<PropItem[]>(() => [
  {
    name: 'AlertDialog: open',
    type: 'boolean',
    default: '-',
    description: propDesc('open'),
  },
  {
    name: 'AlertDialog: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'AlertDialogAction: variant',
    type: "'default' | 'destructive'",
    default: "'default'",
    description: propDesc('variant'),
  },
]);

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
      :description="description"
      import-code="import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('destructive')" :code="deleteCode">
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

    <DocShowcase :title="showcaseTitle('generic')" :code="genericCode">
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

    <DocShowcase :title="showcaseTitle('controlled')" :code="controlledCode">
      <Button @click="programmaticOpen = true">{{ t('demo.openProgrammatically') }}</Button>
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
