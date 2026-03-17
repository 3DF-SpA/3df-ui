<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Button, Input, Label } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();
const name = ref('');
const email = ref('');
const password = ref('');
const searchSm = ref('');
const searchLg = ref('');

const inputCode = computed(() => `<Label for="name">${t('demo.name')}</Label>
<Input id="name" v-model="name" :placeholder="t('demo.forms.fullNamePlaceholder')" />`);

const sizesCode = computed(() => `<Input size="sm" :placeholder="t('demo.forms.searchSmPlaceholder')" />
<Input :placeholder="t('demo.forms.nameDefaultPlaceholder')" />
<Input size="lg" :placeholder="t('demo.forms.searchLgPlaceholder')" />`);

const statesCode = computed(() => `<Input disabled :model-value="t('demo.forms.disabledInputValue')" />
<Input aria-invalid="true" :placeholder="t('demo.forms.invalidFieldPlaceholder')" />
<Input type="file" />`);

const buttonCode = computed(() => `<div class="flex gap-2">
  <Input placeholder="tu@email.com" type="email" class="flex-1" />
  <Button>${t('demo.forms.subscribe')}</Button>
</div>`);
</script>

<template>
  <DocShowcase
    :title="t('views.forms.showcases.input.title')"
    :description="t('views.forms.showcases.input.description')"
    :code="inputCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex flex-col gap-2">
        <Label for="name">{{ t('demo.name') }}</Label>
        <Input id="name" v-model="name" :placeholder="t('demo.forms.fullNamePlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="email">Email</Label>
        <Input id="email" v-model="email" type="email" :placeholder="t('demo.forms.emailPlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="password">{{ t('demo.password') }}</Label>
        <Input id="password" v-model="password" type="password" placeholder="••••••••" />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.forms.showcases.inputSizes.title')"
    :description="t('views.forms.showcases.inputSizes.description')"
    :code="sizesCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex flex-col gap-2">
        <Label for="search-sm">Small</Label>
        <Input id="search-sm" v-model="searchSm" size="sm" :placeholder="t('demo.forms.searchSmPlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="name-def">Default</Label>
        <Input id="name-def" :placeholder="t('demo.forms.nameDefaultPlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="search-lg">Large</Label>
        <Input id="search-lg" v-model="searchLg" size="lg" :placeholder="t('demo.forms.searchLgPlaceholder')" />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.forms.showcases.inputStates.title')"
    :description="t('views.forms.showcases.inputStates.description')"
    :code="statesCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex flex-col gap-2">
        <Label for="disabled-input" :disabled="true">{{ t('demo.forms.disabled') }}</Label>
        <Input id="disabled-input" :model-value="t('demo.forms.disabledInputValue')" disabled />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="error-input">{{ t('demo.forms.withError') }}</Label>
        <Input
          id="error-input"
          aria-invalid="true"
          :placeholder="t('demo.forms.invalidFieldPlaceholder')"
          model-value="email@invalido"
        />
        <p class="text-destructive text-xs">{{ t('demo.forms.enterValidEmail') }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="file-input">{{ t('demo.forms.file') }}</Label>
        <Input id="file-input" type="file" />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.forms.showcases.inputWithButton.title')"
    :description="t('views.forms.showcases.inputWithButton.description')"
    :code="buttonCode"
  >
    <div class="flex max-w-md gap-2">
      <Input placeholder="tu@email.com" type="email" class="flex-1" />
      <Button>{{ t('demo.forms.subscribe') }}</Button>
    </div>
  </DocShowcase>
</template>

