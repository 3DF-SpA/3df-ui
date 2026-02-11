<script setup lang="ts">
import { ref } from 'vue';

import { Badge, Item, ItemDescription, ItemLabel, Switch } from '@3df/ui';

const wifiEnabled = ref(true);
const bluetoothEnabled = ref(false);
const darkMode = ref(false);
const notifications = ref(true);

function onAction(action: string) {
  alert(`Acción: ${action}`);
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Item (Generic List Item)</h1>

    <!-- 1. Items de navegación -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Items de navegación</h2>
      <div class="border-border w-full max-w-md rounded-lg border">
        <Item as="button" class="rounded-b-none" @click="onAction('Profile')">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </template>
          <ItemLabel>Profile</ItemLabel>
          <ItemDescription>Manage your account settings</ItemDescription>
          <template #end>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
          </template>
        </Item>

        <Item as="button" @click="onAction('Security')">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </template>
          <ItemLabel>Security</ItemLabel>
          <ItemDescription>Password, 2FA, sessions</ItemDescription>
          <template #end>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
          </template>
        </Item>

        <Item as="button" class="rounded-t-none" @click="onAction('Billing')">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
          </template>
          <ItemLabel>Billing</ItemLabel>
          <ItemDescription>Plans, invoices, payment methods</ItemDescription>
          <template #end>
            <Badge variant="outline">Pro</Badge>
          </template>
        </Item>
      </div>
    </section>

    <!-- 2. Items con switch (settings) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Settings con Switch</h2>
      <div class="border-border w-full max-w-md rounded-lg border">
        <Item>
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" x2="12.01" y1="20" y2="20" /></svg>
          </template>
          <ItemLabel>Wi-Fi</ItemLabel>
          <ItemDescription>{{ wifiEnabled ? 'Connected' : 'Disconnected' }}</ItemDescription>
          <template #end>
            <Switch v-model="wifiEnabled" />
          </template>
        </Item>

        <Item>
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
          </template>
          <ItemLabel>Bluetooth</ItemLabel>
          <ItemDescription>{{ bluetoothEnabled ? 'On' : 'Off' }}</ItemDescription>
          <template #end>
            <Switch v-model="bluetoothEnabled" />
          </template>
        </Item>

        <Item>
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
          </template>
          <ItemLabel>Dark Mode</ItemLabel>
          <ItemDescription>Toggle dark appearance</ItemDescription>
          <template #end>
            <Switch v-model="darkMode" />
          </template>
        </Item>

        <Item>
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          </template>
          <ItemLabel>Notifications</ItemLabel>
          <ItemDescription>Push and email alerts</ItemDescription>
          <template #end>
            <Switch v-model="notifications" />
          </template>
        </Item>
      </div>
    </section>

    <!-- 3. Variantes -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Variantes</h2>
      <div class="w-full max-w-md space-y-2">
        <Item as="button" variant="default" @click="onAction('default')">
          <ItemLabel>Default variant</ItemLabel>
          <ItemDescription>hover:bg-accent</ItemDescription>
        </Item>
        <Item as="button" variant="ghost" @click="onAction('ghost')">
          <ItemLabel>Ghost variant</ItemLabel>
          <ItemDescription>hover:bg-accent/50</ItemDescription>
        </Item>
        <Item as="button" variant="muted" @click="onAction('muted')">
          <ItemLabel>Muted variant</ItemLabel>
          <ItemDescription>bg-muted/50</ItemDescription>
        </Item>
        <Item as="button" variant="destructive" @click="onAction('destructive')">
          <ItemLabel>Destructive variant</ItemLabel>
          <ItemDescription>hover:bg-destructive/10</ItemDescription>
        </Item>
      </div>
    </section>

    <!-- 4. Tamaños -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Tamaños</h2>
      <div class="w-full max-w-md space-y-2">
        <Item as="button" size="sm" @click="onAction('sm')">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </template>
          <ItemLabel>Small item</ItemLabel>
        </Item>
        <Item as="button" size="default" @click="onAction('default')">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </template>
          <ItemLabel>Default item</ItemLabel>
        </Item>
        <Item as="button" size="lg" @click="onAction('lg')">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </template>
          <ItemLabel>Large item</ItemLabel>
        </Item>
      </div>
    </section>

    <!-- 5. Disabled -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Disabled</h2>
      <div class="w-full max-w-md space-y-2">
        <Item as="button" disabled>
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" x2="19.07" y1="4.93" y2="19.07" /></svg>
          </template>
          <ItemLabel>Disabled item</ItemLabel>
          <ItemDescription>Cannot interact with this item</ItemDescription>
          <template #end>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
          </template>
        </Item>
      </div>
    </section>

    <!-- 6. Como link -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Como enlace (&lt;a&gt;)</h2>
      <div class="w-full max-w-md space-y-2">
        <Item as="a" href="https://vuejs.org" target="_blank" rel="noopener">
          <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
          </template>
          <ItemLabel>Vue.js Documentation</ItemLabel>
          <ItemDescription>vuejs.org — opens in new tab</ItemDescription>
          <template #end>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M15 3h6v6" /><path d="M10 14 21 3" /></svg>
          </template>
        </Item>
      </div>
    </section>

    <!-- 7. Solo label (sin slots) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Uso simple (solo texto)</h2>
      <div class="border-border w-full max-w-md rounded-lg border">
        <Item as="button" @click="onAction('General')">
          <ItemLabel>General</ItemLabel>
        </Item>
        <Item as="button" @click="onAction('Appearance')">
          <ItemLabel>Appearance</ItemLabel>
        </Item>
        <Item as="button" @click="onAction('Integrations')">
          <ItemLabel>Integrations</ItemLabel>
        </Item>
      </div>
    </section>
  </div>
</template>