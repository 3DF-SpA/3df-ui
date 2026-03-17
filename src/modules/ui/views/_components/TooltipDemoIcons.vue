<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const codeIcons = `<Tooltip>
  <TooltipTrigger>
    <Button variant="outline" size="icon">
      <DownloadIcon class="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Download file</TooltipContent>
</Tooltip>`;
</script>

<template>
  <DocShowcase :title="t('demo.tooltip.iconButtons')" :code="codeIcons">
    <div class="flex gap-3">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{{ t('demo.downloadFile') }}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon">
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
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{{ t('demo.copyToClipboard') }}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon">
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
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{{ t('demo.deleteElement') }}</TooltipContent>
      </Tooltip>
    </div>
  </DocShowcase>
</template>
