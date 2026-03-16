<script setup lang="ts">
import { ref } from 'vue';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const basicValue = ref('');
const groupedValue = ref('');
const prefilledValue = ref('123456');
const alphanumericValue = ref('');
const disabledValue = ref('48');
const completedValue = ref('');
const completedMessage = ref('');

function onComplete(value: string) {
  completedMessage.value = `Código recibido: ${value}`;
}

const inputOtpProps: PropItem[] = [
  {
    name: 'modelValue',
    type: 'string',
    default: "''",
    description: 'Valor OTP completo (v-model)',
  },
  { name: 'length', type: 'number', default: '6', description: 'Número total de slots' },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita todos los slots',
  },
  {
    name: 'pattern',
    type: "'numeric' | 'alphanumeric' | 'alpha' | RegExp",
    default: "'numeric'",
    description: 'Patrón de validación por carácter',
  },
  {
    name: 'autoSubmit',
    type: 'boolean',
    default: 'false',
    description: 'Emite evento complete al llenar todos los slots',
  },
];

const basicAndSeparatorCode = `<InputOTP v-model="value" :length="6">
  <InputOTPGroup>
    <InputOTPSlot v-for="i in 6" :key="i" :index="i - 1" />
  </InputOTPGroup>
</InputOTP>

<!-- Con separador -->
<InputOTP v-model="value" :length="6">
  <InputOTPGroup>
    <InputOTPSlot :index="0" /> <InputOTPSlot :index="1" /> <InputOTPSlot :index="2" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot :index="3" /> <InputOTPSlot :index="4" /> <InputOTPSlot :index="5" />
  </InputOTPGroup>
</InputOTP>`;

const customSeparatorAndPrefilledCode = `<InputOTPSeparator>
  <span class="text-muted-foreground px-1">-</span>
</InputOTPSeparator>

<InputOTP v-model="prefilledValue" :length="6">
  <InputOTPGroup> ... </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup> ... </InputOTPGroup>
</InputOTP>`;

const alphanumericAndDisabledCode = `<InputOTP v-model="value" :length="4" pattern="alphanumeric">
  <InputOTPGroup>
    <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
  </InputOTPGroup>
</InputOTP>

<InputOTP v-model="value" :length="4" disabled>
  <InputOTPGroup>
    <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
  </InputOTPGroup>
</InputOTP>`;

const autoSubmitCode = `<InputOTP v-model="value" :length="4" auto-submit @complete="onComplete">
  <InputOTPGroup>
    <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
  </InputOTPGroup>
</InputOTP>`;

const anatomyCode = `<InputOTP v-model="value" :length="6">
  <InputOTPGroup>
    <InputOTPSlot :index="0" />
    <InputOTPSlot :index="1" />
    <InputOTPSlot :index="2" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot :index="3" />
    <InputOTPSlot :index="4" />
    <InputOTPSlot :index="5" />
  </InputOTPGroup>
</InputOTP>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Input OTP"
      description="Campo de entrada para códigos de verificación de un solo uso (OTP). Soporta agrupación, separadores y auto-submit."
      import-code="import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@3df/ui'"
    />

    <DocShowcase
      title="Básico y con separador"
      description="Input OTP de 6 dígitos sin y con separador visual."
      :code="basicAndSeparatorCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">Sin separador</p>
          <InputOTP v-model="basicValue" :length="6">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 6" :key="i" :index="i - 1" />
            </InputOTPGroup>
          </InputOTP>
          <p class="text-muted-foreground text-xs">
            Valor: <code class="text-foreground">{{ basicValue || '(vacío)' }}</code>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">Con separador</p>
          <InputOTP v-model="groupedValue" :length="6">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 3" :key="i" :index="i - 1" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 3" :key="i + 3" :index="i + 2" />
            </InputOTPGroup>
          </InputOTP>
          <p class="text-muted-foreground text-xs">
            Valor: <code class="text-foreground">{{ groupedValue || '(vacío)' }}</code>
          </p>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Separador personalizado y valor inicial"
      description="Separadores con contenido personalizado e input con valor prellenado."
      :code="customSeparatorAndPrefilledCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">Separador personalizado</p>
          <InputOTP v-model="groupedValue" :length="6">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 2" :key="i" :index="i - 1" />
            </InputOTPGroup>
            <InputOTPSeparator><span class="text-muted-foreground px-1">-</span></InputOTPSeparator>
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 2" :key="i + 2" :index="i + 1" />
            </InputOTPGroup>
            <InputOTPSeparator><span class="text-muted-foreground px-1">-</span></InputOTPSeparator>
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 2" :key="i + 4" :index="i + 3" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">Valor inicial</p>
          <InputOTP v-model="prefilledValue" :length="6">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 3" :key="i" :index="i - 1" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 3" :key="i + 3" :index="i + 2" />
            </InputOTPGroup>
          </InputOTP>
          <p class="text-muted-foreground text-xs">
            Valor: <code class="text-foreground">{{ prefilledValue }}</code>
          </p>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Patrón alfanumérico y deshabilitado"
      description="Acepta letras y números, o deshabilita la interacción."
      :code="alphanumericAndDisabledCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">Alfanumérico</p>
          <InputOTP v-model="alphanumericValue" :length="4" pattern="alphanumeric">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
            </InputOTPGroup>
          </InputOTP>
          <p class="text-muted-foreground text-xs">
            Valor: <code class="text-foreground">{{ alphanumericValue || '(vacío)' }}</code>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">Deshabilitado (valor parcial)</p>
          <InputOTP v-model="disabledValue" :length="4" disabled>
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Auto-submit"
      description="Emite el evento complete al llenar todos los campos."
      :code="autoSubmitCode"
    >
      <div class="flex flex-col gap-2">
        <InputOTP v-model="completedValue" :length="4" auto-submit @complete="onComplete">
          <InputOTPGroup>
            <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
          </InputOTPGroup>
        </InputOTP>
        <p v-if="completedMessage" class="text-sm font-medium text-green-600">
          {{ completedMessage }}
        </p>
        <p class="text-muted-foreground text-xs">
          Valor: <code class="text-foreground">{{ completedValue || '(vacío)' }}</code>
        </p>
      </div>
    </DocShowcase>

    <DocPropsTable :props="inputOtpProps" />

    <div class="flex flex-col gap-3">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" language="vue" />
    </div>
  </div>
</template>
