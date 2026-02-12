<script setup lang="ts">
import { ref } from 'vue';

import { Button, Toaster, toast } from '@3df-spa/ui';

const position = ref<
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
>('bottom-right');

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Sonner — Toast Notifications</h1>

    <!-- Toaster global -->
    <Toaster :position="position" />

    <!-- Variantes -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Variantes</h2>
      <div class="flex flex-wrap gap-3">
        <Button variant="outline" @click="toast('Este es un toast por defecto')"> Default </Button>
        <Button variant="outline" @click="toast.success('Operación completada exitosamente')">
          Success
        </Button>
        <Button variant="outline" @click="toast.error('Algo salió mal, intenta de nuevo')">
          Error
        </Button>
        <Button variant="outline" @click="toast.warning('Ten cuidado con esta acción')">
          Warning
        </Button>
        <Button variant="outline" @click="toast.info('Aquí tienes información útil')">
          Info
        </Button>
      </div>
    </section>

    <!-- Con título y descripción -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con título y descripción</h2>
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
    </section>

    <!-- Con acción -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con acción</h2>
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
    </section>

    <!-- Duración personalizada -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Duración personalizada</h2>
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="toast({ description: 'Me voy en 1.5 segundos', duration: 1500 })"
        >
          1.5s
        </Button>
        <Button
          variant="outline"
          @click="toast({ description: 'Me quedo 10 segundos', duration: 10000 })"
        >
          10s
        </Button>
        <Button
          variant="outline"
          @click="
            toast({
              title: 'Persistente',
              description: 'Solo se cierra manualmente.',
              duration: 0,
            })
          "
        >
          Persistente (∞)
        </Button>
      </div>
    </section>

    <!-- Posición -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        Posición — <span class="text-foreground font-mono">{{ position }}</span>
      </h2>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="pos in positions"
          :key="pos"
          :variant="position === pos ? 'default' : 'outline'"
          size="sm"
          @click="position = pos"
        >
          {{ pos }}
        </Button>
      </div>
      <div>
        <Button variant="outline" @click="toast.success('¡Mira la posición!')">
          Probar posición
        </Button>
      </div>
    </section>

    <!-- No dismissible -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">No dismissible</h2>
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="
            toast({
              title: 'Procesando...',
              description: 'Esta notificación no se puede cerrar manualmente.',
              dismissible: false,
              duration: 3000,
            })
          "
        >
          Sin botón de cerrar
        </Button>
      </div>
    </section>

    <!-- Dismiss programático -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Control programático</h2>
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="
            () => {
              toast.success({ description: 'Toast 1', duration: 15000 });
              toast.info({ description: 'Toast 2', duration: 15000 });
              toast.warning({ description: 'Toast 3', duration: 15000 });
            }
          "
        >
          Crear 3 toasts
        </Button>
        <Button variant="destructive" @click="toast.dismissAll()"> Cerrar todos </Button>
      </div>
    </section>

    <!-- Hover pausa -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Hover pausa el timer</h2>
      <p class="text-muted-foreground max-w-md text-sm">
        Al pasar el mouse sobre un toast, el temporizador de auto-cierre se pausa. Al quitar el
        mouse, se reanuda.
      </p>
      <div>
        <Button
          variant="outline"
          @click="
            toast.info({
              title: 'Pasa el mouse encima',
              description: 'El timer se pausa mientras mantengas el hover.',
              duration: 5000,
            })
          "
        >
          Probar hover
        </Button>
      </div>
    </section>
  </div>
</template>
