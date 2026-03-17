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
    default: 'bg-card text-foreground',
    success: 'bg-success/10 text-success',
    error: 'bg-destructive/10 text-destructive',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
  };
  return map[props.toast.variant] ?? map.default;
});

const iconClasses = computed(() => {
  const map: Record<string, string> = {
    success: 'text-success',
    error: 'text-destructive',
    warning: 'text-warning',
    info: 'text-info',
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
        'border-ui border-border pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 shadow-lg',
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

    <button
      v-if="toast.action"
      :class="
        cn(
          'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          'transition-colors focus-visible:outline-2 focus-visible:outline-ring',
        )
      "
      @click="
        toast.action?.onClick();
        dismissToast();
      "
    >
      {{ toast.action.label }}
    </button>

    <button
      v-if="toast.dismissible"
      :class="
        cn(
          'shrink-0 rounded-md p-0.5',
          'opacity-50 transition-opacity hover:opacity-100',
          'focus-visible:outline-2 focus-visible:outline-ring',
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
