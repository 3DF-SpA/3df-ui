<script setup lang="ts">
import { type CSSProperties, computed, inject, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { useFloatingLifecycle } from '../../../composables/use-floating-lifecycle';
import { cn } from '../../../lib/utils';
import { CONTEXT_MENU_KEY } from './context-menu-types';

defineOptions({ name: 'UiContextMenuContent', inheritAttrs: false });

interface UiContextMenuContentProps {
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiContextMenuContentProps>(), {
  viewportPadding: 8,
});

const ctx = inject(CONTEXT_MENU_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const contentRef = ref<HTMLElement>();
const positionStyle = ref<CSSProperties>({});

function updatePosition() {
  const content = contentRef.value;
  if (!content) return;

  const contentRect = content.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = props.viewportPadding;

  let { x: left, y: top } = ctx.position.value;

  if (left + contentRect.width > vw - pad) left = left - contentRect.width;
  if (left < pad) left = pad;

  if (top + contentRect.height > vh - pad) top = top - contentRect.height;
  if (top < pad) top = pad;

  positionStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
  };
}

useFloatingLifecycle({
  isOpen: ctx.isOpen,
  updatePosition,
  contentRef,
  closeFn: ctx.close,
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-[0.97]"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-[0.97]"
    >
      <div
        v-if="ctx.isOpen.value"
        :ref="
          (el) => {
            const element = el as HTMLElement;
            ctx.contentRef.value = element;
            contentRef = element;
          }
        "
        v-bind="restAttrs"
        role="menu"
        data-context-menu-content
        :style="positionStyle"
        :class="
          cn(
            'z-50 max-w-[calc(100vw-1rem)] min-w-[8rem]',
            'bg-popover text-popover-foreground',
            'border-ui border-border rounded-md p-1 shadow-md',
            'max-h-[var(--context-menu-max-h,20rem)] overflow-auto',
            attrs.class,
          )
        "
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
