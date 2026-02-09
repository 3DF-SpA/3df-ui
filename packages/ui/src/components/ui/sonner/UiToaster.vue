<script setup lang="ts">
import { computed } from 'vue';

import { cn } from '../../../lib/utils';
import UiToast from './UiToast.vue';
import type { ToastPosition } from './toast-state';
import { toast, toasts } from './toast-state';

defineOptions({ name: 'UiToaster' });

const props = withDefaults(
  defineProps<{
    position?: ToastPosition;
    maxVisible?: number;
    class?: string;
  }>(),
  {
    position: 'bottom-right',
    maxVisible: 5,
  },
);

const positionClasses = computed(() => {
  const map: Record<ToastPosition, string> = {
    'top-left': 'top-4 left-4 items-start',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
    'top-right': 'top-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-4 right-4 items-end',
  };
  return map[props.position];
});

const isTop = computed(() => props.position.startsWith('top'));

const visibleToasts = computed(() => {
  const list = toasts.value.slice(-props.maxVisible);
  return isTop.value ? list : [...list].reverse();
});

function onDismiss(id: string) {
  toast.dismiss(id);
}
</script>

<template>
  <Teleport to="body">
    <ol
      v-if="visibleToasts.length"
      :class="
        cn(
          'pointer-events-none fixed z-[9999] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-2',
          positionClasses,
          props.class,
        )
      "
      role="region"
      aria-label="Notificaciones"
    >
      <UiToast v-for="t in visibleToasts" :key="t.id" :toast="t" @dismiss="onDismiss" />
    </ol>
  </Teleport>
</template>
