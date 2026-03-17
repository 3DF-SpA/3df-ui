<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Label, Radio, Switch } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();
const plan = ref('pro');
const contact = ref('email');
const notifications = ref(true);
const darkMode = ref(false);
const marketing = ref(true);

const radioCode = computed(() => `<Radio id="plan-pro" v-model="plan" value="pro" name="plan" />
<Label for="plan-pro">${t('demo.forms.proPrice')}</Label>`);

const switchCode = computed(() => `<Label for="notifications">${t('demo.notifications')}</Label>
<Switch id="notifications" v-model="notifications" />`);
</script>

<template>
  <DocShowcase
    :title="t('views.forms.showcases.radio.title')"
    :description="t('views.forms.showcases.radio.description')"
    :code="radioCode"
  >
    <div class="grid max-w-md gap-4">
      <p class="text-sm font-medium">{{ t('demo.plan') }}</p>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Radio id="plan-free" v-model="plan" value="free" name="plan" />
          <Label for="plan-free">Free</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="plan-pro" v-model="plan" value="pro" name="plan" />
          <Label for="plan-pro">{{ t('demo.forms.proPrice') }}</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="plan-enterprise" v-model="plan" value="enterprise" name="plan" />
          <Label for="plan-enterprise">{{ t('demo.forms.enterprisePrice') }}</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="plan-disabled" value="custom" name="plan" disabled />
          <Label for="plan-disabled" :disabled="true">{{ t('demo.forms.customUnavailable') }}</Label>
        </div>
      </div>
      <p class="text-sm font-medium">{{ t('demo.forms.preferredContact') }}</p>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Radio id="contact-email" v-model="contact" value="email" name="contact" />
          <Label for="contact-email">Email</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="contact-phone" v-model="contact" value="phone" name="contact" />
          <Label for="contact-phone">{{ t('demo.phone') }}</Label>
        </div>
        <div class="flex items-center gap-2">
          <Radio id="contact-sms" v-model="contact" value="sms" name="contact" />
          <Label for="contact-sms">SMS</Label>
        </div>
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.forms.showcases.switch.title')"
    :description="t('views.forms.showcases.switch.description')"
    :code="switchCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex items-center justify-between">
        <Label for="notifications">{{ t('demo.notifications') }}</Label>
        <Switch id="notifications" v-model="notifications" />
      </div>
      <div class="flex items-center justify-between">
        <Label for="dark-mode">{{ t('demo.forms.darkMode') }}</Label>
        <Switch id="dark-mode" v-model="darkMode" />
      </div>
      <div class="flex items-center justify-between">
        <Label for="marketing">{{ t('demo.forms.marketingEmails') }}</Label>
        <Switch id="marketing" v-model="marketing" />
      </div>
      <div class="flex items-center justify-between">
        <Label for="switch-disabled" :disabled="true">{{ t('demo.forms.disabled') }}</Label>
        <Switch id="switch-disabled" disabled :model-value="false" />
      </div>
    </div>
  </DocShowcase>
</template>

