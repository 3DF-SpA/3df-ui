<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Button, toast } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const codeTitleDesc = `toast.success({
  title: 'Guardado',
  description: 'Tus cambios han sido guardados correctamente.',
})

toast.error({
  title: 'Error de red',
  description: 'No se pudo conectar al servidor.',
})`;

const codeAction = `toast.error({
  title: 'Archivo eliminado',
  description: 'El archivo ha sido eliminado permanentemente.',
  action: {
    label: 'Deshacer',
    onClick: () => toast.success('Archivo restaurado'),
  },
})`;
</script>

<template>
  <DocShowcase :title="t('demo.sonner.withTitleTitle')" :code="codeTitleDesc">
    <div class="flex flex-wrap gap-3">
      <Button
        variant="outline"
        @click="
          toast.success({
            title: t('demo.sonner.savedTitle'),
            description: t('demo.sonner.savedDesc'),
          })
        "
      >
        {{ t('demo.successWithTitle') }}
      </Button>
      <Button
        variant="outline"
        @click="
          toast.error({
            title: t('demo.sonner.errorNetTitle'),
            description: t('demo.sonner.errorNetDesc'),
          })
        "
      >
        {{ t('demo.sonner.errorWithTitle') }}
      </Button>
      <Button
        variant="outline"
        @click="
          toast.warning({
            title: t('demo.sonner.warningExpireTitle'),
            description: t('demo.sonner.warningExpireDesc'),
          })
        "
      >
        {{ t('demo.sonner.warningWithTitle') }}
      </Button>
      <Button
        variant="outline"
        @click="
          toast.info({
            title: t('demo.sonner.infoUpdateTitle'),
            description: t('demo.sonner.infoUpdateDesc'),
          })
        "
      >
        {{ t('demo.sonner.infoWithTitle') }}
      </Button>
    </div>
  </DocShowcase>

  <DocShowcase :title="t('demo.sonner.withActionTitle')" :code="codeAction">
    <div class="flex flex-wrap gap-3">
      <Button
        variant="outline"
        @click="
          toast.error({
            title: t('demo.sonner.fileDeletedTitle'),
            description: t('demo.sonner.fileDeletedDesc'),
            action: {
              label: t('demo.sonner.undoAction'),
              onClick: () => toast.success(t('demo.sonner.fileRestored')),
            },
          })
        "
      >
        {{ t('demo.sonner.actionBtn') }}
      </Button>
      <Button
        variant="outline"
        @click="
          toast.info({
            title: t('demo.newChanges'),
            description: t('demo.sonner.changesDetected'),
            action: {
              label: t('demo.viewChanges'),
              onClick: () => toast(t('demo.sonner.openingDiff')),
            },
          })
        "
      >
        {{ t('demo.sonner.infoAction') }}
      </Button>
    </div>
  </DocShowcase>
</template>
