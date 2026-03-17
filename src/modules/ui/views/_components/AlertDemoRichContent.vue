<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Alert, AlertDescription, AlertTitle } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();
</script>

<template>
  <DocShowcase :title="t('demo.alert.richContentTitle')" code="">
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
      <AlertTitle>{{ t('demo.alert.validationErrors') }}</AlertTitle>
      <AlertDescription>
        <p>{{ t('demo.alert.errorsFound') }}</p>
        <ul class="mt-2 list-inside list-disc space-y-1">
          <li>{{ t('demo.alert.errorEmail') }}</li>
          <li>{{ t('demo.alert.errorPassword') }}</li>
          <li>{{ t('demo.alert.errorUsername') }}</li>
        </ul>
      </AlertDescription>
    </Alert>
  </DocShowcase>
</template>
