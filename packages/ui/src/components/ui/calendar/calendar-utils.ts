import {
  addDays,
  addMonths,
  isToday as dateFnsIsToday,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { Locale } from 'date-fns/locale';

import type { CalendarMode, DateRange } from './calendar-types';

export interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

export interface MonthData {
  month: Date;
  label: string;
  days: DayInfo[];
}

export function getInitialMonth(
  mode: CalendarMode,
  modelValue: Date | DateRange | undefined,
  defaultMonth: Date,
): Date {
  if (modelValue) {
    if (mode === 'single' && modelValue instanceof Date) return modelValue;
    if (mode === 'range' && 'from' in (modelValue as DateRange))
      return (modelValue as DateRange).from;
  }
  return defaultMonth;
}

export function buildWeekDays(weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6, locale?: Locale): string[] {
  const start = startOfWeek(new Date(), { weekStartsOn });
  return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), 'EEEEEE', { locale }));
}

function isDateSelected(date: Date, mode: CalendarMode, modelValue?: Date | DateRange): boolean {
  if (!modelValue) return false;
  if (mode === 'single') return isSameDay(date, modelValue as Date);
  const range = modelValue as DateRange;
  return isSameDay(date, range.from) || (range.to ? isSameDay(date, range.to) : false);
}

function isDateRangeStart(date: Date, mode: CalendarMode, modelValue?: Date | DateRange): boolean {
  if (mode !== 'range' || !modelValue) return false;
  return isSameDay(date, (modelValue as DateRange).from);
}

function isDateRangeEnd(date: Date, mode: CalendarMode, modelValue?: Date | DateRange): boolean {
  if (mode !== 'range' || !modelValue) return false;
  const range = modelValue as DateRange;
  return range.to ? isSameDay(date, range.to) : false;
}

function isDateInRange(date: Date, mode: CalendarMode, modelValue?: Date | DateRange): boolean {
  if (mode !== 'range' || !modelValue) return false;
  const range = modelValue as DateRange;
  if (!range.to) return false;
  return date > range.from && date < range.to;
}

export function buildMonths(
  currentMonth: Date,
  numberOfMonths: number,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  fixedWeeks: boolean,
  mode: CalendarMode,
  modelValue: Date | DateRange | undefined,
  disabled: ((date: Date) => boolean) | undefined,
  locale?: Locale,
): MonthData[] {
  const result: MonthData[] = [];

  for (let i = 0; i < numberOfMonths; i++) {
    const monthDate = addMonths(currentMonth, i);
    const firstDay = startOfMonth(monthDate);
    const start = startOfWeek(firstDay, { weekStartsOn });

    let days: Date[];
    if (fixedWeeks) {
      days = eachDayOfInterval({ start, end: addDays(start, 41) });
    } else {
      const lastDay = endOfMonth(monthDate);
      const end = endOfWeek(lastDay, { weekStartsOn });
      days = eachDayOfInterval({ start, end });
    }

    const dayInfos: DayInfo[] = days.map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, monthDate),
      isToday: dateFnsIsToday(date),
      isSelected: isDateSelected(date, mode, modelValue),
      isRangeStart: isDateRangeStart(date, mode, modelValue),
      isRangeEnd: isDateRangeEnd(date, mode, modelValue),
      isInRange: isDateInRange(date, mode, modelValue),
      isDisabled: disabled ? disabled(date) : false,
    }));

    result.push({
      month: monthDate,
      label: format(monthDate, 'MMMM yyyy', { locale }),
      days: dayInfos,
    });
  }

  return result;
}
