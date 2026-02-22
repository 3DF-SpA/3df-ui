import { type CSSProperties, type Ref, ref } from 'vue';

export type FloatingSide = 'top' | 'bottom' | 'left' | 'right';
export type FloatingAlign = 'start' | 'center' | 'end';

export interface FloatingPositionOptions {
  side: FloatingSide;
  align: FloatingAlign;
  sideOffset: number;
  viewportPadding: number;
}

interface UseFloatingPositionReturn {
  positionStyle: Ref<CSSProperties>;
  updatePosition: () => void;
}

export function useFloatingPosition(
  triggerRef: Ref<HTMLElement | undefined>,
  contentRef: Ref<HTMLElement | undefined>,
  getOptions: () => FloatingPositionOptions,
): UseFloatingPositionReturn {
  const positionStyle = ref<CSSProperties>({});

  function updatePosition() {
    const trigger = triggerRef.value;
    const content = contentRef.value;
    if (!trigger || !content) return;

    const opts = getOptions();
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = opts.viewportPadding;
    const gap = opts.sideOffset;

    const resolved = resolvePosition(triggerRect, contentRect, vw, vh, pad, gap, opts);

    positionStyle.value = {
      position: 'fixed',
      top: `${resolved.top}px`,
      left: `${resolved.left}px`,
    };
  }

  return { positionStyle, updatePosition };
}

function resolvePosition(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  vw: number,
  vh: number,
  pad: number,
  gap: number,
  opts: FloatingPositionOptions,
): { top: number; left: number } {
  const side = resolveSide(triggerRect, contentRect, vw, vh, pad, gap, opts.side);
  const align = resolveAlign(triggerRect, contentRect, vw, pad, opts.align);

  let top: number;
  let left: number;

  if (side === 'top' || side === 'bottom') {
    top = side === 'top' ? triggerRect.top - contentRect.height - gap : triggerRect.bottom + gap;
    left = computeAlignedLeft(triggerRect, contentRect, align);
  } else {
    left = side === 'left' ? triggerRect.left - contentRect.width - gap : triggerRect.right + gap;
    top = computeAlignedTop(triggerRect, contentRect, opts.align);
  }

  return clampToViewport(top, left, contentRect, vw, vh, pad);
}

function resolveSide(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  vw: number,
  vh: number,
  pad: number,
  gap: number,
  preferred: FloatingSide,
): FloatingSide {
  if (preferred === 'top') {
    if (
      triggerRect.top - gap < contentRect.height + pad &&
      vh - triggerRect.bottom - gap > triggerRect.top - gap
    )
      return 'bottom';
  } else if (preferred === 'bottom') {
    const spaceBelow = vh - triggerRect.bottom - gap;
    if (spaceBelow < contentRect.height && triggerRect.top - gap > spaceBelow) return 'top';
  } else if (preferred === 'left') {
    if (
      triggerRect.left - gap < contentRect.width + pad &&
      vw - triggerRect.right - gap > triggerRect.left - gap
    )
      return 'right';
  } else if (preferred === 'right') {
    if (
      vw - triggerRect.right - gap < contentRect.width + pad &&
      triggerRect.left - gap > vw - triggerRect.right - gap
    )
      return 'left';
  }
  return preferred;
}

function resolveAlign(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  vw: number,
  pad: number,
  preferred: FloatingAlign,
): FloatingAlign {
  if (preferred === 'start') {
    if (triggerRect.left + contentRect.width > vw - pad) return 'end';
  } else if (preferred === 'end') {
    if (triggerRect.right - contentRect.width < pad) return 'start';
  } else {
    const cx = triggerRect.left + triggerRect.width / 2;
    const hw = contentRect.width / 2;
    if (cx - hw < pad) return 'start';
    if (cx + hw > vw - pad) return 'end';
  }
  return preferred;
}

function computeAlignedLeft(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  align: FloatingAlign,
): number {
  if (align === 'start') return triggerRect.left;
  if (align === 'end') return triggerRect.right - contentRect.width;
  return triggerRect.left + (triggerRect.width - contentRect.width) / 2;
}

function computeAlignedTop(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  align: FloatingAlign,
): number {
  if (align === 'start') return triggerRect.top;
  if (align === 'end') return triggerRect.bottom - contentRect.height;
  return triggerRect.top + (triggerRect.height - contentRect.height) / 2;
}

function clampToViewport(
  top: number,
  left: number,
  contentRect: DOMRect,
  vw: number,
  vh: number,
  pad: number,
): { top: number; left: number } {
  let clampedLeft = left;
  let clampedTop = top;

  if (clampedLeft < pad) clampedLeft = pad;
  else if (clampedLeft + contentRect.width > vw - pad) clampedLeft = vw - pad - contentRect.width;

  if (clampedTop < pad) clampedTop = pad;
  else if (clampedTop + contentRect.height > vh - pad) clampedTop = vh - pad - contentRect.height;

  return { top: clampedTop, left: clampedLeft };
}

export interface SubMenuPositionOptions {
  sideOffset: number;
  viewportPadding: number;
}

export function useSubMenuPosition(
  triggerRef: Ref<HTMLElement | undefined>,
  contentRef: Ref<HTMLElement | undefined>,
  getOptions: () => SubMenuPositionOptions,
): UseFloatingPositionReturn {
  const positionStyle = ref<CSSProperties>({});

  function updatePosition() {
    const trigger = triggerRef.value;
    const content = contentRef.value;
    if (!trigger || !content) return;

    const opts = getOptions();
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = opts.viewportPadding;
    const gap = opts.sideOffset;

    let left = triggerRect.right + gap;
    if (left + contentRect.width > vw - pad) {
      left = triggerRect.left - contentRect.width - gap;
    }
    if (left < pad) left = pad;

    let top = triggerRect.top;
    if (top + contentRect.height > vh - pad) {
      top = vh - pad - contentRect.height;
    }
    if (top < pad) top = pad;

    positionStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px` };
  }

  return { positionStyle, updatePosition };
}
