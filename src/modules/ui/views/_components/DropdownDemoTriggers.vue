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
  <DocShowcase :title="t('demo.dropdown.triggersTitle')" :code="codeTriggers">
    <div class="flex flex-wrap items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Primary trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>{{ t('demo.dropdown.action1') }}</DropdownMenuItem>
          <DropdownMenuItem>{{ t('demo.dropdown.action2') }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary">Secondary trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>{{ t('demo.dropdown.action1') }}</DropdownMenuItem>
          <DropdownMenuItem>{{ t('demo.dropdown.action2') }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="destructive">Danger trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem :destructive="true">{{ t('demo.dropdown.confirmDeletion') }}</DropdownMenuItem>
          <DropdownMenuItem>{{ t('common.cancel') }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger v-slot="{ open }">
          <Button variant="ghost" size="sm">
            {{ open ? t('common.close') : t('demo.ghostTrigger') }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>{{ t('demo.dropdown.triggerChangesText') }}</DropdownMenuItem>
          <DropdownMenuItem>{{ t('demo.dropdown.accordingToState') }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </DocShowcase>
</template>
