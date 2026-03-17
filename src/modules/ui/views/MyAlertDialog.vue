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
  deleteResult.value = t('demo.alertDialog.accountDeleted');
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
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('destructive')" :code="deleteCode">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">{{ t('demo.deleteAccount') }}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{{ t('demo.alertDialog.areYouSure') }}</AlertDialogTitle>
            <AlertDialogDescription>
              {{ t('demo.alertDialog.deleteAccountDesc') }}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{{ t('common.cancel') }}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" @click="handleDelete">
              {{ t('demo.alertDialog.confirmDelete') }}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p v-if="deleteResult" class="text-destructive text-sm">{{ deleteResult }}</p>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('generic')" :code="genericCode">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">{{ t('demo.alertDialog.submitForm') }}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{{ t('demo.alertDialog.confirmSubmit') }}</AlertDialogTitle>
            <AlertDialogDescription>
              {{ t('demo.alertDialog.confirmSubmitDesc') }}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{{ t('common.cancel') }}</AlertDialogCancel>
            <AlertDialogAction>{{ t('demo.alertDialog.confirm') }}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('controlled')" :code="controlledCode">
      <Button @click="programmaticOpen = true">{{ t('demo.openProgrammatically') }}</Button>
      <AlertDialog v-model:open="programmaticOpen">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{{ t('demo.alertDialog.sessionExpired') }}</AlertDialogTitle>
            <AlertDialogDescription>
              {{ t('demo.alertDialog.sessionExpiredDesc') }}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>{{ t('demo.alertDialog.signIn') }}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DocShowcase>

    <DocPropsTable :props="alertDialogProps" />
  </div>
</template>
