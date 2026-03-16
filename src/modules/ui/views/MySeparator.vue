<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDocPage } from '@/i18n/composables/useDocPage';
import { Separator } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('separator');
const { t } = useI18n();

const separatorProps = computed<PropItem[]>(() => [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: propDesc('orientation'),
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description: propDesc('decorative'),
  },
]);

const horizontalCode = `<div class="space-y-1">
  <h3 class="text-sm leading-none font-medium">Radix Primitives</h3>
  <p class="text-muted-foreground text-sm">
    Un conjunto de componentes UI accesibles y sin estilos.
  </p>
</div>
<Separator class="my-4" />
<div class="flex h-5 items-center gap-4 text-sm">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`;

const verticalCode = `<div class="flex h-5 items-center gap-4 text-sm">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Configuración</span>
  <Separator orientation="vertical" />
  <span>Perfil</span>
  <Separator orientation="vertical" />
  <span>Ayuda</span>
</div>`;

const decorativeCode = `<Separator decorative />`;

const customCode = `<Separator class="h-0.5" />
<Separator class="bg-primary" />
<Separator class="my-6" />
<Separator class="border-border h-0 border-t border-dashed bg-transparent" />`;

const contextCode = `<div class="border-border bg-card max-w-sm rounded-lg border p-6 shadow-sm">
  <h3 class="text-base font-semibold">Cuenta</h3>
  <p class="text-muted-foreground mt-1 text-sm">Gestiona tu información personal.</p>
  <Separator class="my-4" />
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm">Nombre</span>
      <span class="text-muted-foreground text-sm">Pedro Duarte</span>
    </div>
    <Separator decorative />
    <div class="flex items-center justify-between">
      <span class="text-sm">Email</span>
      <span class="text-muted-foreground text-sm">pedro@example.com</span>
    </div>
    <Separator decorative />
    <div class="flex items-center justify-between">
      <span class="text-sm">Plan</span>
      <span class="text-muted-foreground text-sm">Pro</span>
    </div>
  </div>
</div>`;
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Separator"
      :description="description"
      import-code="import { Separator } from '@3df/ui'"
    />

    <DocShowcase :title="showcaseTitle('horizontal')" :code="horizontalCode">
      <div class="max-w-md">
        <div class="space-y-1">
          <h3 class="text-sm leading-none font-medium">Radix Primitives</h3>
          <p class="text-muted-foreground text-sm">
            {{ t('demo.uiComponents') }}
          </p>
        </div>
        <Separator class="my-4" />
        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('vertical')" :code="verticalCode">
      <div class="flex h-5 items-center gap-4 text-sm">
        <span>Home</span>
        <Separator orientation="vertical" />
        <span>{{ t('demo.configuration') }}</span>
        <Separator orientation="vertical" />
        <span>{{ t('demo.profile') }}</span>
        <Separator orientation="vertical" />
        <span>{{ t('demo.help') }}</span>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('decorative')"
      :description="showcaseDesc('decorative')"
      :code="decorativeCode"
    >
      <div class="max-w-md space-y-3">
        <p class="text-sm">{{ t('demo.firstContentBlock') }}</p>
        <Separator decorative />
        <p class="text-sm">{{ t('demo.secondContentBlock') }}</p>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('custom')" :code="customCode">
      <div class="flex max-w-md flex-col gap-6">
        <div>
          <p class="text-muted-foreground mb-2 text-sm">{{ t('demo.thicker') }}</p>
          <Separator class="h-0.5" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">{{ t('demo.customColor') }}</p>
          <Separator class="bg-primary" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">{{ t('demo.withAutoMargin') }}</p>
          <Separator class="my-6" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Dashed (border trick):</p>
          <Separator class="border-border h-0 border-t border-dashed bg-transparent" />
        </div>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('context')" :code="contextCode">
      <div class="border-border bg-card max-w-sm rounded-lg border p-6 shadow-sm">
        <h3 class="text-base font-semibold">{{ t('demo.account') }}</h3>
        <p class="text-muted-foreground mt-1 text-sm">{{ t('demo.managePersonalInfo') }}</p>
        <Separator class="my-4" />
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">{{ t('demo.name') }}</span>
            <span class="text-muted-foreground text-sm">Pedro Duarte</span>
          </div>
          <Separator decorative />
          <div class="flex items-center justify-between">
            <span class="text-sm">Email</span>
            <span class="text-muted-foreground text-sm">pedro@example.com</span>
          </div>
          <Separator decorative />
          <div class="flex items-center justify-between">
            <span class="text-sm">{{ t('demo.plan') }}</span>
            <span class="text-muted-foreground text-sm">Pro</span>
          </div>
        </div>
      </div>
    </DocShowcase>

    <DocPropsTable :props="separatorProps" />
  </div>
</template>
