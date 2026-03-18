<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@3df-spa/ui';

import SidebarDemoCompletePanel from './SidebarDemoCompletePanel.vue';

const { t } = useI18n();
const activeItem = ref('Dashboard');
const activeSubItem = ref('');
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      {{ t('demo.sidebar.completeTitle') }}
    </h2>
    <p class="text-muted-foreground max-w-prose text-sm">
      {{ t('demo.sidebar.completeDesc') }}
      <kbd class="border-border bg-muted rounded border px-1.5 py-0.5 font-mono text-xs"
        >Ctrl+B</kbd
      >
    </p>

    <div class="border-border h-[560px] overflow-hidden rounded-lg border [contain:paint]">
      <SidebarProvider :default-open="true" side="left" collapsible="offcanvas">
        <SidebarDemoCompletePanel
          v-model:active-item="activeItem"
          v-model:active-sub-item="activeSubItem"
        />

        <SidebarInset>
          <header class="border-border flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span class="text-sm font-medium">{{ activeItem }}</span>
            <span v-if="activeSubItem" class="text-muted-foreground text-sm"
              >/ {{ activeSubItem }}</span
            >
          </header>
          <div class="flex-1 p-6">
            <p class="text-muted-foreground text-sm">
              {{ t('demo.sidebar.completeContent') }}
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
</template>
