<script setup lang="ts">
import { type CSSProperties, computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

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

// ── Positioning at cursor coordinates ─────────────────────────
const positionStyle = ref<CSSProperties>({});

function updatePosition() {
  const content = ctx.contentRef.value;
  if (!content) return;

  const contentRect = content.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = props.viewportPadding;

  let { x: left, y: top } = ctx.position.value;

  // Flip horizontally if overflows to the right
  if (left + contentRect.width > vw - pad) {
    left = left - contentRect.width;
  }
  if (left < pad) left = pad;

  // Flip vertically if overflows at the bottom
  if (top + contentRect.height > vh - pad) {
    top = top - contentRect.height;
  }
  if (top < pad) top = pad;

  positionStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
  };
}

function onScroll(event: Event) {
  const target = event.target as Node | null;
  if (ctx.contentRef.value && target && ctx.contentRef.value.contains(target)) return;
  ctx.close();
}

watch(
  () => ctx.isOpen.value,
  async (open) => {
    if (open) {
      await nextTick();
      updatePosition();
      await nextTick();
      updatePosition();
      window.addEventListener('scroll', onScroll, true);
    } else {
      window.removeEventListener('scroll', onScroll, true);
    }
  },
);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll, true);
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
            ctx.contentRef.value = el as HTMLElement;
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
            'rounded-md border-ui border-border p-1 shadow-md',
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
