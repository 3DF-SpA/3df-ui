<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Calendar, DatePicker, type DateRange, DateRangePicker } from '@3df/ui';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { t } = useI18n();
const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('datePicker');

const singleDate = ref<Date>();
const rangeDate = ref<DateRange>();
const calendarDate = ref<Date>();
const spanishDate = ref<Date>();
const disabledDate = ref<Date>();

function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

const datePickerProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'Date | undefined',
    default: 'undefined',
    description: propDesc('modelValue'),
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Pick a date'",
    description: propDesc('placeholder'),
  },
  {
    name: 'formatStr',
    type: 'string',
    default: "'PPP'",
    description: propDesc('formatStr'),
  },
  {
    name: 'locale',
    type: 'Locale',
    default: '-',
    description: propDesc('locale'),
  },
  {
    name: 'disabled',
    type: '(date: Date) => boolean',
    default: '-',
    description: propDesc('disabled'),
  },
  {
    name: 'weekStartsOn',
    type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
    default: '1',
    description: propDesc('weekStartsOn'),
  },
]);

const simpleCode = `<DatePicker v-model="singleDate" class="max-w-sm" />
<p>Valor: {{ singleDate ? format(singleDate, 'PPP') : 'Sin seleccionar' }}</p>`;

const localeCode = `<DatePicker
  v-model="spanishDate"
  :locale="es"
  placeholder="Selecciona una fecha"
  class="max-w-sm"
/>`;

const disabledCode = `<DatePicker
  v-model="disabledDate"
  :disabled="isPastDate"
  placeholder="Solo fechas futuras"
  class="max-w-sm"
/>`;

const rangeCode = `<DateRangePicker v-model="rangeDate" class="max-w-md" />
<p>
  {{ format(rangeDate.from, 'PP') }}
  <template v-if="rangeDate.to"> – {{ format(rangeDate.to, 'PP') }}</template>
</p>`;

const calendarCode = `<Calendar v-model="calendarDate" />
<p>Seleccionado: {{ calendarDate ? format(calendarDate, 'PPP') : 'Ninguno' }}</p>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="DatePicker"
      :description="description"
      import-code="import { DatePicker, DateRangePicker, Calendar, type DateRange } from '@3df/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('simple')"
      :description="showcaseDesc('simple')"
      :code="simpleCode"
    >
      <div class="flex max-w-sm flex-col gap-4">
        <DatePicker v-model="singleDate" class="max-w-sm" />
        <p class="text-sm">
          <strong>{{ t('demo.datePicker.value') }}</strong>
          {{ singleDate ? format(singleDate, 'PPP') : t('demo.datePicker.notSelected') }}
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('locale')"
      :description="showcaseDesc('locale')"
      :code="localeCode"
    >
      <div class="flex max-w-sm flex-col gap-4">
        <DatePicker
          v-model="spanishDate"
          :locale="es"
          :placeholder="t('demo.datePicker.placeholderLocale')"
          class="max-w-sm"
        />
        <p class="text-sm">
          <strong>{{ t('demo.datePicker.value') }}</strong>
          {{ spanishDate ? format(spanishDate, 'PPP', { locale: es }) : t('demo.datePicker.notSelected') }}
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('disabled')"
      :description="showcaseDesc('disabled')"
      :code="disabledCode"
    >
      <div class="max-w-sm">
        <DatePicker
          v-model="disabledDate"
          :disabled="isPastDate"
          :placeholder="t('demo.datePicker.placeholderFuture')"
          class="max-w-sm"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('range')"
      :description="showcaseDesc('range')"
      :code="rangeCode"
    >
      <div class="flex max-w-md flex-col gap-4">
        <DateRangePicker v-model="rangeDate" class="max-w-md" />
        <p class="text-sm">
          <strong>{{ t('demo.datePicker.range') }}</strong>
          <template v-if="rangeDate">
            {{ format(rangeDate.from, 'PP') }}
            <template v-if="rangeDate.to"> – {{ format(rangeDate.to, 'PP') }}</template>
            <template v-else> {{ t('demo.datePicker.selectEndDate') }}</template>
          </template>
          <template v-else>{{ t('demo.datePicker.notSelected') }}</template>
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('calendar')"
      :description="showcaseDesc('calendar')"
      :code="calendarCode"
    >
      <div class="flex flex-col gap-4">
        <div class="w-fit rounded-md border">
          <Calendar v-model="calendarDate" />
        </div>
        <p class="text-sm">
          <strong>{{ t('demo.datePicker.selected') }}</strong>
          {{ calendarDate ? format(calendarDate, 'PPP') : t('demo.datePicker.none') }}
        </p>
      </div>
    </DocShowcase>

    <DocPropsTable :props="datePickerProps" />
  </div>
</template>

