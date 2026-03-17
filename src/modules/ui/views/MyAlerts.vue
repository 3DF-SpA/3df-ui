<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Alert, AlertDescription, AlertTitle } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import AlertDemoRichContent from './_components/AlertDemoRichContent.vue';
import AlertDemoVariants from './_components/AlertDemoVariants.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('alerts');
const { t } = useI18n();

const alertProps = computed<PropItem[]>(() => [
  {
    name: 'variant',
    type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
    default: "'default'",
    description: propDesc('variant'),
  },
]);

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
      :description="description"
      import-code="import { Alert, AlertTitle, AlertDescription } from '@3df/ui'"
    />

    <AlertDemoVariants />

    <DocShowcase :title="showcaseTitle('noIcon')" :code="noIconCode">
      <div class="flex flex-col gap-3">
        <Alert>
          <AlertTitle>{{ t('demo.alert.simpleNote') }}</AlertTitle>
          <AlertDescription>{{ t('demo.alert.simpleNoteDesc') }}</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>{{ t('demo.alert.changesSaved') }}</AlertTitle>
          <AlertDescription>{{ t('demo.alert.changesSavedDesc') }}</AlertDescription>
        </Alert>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('descOnly')" :code="descOnlyCode">
      <div class="flex flex-col gap-3">
        <Alert variant="info">
          <AlertDescription>{{ t('demo.alert.descOnlyInfo') }}</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertDescription>{{ t('demo.alert.rememberSave') }}</AlertDescription>
        </Alert>
      </div>
    </DocShowcase>

    <AlertDemoRichContent />

    <DocShowcase :title="showcaseTitle('customClasses')" :code="customClassCode">
      <Alert class="max-w-md border-dashed">
        <AlertTitle>{{ t('demo.alert.limitedWidth') }}</AlertTitle>
        <AlertDescription>
          {{ t('demo.alert.limitedWidthPre') }}
          <code class="bg-muted rounded px-1 py-0.5 text-xs">max-w-md</code>
          {{ t('demo.alert.limitedWidthPost') }}
        </AlertDescription>
      </Alert>
    </DocShowcase>

    <DocPropsTable :props="alertProps" />
  </div>
</template>
