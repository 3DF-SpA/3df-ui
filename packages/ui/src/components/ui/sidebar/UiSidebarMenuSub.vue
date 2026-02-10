<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { useSidebar } from './use-sidebar';

defineOptions({ name: 'UiSidebarMenuSub', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    open?: boolean;
  }>(),
  { open: false },
);

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const ctx = useSidebar();
const isOpen = ref(props.open);

watch(
  () => props.open,
  (val) => {
    isOpen.value = val;
  },
);

/* En modo icon colapsado, ocultar completamente */
const isIconCollapsed = computed(
  () =>
    ctx.collapsible.value === 'icon' &&
    ctx.state.value === 'collapsed' &&
    !ctx.isMobile.value,
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'ml-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border pl-2.5',
    'transition-[max-height,opacity] duration-200 ease-in-out overflow-hidden',
    isOpen.value ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
    isIconCollapsed.value && 'hidden',
    attrs.class,
  ),
);

function toggle() {
  isOpen.value = !isOpen.value;
  emit('update:open', isOpen.value);
}

defineExpose({ toggle, isOpen });
</script>

<template>
  <ul v-bind="restAttrs" :class="classes" data-sidebar="menu-sub" role="group">
    <slot />
  </ul>
</template>
