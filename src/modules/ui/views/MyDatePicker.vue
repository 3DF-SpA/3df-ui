<script setup lang="ts">
import { ref, computed } from 'vue';

import { Calendar, DatePicker, type DateRange, DateRangePicker } from '@3df/ui';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc } = useDocPage('datePicker');

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
      title="Fecha simple"
      description="Selector de fecha individual con formato automático."
      :code="simpleCode"
    >
      <div class="flex max-w-sm flex-col gap-4">
        <DatePicker v-model="singleDate" class="max-w-sm" />
        <p class="text-sm">
          <strong>Valor:</strong>
          {{ singleDate ? format(singleDate, 'PPP') : 'Sin seleccionar' }}
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Locale español"
      description="Usando date-fns/locale/es para nombres en español."
      :code="localeCode"
    >
      <div class="flex max-w-sm flex-col gap-4">
        <DatePicker
          v-model="spanishDate"
          :locale="es"
          placeholder="Selecciona una fecha"
          class="max-w-sm"
        />
        <p class="text-sm">
          <strong>Valor:</strong>
          {{ spanishDate ? format(spanishDate, 'PPP', { locale: es }) : 'Sin seleccionar' }}
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Fechas deshabilitadas"
      description="No permite seleccionar fechas anteriores a hoy."
      :code="disabledCode"
    >
      <div class="max-w-sm">
        <DatePicker
          v-model="disabledDate"
          :disabled="isPastDate"
          placeholder="Solo fechas futuras"
          class="max-w-sm"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Rango de fechas"
      description="Selector de rango con dos meses visibles. Click en la fecha inicio, luego en la fecha fin."
      :code="rangeCode"
    >
      <div class="flex max-w-md flex-col gap-4">
        <DateRangePicker v-model="rangeDate" class="max-w-md" />
        <p class="text-sm">
          <strong>Rango:</strong>
          <template v-if="rangeDate">
            {{ format(rangeDate.from, 'PP') }}
            <template v-if="rangeDate.to"> – {{ format(rangeDate.to, 'PP') }}</template>
            <template v-else> (selecciona fecha fin)</template>
          </template>
          <template v-else>Sin seleccionar</template>
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Calendario independiente"
      description="El calendario se puede usar directamente sin el wrapper de DatePicker."
      :code="calendarCode"
    >
      <div class="flex flex-col gap-4">
        <div class="w-fit rounded-md border">
          <Calendar v-model="calendarDate" />
        </div>
        <p class="text-sm">
          <strong>Seleccionado:</strong>
          {{ calendarDate ? format(calendarDate, 'PPP') : 'Ninguno' }}
        </p>
      </div>
    </DocShowcase>

    <DocPropsTable :props="datePickerProps" />
  </div>
</template>
