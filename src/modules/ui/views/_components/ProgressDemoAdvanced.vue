<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Progress } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();
const sizesValue = ref(55);
const colorValue = ref(72);

const steps = ref([
  { label: 'Descarga', value: 100 },
  { label: 'Extracción', value: 78 },
  { label: 'Instalación', value: 45 },
  { label: 'Configuración', value: 12 },
]);

const sizesCode = `<Progress :model-value="55" class="h-1" />
<Progress :model-value="55" class="h-2" />
<Progress :model-value="55" />
<Progress :model-value="55" class="h-6" />`;

const colorsCode = `<Progress :model-value="72" indicator-class="bg-green-500" />
<Progress :model-value="72" indicator-class="bg-yellow-500" />
<Progress :model-value="72" indicator-class="bg-red-500" />
<Progress :model-value="72" indicator-class="bg-blue-500" />`;

const stepsCode = `const steps = ref([
  { label: 'Descarga', value: 100 },
  { label: 'Extracción', value: 78 },
  { label: 'Instalación', value: 45 },
  { label: 'Configuración', value: 12 },
]);

<div v-for="step in steps" :key="step.label">
  <Progress
    :model-value="step.value"
    class="h-2"
    :indicator-class="step.value === 100 ? 'bg-green-500' : undefined"
  />
</div>`;

const maxCode = `<Progress :model-value="150" :max="200" class="w-full max-w-md" />`;
</script>

<template>
  <DocShowcase
    :title="t('demo.customSizes')"
    description="Ajusta la altura con clases de Tailwind."
    :code="sizesCode"
  >
    <div class="max-w-md space-y-3">
      <div>
        <span class="text-muted-foreground mb-1 block text-xs">Thin (h-1)</span>
        <Progress :model-value="sizesValue" class="h-1" />
      </div>
      <div>
        <span class="text-muted-foreground mb-1 block text-xs">Small (h-2)</span>
        <Progress :model-value="sizesValue" class="h-2" />
      </div>
      <div>
        <span class="text-muted-foreground mb-1 block text-xs">Default (h-4)</span>
        <Progress :model-value="sizesValue" />
      </div>
      <div>
        <span class="text-muted-foreground mb-1 block text-xs">Large (h-6)</span>
        <Progress :model-value="sizesValue" class="h-6" />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('demo.customColors')"
    description="Usa indicatorClass para sobrescribir el color del indicador."
    :code="colorsCode"
  >
    <div class="max-w-md space-y-3">
      <Progress :model-value="colorValue" indicator-class="bg-green-500" />
      <Progress :model-value="colorValue" indicator-class="bg-yellow-500" />
      <Progress :model-value="colorValue" indicator-class="bg-red-500" />
      <Progress :model-value="colorValue" indicator-class="bg-blue-500" />
    </div>
  </DocShowcase>

  <DocShowcase
    title="Pasos de instalación"
    description="Varias barras mostrando el progreso de cada paso."
    :code="stepsCode"
  >
    <div class="max-w-md space-y-3">
      <div v-for="step in steps" :key="step.label" class="space-y-1">
        <div class="flex items-center justify-between text-sm">
          <span>{{ step.label }}</span>
          <span class="text-muted-foreground font-mono">{{ step.value }}%</span>
        </div>
        <Progress
          :model-value="step.value"
          class="h-2"
          :indicator-class="step.value === 100 ? 'bg-green-500' : undefined"
        />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    title="Max personalizado"
    description="Progreso con max=200 — valor 150 = 75%."
    :code="maxCode"
  >
    <Progress :model-value="150" :max="200" class="w-full max-w-md" />
  </DocShowcase>
</template>
