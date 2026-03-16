<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import AlertDemoRichContent from './_components/AlertDemoRichContent.vue';
import AlertDemoVariants from './_components/AlertDemoVariants.vue';

const alertProps: PropItem[] = [
  {
    name: 'variant',
    type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
    default: "'default'",
    description: 'Estilo visual del alert.',
  },
];

const _variantCode = `<Alert variant="success">
  <svg class="size-4">...</svg>
  <AlertTitle>¡Éxito!</AlertTitle>
  <AlertDescription>Operación completada.</AlertDescription>
</Alert>`;

const noIconCode = `<Alert>
  <AlertTitle>Nota simple</AlertTitle>
  <AlertDescription>Sin icono, solo título y descripción.</AlertDescription>
</Alert>`;

const descOnlyCode = `<Alert variant="info">
  <AlertDescription>Solo descripción, sin título ni icono.</AlertDescription>
</Alert>`;

const customClassCode = `<Alert class="max-w-md border-dashed">
  <AlertTitle>Ancho limitado</AlertTitle>
  <AlertDescription>Con max-w-md y borde discontinuo.</AlertDescription>
</Alert>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Alert"
      description="Muestra mensajes informativos, de éxito, error, advertencia o información al usuario."
      import-code="import { Alert, AlertTitle, AlertDescription } from '@3df/ui'"
    />

    <AlertDemoVariants />

    <DocShowcase title="Sin icono" :code="noIconCode">
      <div class="flex flex-col gap-3">
        <Alert>
          <AlertTitle>Nota simple</AlertTitle>
          <AlertDescription> Un alert sin icono, solo con título y descripción. </AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Cambios guardados</AlertTitle>
          <AlertDescription> Todos los cambios se aplicaron correctamente. </AlertDescription>
        </Alert>
      </div>
    </DocShowcase>

    <DocShowcase title="Solo descripción" :code="descOnlyCode">
      <div class="flex flex-col gap-3">
        <Alert variant="info">
          <AlertDescription>
            Este alert solo tiene descripción, sin título ni icono.
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertDescription>
            Recuerda guardar tus cambios antes de salir de la página.
          </AlertDescription>
        </Alert>
      </div>
    </DocShowcase>

    <AlertDemoRichContent />

    <DocShowcase title="Con clases personalizadas" :code="customClassCode">
      <Alert class="max-w-md border-dashed">
        <AlertTitle>Ancho limitado</AlertTitle>
        <AlertDescription>
          Este alert tiene <code class="bg-muted rounded px-1 py-0.5 text-xs">max-w-md</code>
          y borde discontinuo.
        </AlertDescription>
      </Alert>
    </DocShowcase>

    <DocPropsTable :props="alertProps" />
  </div>
</template>
