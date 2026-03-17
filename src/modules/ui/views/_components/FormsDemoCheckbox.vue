<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Checkbox, Label } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();
const terms = ref(false);
const newsletter = ref(true);

const checkboxCode = computed(() => `<Checkbox id="terms" v-model="terms" />
<Label for="terms">${t('demo.forms.acceptTerms')}</Label>`);
</script>

<template>
  <DocShowcase
    :title="t('views.forms.showcases.checkbox.title')"
    :description="t('views.forms.showcases.checkbox.description')"
    :code="checkboxCode"
  >
    <div class="grid max-w-md gap-4">
      <div class="flex items-center gap-2">
        <Checkbox id="terms" v-model="terms" />
        <Label for="terms">{{ t('demo.forms.acceptTerms') }}</Label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="newsletter" v-model="newsletter" />
        <Label for="newsletter">{{ t('demo.weeklyNewsletter') }}</Label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="cb-disabled" disabled :model-value="true" />
        <Label for="cb-disabled" :disabled="true">{{ t('demo.forms.disabledOptionChecked') }}</Label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="cb-disabled2" disabled :model-value="false" />
        <Label for="cb-disabled2" :disabled="true">{{ t('demo.forms.disabledOptionUnchecked') }}</Label>
      </div>
    </div>
  </DocShowcase>
</template>

