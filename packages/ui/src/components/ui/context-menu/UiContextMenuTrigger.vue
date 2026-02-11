<script setup lang="ts">
import { inject } from 'vue';

import { CONTEXT_MENU_KEY } from './context-menu-types';

defineOptions({ name: 'UiContextMenuTrigger' });

const ctx = inject(CONTEXT_MENU_KEY)!;

function onContextMenu(event: MouseEvent) {
  event.preventDefault();
  ctx.open({ x: event.clientX, y: event.clientY });
}
</script>

<template>
  <div @contextmenu="onContextMenu">
    <slot />
  </div>
</template>
