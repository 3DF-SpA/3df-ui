<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('inputOtp');

const { t } = useI18n();

const basicValue = ref('');
const groupedValue = ref('');
const prefilledValue = ref('123456');
const alphanumericValue = ref('');
const disabledValue = ref('48');
const completedValue = ref('');
const completedMessage = ref('');

function onComplete(value: string) {
  completedMessage.value = t('demo.otpReceived', { value });
}

const inputOtpProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    default: "''",
    description: propDesc('modelValue'),
  },
  { name: 'length', type: 'number', default: '6', description: propDesc('length') },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
  {
    name: 'pattern',
    type: "'numeric' | 'alphanumeric' | 'alpha' | RegExp",
    default: "'numeric'",
    description: propDesc('pattern'),
  },
  {
    name: 'autoSubmit',
    type: 'boolean',
    default: 'false',
    description: propDesc('autoSubmit'),
  },
]);

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
      :description="description"
      import-code="import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@3df-spa/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('basicSeparator')"
      :description="showcaseDesc('basicSeparator')"
      :code="basicAndSeparatorCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">{{ t('demo.inputOtp.withoutSeparator') }}</p>
          <InputOTP v-model="basicValue" :length="6">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 6" :key="i" :index="i - 1" />
            </InputOTPGroup>
          </InputOTP>
          <p class="text-muted-foreground text-xs">
            {{ t('demo.inputOtp.value') }} <code class="text-foreground">{{ basicValue || t('demo.inputOtp.empty') }}</code>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">{{ t('demo.inputOtp.withSeparator') }}</p>
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
            {{ t('demo.inputOtp.value') }} <code class="text-foreground">{{ groupedValue || t('demo.inputOtp.empty') }}</code>
          </p>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('customPrefilled')"
      :description="showcaseDesc('customPrefilled')"
      :code="customSeparatorAndPrefilledCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">{{ t('demo.inputOtp.customSeparator') }}</p>
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
          <p class="text-muted-foreground text-xs">{{ t('demo.inputOtp.initialValue') }}</p>
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
            {{ t('demo.inputOtp.value') }} <code class="text-foreground">{{ prefilledValue }}</code>
          </p>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('alphanumericDisabled')"
      :description="showcaseDesc('alphanumericDisabled')"
      :code="alphanumericAndDisabledCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">{{ t('demo.inputOtp.alphanumeric') }}</p>
          <InputOTP v-model="alphanumericValue" :length="4" pattern="alphanumeric">
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
            </InputOTPGroup>
          </InputOTP>
          <p class="text-muted-foreground text-xs">
            {{ t('demo.inputOtp.value') }} <code class="text-foreground">{{ alphanumericValue || t('demo.inputOtp.empty') }}</code>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-muted-foreground text-xs">{{ t('demo.inputOtp.disabledPartial') }}</p>
          <InputOTP v-model="disabledValue" :length="4" disabled>
            <InputOTPGroup>
              <InputOTPSlot v-for="i in 4" :key="i" :index="i - 1" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('autoSubmitShowcase')"
      :description="showcaseDesc('autoSubmitShowcase')"
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
          {{ t('demo.inputOtp.value') }} <code class="text-foreground">{{ completedValue || t('demo.inputOtp.empty') }}</code>
        </p>
      </div>
    </DocShowcase>

    <DocPropsTable :props="inputOtpProps" />

    <div class="flex flex-col gap-3">
      <h2 class="text-sm font-semibold">{{ t('demo.inputOtp.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" language="vue" />
    </div>
  </div>
</template>
