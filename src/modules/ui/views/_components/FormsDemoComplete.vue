<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Button,
  Checkbox,
  Input,
  Label,
  Radio,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const completeCode = computed(() => `<form @submit.prevent>
  <Input :placeholder="t('demo.forms.fullNamePlaceholder')" />
  <Select :placeholder="t('demo.forms.selectCountryPlaceholder')">
    <SelectItem value="mx">${t('demo.forms.country_mx')}</SelectItem>
  </Select>
  <Textarea :placeholder="t('demo.forms.messagePlaceholder')" />
  <Radio value="pro" name="plan" />
  <Switch id="newsletter" />
  <Checkbox id="terms" />
  <Button type="submit">${t('demo.forms.submit')}</Button>
</form>`);
</script>

<template>
  <DocShowcase
    :title="t('views.forms.showcases.complete.title')"
    :description="t('views.forms.showcases.complete.description')"
    :code="completeCode"
  >
    <form class="border-border grid max-w-md gap-5 rounded-lg border p-6" @submit.prevent>
      <div class="flex flex-col gap-2">
        <Label for="form-name">{{ t('demo.fullName') }}</Label>
        <Input id="form-name" :placeholder="t('demo.forms.fullNamePlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="form-email">Email</Label>
        <Input id="form-email" type="email" :placeholder="t('demo.forms.emailPlaceholder')" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="form-country">{{ t('demo.country') }}</Label>
        <Select id="form-country" :placeholder="t('demo.forms.selectCountryPlaceholder')">
          <SelectItem value="mx">{{ t('demo.forms.country_mx') }}</SelectItem>
          <SelectItem value="ar">{{ t('demo.forms.country_ar') }}</SelectItem>
          <SelectItem value="co">{{ t('demo.forms.country_co') }}</SelectItem>
        </Select>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="form-bio">{{ t('demo.forms.message') }}</Label>
        <Textarea id="form-bio" :placeholder="t('demo.forms.messagePlaceholder')" />
      </div>
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium">{{ t('demo.plan') }}</p>
        <div class="flex items-center gap-2">
          <Radio id="form-free" value="free" name="form-plan" />
          <Label for="form-free">Free</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="form-pro" value="pro" name="form-plan" />
          <Label for="form-pro">Pro</Label>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <Label for="form-newsletter">{{ t('demo.receiveNews') }}</Label>
        <Switch id="form-newsletter" />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="form-terms" />
        <Label for="form-terms">{{ t('demo.forms.acceptTerms') }}</Label>
      </div>
      <div class="flex gap-3 pt-2">
        <Button type="submit" class="flex-1">{{ t('demo.forms.submit') }}</Button>
        <Button type="reset" variant="outline">{{ t('demo.forms.clear') }}</Button>
      </div>
    </form>
  </DocShowcase>
</template>

