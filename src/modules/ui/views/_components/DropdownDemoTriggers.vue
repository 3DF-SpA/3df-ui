<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const codeTriggers = `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Primary trigger</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Acción 1</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<!-- El slot expone { open } para estado reactivo -->
<DropdownMenuTrigger v-slot="{ open }">
  <Button variant="ghost" size="sm">
    {{ open ? 'Cerrar' : 'Abrir' }}
  </Button>
</DropdownMenuTrigger>`;
</script>

<template>
  <DocShowcase title="Variantes de trigger" :code="codeTriggers">
    <div class="flex flex-wrap items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Primary trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Acción 1</DropdownMenuItem>
          <DropdownMenuItem>Acción 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary">Secondary trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Acción 1</DropdownMenuItem>
          <DropdownMenuItem>Acción 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="destructive">Danger trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem :destructive="true">Confirmar eliminación</DropdownMenuItem>
          <DropdownMenuItem>Cancelar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger v-slot="{ open }">
          <Button variant="ghost" size="sm">
            {{ open ? t('common.close') : t('demo.ghostTrigger') }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>El trigger cambia de texto</DropdownMenuItem>
          <DropdownMenuItem>según el estado</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </DocShowcase>
</template>
