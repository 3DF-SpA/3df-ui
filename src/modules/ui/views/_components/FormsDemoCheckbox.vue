<script setup lang="ts">
import { ref } from 'vue';

import { Checkbox, Label } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const terms = ref(false);
const newsletter = ref(true);
</script>

<template>
  <DocShowcase
    title="Checkbox"
    description="Casillas de verificación con estados: normal, checked y deshabilitado."
    code='<Checkbox id="terms" v-model="terms" />
<Label for="terms">Acepto los términos y condiciones</Label>'
  >
    <div class="grid max-w-md gap-4">
      <div class="flex items-center gap-2">
        <Checkbox id="terms" v-model="terms" />
        <Label for="terms">Acepto los términos y condiciones</Label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="newsletter" v-model="newsletter" />
        <Label for="newsletter">Recibir newsletter semanal</Label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="cb-disabled" disabled :model-value="true" />
        <Label for="cb-disabled" :disabled="true">Opción deshabilitada (checked)</Label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="cb-disabled2" disabled :model-value="false" />
        <Label for="cb-disabled2" :disabled="true">Opción deshabilitada (unchecked)</Label>
      </div>
    </div>
  </DocShowcase>
</template>
