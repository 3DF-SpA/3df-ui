<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Label, Select, SelectItem, Textarea } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();
const bio = ref('');
const country = ref('');
const role = ref('');

const textareaCode = computed(() => `<Label for="bio">${t('demo.forms.biography')}</Label>
<Textarea id="bio" v-model="bio" :placeholder="t('demo.forms.biographyPlaceholder')" />`);

const selectCode = computed(() => `<Select v-model="country" :placeholder="t('demo.forms.selectCountryPlaceholder')">
  <SelectItem value="mx">${t('demo.forms.country_mx')}</SelectItem>
  <SelectItem value="ar">${t('demo.forms.country_ar')}</SelectItem>
</Select>`);
</script>

<template>
  <DocShowcase
    :title="t('views.forms.showcases.textarea.title')"
    :description="t('views.forms.showcases.textarea.description')"
    :code="textareaCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex flex-col gap-2">
        <Label for="bio">{{ t('demo.forms.biography') }}</Label>
        <Textarea id="bio" v-model="bio" :placeholder="t('demo.forms.biographyPlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="bio-error">{{ t('demo.forms.withError') }}</Label>
        <Textarea id="bio-error" aria-invalid="true" :placeholder="t('demo.forms.requiredFieldPlaceholder')" model-value="" />
        <p class="text-destructive text-xs">{{ t('demo.forms.requiredFieldError') }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="bio-disabled" :disabled="true">{{ t('demo.forms.disabled') }}</Label>
        <Textarea id="bio-disabled" disabled :model-value="t('demo.forms.disabledNoEdit')" />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.forms.showcases.select.title')"
    :description="t('views.forms.showcases.select.description')"
    :code="selectCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex flex-col gap-2">
        <Label for="country">{{ t('demo.country') }}</Label>
        <Select id="country" v-model="country" :placeholder="t('demo.forms.selectCountryPlaceholder')">
          <SelectItem value="mx">{{ t('demo.forms.country_mx') }}</SelectItem>
          <SelectItem value="ar">{{ t('demo.forms.country_ar') }}</SelectItem>
          <SelectItem value="co">{{ t('demo.forms.country_co') }}</SelectItem>
          <SelectItem value="es">{{ t('demo.forms.country_es') }}</SelectItem>
          <SelectItem value="cl">{{ t('demo.forms.country_cl') }}</SelectItem>
        </Select>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="role">{{ t('demo.forms.role') }}</Label>
        <Select id="role" v-model="role" :placeholder="t('demo.forms.selectRolePlaceholder')">
          <SelectItem value="admin">{{ t('demo.forms.administrator') }}</SelectItem>
          <SelectItem value="editor">{{ t('demo.forms.editor') }}</SelectItem>
          <SelectItem value="viewer">{{ t('demo.forms.viewer') }}</SelectItem>
        </Select>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="select-disabled" :disabled="true">{{ t('demo.forms.disabled') }}</Label>
        <Select id="select-disabled" disabled model-value="ar">
          <SelectItem value="ar">{{ t('demo.forms.country_ar') }}</SelectItem>
        </Select>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="select-error">{{ t('demo.forms.withError') }}</Label>
        <Select
          id="select-error"
          aria-invalid="true"
          model-value=""
          :placeholder="t('demo.forms.selectOption')"
        >
          <SelectItem value="a">{{ t('demo.forms.optionA') }}</SelectItem>
          <SelectItem value="b">{{ t('demo.forms.optionB') }}</SelectItem>
        </Select>
        <p class="text-destructive text-xs">{{ t('demo.forms.mustSelectOption') }}</p>
      </div>
    </div>
  </DocShowcase>
</template>

