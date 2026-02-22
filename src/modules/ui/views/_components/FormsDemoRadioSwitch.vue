<script setup lang="ts">
import { ref } from 'vue';

import { Label, Radio, Switch } from '@3df-spa/ui';

const plan = ref('pro');
const contact = ref('email');
const notifications = ref(true);
const darkMode = ref(false);
const marketing = ref(true);
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Radio</h2>
    <div class="grid max-w-md gap-4">
      <p class="text-sm font-medium">Plan</p>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Radio id="plan-free" v-model="plan" value="free" name="plan" />
          <Label for="plan-free">Free</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="plan-pro" v-model="plan" value="pro" name="plan" />
          <Label for="plan-pro">Pro — $9/mes</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="plan-enterprise" v-model="plan" value="enterprise" name="plan" />
          <Label for="plan-enterprise">Enterprise — $29/mes</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="plan-disabled" value="custom" name="plan" disabled />
          <Label for="plan-disabled" :disabled="true">Custom (no disponible)</Label>
        </div>
      </div>
      <p class="text-sm font-medium">Contacto preferido</p>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Radio id="contact-email" v-model="contact" value="email" name="contact" />
          <Label for="contact-email">Email</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="contact-phone" v-model="contact" value="phone" name="contact" />
          <Label for="contact-phone">Teléfono</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="contact-sms" v-model="contact" value="sms" name="contact" />
          <Label for="contact-sms">SMS</Label>
        </div>
      </div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Switch</h2>
    <div class="grid max-w-md gap-4">
      <div class="flex items-center justify-between">
        <Label for="notifications">Notificaciones</Label>
        <Switch id="notifications" v-model="notifications" />
      </div>
      <div class="flex items-center justify-between">
        <Label for="dark-mode">Modo oscuro</Label>
        <Switch id="dark-mode" v-model="darkMode" />
      </div>
      <div class="flex items-center justify-between">
        <Label for="marketing">Emails de marketing</Label>
        <Switch id="marketing" v-model="marketing" />
      </div>
      <div class="flex items-center justify-between">
        <Label for="switch-disabled" :disabled="true">Deshabilitado</Label>
        <Switch id="switch-disabled" disabled :model-value="false" />
      </div>
    </div>
  </section>
</template>
