<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import { Progress } from '@3df-spa/ui';

// ─── Sección 1: Básico ─────────────────────────────────────
const basicValue = ref(33);

// ─── Sección 2: Animado con intervalo ──────────────────────
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

// ─── Sección 3: Controlado ─────────────────────────────────
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

// ─── Sección 4: Diferentes tamaños ─────────────────────────
const sizesValue = ref(55);

// ─── Sección 5: Colores custom ─────────────────────────────
const colorValue = ref(72);

// ─── Sección 6: Multiple progress bars ─────────────────────
const steps = ref([
  { label: 'Descarga', value: 100 },
  { label: 'Extracción', value: 78 },
  { label: 'Instalación', value: 45 },
  { label: 'Configuración', value: 12 },
]);
</script>

<template>
  <div class="space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold">Progress</h1>
      <p class="text-muted-foreground mt-2">
        Barra de progreso que muestra el avance de una operación.
        Basado en el primitivo Radix UI Progress.
      </p>
    </div>

    <!-- ─── 1. BÁSICO ──────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">1. Básico</h2>
      <p class="text-sm text-muted-foreground">
        Progreso estático al {{ basicValue }}%.
      </p>
      <Progress :model-value="basicValue" class="w-full max-w-md" />
    </section>

    <!-- ─── 2. ANIMADO ─────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">2. Animado</h2>
      <p class="text-sm text-muted-foreground">
        Transición suave con <code>duration-400</code>. Valor actual:
        <span class="font-mono font-medium">{{ animatedValue }}%</span>
      </p>
      <Progress :model-value="animatedValue" class="w-full max-w-md" />
    </section>

    <!-- ─── 3. CONTROLADO ──────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">3. Controlado</h2>
      <p class="text-sm text-muted-foreground">
        Controla el valor con botones. Actual:
        <span class="font-mono font-medium">{{ controlledValue }}%</span>
      </p>
      <Progress :model-value="controlledValue" class="w-full max-w-md" />
      <div class="flex gap-2">
        <button
          class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          @click="decrease"
        >
          − 10
        </button>
        <button
          class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          @click="increase"
        >
          + 10
        </button>
        <button
          class="rounded-md border px-3 py-1.5 text-sm"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </section>

    <!-- ─── 4. INDETERMINADO ───────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">4. Indeterminado</h2>
      <p class="text-sm text-muted-foreground">
        Sin valor definido — animación continua para estados de carga.
      </p>
      <Progress class="w-full max-w-md" />
    </section>

    <!-- ─── 5. TAMAÑOS ─────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">5. Tamaños personalizados</h2>
      <p class="text-sm text-muted-foreground">
        Ajusta la altura con clases de Tailwind.
      </p>
      <div class="space-y-3 max-w-md">
        <div>
          <span class="text-xs text-muted-foreground mb-1 block">Thin (h-1)</span>
          <Progress :model-value="sizesValue" class="h-1" />
        </div>
        <div>
          <span class="text-xs text-muted-foreground mb-1 block">Small (h-2)</span>
          <Progress :model-value="sizesValue" class="h-2" />
        </div>
        <div>
          <span class="text-xs text-muted-foreground mb-1 block">Default (h-4)</span>
          <Progress :model-value="sizesValue" />
        </div>
        <div>
          <span class="text-xs text-muted-foreground mb-1 block">Large (h-6)</span>
          <Progress :model-value="sizesValue" class="h-6" />
        </div>
      </div>
    </section>

    <!-- ─── 6. COLORES CUSTOM ──────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">6. Colores personalizados</h2>
      <p class="text-sm text-muted-foreground">
        Usa <code>indicatorClass</code> para sobrescribir el color del indicador.
      </p>
      <div class="space-y-3 max-w-md">
        <Progress :model-value="colorValue" indicator-class="bg-green-500" />
        <Progress :model-value="colorValue" indicator-class="bg-yellow-500" />
        <Progress :model-value="colorValue" indicator-class="bg-red-500" />
        <Progress :model-value="colorValue" indicator-class="bg-blue-500" />
      </div>
    </section>

    <!-- ─── 7. MÚLTIPLES PASOS ─────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">7. Pasos de instalación</h2>
      <p class="text-sm text-muted-foreground">
        Varias barras mostrando el progreso de cada paso.
      </p>
      <div class="space-y-3 max-w-md">
        <div v-for="step in steps" :key="step.label" class="space-y-1">
          <div class="flex items-center justify-between text-sm">
            <span>{{ step.label }}</span>
            <span class="font-mono text-muted-foreground">{{ step.value }}%</span>
          </div>
          <Progress
            :model-value="step.value"
            class="h-2"
            :indicator-class="step.value === 100 ? 'bg-green-500' : undefined"
          />
        </div>
      </div>
    </section>

    <!-- ─── 8. MAX PERSONALIZADO ───────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">8. Max personalizado</h2>
      <p class="text-sm text-muted-foreground">
        Progreso con <code>max="200"</code> — valor 150 = 75%.
      </p>
      <Progress :model-value="150" :max="200" class="w-full max-w-md" />
    </section>

    <!-- ─── 9. REFERENCIA DE PROPS ─────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">9. Referencia de Props</h2>
      <div class="overflow-x-auto">
        <table class="min-w-[500px] w-full text-sm border rounded-md">
          <thead>
            <tr class="border-b bg-muted/50">
              <th class="px-4 py-2 text-left font-medium">Prop</th>
              <th class="px-4 py-2 text-left font-medium">Tipo</th>
              <th class="px-4 py-2 text-left font-medium">Default</th>
              <th class="px-4 py-2 text-left font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2 font-mono">modelValue</td>
              <td class="px-4 py-2 font-mono">number | undefined</td>
              <td class="px-4 py-2 font-mono">undefined</td>
              <td class="px-4 py-2">Valor actual. undefined = indeterminado</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 font-mono">max</td>
              <td class="px-4 py-2 font-mono">number</td>
              <td class="px-4 py-2 font-mono">100</td>
              <td class="px-4 py-2">Valor máximo</td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2 font-mono">class</td>
              <td class="px-4 py-2 font-mono">ClassValue</td>
              <td class="px-4 py-2 font-mono">—</td>
              <td class="px-4 py-2">Clases CSS del contenedor raíz</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-mono">indicatorClass</td>
              <td class="px-4 py-2 font-mono">ClassValue</td>
              <td class="px-4 py-2 font-mono">—</td>
              <td class="px-4 py-2">Clases CSS del indicador de progreso</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>