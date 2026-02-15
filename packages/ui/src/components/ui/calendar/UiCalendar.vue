<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday as dateFnsIsToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import type { Locale } from 'date-fns/locale';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { CalendarMode, DateRange } from './calendar-types';

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
  locale?: Locale;
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

// ── Currently displayed month ─────────────────────────────────
const currentMonth = ref(new Date(getInitialMonth()));

function getInitialMonth(): Date {
  if (props.modelValue) {
    if (props.mode === 'single' && props.modelValue instanceof Date) {
      return props.modelValue;
    }
    if (props.mode === 'range' && 'from' in (props.modelValue as DateRange)) {
      return (props.modelValue as DateRange).from;
    }
  }
  return props.defaultMonth;
}

watch(
  () => props.defaultMonth,
  (val) => {
    if (val) currentMonth.value = new Date(val);
  },
);

// ── Navigation ────────────────────────────────────────────────
function prevMonth() {
  currentMonth.value = subMonths(currentMonth.value, 1);
}

function nextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1);
}

// ── Week day headers ──────────────────────────────────────────
const weekDays = computed(() => {
  const start = startOfWeek(new Date(), { weekStartsOn: props.weekStartsOn });
  return Array.from({ length: 7 }, (_, i) =>
    format(addDays(start, i), 'EEEEEE', { locale: props.locale }),
  );
});

// ── Day info type ─────────────────────────────────────────────
interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

// ── Selection helpers ─────────────────────────────────────────
function isDateSelected(date: Date): boolean {
  if (!props.modelValue) return false;
  if (props.mode === 'single') {
    return isSameDay(date, props.modelValue as Date);
  }
  const range = props.modelValue as DateRange;
  return isSameDay(date, range.from) || (range.to ? isSameDay(date, range.to) : false);
}

function isDateRangeStart(date: Date): boolean {
  if (props.mode !== 'range' || !props.modelValue) return false;
  return isSameDay(date, (props.modelValue as DateRange).from);
}

function isDateRangeEnd(date: Date): boolean {
  if (props.mode !== 'range' || !props.modelValue) return false;
  const range = props.modelValue as DateRange;
  return range.to ? isSameDay(date, range.to) : false;
}

function isDateInRange(date: Date): boolean {
  if (props.mode !== 'range' || !props.modelValue) return false;
  const range = props.modelValue as DateRange;
  if (!range.to) return false;
  return date > range.from && date < range.to;
}

// ── Month grids ───────────────────────────────────────────────
const months = computed(() => {
  const result: { month: Date; label: string; days: DayInfo[] }[] = [];

  for (let i = 0; i < props.numberOfMonths; i++) {
    const monthDate = addMonths(currentMonth.value, i);
    const firstDay = startOfMonth(monthDate);
    const start = startOfWeek(firstDay, { weekStartsOn: props.weekStartsOn });

    let days: Date[];
    if (props.fixedWeeks) {
      days = eachDayOfInterval({ start, end: addDays(start, 41) });
    } else {
      const lastDay = endOfMonth(monthDate);
      const end = endOfWeek(lastDay, { weekStartsOn: props.weekStartsOn });
      days = eachDayOfInterval({ start, end });
    }

    const dayInfos: DayInfo[] = days.map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, monthDate),
      isToday: dateFnsIsToday(date),
      isSelected: isDateSelected(date),
      isRangeStart: isDateRangeStart(date),
      isRangeEnd: isDateRangeEnd(date),
      isInRange: isDateInRange(date),
      isDisabled: props.disabled ? props.disabled(date) : false,
    }));

    result.push({
      month: monthDate,
      label: format(monthDate, 'MMMM yyyy', { locale: props.locale }),
      days: dayInfos,
    });
  }

  return result;
});

// ── Range selection state ─────────────────────────────────────
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
        <!-- Header: nav + month label -->
        <div class="relative flex items-center justify-center pb-4 pt-1">
          <button
            v-if="idx === 0"
            type="button"
            aria-label="Mes anterior"
            class="absolute left-0 inline-flex h-7 w-7 items-center justify-center rounded-md bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
            class="absolute right-0 inline-flex h-7 w-7 items-center justify-center rounded-md bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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

        <!-- Week day headers -->
        <div class="grid grid-cols-7">
          <div
            v-for="day in weekDays"
            :key="day"
            class="flex h-9 w-9 items-center justify-center text-[0.8rem] font-normal text-muted-foreground"
          >
            {{ day }}
          </div>
        </div>

        <!-- Days grid -->
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
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  d.isToday && !d.isSelected && 'bg-accent font-medium text-accent-foreground',
                  d.isSelected &&
                    !d.isInRange &&
                    'bg-primary font-medium text-primary-foreground hover:bg-primary hover:text-primary-foreground',
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
