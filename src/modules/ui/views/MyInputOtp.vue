<script setup lang="ts">
import { ref } from 'vue';

import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@3df-spa/ui';

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
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Input OTP</h1>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básico</h2>
      <p class="text-muted-foreground text-xs">Input OTP de 6 dígitos numéricos.</p>
      <InputOTP v-model="basicValue" :length="6">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
      <p class="text-muted-foreground text-xs">
        Valor: <code class="text-foreground">{{ basicValue || '(vacío)' }}</code>
      </p>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con separador</h2>
      <p class="text-muted-foreground text-xs">Grupos de 3 dígitos separados visualmente.</p>
      <InputOTP v-model="groupedValue" :length="6">
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
      </InputOTP>
      <p class="text-muted-foreground text-xs">
        Valor: <code class="text-foreground">{{ groupedValue || '(vacío)' }}</code>
      </p>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Separador personalizado</h2>
      <p class="text-muted-foreground text-xs">Separadores con guion como contenido personalizado.</p>
      <InputOTP v-model="groupedValue" :length="6">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
        </InputOTPGroup>
        <InputOTPSeparator>
          <span class="text-muted-foreground px-1">-</span>
        </InputOTPSeparator>
        <InputOTPGroup>
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
        </InputOTPGroup>
        <InputOTPSeparator>
          <span class="text-muted-foreground px-1">-</span>
        </InputOTPSeparator>
        <InputOTPGroup>
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Valor inicial</h2>
      <p class="text-muted-foreground text-xs">Input OTP con valor prellenado.</p>
      <InputOTP v-model="prefilledValue" :length="6">
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
      </InputOTP>
      <p class="text-muted-foreground text-xs">
        Valor: <code class="text-foreground">{{ prefilledValue }}</code>
      </p>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Patrón alfanumérico</h2>
      <p class="text-muted-foreground text-xs">Acepta letras y números (patrón alphanumeric).</p>
      <InputOTP v-model="alphanumericValue" :length="4" pattern="alphanumeric">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
        </InputOTPGroup>
      </InputOTP>
      <p class="text-muted-foreground text-xs">
        Valor: <code class="text-foreground">{{ alphanumericValue || '(vacío)' }}</code>
      </p>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Deshabilitado</h2>
      <p class="text-muted-foreground text-xs">Input OTP en estado disabled con valor parcial.</p>
      <InputOTP v-model="disabledValue" :length="4" disabled>
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
        </InputOTPGroup>
      </InputOTP>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Auto-submit</h2>
      <p class="text-muted-foreground text-xs">Emite el evento <code>complete</code> al llenar todos los campos.</p>
      <InputOTP v-model="completedValue" :length="4" auto-submit @complete="onComplete">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
        </InputOTPGroup>
      </InputOTP>
      <p v-if="completedMessage" class="text-sm font-medium text-green-600">
        {{ completedMessage }}
      </p>
      <p class="text-muted-foreground text-xs">
        Valor: <code class="text-foreground">{{ completedValue || '(vacío)' }}</code>
      </p>
    </section>
  </div>
</template>