import { onBeforeUnmount, ref } from 'vue';

export interface DelayedToggleOptions {
  openDelay: number;
  closeDelay: number;
}

export function useDelayedToggle(getOptions: () => DelayedToggleOptions) {
  const isOpen = ref(false);

  let openTimer: ReturnType<typeof setTimeout> | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  function clearTimers() {
    if (openTimer) {
      clearTimeout(openTimer);
      openTimer = undefined;
    }
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
  }

  function open() {
    clearTimers();
    openTimer = setTimeout(() => {
      isOpen.value = true;
    }, getOptions().openDelay);
  }

  function close() {
    clearTimers();
    closeTimer = setTimeout(() => {
      isOpen.value = false;
    }, getOptions().closeDelay);
  }

  function cancelClose() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
  }

  onBeforeUnmount(() => {
    clearTimers();
  });

  return { isOpen, open, close, cancelClose };
}
