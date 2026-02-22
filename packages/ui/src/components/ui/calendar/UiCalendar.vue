<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';
import { addMonths, subMonths } from 'date-fns';

import { cn } from '../../../lib/utils';
import type { CalendarMode, DateRange } from './calendar-types';
import { buildMonths, buildWeekDays, getInitialMonth } from './calendar-utils';

defineOptions({ name: 'UiCalendar', inheritAttrs: false });

interface UiCalendarProps {
  mode?: CalendarMode;
  modelValue?: Date | DateRange;
  defaultMonth?: Date;
  numberOfMonths?: number;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  disabled?: (date: Date) => boolean;
  locale?: import('date-fns/locale').Locale;
}

const props = withDefaults(defineProps<UiCalendarProps>(), {
  mode: 'single',
  modelValue: undefined,
  defaultMonth: () => new Date(),
  numberOfMonths: 1,
  weekStartsOn: 1,
  showOutsideDays: true,
  fixedWeeks: true,
  disabled: undefined,
  locale: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: Date | DateRange | undefined];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const currentMonth = ref(
  new Date(getInitialMonth(props.mode, props.modelValue, props.defaultMonth)),
);

watch(
  () => props.defaultMonth,
  (val) => {
    if (val) currentMonth.value = new Date(val);
  },
);

function prevMonth() {
  currentMonth.value = subMonths(currentMonth.value, 1);
}

function nextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1);
}

const weekDays = computed(() => buildWeekDays(props.weekStartsOn, props.locale));

const months = computed(() =>
  buildMonths(
    currentMonth.value,
    props.numberOfMonths,
    props.weekStartsOn,
    props.fixedWeeks,
    props.mode,
    props.modelValue,
    props.disabled,
    props.locale,
  ),
);

const rangeSelecting = ref(false);

function onDayClick(date: Date) {
  if (props.disabled?.(date)) return;

  if (props.mode === 'single') {
    emit('update:modelValue', date);
  } else {
    if (!rangeSelecting.value || !props.modelValue) {
      emit('update:modelValue', { from: date });
      rangeSelecting.value = true;
    } else {
      const range = props.modelValue as DateRange;
      if (date < range.from) {
        emit('update:modelValue', { from: date, to: range.from });
      } else {
        emit('update:modelValue', { from: range.from, to: date });
      }
      rangeSelecting.value = false;
    }
  }
}
</script>

<template>
  <div v-bind="restAttrs" :class="cn('p-3', attrs.class)">
    <div :class="cn('flex', numberOfMonths > 1 && 'gap-4')">
      <div v-for="(m, idx) in months" :key="m.label" class="w-full">
        <div class="relative flex items-center justify-center pt-1 pb-4">
          <button
            v-if="idx === 0"
            type="button"
            aria-label="Mes anterior"
            class="text-muted-foreground hover:bg-accent hover:text-accent-foreground absolute left-0 inline-flex h-7 w-7 items-center justify-center rounded-md bg-transparent text-sm font-medium transition-colors"
            @click="prevMonth"
          >
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
              class="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <span class="text-sm font-medium capitalize">{{ m.label }}</span>

          <button
            v-if="idx === months.length - 1"
            type="button"
            aria-label="Mes siguiente"
            class="text-muted-foreground hover:bg-accent hover:text-accent-foreground absolute right-0 inline-flex h-7 w-7 items-center justify-center rounded-md bg-transparent text-sm font-medium transition-colors"
            @click="nextMonth"
          >
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
              class="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-7">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-muted-foreground flex h-9 w-9 items-center justify-center text-[0.8rem] font-normal"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7">
          <template v-for="(d, dIdx) in m.days" :key="dIdx">
            <div v-if="!d.isCurrentMonth && !showOutsideDays" class="h-9 w-9" />
            <button
              v-else
              type="button"
              :disabled="d.isDisabled"
              :aria-selected="d.isSelected || undefined"
              :data-today="d.isToday || undefined"
              :data-outside="!d.isCurrentMonth || undefined"
              :class="
                cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm font-normal',
                  'transition-colors duration-100',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
                  d.isToday && !d.isSelected && 'bg-accent text-accent-foreground font-medium',
                  d.isSelected &&
                    !d.isInRange &&
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-medium',
                  d.isInRange && 'bg-accent/50 rounded-none',
                  d.isRangeStart && d.isSelected && 'rounded-r-none',
                  d.isRangeEnd && d.isSelected && 'rounded-l-none',
                  !d.isCurrentMonth && 'text-muted-foreground/50',
                  d.isDisabled && 'pointer-events-none opacity-50',
                )
              "
              @click="onDayClick(d.date)"
            >
              {{ d.date.getDate() }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
