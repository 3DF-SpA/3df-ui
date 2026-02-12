<script setup lang="ts">
import { ref } from 'vue';

import { Label, Slider } from '@3df-spa/ui';

const basic = ref(50);
const volume = ref(75);
const brightness = ref(30);
const price = ref(250);
const disabled = ref(40);
const stepped = ref(25);
const custom = ref(60);
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Slider</h1>

    <!-- Básico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básico</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <Slider v-model="basic" />
        <p class="text-muted-foreground text-sm">Valor: {{ basic }}</p>
      </div>
    </section>

    <!-- Con Label -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con Label</h2>
      <div class="flex max-w-sm flex-col gap-4">
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
    </section>

    <!-- Con step -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con step (step=25)</h2>
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
    </section>

    <!-- Rango personalizado -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Rango personalizado (min=0, max=1000, step=50)</h2>
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
    </section>

    <!-- Disabled -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Disabled</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <div class="flex items-center justify-between">
          <Label :disabled="true">Deshabilitado</Label>
          <span class="text-muted-foreground text-sm">{{ disabled }}%</span>
        </div>
        <Slider v-model="disabled" :disabled="true" />
      </div>
    </section>

    <!-- Custom styling -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Override de estilos</h2>
      <div class="flex max-w-sm flex-col gap-3">
        <div class="flex items-center justify-between">
          <Label>Personalizado</Label>
          <span class="text-muted-foreground text-sm">{{ custom }}%</span>
        </div>
        <Slider v-model="custom" class="h-3" />
      </div>
    </section>

    <!-- Múltiples sliders en contexto -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">En contexto — Ecualizador</h2>
      <div class="bg-card border-border flex max-w-md flex-col gap-5 rounded-xl border p-6 shadow-sm">
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
    </section>
  </div>
</template>