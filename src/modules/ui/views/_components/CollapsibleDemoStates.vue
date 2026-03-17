<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const disabledCode = `<Collapsible disabled>
  <CollapsibleTrigger>
    <Button variant="ghost" size="sm" disabled>Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>No se puede abrir.</p>
  </CollapsibleContent>
</Collapsible>`;

const defaultOpenCode = `<Collapsible default-open>
  <CollapsibleTrigger>
    <template #default="{ open }">
      <Button variant="ghost" size="sm">{{ open ? 'Ocultar' : 'Mostrar' }}</Button>
    </template>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Visible desde el inicio.</p>
  </CollapsibleContent>
</Collapsible>`;
</script>

<template>
  <DocShowcase
    :title="t('demo.collapsible.disabledShowcase')"
    :description="t('demo.collapsible.disabledDesc')"
    :code="disabledCode"
  >
    <div class="mx-auto w-full max-w-sm">
      <Collapsible disabled class="space-y-2">
        <div class="flex items-center justify-between space-x-4">
          <h4 class="text-sm font-semibold opacity-50">{{ t('demo.collapsible.disabledSection') }}</h4>
          <CollapsibleTrigger>
            <Button variant="ghost" size="sm" class="w-9 p-0" disabled>
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
                class="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div class="border-border/60 rounded-md border p-4">
            <p class="text-sm">{{ t('demo.collapsible.disabledContent') }}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('demo.collapsible.defaultOpenShowcase')"
    :description="t('demo.collapsible.defaultOpenDesc')"
    :code="defaultOpenCode"
  >
    <div class="mx-auto w-full max-w-sm">
      <Collapsible default-open class="space-y-2">
        <div class="flex items-center justify-between space-x-4">
          <h4 class="text-sm font-semibold">{{ t('demo.collapsible.faqTitle') }}</h4>
          <CollapsibleTrigger>
            <template #default="{ open }">
              <Button variant="ghost" size="sm">
                {{ open ? t('common.hide') : t('common.show') }}
              </Button>
            </template>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div class="border-border/60 rounded-md border p-4">
            <p class="text-sm">{{ t('demo.collapsible.faqAnswer') }}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </DocShowcase>
</template>
