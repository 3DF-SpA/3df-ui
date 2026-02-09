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
const defaultDuration = 4000;

let counter = 0;
function createId() {
  return `toast-${++counter}-${Date.now()}`;
}

function addToast(input: ToastInput, variant: ToastVariant = 'default'): string {
  const id = createId();
  const toast: Toast = {
    id,
    variant,
    duration: input.duration ?? defaultDuration,
    dismissible: input.dismissible ?? true,
    createdAt: Date.now(),
    ...input,
  };
  toasts.value.push(toast);
  return id;
}

function dismiss(id: string) {
  const toast = toasts.value.find((t) => t.id === id);
  if (toast?.onDismiss) toast.onDismiss();
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

function dismissAll() {
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
