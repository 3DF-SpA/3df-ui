<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

function onAction(action: string) {
  alert(`Acción: ${action}`);
}

const codeSections = `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Mi cuenta</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem>Facturación</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Soporte</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem :disabled="true">Chat en vivo</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem :destructive="true">Eliminar cuenta</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
</script>

<template>
  <DocShowcase title="Con secciones (labels)" :code="codeSections">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          Mi cuenta
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-1 opacity-50"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @select="onAction('perfil')">{{ t('demo.profile') }}</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('facturación')">Facturación</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('equipo')">Equipo</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('suscripción')">Suscripción</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Soporte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @select="onAction('docs')">Documentación</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('api')">API Reference</DropdownMenuItem>
        <DropdownMenuItem :disabled="true">Chat en vivo</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem :destructive="true" @select="onAction('eliminar cuenta')">
          {{ t('demo.deleteAccount') }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </DocShowcase>
</template>
