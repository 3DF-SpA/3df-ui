import { type Ref, nextTick, onBeforeUnmount, watch } from 'vue';

export interface FloatingLifecycleOptions {
  isOpen: Ref<boolean>;
  updatePosition: () => void;
  onScrollClose?: (event: Event) => void;
  contentRef?: Ref<HTMLElement | undefined>;
  closeFn?: () => void;
}

export function useFloatingLifecycle(options: FloatingLifecycleOptions) {
  let rafId: number | undefined;

  function onResize() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      options.updatePosition();
      rafId = undefined;
    });
  }

  const scrollHandler = options.onScrollClose ?? buildDefaultScrollHandler(options);

  let scrollListenerTimeout: ReturnType<typeof setTimeout> | undefined;

  watch(
    () => options.isOpen.value,
    async (open) => {
      if (open) {
        await nextTick();
        options.updatePosition();
        await nextTick();
        options.updatePosition();
        // Delay scroll/resize listener by one macrotask so that any scroll events
        // triggered by the initial render (e.g. UiCommand auto-selecting and calling
        // scrollIntoView on the first item) fire before our close-on-scroll handler
        // is active.
        clearTimeout(scrollListenerTimeout);
        scrollListenerTimeout = setTimeout(() => {
          if (!options.isOpen.value) return;
          if (scrollHandler) window.addEventListener('scroll', scrollHandler, true);
          window.addEventListener('resize', onResize);
        }, 0);
      } else {
        clearTimeout(scrollListenerTimeout);
        if (scrollHandler) window.removeEventListener('scroll', scrollHandler, true);
        window.removeEventListener('resize', onResize);
      }
    },
  );

  onBeforeUnmount(() => {
    clearTimeout(scrollListenerTimeout);
    if (scrollHandler) window.removeEventListener('scroll', scrollHandler, true);
    window.removeEventListener('resize', onResize);
    if (rafId) cancelAnimationFrame(rafId);
  });
}

function buildDefaultScrollHandler(
  options: FloatingLifecycleOptions,
): ((event: Event) => void) | undefined {
  if (!options.contentRef || !options.closeFn) return undefined;

  const contentRef = options.contentRef;
  const closeFn = options.closeFn;

  return (event: Event) => {
    const target = event.target as Node | null;
    if (contentRef.value && target && contentRef.value.contains(target)) return;
    closeFn();
  };
}
