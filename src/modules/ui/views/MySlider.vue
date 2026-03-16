<script setup lang="ts">
import { ref, computed } from 'vue';

import { Label, Slider } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('slider');

const basic = ref(50);
const volume = ref(75);
const brightness = ref(30);
const price = ref(250);
const disabled = ref(40);
const stepped = ref(25);
const custom = ref(60);

const sliderProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'number',
    default: '0',
    description: propDesc('modelValue'),
  },
  { name: 'min', type: 'number', default: '0', description: propDesc('min') },
  { name: 'max', type: 'number', default: '100', description: propDesc('max') },
  { name: 'step', type: 'number', default: '1', description: propDesc('step') },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const basicCode = `<Slider v-model="basic" />
<p class="text-muted-foreground text-sm">Valor: {{ basic }}</p>

<Label>Volumen</Label>
<Slider v-model="volume" />

<Label>Brillo</Label>
<Slider v-model="brightness" />`;

const stepCode = `<Slider v-model="stepped" :step="25" />
<div class="flex justify-between text-xs">
  <span>0%</span>
  <span>25%</span>
  <span>50%</span>
  <span>75%</span>
  <span>100%</span>
</div>`;

const rangeCode = `<Slider v-model="price" :min="0" :max="1000" :step="50" />
<div class="flex justify-between text-xs">
  <span>$0</span>
  <span>$500</span>
  <span>$1000</span>
</div>`;

const disabledCode = `<Slider v-model="disabled" :disabled="true" />
<Slider v-model="custom" class="h-3" />`;

const eqCode = `<div v-for="band in bands" :key="band.label" class="flex items-center gap-4">
  <span class="w-16 text-right text-xs">{{ band.label }}</span>
  <Slider :model-value="band.value" class="flex-1" />
  <span class="w-8 text-xs">{{ band.value }}%</span>
</div>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Slider"
      :description="description"
      import-code="import { Slider } from '@3df/ui'"
    />

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <div class="flex max-w-sm flex-col gap-6">
        <div class="flex flex-col gap-3">
          <Slider v-model="basic" />
          <p class="text-muted-foreground text-sm">Valor: {{ basic }}</p>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <Label>Volumen</Label>
            <span class="text-muted-foreground text-sm">{{ volume }}%</span>
          </div>
          <Slider v-model="volume" />
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <Label>Brillo</Label>
            <span class="text-muted-foreground text-sm">{{ brightness }}%</span>
          </div>
          <Slider v-model="brightness" />
        </div>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('withStep')" :description="showcaseDesc('withStep')" :code="stepCode">
      <div class="flex max-w-sm flex-col gap-3">
        <div class="flex items-center justify-between">
          <Label>Progreso</Label>
          <span class="text-muted-foreground text-sm">{{ stepped }}%</span>
        </div>
        <Slider v-model="stepped" :step="25" />
        <div class="text-muted-foreground flex justify-between text-xs">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('customRange')"
      :description="showcaseDesc('customRange')"
      :code="rangeCode"
    >
      <div class="flex max-w-sm flex-col gap-3">
        <div class="flex items-center justify-between">
          <Label>Precio máximo</Label>
          <span class="text-muted-foreground text-sm">${{ price }}</span>
        </div>
        <Slider v-model="price" :min="0" :max="1000" :step="50" />
        <div class="text-muted-foreground flex justify-between text-xs">
          <span>$0</span>
          <span>$500</span>
          <span>$1000</span>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('disabledCustom')" :code="disabledCode">
      <div class="flex max-w-sm flex-col gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <Label :disabled="true">Deshabilitado</Label>
            <span class="text-muted-foreground text-sm">{{ disabled }}%</span>
          </div>
          <Slider v-model="disabled" :disabled="true" />
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <Label>Personalizado</Label>
            <span class="text-muted-foreground text-sm">{{ custom }}%</span>
          </div>
          <Slider v-model="custom" class="h-3" />
        </div>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('eq')" :code="eqCode">
      <div
        class="bg-card border-border flex max-w-md flex-col gap-5 rounded-xl border p-6 shadow-sm"
      >
        <h3 class="text-sm font-semibold">Ecualizador de audio</h3>
        <div
          v-for="(band, i) in [
            { label: '60 Hz', value: 50 },
            { label: '250 Hz', value: 65 },
            { label: '1 kHz', value: 40 },
            { label: '4 kHz', value: 70 },
            { label: '16 kHz', value: 55 },
          ]"
          :key="i"
          class="flex items-center gap-4"
        >
          <span class="text-muted-foreground w-16 text-right text-xs">{{ band.label }}</span>
          <Slider :model-value="band.value" class="flex-1" />
          <span class="text-muted-foreground w-8 text-xs">{{ band.value }}%</span>
        </div>
      </div>
    </DocShowcase>

    <DocPropsTable :props="sliderProps" />
  </div>
</template>
