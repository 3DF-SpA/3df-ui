<script setup lang="ts">
import { Button, toast } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

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
  <DocShowcase title="Con título y descripción" :code="codeTitleDesc">
    <div class="flex flex-wrap gap-3">
      <Button
        variant="outline"
        @click="
          toast.success({
            title: 'Guardado',
            description: 'Tus cambios han sido guardados correctamente.',
          })
        "
      >
        Éxito con título
      </Button>
      <Button
        variant="outline"
        @click="
          toast.error({
            title: 'Error de red',
            description: 'No se pudo conectar al servidor. Verifica tu conexión.',
          })
        "
      >
        Error con título
      </Button>
      <Button
        variant="outline"
        @click="
          toast.warning({
            title: 'Sesión por expirar',
            description: 'Tu sesión expirará en 5 minutos.',
          })
        "
      >
        Warning con título
      </Button>
      <Button
        variant="outline"
        @click="
          toast.info({
            title: 'Actualización disponible',
            description: 'Hay una nueva versión disponible. Actualiza cuando puedas.',
          })
        "
      >
        Info con título
      </Button>
    </div>
  </DocShowcase>

  <DocShowcase title="Con acción" :code="codeAction">
    <div class="flex flex-wrap gap-3">
      <Button
        variant="outline"
        @click="
          toast.error({
            title: 'Archivo eliminado',
            description: 'El archivo ha sido eliminado permanentemente.',
            action: {
              label: 'Deshacer',
              onClick: () => toast.success('Archivo restaurado'),
            },
          })
        "
      >
        Con botón de acción
      </Button>
      <Button
        variant="outline"
        @click="
          toast.info({
            title: 'Nuevos cambios',
            description: 'Se detectaron cambios en el repositorio.',
            action: {
              label: 'Ver cambios',
              onClick: () => toast('Abriendo diff...'),
            },
          })
        "
      >
        Acción informativa
      </Button>
    </div>
  </DocShowcase>
</template>
