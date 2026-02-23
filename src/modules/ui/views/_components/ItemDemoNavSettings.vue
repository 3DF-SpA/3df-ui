<script setup lang="ts">
import { ref } from 'vue';

import { Badge, Item, ItemDescription, ItemLabel, Switch } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const wifiEnabled = ref(true);
const bluetoothEnabled = ref(false);
const darkMode = ref(false);
const notifications = ref(true);
</script>

<template>
  <DocShowcase title="Navegación" code="">
    <div class="border-border w-full max-w-md rounded-lg border">
      <Item as="button" class="rounded-b-none">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </template>
        <ItemLabel>Profile</ItemLabel>
        <ItemDescription>Manage your account settings</ItemDescription>
        <template #end>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-muted-foreground"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </template>
      </Item>

      <Item as="button">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </template>
        <ItemLabel>Security</ItemLabel>
        <ItemDescription>Password, 2FA, sessions</ItemDescription>
        <template #end>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-muted-foreground"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </template>
      </Item>

      <Item as="button" class="rounded-t-none">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </template>
        <ItemLabel>Billing</ItemLabel>
        <ItemDescription>Plans, invoices, payment methods</ItemDescription>
        <template #end>
          <Badge variant="outline">Pro</Badge>
        </template>
      </Item>
    </div>
  </DocShowcase>

  <DocShowcase title="Settings con Switch" code="">
    <div class="border-border w-full max-w-md rounded-lg border">
      <Item>
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" x2="12.01" y1="20" y2="20" />
          </svg>
        </template>
        <ItemLabel>Wi-Fi</ItemLabel>
        <ItemDescription>{{ wifiEnabled ? 'Connected' : 'Disconnected' }}</ItemDescription>
        <template #end>
          <Switch v-model="wifiEnabled" />
        </template>
      </Item>

      <Item>
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path
              d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
            />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </template>
        <ItemLabel>Bluetooth</ItemLabel>
        <ItemDescription>{{ bluetoothEnabled ? 'On' : 'Off' }}</ItemDescription>
        <template #end>
          <Switch v-model="bluetoothEnabled" />
        </template>
      </Item>

      <Item>
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </template>
        <ItemLabel>Dark Mode</ItemLabel>
        <ItemDescription>Toggle dark appearance</ItemDescription>
        <template #end>
          <Switch v-model="darkMode" />
        </template>
      </Item>

      <Item>
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </template>
        <ItemLabel>Notifications</ItemLabel>
        <ItemDescription>Push and email alerts</ItemDescription>
        <template #end>
          <Switch v-model="notifications" />
        </template>
      </Item>
    </div>
  </DocShowcase>
</template>
