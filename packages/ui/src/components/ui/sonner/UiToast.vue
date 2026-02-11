<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { cn } from '../../../lib/utils';
import type { Toast } from './toast-state';

defineOptions({ name: 'UiToast' });

const props = defineProps<{
  toast: Toast;
}>();

const emit = defineEmits<{
  dismiss: [id: string];
}>();

const isVisible = ref(false);
const isLeaving = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let enterTimer: ReturnType<typeof setTimeout> | undefined;
let dismissTimer: ReturnType<typeof setTimeout> | undefined;

const iconMap: Record<string, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const icon = computed(() => iconMap[props.toast.variant]);

const variantClasses = computed(() => {
  const map: Record<string, string> = {
    default: 'bg-background text-foreground border-border',
    success:
      'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800',
    error:
      'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800',
    warning:
      'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800',
    info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800',
  };
  return map[props.toast.variant] ?? map.default;
});

const iconClasses = computed(() => {
  const map: Record<string, string> = {
    success: 'text-emerald-600 dark:text-emerald-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    info: 'text-blue-600 dark:text-blue-400',
  };
  return map[props.toast.variant] ?? '';
});

function startTimer() {
  if (props.toast.duration <= 0) return;
  pauseTimer();
  timer = setTimeout(() => {
    dismissToast();
  }, props.toast.duration);
}

function pauseTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
}

function dismissToast() {
  if (isLeaving.value) return;
  isLeaving.value = true;
  dismissTimer = setTimeout(() => {
    emit('dismiss', props.toast.id);
  }, 300);
}

onMounted(() => {
  enterTimer = setTimeout(() => {
    isVisible.value = true;
  }, 10);
  startTimer();
});

onBeforeUnmount(() => {
  pauseTimer();
  if (enterTimer) clearTimeout(enterTimer);
  if (dismissTimer) clearTimeout(dismissTimer);
});
</script>

<template>
  <li
    :class="
      cn(
        'pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 shadow-lg',
        'transition-all duration-300 ease-out',
        isVisible && !isLeaving
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-2 scale-95 opacity-0',
        variantClasses,
      )
    "
    role="status"
    aria-live="polite"
    aria-atomic="true"
    @mouseenter="pauseTimer()"
    @mouseleave="startTimer()"
  >
    <!-- Icon -->
    <span
      v-if="icon"
      :class="
        cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full text-sm font-bold',
          iconClasses,
        )
      "
      aria-hidden="true"
    >
      {{ icon }}
    </span>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <p v-if="toast.title" class="text-sm leading-tight font-semibold">
        {{ toast.title }}
      </p>
      <p
        v-if="toast.description"
        :class="cn('text-sm leading-snug', toast.title ? 'mt-0.5 opacity-80' : '')"
      >
        {{ toast.description }}
      </p>
    </div>

    <!-- Action -->
    <button
      v-if="toast.action"
      :class="
        cn(
          'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          'focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:outline-none',
        )
      "
      @click="
        toast.action?.onClick();
        dismissToast();
      "
    >
      {{ toast.action.label }}
    </button>

    <!-- Dismiss -->
    <button
      v-if="toast.dismissible"
      :class="
        cn(
          'shrink-0 rounded-md p-0.5',
          'opacity-50 transition-opacity hover:opacity-100',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        )
      "
      aria-label="Close notification"
      @click="dismissToast()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </li>
</template>
