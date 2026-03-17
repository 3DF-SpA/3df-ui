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
  alert(t('demo.dropdown.action', { action }));
}

const codeSections = `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">My account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Support</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem :disabled="true">Live chat</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem :destructive="true">Delete account</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
</script>

<template>
  <DocShowcase :title="t('demo.dropdown.sectionsTitle')" :code="codeSections">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          {{ t('demo.dropdown.myAccount') }}
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
        <DropdownMenuLabel>{{ t('demo.dropdown.myAccount') }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @select="onAction('perfil')">{{ t('demo.profile') }}</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('facturación')">{{ t('demo.dropdown.billing') }}</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('equipo')">{{ t('demo.dropdown.team') }}</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('suscripción')">{{ t('demo.dropdown.subscription') }}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{{ t('demo.dropdown.support') }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @select="onAction('docs')">{{ t('demo.dropdown.documentation') }}</DropdownMenuItem>
        <DropdownMenuItem @select="onAction('api')">API Reference</DropdownMenuItem>
        <DropdownMenuItem :disabled="true">{{ t('demo.dropdown.liveChat') }}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem :destructive="true" @select="onAction('eliminar cuenta')">
          {{ t('demo.deleteAccount') }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </DocShowcase>
</template>
