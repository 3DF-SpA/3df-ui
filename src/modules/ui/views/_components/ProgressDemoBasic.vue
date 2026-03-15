<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { Progress } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const basicValue = ref(33);

const animatedValue = ref(0);
let animTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  animTimer = setInterval(() => {
    animatedValue.value = animatedValue.value >= 100 ? 0 : animatedValue.value + 1;
  }, 80);
});

onBeforeUnmount(() => {
  clearInterval(animTimer);
});

const controlledValue = ref(60);

function increase() {
  controlledValue.value = Math.min(100, controlledValue.value + 10);
}

function decrease() {
  controlledValue.value = Math.max(0, controlledValue.value - 10);
}

function reset() {
  controlledValue.value = 0;
}

const basicCode = `<Progress :model-value="33" class="w-full max-w-md" />`;

const animatedCode = `const animatedValue = ref(0);

setInterval(() => {
  animatedValue.value = animatedValue.value >= 100 ? 0 : animatedValue.value + 1;
}, 80);

<Progress :model-value="animatedValue" class="w-full max-w-md" />`;

const controlledCode = `const value = ref(60);

<Progress :model-value="value" class="w-full max-w-md" />
<button @click="value = Math.min(100, value + 10)">+ 10</button>
<button @click="value = Math.max(0, value - 10)">− 10</button>
<button @click="value = 0">Reset</button>`;

const indeterminateCode = `<Progress class="w-full max-w-md" />`;
</script>

<template>
  <DocShowcase
    title="Básico"
    :description="`Progreso estático al ${basicValue}%.`"
    :code="basicCode"
  >
    <Progress :model-value="basicValue" class="w-full max-w-md" />
  </DocShowcase>

  <DocShowcase
    title="Animado"
    :description="`Transición suave con duration-400. Valor actual: ${animatedValue}%`"
    :code="animatedCode"
  >
    <Progress :model-value="animatedValue" class="w-full max-w-md" />
  </DocShowcase>

  <DocShowcase
    title="Controlado"
    :description="`Controla el valor con botones. Actual: ${controlledValue}%`"
    :code="controlledCode"
  >
    <div class="flex flex-col gap-3">
      <Progress :model-value="controlledValue" class="w-full max-w-md" />
      <div class="flex gap-2">
        <button
          class="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm"
          @click="decrease"
        >
          − 10
        </button>
        <button
          class="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm"
          @click="increase"
        >
          + 10
        </button>
        <button class="rounded-md border px-3 py-1.5 text-sm" @click="reset">Reset</button>
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    title="Indeterminado"
    description="Sin valor definido — animación continua para estados de carga."
    :code="indeterminateCode"
  >
    <Progress class="w-full max-w-md" />
  </DocShowcase>
</template>
