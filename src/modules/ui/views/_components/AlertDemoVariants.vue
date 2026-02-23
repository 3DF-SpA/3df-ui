<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';
</script>

<template>
  <DocShowcase title="Variantes con icono" code="">
    <div class="flex flex-col gap-4">
      <Alert>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
          />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
        <AlertTitle>Nota</AlertTitle>
        <AlertDescription>
          Este es un alert por defecto para mostrar información general al usuario.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <AlertTitle>¡Éxito!</AlertTitle>
        <AlertDescription>
          La operación se completó correctamente. Todos los cambios han sido guardados.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No se pudo conectar al servidor. Verifica tu conexión a internet e intenta de nuevo.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <AlertTitle>Advertencia</AlertTitle>
        <AlertDescription>
          Tu sesión expirará en 5 minutos. Guarda tus cambios antes de que se cierre.
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Hay una nueva versión disponible. Puedes actualizar desde la configuración.
        </AlertDescription>
      </Alert>
    </div>
  </DocShowcase>
</template>
