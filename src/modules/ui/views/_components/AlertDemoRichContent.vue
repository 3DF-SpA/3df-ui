<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';
</script>

<template>
  <DocShowcase title="Contenido rico" code="">
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
      <AlertTitle>Errores de validación</AlertTitle>
      <AlertDescription>
        <p>Se encontraron los siguientes errores:</p>
        <ul class="mt-2 list-inside list-disc space-y-1">
          <li>El campo email es requerido</li>
          <li>La contraseña debe tener al menos 8 caracteres</li>
          <li>El nombre de usuario ya está en uso</li>
        </ul>
      </AlertDescription>
    </Alert>
  </DocShowcase>
</template>
