import { ref } from 'vue';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  dismissible: boolean;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  createdAt: number;
}

export type ToastInput = Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>> & {
  title?: string;
  description?: string;
};

const toasts = ref<Toast[]>([]);
const timers = new Map<string, ReturnType<typeof setTimeout>>();
const defaultDuration = 4000;
const MAX_TOASTS = 10;

let counter = 0;
function createId() {
  return `toast-${++counter}-${Date.now()}`;
}

function addToast(input: ToastInput, variant: ToastVariant = 'default'): string {
  const id = createId();
  const duration = input.duration ?? defaultDuration;
  const toast: Toast = {
    id,
    variant,
    duration,
    dismissible: input.dismissible ?? true,
    createdAt: Date.now(),
    ...input,
  };

  if (toasts.value.length >= MAX_TOASTS) {
    const oldest = toasts.value[0];
    if (oldest) dismiss(oldest.id);
  }

  toasts.value.push(toast);

  if (duration > 0) {
    timers.set(
      id,
      setTimeout(() => dismiss(id), duration),
    );
  }

  return id;
}

function dismiss(id: string) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }

  const idx = toasts.value.findIndex((t) => t.id === id);
  if (idx >= 0) {
    const toast = toasts.value[idx]!;
    toast.onDismiss?.();
    toasts.value.splice(idx, 1);
  }
}

function dismissAll() {
  for (const timer of timers.values()) clearTimeout(timer);
  timers.clear();
  toasts.value.forEach((t) => t.onDismiss?.());
  toasts.value = [];
}

export function toast(input: string | ToastInput) {
  const data = typeof input === 'string' ? { description: input } : input;
  return addToast(data, 'default');
}

toast.success = (input: string | ToastInput) => {
  const data = typeof input === 'string' ? { description: input } : input;
  return addToast(data, 'success');
};

toast.error = (input: string | ToastInput) => {
  const data = typeof input === 'string' ? { description: input } : input;
  return addToast(data, 'error');
};

toast.warning = (input: string | ToastInput) => {
  const data = typeof input === 'string' ? { description: input } : input;
  return addToast(data, 'warning');
};

toast.info = (input: string | ToastInput) => {
  const data = typeof input === 'string' ? { description: input } : input;
  return addToast(data, 'info');
};

toast.dismiss = dismiss;
toast.dismissAll = dismissAll;

export { toasts };
