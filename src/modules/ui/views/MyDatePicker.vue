<script setup lang="ts">
import { ref } from 'vue';
import {
  Calendar,
  DatePicker,
  DateRangePicker,
  type DateRange,
} from '@3df/ui';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
</script>

<template>
  <div class="space-y-12">
    <!-- 1. Single DatePicker -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">DatePicker — Fecha simple</h2>
      <p class="text-sm text-muted-foreground">
        Selector de fecha individual con formato automático.
      </p>
      <DatePicker v-model="singleDate" class="max-w-sm" />
      <p class="text-sm">
        <strong>Valor:</strong>
        {{ singleDate ? format(singleDate, 'PPP') : 'Sin seleccionar' }}
      </p>
    </section>

    <!-- 2. DatePicker con locale español -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">DatePicker — Locale español</h2>
      <p class="text-sm text-muted-foreground">
        Usando <code>date-fns/locale/es</code> para nombres en español.
      </p>
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
    </section>

    <!-- 3. DatePicker con fechas deshabilitadas -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">DatePicker — Fechas pasadas deshabilitadas</h2>
      <p class="text-sm text-muted-foreground">
        No permite seleccionar fechas anteriores a hoy.
      </p>
      <DatePicker
        v-model="disabledDate"
        :disabled="isPastDate"
        placeholder="Solo fechas futuras"
        class="max-w-sm"
      />
    </section>

    <!-- 4. Date Range Picker -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">DateRangePicker — Rango de fechas</h2>
      <p class="text-sm text-muted-foreground">
        Selector de rango con dos meses visibles. Click en la fecha inicio, luego en la fecha fin.
      </p>
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
    </section>

    <!-- 5. Calendar standalone -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Calendar — Componente independiente</h2>
      <p class="text-sm text-muted-foreground">
        El calendario se puede usar directamente sin el wrapper de DatePicker.
      </p>
      <div class="w-fit rounded-md border">
        <Calendar v-model="calendarDate" />
      </div>
      <p class="text-sm">
        <strong>Seleccionado:</strong>
        {{ calendarDate ? format(calendarDate, 'PPP') : 'Ninguno' }}
      </p>
    </section>
  </div>
</template>