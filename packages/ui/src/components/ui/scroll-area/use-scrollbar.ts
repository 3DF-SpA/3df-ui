import { type Ref, computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface UseScrollbarOptions {
  orientation: Ref<'vertical' | 'horizontal' | 'both'>;
  type: Ref<'auto' | 'always' | 'scroll' | 'hover'>;
}

export function useScrollbar(
  viewportRef: Ref<HTMLElement | undefined>,
  options: UseScrollbarOptions,
) {
  const trackYRef = ref<HTMLElement>();
  const trackXRef = ref<HTMLElement>();

  const hasOverflowY = ref(false);
  const hasOverflowX = ref(false);
  const thumbYHeight = ref(0);
  const thumbYTop = ref(0);
  const thumbXWidth = ref(0);
  const thumbXLeft = ref(0);
  const isHovering = ref(false);
  const isScrolling = ref(false);
  const isDraggingY = ref(false);
  const isDraggingX = ref(false);

  let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
  let scrollRafId: number | undefined;

  const showVertical = computed(() => {
    if (!hasOverflowY.value) return false;
    if (options.orientation.value !== 'vertical' && options.orientation.value !== 'both')
      return false;
    switch (options.type.value) {
      case 'always':
      case 'auto':
        return true;
      case 'scroll':
        return isScrolling.value || isDraggingY.value;
      case 'hover':
        return isHovering.value || isScrolling.value || isDraggingY.value;
    }
    return false;
  });

  const showHorizontal = computed(() => {
    if (!hasOverflowX.value) return false;
    if (options.orientation.value !== 'horizontal' && options.orientation.value !== 'both')
      return false;
    switch (options.type.value) {
      case 'always':
      case 'auto':
        return true;
      case 'scroll':
        return isScrolling.value || isDraggingX.value;
      case 'hover':
        return isHovering.value || isScrolling.value || isDraggingX.value;
    }
    return false;
  });

  function updateScrollbars() {
    const vp = viewportRef.value;
    if (!vp) return;

    hasOverflowY.value = vp.scrollHeight > vp.clientHeight;
    if (hasOverflowY.value) {
      const ratio = vp.clientHeight / vp.scrollHeight;
      thumbYHeight.value = Math.max(ratio * vp.clientHeight, 18);
      const scrollRatio = vp.scrollTop / (vp.scrollHeight - vp.clientHeight);
      thumbYTop.value = scrollRatio * (vp.clientHeight - thumbYHeight.value);
    }

    hasOverflowX.value = vp.scrollWidth > vp.clientWidth;
    if (hasOverflowX.value) {
      const ratio = vp.clientWidth / vp.scrollWidth;
      thumbXWidth.value = Math.max(ratio * vp.clientWidth, 18);
      const scrollRatio = vp.scrollLeft / (vp.scrollWidth - vp.clientWidth);
      thumbXLeft.value = scrollRatio * (vp.clientWidth - thumbXWidth.value);
    }
  }

  function onScroll() {
    if (!scrollRafId) {
      scrollRafId = requestAnimationFrame(() => {
        updateScrollbars();
        scrollRafId = undefined;
      });
    }
    isScrolling.value = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false;
    }, 1000);
  }

  let dragStartY = 0;
  let dragStartScrollTop = 0;

  function onThumbYPointerMove(e: PointerEvent) {
    const vp = viewportRef.value;
    if (!vp) return;
    const delta = e.clientY - dragStartY;
    const scrollableHeight = vp.scrollHeight - vp.clientHeight;
    const trackHeight = vp.clientHeight - thumbYHeight.value;
    if (trackHeight <= 0) return;
    vp.scrollTop = dragStartScrollTop + (delta / trackHeight) * scrollableHeight;
  }

  function onThumbYPointerUp() {
    isDraggingY.value = false;
    document.removeEventListener('pointermove', onThumbYPointerMove);
    document.removeEventListener('pointerup', onThumbYPointerUp);
  }

  function onThumbYPointerDown(e: PointerEvent) {
    e.preventDefault();
    isDraggingY.value = true;
    dragStartY = e.clientY;
    dragStartScrollTop = viewportRef.value?.scrollTop ?? 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.addEventListener('pointermove', onThumbYPointerMove);
    document.addEventListener('pointerup', onThumbYPointerUp);
  }

  let dragStartX = 0;
  let dragStartScrollLeft = 0;

  function onThumbXPointerMove(e: PointerEvent) {
    const vp = viewportRef.value;
    if (!vp) return;
    const delta = e.clientX - dragStartX;
    const scrollableWidth = vp.scrollWidth - vp.clientWidth;
    const trackWidth = vp.clientWidth - thumbXWidth.value;
    if (trackWidth <= 0) return;
    vp.scrollLeft = dragStartScrollLeft + (delta / trackWidth) * scrollableWidth;
  }

  function onThumbXPointerUp() {
    isDraggingX.value = false;
    document.removeEventListener('pointermove', onThumbXPointerMove);
    document.removeEventListener('pointerup', onThumbXPointerUp);
  }

  function onThumbXPointerDown(e: PointerEvent) {
    e.preventDefault();
    isDraggingX.value = true;
    dragStartX = e.clientX;
    dragStartScrollLeft = viewportRef.value?.scrollLeft ?? 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.addEventListener('pointermove', onThumbXPointerMove);
    document.addEventListener('pointerup', onThumbXPointerUp);
  }

  function onTrackYClick(e: MouseEvent) {
    const vp = viewportRef.value;
    const track = trackYRef.value;
    if (!vp || !track) return;
    const rect = track.getBoundingClientRect();
    const clickRatio = (e.clientY - rect.top) / rect.height;
    vp.scrollTop = clickRatio * (vp.scrollHeight - vp.clientHeight);
  }

  function onTrackXClick(e: MouseEvent) {
    const vp = viewportRef.value;
    const track = trackXRef.value;
    if (!vp || !track) return;
    const rect = track.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    vp.scrollLeft = clickRatio * (vp.scrollWidth - vp.clientWidth);
  }

  let resizeObserver: ResizeObserver | undefined;

  onMounted(() => {
    updateScrollbars();
    if (viewportRef.value) {
      resizeObserver = new ResizeObserver(() => updateScrollbars());
      resizeObserver.observe(viewportRef.value);
      const firstChild = viewportRef.value.firstElementChild;
      if (firstChild) resizeObserver.observe(firstChild);
    }
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    if (scrollTimeout) clearTimeout(scrollTimeout);
    if (scrollRafId) cancelAnimationFrame(scrollRafId);
    document.removeEventListener('pointermove', onThumbYPointerMove);
    document.removeEventListener('pointerup', onThumbYPointerUp);
    document.removeEventListener('pointermove', onThumbXPointerMove);
    document.removeEventListener('pointerup', onThumbXPointerUp);
  });

  return {
    trackYRef,
    trackXRef,
    thumbYHeight,
    thumbYTop,
    thumbXWidth,
    thumbXLeft,
    isHovering,
    showVertical,
    showHorizontal,
    onScroll,
    onThumbYPointerDown,
    onThumbXPointerDown,
    onTrackYClick,
    onTrackXClick,
  };
}
