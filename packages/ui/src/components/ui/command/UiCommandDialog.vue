<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import UiDialog from '../dialog/UiDialog.vue';
import UiDialogContent from '../dialog/UiDialogContent.vue';
import UiCommand from './UiCommand.vue';

defineOptions({ name: 'UiCommandDialog', inheritAttrs: false });

interface UiCommandDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<UiCommandDialogProps>(), {
  open: undefined,
  defaultOpen: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

function onOpenChange(val: boolean) {
  emit('update:open', val);
}

function onSelect(val: string) {
  emit('select', val);
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    emit('update:open', !(props.open ?? false));
  }
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onGlobalKeydown);
});
</script>

<template>
  <UiDialog :open="open" :default-open="defaultOpen" @update:open="onOpenChange">
    <UiDialogContent
      v-bind="restAttrs"
      :show-close="false"
      :class="cn('overflow-hidden p-0 shadow-lg', attrs.class)"
    >
      <UiCommand class="[&_[data-command-input-wrapper]]:border-b" @select="onSelect">
        <slot />
      </UiCommand>
    </UiDialogContent>
  </UiDialog>
</template>
